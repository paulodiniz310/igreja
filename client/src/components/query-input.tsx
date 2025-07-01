import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Search, Eraser, Loader2 } from "lucide-react";
import type { QueryRequest, BiblicalResponse } from "@shared/schema";

interface QueryInputProps {
  onResponse: (response: any) => void;
  onConversationSaved?: (conversation: any) => void;
}

export default function QueryInput({ onResponse, onConversationSaved }: QueryInputProps) {
  const [question, setQuestion] = useState("");
  const [responseLevel, setResponseLevel] = useState<"simples" | "intermediario" | "avancado">("intermediario");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const queryMutation = useMutation({
    mutationFn: async (data: QueryRequest) => {
      const response = await apiRequest("POST", "/api/query", data);
      return await response.json();
    },
    onSuccess: (data) => {
      onResponse(data);
      // Save conversation locally instead of relying on server
      if (onConversationSaved && data.conversation) {
        onConversationSaved(data.conversation);
      }
      setQuestion("");
      toast({
        title: "Consulta realizada",
        description: "Sua pergunta foi processada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro na consulta",
        description: error.message || "Ocorreu um erro ao processar sua pergunta.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!question.trim()) {
      toast({
        title: "Pergunta obrigatória",
        description: "Por favor, digite uma pergunta antes de consultar.",
        variant: "destructive",
      });
      return;
    }

    queryMutation.mutate({ question: question.trim(), responseLevel });
  };

  const handleClear = () => {
    setQuestion("");
  };

  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Search className="text-primary-500 mr-2" size={20} />
          Faça sua consulta
        </h2>
        
        {/* Response Level Selection */}
        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Nível de resposta
          </Label>
          <Select value={responseLevel} onValueChange={(value: any) => setResponseLevel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simples">Simples - Resposta básica e direta</SelectItem>
              <SelectItem value="intermediario">Intermediário - Resposta detalhada</SelectItem>
              <SelectItem value="avancado">Avançado - Resposta completa e aprofundada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question Input */}
        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Sua pergunta
          </Label>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Digite sua pergunta sobre doutrina, teologia ou estudos bíblicos..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            rows={3}
            disabled={queryMutation.isPending}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={handleSubmit}
            disabled={queryMutation.isPending || !question.trim()}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6"
          >
            {queryMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Consultar
              </>
            )}
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            disabled={queryMutation.isPending}
            className="px-4 py-3"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
