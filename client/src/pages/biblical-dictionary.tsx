import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { Search, Book, User, MapPin, Lightbulb, Package, Calendar, Church, ArrowLeft, FileText } from "lucide-react";

interface BiblicalDefinition {
  term: string;
  definition: string;
  etymology?: string;
  biblicalReferences: string[];
  category: "pessoa" | "lugar" | "conceito" | "objeto" | "evento" | "doutrina";
  relatedTerms: string[];
}

const categoryIcons = {
  pessoa: User,
  lugar: MapPin,
  conceito: Lightbulb,
  objeto: Package,
  evento: Calendar,
  doutrina: Church
};

const categoryLabels = {
  pessoa: "Pessoas",
  lugar: "Lugares",
  conceito: "Conceitos",
  objeto: "Objetos",
  evento: "Eventos",
  doutrina: "Doutrinas"
};

const categoryColors = {
  pessoa: "bg-blue-100 text-blue-800 border-blue-300",
  lugar: "bg-green-100 text-green-800 border-green-300",
  conceito: "bg-purple-100 text-purple-800 border-purple-300",
  objeto: "bg-orange-100 text-orange-800 border-orange-300",
  evento: "bg-red-100 text-red-800 border-red-300",
  doutrina: "bg-yellow-100 text-yellow-800 border-yellow-300"
};

export default function BiblicalDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BiblicalDefinition[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  // Query para buscar termos por categoria
  const { data: categoryTerms } = useQuery({
    queryKey: ['/api/dictionary/category', selectedCategory],
    queryFn: () => selectedCategory === "todos" ? [] : api.getDictionaryTermsByCategory(selectedCategory),
    enabled: selectedCategory !== "todos"
  });

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await api.searchDictionary(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Erro na busca:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const displayTerms = searchResults.length > 0 ? searchResults : 
                     (selectedCategory !== "todos" ? categoryTerms : []) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header com navegação */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <Book className="text-primary-600 mr-3" size={32} />
              Dicionário Bíblico CPAD
            </h1>
            <p className="text-gray-600">
              Explore significados, definições e contexto bíblico de termos importantes da fé cristã
            </p>
          </div>
          <Link href="/search-declaracao">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Declaração de Fé
            </Button>
          </Link>
        </div>

        {/* Barra de Pesquisa */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Digite um termo para pesquisar (ex: Jesus, Fé, Jerusalém, Salvação...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch} 
                disabled={isSearching || !searchTerm.trim()}
                className="px-6"
              >
                <Search size={16} className="mr-2" />
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs para Categorias */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="pessoa">Pessoas</TabsTrigger>
            <TabsTrigger value="lugar">Lugares</TabsTrigger>
            <TabsTrigger value="conceito">Conceitos</TabsTrigger>
            <TabsTrigger value="objeto">Objetos</TabsTrigger>
            <TabsTrigger value="evento">Eventos</TabsTrigger>
            <TabsTrigger value="doutrina">Doutrinas</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-4">
            {searchResults.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Book className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Use a barra de pesquisa acima
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Digite qualquer termo bíblico para encontrar sua definição e significado
                  </p>
                  <div className="text-sm text-gray-400">
                    <strong>Sugestões:</strong> Jesus, Fé, Salvação, Jerusalém, Batismo, Santificação
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {Object.keys(categoryLabels).map(category => (
            <TabsContent key={category} value={category} className="mt-4">
              {/* Conteúdo será mostrado nos resultados abaixo */}
            </TabsContent>
          ))}
        </Tabs>

        {/* Resultados */}
        {displayTerms.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {searchResults.length > 0 
                ? `Resultados para "${searchTerm}" (${displayTerms.length})` 
                : `${categoryLabels[selectedCategory as keyof typeof categoryLabels]} (${displayTerms.length})`}
            </h2>

            {displayTerms.map((term: BiblicalDefinition, index: number) => {
              const IconComponent = categoryIcons[term.category];
              const categoryColor = categoryColors[term.category];
              
              return (
                <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="text-primary-600" size={24} />
                        <h3 className="text-2xl font-bold text-gray-800">{term.term}</h3>
                      </div>
                      <Badge className={`${categoryColor} border font-medium`}>
                        {categoryLabels[term.category]}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {/* Definição */}
                      <div>
                        <p className="text-gray-700 leading-relaxed text-base">
                          {term.definition}
                        </p>
                      </div>

                      {/* Etimologia */}
                      {term.etymology && (
                        <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                          <h4 className="font-semibold text-blue-800 mb-1">Etimologia:</h4>
                          <p className="text-blue-700 text-sm">{term.etymology}</p>
                        </div>
                      )}

                      {/* Referências Bíblicas */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Referências Bíblicas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {term.biblicalReferences.map((ref: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {ref}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Termos Relacionados */}
                      {term.relatedTerms.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Termos Relacionados:</h4>
                          <div className="flex flex-wrap gap-2">
                            {term.relatedTerms.map((relatedTerm: string, idx: number) => (
                              <Button
                                key={idx}
                                variant="ghost"
                                size="sm"
                                className="text-primary-600 hover:text-primary-800 p-1 h-auto"
                                onClick={() => {
                                  setSearchTerm(relatedTerm);
                                  handleSearch();
                                }}
                              >
                                {relatedTerm}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Estado de busca sem resultados */}
        {searchResults.length === 0 && searchTerm && !isSearching && (
          <Card>
            <CardContent className="p-6 text-center">
              <Search className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-500 mb-4">
                Não encontramos nenhum termo relacionado a "{searchTerm}"
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                }}
              >
                Limpar busca
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}