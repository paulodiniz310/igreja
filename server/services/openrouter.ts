interface OpenRouterResponse {
  explanation: string;
  verses: Array<{
    text: string;
    reference: string;
    explanation: string;
  }>;
  complement: string;
}

class OpenRouterService {
  private baseUrl = "https://openrouter.ai/api/v1";

  async query(
    question: string, 
    responseLevel: string, 
    apiKey: string, 
    model: string
  ): Promise<OpenRouterResponse> {
    try {
      const prompt = this.buildPrompt(question, responseLevel);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-Title": "Sistema Consulta Biblica CPAD",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: "Você é um consultor teológico especializado na doutrina da Assembleia de Deus CPAD. Responda sempre com base nos ensinamentos pentecostais clássicos, incluindo versículos bíblicos da versão Almeida Revista e Corrigida (ARC)."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("Resposta vazia da API");
      }

      return this.parseResponse(content);
    } catch (error) {
      console.error("OpenRouter service error:", error);
      throw new Error(`Erro na consulta à IA: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  async generateImage(prompt: string, apiKey: string): Promise<string> {
    try {
      // Note: OpenRouter doesn't typically handle image generation
      // This would need to be implemented with a different service like DALL-E or Stable Diffusion
      // For now, return a placeholder
      throw new Error("Geração de imagem não implementada ainda");
    } catch (error) {
      console.error("Image generation error:", error);
      throw error;
    }
  }

  private buildPrompt(question: string, responseLevel: string): string {
    const levelInstructions = {
      simples: "Responda de forma simples e direta, adequada para novos convertidos.",
      intermediario: "Responda com detalhes moderados, adequada para cristãos com conhecimento básico.",
      avancado: "Responda de forma completa e aprofundada, com análise teológica detalhada."
    };

    return `
Como consultor teológico especialista da Assembleia de Deus CPAD, responda à pergunta no nível ${responseLevel}:

"${question}"

${levelInstructions[responseLevel as keyof typeof levelInstructions]}

IMPORTANTE: Se não encontrar referências específicas nos livros da CPAD, complemente a resposta com a perspectiva doutrinária da Assembleia de Deus baseada nos princípios pentecostais clássicos.

Estruture sua resposta SEMPRE em JSON válido com os seguintes campos:
{
  "explanation": "Explicação detalhada baseada na doutrina pentecostal da Assembleia de Deus CPAD, incluindo contexto histórico e teológico quando necessário",
  "verses": [
    {
      "text": "Texto completo do versículo da ARC",
      "reference": "Referência bíblica completa (livro capítulo:versículo)",
      "explanation": "Explicação contextual do versículo aplicado à pergunta"
    }
  ],
  "complement": "Aplicação prática e orientações pastorais baseadas na tradição pentecostal da AD, incluindo como este ensino se aplica na vida do crente hoje"
}

Diretrizes obrigatórias:
- Use EXCLUSIVAMENTE versículos da Almeida Revista e Corrigida (ARC)
- Mantenha absoluta fidelidade aos ensinamentos pentecostais clássicos da AD
- Forneça pelo menos 2-3 versículos relevantes para fundamentar a resposta
- Responda sempre do ponto de vista da Assembleia de Deus CPAD
- Se a pergunta envolver questões controversas, apresente a posição oficial da AD
`;
  }

  private parseResponse(content: string): OpenRouterResponse {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback: parse text response manually
      return {
        explanation: content.substring(0, 500) + "...",
        verses: [
          {
            text: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.",
            reference: "Efésios 2:8",
            explanation: "Este versículo fundamental ensina sobre a salvação pela graça."
          }
        ],
        complement: "Consulte a Declaração de Fé da AD para mais detalhes sobre este tema."
      };
    } catch (error) {
      console.error("Error parsing OpenRouter response:", error);
      throw new Error("Erro ao processar resposta da IA");
    }
  }
}

export const openRouterService = new OpenRouterService();
