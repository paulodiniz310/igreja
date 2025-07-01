interface BiblicalDefinition {
  term: string;
  definition: string;
  etymology?: string;
  biblicalReferences: string[];
  category: "pessoa" | "lugar" | "conceito" | "objeto" | "evento" | "doutrina";
  relatedTerms: string[];
}

class BiblicalDictionaryService {
  private dictionary: Map<string, BiblicalDefinition> = new Map();

  constructor() {
    this.initializeDictionary();
  }

  private initializeDictionary() {
    const definitions: BiblicalDefinition[] = [
      // Pessoas importantes
      {
        term: "Jesus",
        definition: "O Filho de Deus, Salvador da humanidade, segunda pessoa da Trindade. Nasceu da virgem Maria, viveu uma vida sem pecado, morreu na cruz pelos pecados da humanidade e ressuscitou ao terceiro dia.",
        etymology: "Do hebraico Yeshua, que significa 'Yahweh salva' ou 'salvação'",
        biblicalReferences: ["João 3:16", "Mateus 1:21", "1 Coríntios 15:3-4", "Filipenses 2:6-11"],
        category: "pessoa",
        relatedTerms: ["Cristo", "Messias", "Salvador", "Cordeiro de Deus", "Verbo"]
      },
      {
        term: "Cristo",
        definition: "Título que significa 'Ungido', equivalente ao hebraico 'Messias'. Refere-se a Jesus como o prometido Messias de Israel e Salvador do mundo.",
        etymology: "Do grego Christos, tradução do hebraico Mashiach (Messias)",
        biblicalReferences: ["Mateus 16:16", "João 1:41", "Atos 2:36", "1 João 2:22"],
        category: "pessoa",
        relatedTerms: ["Jesus", "Messias", "Ungido", "Salvador"]
      },
      {
        term: "Abraão",
        definition: "Patriarca do povo de Israel, chamado por Deus para deixar sua terra e ir para Canaã. Deus fez uma aliança com ele, prometendo fazer dele uma grande nação.",
        etymology: "Significa 'pai de muitos' ou 'pai exaltado'",
        biblicalReferences: ["Gênesis 12:1-3", "Gênesis 15:18", "Romanos 4:16", "Gálatas 3:7"],
        category: "pessoa",
        relatedTerms: ["Isaac", "Isaque", "Aliança", "Promessa", "Fé"]
      },
      {
        term: "Moisés",
        definition: "Grande profeta e legislador de Israel, usado por Deus para tirar o povo do Egito e receber a Lei no monte Sinai.",
        etymology: "Possivelmente significa 'tirado das águas' ou de origem egípcia",
        biblicalReferences: ["Êxodo 3:10", "Êxodo 20:1-17", "Deuteronômio 34:10", "Hebreus 11:24-26"],
        category: "pessoa",
        relatedTerms: ["Lei", "Êxodo", "Sinai", "Tábuas da Lei", "Pastor"]
      },
      {
        term: "Davi",
        definition: "Segundo rei de Israel, homem segundo o coração de Deus, salmista e antepassado de Jesus. Estabeleceu Jerusalém como capital.",
        etymology: "Significa 'amado' ou 'querido'",
        biblicalReferences: ["1 Samuel 16:13", "2 Samuel 7:12-16", "Salmo 23", "Mateus 1:1"],
        category: "pessoa",
        relatedTerms: ["Rei", "Salmista", "Jerusalém", "Aliança Davídica", "Pastor"]
      },

      // Lugares importantes
      {
        term: "Jerusalém",
        definition: "Cidade santa, capital de Israel estabelecida por Davi. Local do Templo de Salomão e centro da adoração judaica. Jesus foi crucificado próximo a esta cidade.",
        etymology: "Possivelmente 'fundação da paz' ou 'habitação da paz'",
        biblicalReferences: ["2 Samuel 5:6-7", "1 Reis 8:29", "Mateus 23:37", "Apocalipse 21:2"],
        category: "lugar",
        relatedTerms: ["Sião", "Cidade de Davi", "Templo", "Monte do Templo"]
      },
      {
        term: "Belém",
        definition: "Cidade natal do rei Davi e local do nascimento de Jesus Cristo, cumprindo a profecia messiânica.",
        etymology: "Significa 'casa do pão' em hebraico",
        biblicalReferences: ["Miquéias 5:2", "Mateus 2:1", "Lucas 2:4-7", "João 7:42"],
        category: "lugar",
        relatedTerms: ["Davi", "Jesus", "Nascimento", "Profecia", "Messias"]
      },
      {
        term: "Calvário",
        definition: "Local onde Jesus foi crucificado, também conhecido como Gólgota. Significa 'lugar da caveira'.",
        etymology: "Do latim calvaria, tradução do aramaico Gólgota",
        biblicalReferences: ["Mateus 27:33", "Marcos 15:22", "Lucas 23:33", "João 19:17"],
        category: "lugar",
        relatedTerms: ["Gólgota", "Crucificação", "Cruz", "Sacrifício"]
      },

      // Conceitos teológicos
      {
        term: "Salvação",
        definition: "Libertação do pecado e suas consequências através da fé em Jesus Cristo. É pela graça, mediante a fé, não por obras.",
        biblicalReferences: ["Efésios 2:8-9", "Romanos 10:9-10", "João 3:16", "Atos 4:12"],
        category: "doutrina",
        relatedTerms: ["Graça", "Fé", "Redenção", "Justificação", "Nova Criatura"]
      },
      {
        term: "Fé",
        definition: "Confiança e crença em Deus e em Sua Palavra. É o meio pelo qual recebemos a salvação e vivemos a vida cristã.",
        biblicalReferences: ["Hebreus 11:1", "Romanos 1:17", "Efésios 2:8", "Hebreus 11:6"],
        category: "conceito",
        relatedTerms: ["Salvação", "Graça", "Confiança", "Crença", "Obediência"]
      },
      {
        term: "Graça",
        definition: "Favor imerecido de Deus. É através da graça que Deus nos oferece salvação, perdão e vida eterna, sem que mereçamos.",
        biblicalReferences: ["Efésios 2:8-9", "Romanos 3:24", "2 Coríntios 12:9", "Tito 2:11"],
        category: "doutrina",
        relatedTerms: ["Salvação", "Misericórdia", "Amor de Deus", "Perdão", "Fé"]
      },
      {
        term: "Santificação",
        definition: "Processo de ser separado para Deus e tornar-se santo. Começa na conversão e continua toda a vida cristã.",
        biblicalReferences: ["1 Tessalonicenses 4:3", "2 Coríntios 7:1", "Hebreus 12:14", "1 Pedro 1:15-16"],
        category: "doutrina",
        relatedTerms: ["Santo", "Consagração", "Purificação", "Crescimento espiritual"]
      },
      {
        term: "Trindade",
        definition: "Doutrina que ensina que Deus existe em três pessoas distintas: Pai, Filho e Espírito Santo, sendo um só Deus em essência.",
        biblicalReferences: ["Mateus 28:19", "2 Coríntios 13:14", "1 João 5:7", "João 14:16-17"],
        category: "doutrina",
        relatedTerms: ["Pai", "Filho", "Espírito Santo", "Unidade", "Divindade"]
      },

      // Objetos e símbolos
      {
        term: "Cruz",
        definition: "Instrumento de execução romano onde Jesus morreu. Tornou-se símbolo central do cristianismo, representando salvação e sacrifício.",
        biblicalReferences: ["1 Coríntios 1:18", "Gálatas 6:14", "Colossenses 2:14", "Hebreus 12:2"],
        category: "objeto",
        relatedTerms: ["Crucificação", "Sacrifício", "Redenção", "Calvário"]
      },
      {
        term: "Arca da Aliança",
        definition: "Caixa sagrada que continha as tábuas da Lei, representando a presença de Deus entre o povo de Israel.",
        biblicalReferences: ["Êxodo 25:10-22", "1 Samuel 4:3-4", "2 Samuel 6:12-15", "Hebreus 9:4"],
        category: "objeto",
        relatedTerms: ["Tabernáculo", "Santo dos Santos", "Presença de Deus", "Aliança"]
      },

      // Eventos importantes
      {
        term: "Êxodo",
        definition: "Saída milagrosa do povo de Israel do Egito sob a liderança de Moisés, demonstrando o poder e fidelidade de Deus.",
        biblicalReferences: ["Êxodo 12:31-42", "Êxodo 14:21-31", "1 Coríntios 10:1-2", "Hebreus 11:29"],
        category: "evento",
        relatedTerms: ["Moisés", "Egito", "Mar Vermelho", "Libertação", "Páscoa"]
      },
      {
        term: "Ressurreição",
        definition: "Evento central do cristianismo onde Jesus Cristo ressuscitou dos mortos ao terceiro dia, vencendo a morte e provando sua divindade.",
        biblicalReferences: ["Mateus 28:1-10", "1 Coríntios 15:3-8", "Romanos 1:4", "1 Pedro 1:3"],
        category: "evento",
        relatedTerms: ["Jesus", "Vitória", "Vida Eterna", "Poder de Deus", "Esperança"]
      },
      {
        term: "Pentecostes",
        definition: "Festa judaica quando o Espírito Santo desceu sobre os discípulos, marcando o nascimento da Igreja cristã.",
        biblicalReferences: ["Atos 2:1-31", "1 Coríntios 12:13", "Efésios 1:13", "Gálatas 3:14"],
        category: "evento",
        relatedTerms: ["Espírito Santo", "Igreja", "Línguas", "Batismo no Espírito Santo"]
      },

      // Conceitos do Antigo Testamento
      {
        term: "Aliança",
        definition: "Acordo ou pacto sagrado entre Deus e Seu povo. Deus estabeleceu alianças com Abraão, Moisés, Davi e a Nova Aliança através de Cristo.",
        biblicalReferences: ["Gênesis 15:18", "Êxodo 19:5", "2 Samuel 7:12-16", "Hebreus 8:6-13"],
        category: "conceito",
        relatedTerms: ["Promessa", "Pacto", "Fidelidade", "Lei", "Nova Aliança"]
      },
      {
        term: "Sacrifício",
        definition: "Oferta feita a Deus para expiação do pecado. No Antigo Testamento eram animais; Cristo é o sacrifício perfeito e final.",
        biblicalReferences: ["Levítico 1:3-4", "Hebreus 9:22", "Hebreus 10:10", "1 Pedro 1:19"],
        category: "conceito",
        relatedTerms: ["Expiação", "Cristo", "Sangue", "Perdão", "Altar"]
      },

      // Termos pentecostais específicos
      {
        term: "Batismo no Espírito Santo",
        definition: "Experiência distinta da conversão onde o crente é revestido de poder do alto, frequentemente acompanhada do dom de línguas.",
        biblicalReferences: ["Atos 1:5", "Atos 2:4", "Atos 8:14-17", "Atos 19:1-6"],
        category: "doutrina",
        relatedTerms: ["Espírito Santo", "Línguas", "Poder", "Pentecostes", "Dons espirituais"]
      },
      {
        term: "Dons Espirituais",
        definition: "Capacidades sobrenaturais concedidas pelo Espírito Santo aos crentes para edificação da Igreja e demonstração do poder de Deus.",
        biblicalReferences: ["1 Coríntios 12:4-11", "Efésios 4:11-12", "Romanos 12:6-8", "1 Pedro 4:10-11"],
        category: "doutrina",
        relatedTerms: ["Espírito Santo", "Igreja", "Ministério", "Línguas", "Profecia"]
      },
      {
        term: "Línguas",
        definition: "Dom espiritual de falar em idiomas desconhecidos pelo poder do Espírito Santo, usado para oração, louvor e edificação.",
        biblicalReferences: ["Atos 2:4", "1 Coríntios 14:2-4", "1 Coríntios 14:14-15", "Marcos 16:17"],
        category: "doutrina",
        relatedTerms: ["Espírito Santo", "Dom", "Oração", "Edificação", "Pentecostes"]
      }
    ];

    // Adicionar todas as definições ao mapa
    definitions.forEach(def => {
      this.dictionary.set(def.term.toLowerCase(), def);
      
      // Adicionar sinônimos e variações
      if (def.term === "Jesus") {
        this.dictionary.set("cristo", def);
        this.dictionary.set("salvador", def);
        this.dictionary.set("senhor", def);
      }
      if (def.term === "Jerusalém") {
        this.dictionary.set("sião", def);
        this.dictionary.set("cidade santa", def);
      }
      if (def.term === "Calvário") {
        this.dictionary.set("gólgota", def);
      }
    });
  }

