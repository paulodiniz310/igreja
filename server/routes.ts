import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertSettingsSchema, type QueryRequest, type BiblicalResponse } from "@shared/schema";
import { openRouterService } from "./services/openrouter";
import { pdfProcessor } from "./services/pdf-processor";
import { biblicalWordsService } from "./services/biblical-words";
import { biblicalTextService } from "./services/biblical-text";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Query endpoint - main consultation functionality
  app.post("/api/query", async (req, res) => {
    try {
      const { question, responseLevel } = req.body as QueryRequest;
      
      if (!question?.trim()) {
        return res.status(400).json({ error: "Pergunta é obrigatória" });
      }

      const settings = await storage.getSettings();
      if (!settings) {
        return res.status(500).json({ error: "Configurações não encontradas" });
      }

      // Process the query through multiple services
      const [aiResponse, pdfContent] = await Promise.all([
        openRouterService.query(question, responseLevel, settings.apiKey, settings.aiModel),
        pdfProcessor.searchRelevantContent(question)
      ]);

      // Enhanced original words processing - extract keywords from question and AI response
      const allText = `${question} ${aiResponse.explanation} ${aiResponse.verses.map(v => v.text).join(' ')}`;
      const biblicalWords = await biblicalWordsService.findOriginalWords(allText);

      // Enhance verses with original text
      const enhancedVerses = await biblicalTextService.enhanceVersesWithOriginal(aiResponse.verses);
      
      // Convert null to undefined for TypeScript compatibility
      const compatibleVerses = enhancedVerses.map(verse => ({
        text: verse.text,
        reference: verse.reference,
        explanation: verse.explanation,
        originalText: verse.originalText ? verse.originalText : undefined
      }));

      // Structure the biblical response
      const response: BiblicalResponse = {
        adExplanation: aiResponse.explanation,
        verses: compatibleVerses,
        originalWords: biblicalWords,
        bookReferences: pdfContent,
        aiComplement: aiResponse.complement
      };

      // Save conversation
      const conversation = await storage.createConversation({
        question,
        responseLevel,
        response: response as any
      });

      res.json({ conversation, response });
    } catch (error) {
      console.error("Error processing query:", error);
      res.status(500).json({ 
        error: "Erro ao processar consulta",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  // Get conversation history
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Erro ao buscar histórico" });
    }
  });

  // Get specific conversation
  app.get("/api/conversations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await storage.getConversation(id);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversa não encontrada" });
      }
      
      res.json(conversation);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Erro ao buscar conversa" });
    }
  });

  // Get current settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ error: "Erro ao buscar configurações" });
    }
  });

  // Update settings
  app.put("/api/settings", async (req, res) => {
    try {
      const validatedData = insertSettingsSchema.parse(req.body);
      const settings = await storage.updateSettings(validatedData);
      res.json(settings);
    } catch (error) {
      console.error("Error updating settings:", error);
      res.status(500).json({ 
        error: "Erro ao salvar configurações",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  // Get original words for a term
  app.post("/api/original-words", async (req, res) => {
    try {
      const { term } = req.body;
      
      if (!term?.trim()) {
        return res.status(400).json({ error: "Termo é obrigatório" });
      }

      const originalWords = await biblicalWordsService.findOriginalWords(term);
      res.json({ originalWords });
    } catch (error) {
      console.error("Error getting original words:", error);
      res.status(500).json({ 
        error: "Erro ao buscar palavras originais",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  app.post("/api/search-declaracao", async (req, res) => {
    try {
      const { term } = req.body;
      
      if (!term || typeof term !== 'string') {
        return res.status(400).json({ error: "Termo de busca é obrigatório" });
      }

      const results = await pdfProcessor.searchDeclaracaoSpecific(term);
      res.json(results);
    } catch (error: any) {
      console.error("Erro na busca da Declaração de Fé:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Get full reference content
  app.post("/api/get-reference-content", async (req, res) => {
    try {
      const { chapter } = req.body;
      
      if (!chapter || typeof chapter !== 'string') {
        return res.status(400).json({ error: "Capítulo é obrigatório" });
      }

      const content = await pdfProcessor.getFullChapterContent(chapter);
      res.json({ content });
    } catch (error: any) {
      console.error("Error getting reference content:", error);
      res.status(500).json({ 
        error: "Erro ao buscar conteúdo da referência",
        details: error.message || "Erro desconhecido"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
