import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Book, MapPin, BookOpen } from "lucide-react";
import { api } from "@/lib/api";

interface SearchResult {
  bookTitle: string;
  page: number;
  line: number;
  quote: string;
  chapter?: string;
}

export default function SearchDeclaracao() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const searchMutation = useMutation({
    mutationFn: async (term: string) => {
      const response = await api.searchDeclaracao(term);
      return response;
    },
    onSuccess: (data) => {
      setResults(data);
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchMutation.mutate(searchTerm.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Busca na Declaração de Fé
              </h1>
            </div>
          </div>
          <Link href="/biblical-dictionary">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Dicionário Bíblico
            </Button>
          </Link>
        </div>
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            Pesquise termos específicos no livro "Declaração de Fé das Assembleias de Deus"
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Pesquisar no Livro
            </CardTitle>
            <CardDescription>
              Digite uma palavra ou termo para encontrar todas as referências na Declaração de Fé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: salvação, batismo, Espírito Santo..."
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={searchMutation.isPending || !searchTerm.trim()}
              >
                {searchMutation.isPending ? "Pesquisando..." : "Pesquisar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Resultados da Pesquisa
              </h2>
              <Badge variant="secondary">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              </Badge>
            </div>

            {results.map((result, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-400">
                      {result.chapter || "Declaração de Fé das Assembleias de Deus"}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      Pág. {result.page}, Linha {result.line}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-blue-200 dark:border-blue-800 pl-4 italic text-gray-700 dark:text-gray-300">
                    "{result.quote}"
                  </blockquote>
                  <Separator className="my-3" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Fonte:</strong> {result.bookTitle}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {searchMutation.isSuccess && results.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tente pesquisar com outros termos ou palavras relacionadas.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}