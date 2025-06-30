import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { Church, BookOpen, Languages, FileText, Bot, Eye } from "lucide-react";
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
            
            <div className="space-y-4">
              {response.originalWords.map((word, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <Badge 
                      variant={word.language === "grego" ? "default" : word.language === "hebraico" ? "secondary" : "outline"}
                      className="capitalize font-medium mt-1"
                    >
                      {word.language}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-bold text-lg text-gray-900">{word.word}</p>
                        <span className="text-gray-400">•</span>
                        <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {word.translation?.split(',')[0]?.trim() || word.translation}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Tradução:</span> {word.translation}
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        {word.context}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Book References - Declaração de Fé */}
      {response.bookReferences && response.bookReferences.length > 0 && (
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="text-green-600 mr-2" size={20} />
              Referências da Declaração de Fé - Assembleia de Deus
            </h3>
            
            <div className="space-y-4">
              {response.bookReferences.map((ref, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                  <div className="mb-2">
                    <h4 className="font-semibold text-green-800 text-sm">
                      {ref.bookTitle}
                    </h4>
                    {ref.chapter && (
                      <p className="text-xs text-green-600 mt-1">{ref.chapter}</p>
                    )}
                  </div>
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed">
                    "{ref.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      Página {ref.page}, Linha {ref.line}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Complement - Melhorado e Organizado */}
      {response.aiComplement && (
        <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <Bot className="text-purple-600 mr-3" size={24} />
              Complemento e Aplicação Prática
            </h3>
            <div className="bg-white rounded-lg p-5 border border-purple-100 shadow-sm">
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                {response.aiComplement.split('\n\n').map((paragraph, index) => (
                  <div key={index} className="mb-4">
                    {paragraph.includes(':') && paragraph.length < 100 ? (
                      <h4 className="font-semibold text-purple-700 mb-2 border-b border-purple-200 pb-1">
                        {paragraph}
                      </h4>
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2 text-xs text-purple-600">
              <Bot size={14} />
              <span>Orientação baseada na tradição pentecostal da Assembleia de Deus</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}