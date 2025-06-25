import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Church, BookOpen, Languages, FileText, Bot, Image as ImageIcon } from "lucide-react";
import type { BiblicalResponse } from "@shared/schema";

interface ResponseDisplayProps {
  response: {
    conversation: any;
    response: BiblicalResponse;
  };
}

export default function ResponseDisplay({ response: data }: ResponseDisplayProps) {
  const { toast } = useToast();
  const { conversation, response } = data;

  const imageGenerationMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const res = await apiRequest("POST", "/api/generate-image", { prompt });
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Imagem gerada",
        description: "A imagem foi gerada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro na geração",
        description: "Funcionalidade de geração de imagem ainda não implementada.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateImage = () => {
    const prompt = `Illustration of ${conversation.question} in biblical style`;
    imageGenerationMutation.mutate(prompt);
  };

  return (
    <div className="space-y-4">
      {/* Question Asked */}
      <Card className="bg-primary-50 border-l-4 border-primary-500">
        <CardContent className="p-4">
          <h3 className="font-semibold text-primary-800 mb-2">Pergunta:</h3>
          <p className="text-gray-700">{conversation.question}</p>
        </CardContent>
      </Card>

      {/* AD CPAD Explanation */}
      <Card className="bg-white shadow-md">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Church className="text-accent-500 mr-2" size={20} />
            Explicação - Assembleia de Deus CPAD
          </h3>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p>{response.adExplanation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Bible Verses Section */}
      {response.verses && response.verses.length > 0 && (
        <Card className="bg-scripture-50 border border-scripture-200 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="text-accent-600 mr-2" size={20} />
              Versículos Bíblicos (ARC)
            </h3>
            
            <div className="space-y-4">
              {response.verses.map((verse, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-accent-500">
                  <div className="flex items-start space-x-3">
                    <div className="text-accent-500 mt-1 text-sm">"</div>
                    <div className="flex-1">
                      <blockquote className="text-gray-800 italic mb-2">
                        "{verse.text}"
                      </blockquote>
                      {verse.originalText && (
                        <div className="bg-gray-50 p-2 rounded mt-2 mb-2">
                          <p className="text-xs text-gray-500 mb-1">Texto Original:</p>
                          <p className="text-sm font-mono text-gray-700 leading-relaxed">
                            {verse.originalText}
                          </p>
                        </div>
                      )}
                      <cite className="text-sm font-semibold text-primary-600">{verse.reference}</cite>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Explicação:</strong> {verse.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Original Language Words */}
      {response.originalWords && response.originalWords.length > 0 && (
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Languages className="text-primary-500 mr-2" size={20} />
              Palavras no Idioma Original
            </h3>
            
            <div className="space-y-3">
              {response.originalWords.map((word, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={word.language === "grego" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {word.language}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{word.word}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Tradução:</strong> {word.translation}
                    </p>
                    <p className="text-xs text-gray-500">{word.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Book References */}
      {response.bookReferences && response.bookReferences.length > 0 && (
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="text-green-600 mr-2" size={20} />
              Referências dos Livros
            </h3>
            
            <div className="space-y-4">
              {response.bookReferences.map((ref, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{ref.bookTitle}</h4>
                    <Badge variant="outline" className="bg-green-50 text-green-800">
                      Página {ref.page}
                    </Badge>
                  </div>
                  <blockquote className="text-gray-700 italic text-sm mb-2">
                    "{ref.quote}"
                  </blockquote>
                  <p className="text-xs text-gray-500">
                    <strong>Local:</strong> {ref.chapter || `Linha ${ref.line}`}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Complement */}
      {response.aiComplement && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Bot className="text-purple-600 mr-2" size={20} />
              Complemento da IA
            </h3>
            <div className="text-gray-700 text-sm leading-relaxed">
              <p>{response.aiComplement}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Generation Option */}
      <Card className="bg-white shadow-md">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <ImageIcon className="text-indigo-600 mr-2" size={20} />
            Gerar Imagem Ilustrativa
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Gere uma imagem visual para complementar esta resposta sobre {conversation.question.toLowerCase()}.
          </p>
          <Button
            onClick={handleGenerateImage}
            disabled={imageGenerationMutation.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4"
          >
            {imageGenerationMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Gerando...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Gerar Imagem
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
