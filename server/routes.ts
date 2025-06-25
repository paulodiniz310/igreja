import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertSettingsSchema, type QueryRequest, type BiblicalResponse } from "@shared/schema";
import { openRouterService } from "./services/openrouter";
import { pdfProcessor } from "./services/pdf-processor";
import { biblicalWordsService } from "./services/biblical-words";

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
      const [aiResponse, pdfContent, biblicalWords] = await Promise.all([
        openRouterService.query(question, responseLevel, settings.apiKey, settings.aiModel),
        pdfProcessor.searchRelevantContent(question),
        biblicalWordsService.findOriginalWords(question)
      ]);

      // Structure the biblical response
      const response: BiblicalResponse = {
        adExplanation: aiResponse.explanation,
        verses: aiResponse.verses,
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

  // Generate image based on response
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt?.trim()) {
        return res.status(400).json({ error: "Prompt é obrigatório" });
      }

      const settings = await storage.getSettings();
      if (!settings) {
        return res.status(500).json({ error: "Configurações não encontradas" });
      }

      const imageUrl = await openRouterService.generateImage(prompt, settings.apiKey);
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ 
        error: "Erro ao gerar imagem",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