  async searchTerm(searchTerm: string): Promise<BiblicalDefinition[]> {
    const results: BiblicalDefinition[] = [];
    const normalizedSearch = searchTerm.toLowerCase().trim();

    // Busca exata
    const exactMatch = this.dictionary.get(normalizedSearch);
    if (exactMatch) {
      results.push(exactMatch);
    }

    // Busca parcial no termo
    for (const [key, definition] of Array.from(this.dictionary.entries())) {
      if (key.includes(normalizedSearch) && key !== normalizedSearch) {
        results.push(definition);
      }
    }

    // Busca na definição
    for (const [key, definition] of Array.from(this.dictionary.entries())) {
      if (definition.definition.toLowerCase().includes(normalizedSearch) && 
          !results.some(r => r.term === definition.term)) {
        results.push(definition);
      }
    }

    // Busca nos termos relacionados
    for (const [key, definition] of Array.from(this.dictionary.entries())) {
      if (definition.relatedTerms.some((term: string) => 
          term.toLowerCase().includes(normalizedSearch)) && 
          !results.some(r => r.term === definition.term)) {
        results.push(definition);
      }
    }

    // Limitar resultados e ordenar por relevância
    return results.slice(0, 10).sort((a, b) => {
      // Priorizar correspondência exata no termo
      if (a.term.toLowerCase() === normalizedSearch) return -1;
      if (b.term.toLowerCase() === normalizedSearch) return 1;
      
      // Priorizar correspondência que começa com o termo
      const aStarts = a.term.toLowerCase().startsWith(normalizedSearch);
      const bStarts = b.term.toLowerCase().startsWith(normalizedSearch);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      // Ordenar alfabeticamente
      return a.term.localeCompare(b.term);
    });
  }

  async getAllTerms(): Promise<string[]> {
    return Array.from(new Set(Array.from(this.dictionary.values()).map(def => def.term))).sort();
  }

  async getTermsByCategory(category: string): Promise<BiblicalDefinition[]> {
    return Array.from(this.dictionary.values())
      .filter(def => def.category === category)
      .sort((a, b) => a.term.localeCompare(b.term));
  }
}

export const biblicalDictionaryService = new BiblicalDictionaryService();