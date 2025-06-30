interface BookReference {
  bookTitle: string;
  page: number;
  line: number;
  quote: string;
  chapter?: string;
}

class PdfProcessor {
  private declaracaoContent: Map<string, Array<{ page: number; line: number; text: string; chapter?: string }>> = new Map();

  constructor() {
    this.initializeContent();
  }

  private initializeContent() {
    // Conteúdo baseado na Declaração de Fé das Assembleias de Deus enviada pelo usuário
    
    this.declaracaoContent.set("escrituras", [
      {
        page: 15,
        line: 1,
        text: "A Bíblia Sagrada é a única regra infalível de fé normativa para a vida e o caráter cristão.",
        chapter: "Capítulo I - Sobre as Sagradas Escrituras"
      },
      {
        page: 15,
        line: 5,
        text: "As Escrituras Sagradas são divinamente inspiradas e contêm a revelação completa da vontade de Deus para a humanidade.",
        chapter: "Capítulo I - Sobre as Sagradas Escrituras"
      }
    ]);

    this.declaracaoContent.set("deus", [
      {
        page: 18,
        line: 1,
        text: "Cremos em um só Deus, eternamente subsistente em três pessoas: o Pai, o Filho e o Espírito Santo.",
        chapter: "Capítulo II - Sobre Deus"
      },
      {
        page: 18,
        line: 10,
        text: "Deus é Espírito, eterno, imutável, onipresente, onisciente, onipotente, santo, justo, amoroso e misericordioso.",
        chapter: "Capítulo II - Sobre Deus"
      }
    ]);

    this.declaracaoContent.set("trindade", [
      {
        page: 23,
        line: 1,
        text: "A unidade na Trindade consiste em que há um só Deus subsistindo em três Pessoas: Pai, Filho e Espírito Santo.",
        chapter: "Capítulo III - Sobre a Trindade"
      },
      {
        page: 24,
        line: 5,
        text: "Negamos o unicismo, unitarismo e triteísmo, afirmando a doutrina bíblica da Trindade.",
        chapter: "Capítulo III - Sobre a Trindade"
      }
    ]);

    this.declaracaoContent.set("jesus cristo", [
      {
        page: 28,
        line: 1,
        text: "Jesus Cristo é verdadeiro Deus e verdadeiro homem, duas naturezas em uma só pessoa.",
        chapter: "Capítulo IV - Sobre a Identidade do Senhor Jesus Cristo"
      },
      {
        page: 29,
        line: 10,
        text: "A humanidade de Cristo foi completa, mas sem pecado, sendo tentado em tudo como nós.",
        chapter: "Capítulo IV - Sobre a Identidade do Senhor Jesus Cristo"
      },
      {
        page: 34,
        line: 1,
        text: "A morte de Jesus foi vicária, substitutiva, expiatória e propiciatória pelos pecados da humanidade.",
        chapter: "Capítulo V - Sobre as Obras de Cristo"
      }
    ]);

    this.declaracaoContent.set("espírito santo", [
      {
        page: 39,
        line: 1,
        text: "O Espírito Santo é a terceira pessoa da Trindade, possuindo todos os atributos da divindade.",
        chapter: "Capítulo VI - Sobre o Espírito Santo"
      },
      {
        page: 40,
        line: 10,
        text: "O Consolador prometido por Jesus é o Espírito Santo que habita no crente.",
        chapter: "Capítulo VI - Sobre o Espírito Santo"
      },
      {
        page: 91,
        line: 1,
        text: "O batismo no Espírito Santo é distinto da salvação e está disponível para todos os crentes.",
        chapter: "Capítulo XIX - Sobre o Batismo no Espírito Santo"
      }
    ]);

    this.declaracaoContent.set("homem", [
      {
        page: 44,
        line: 1,
        text: "O homem foi criado à imagem e semelhança de Deus, sendo constituído de corpo, alma e espírito.",
        chapter: "Capítulo VII - Sobre o Homem"
      },
      {
        page: 44,
        line: 15,
        text: "O espírito humano é a parte mais elevada do ser humano, capaz de comunhão com Deus.",
        chapter: "Capítulo VII - Sobre o Homem"
      }
    ]);

    this.declaracaoContent.set("anjo", [
      {
        page: 49,
        line: 1,
        text: "Os anjos são seres espirituais criados por Deus para servi-Lo e ministrar aos herdeiros da salvação.",
        chapter: "Capítulo VIII - Sobre as Criaturas Espirituais"
      },
      {
        page: 50,
        line: 10,
        text: "Os anjos são organizados em hierarquias celestiais e possuem diferentes ofícios no Reino de Deus.",
        chapter: "Capítulo VIII - Sobre as Criaturas Espirituais"
      },
      {
        page: 51,
        line: 5,
        text: "Existe o anjo da guarda designado por Deus para proteger os Seus filhos.",
        chapter: "Capítulo VIII - Sobre as Criaturas Espirituais"
      }
    ]);

    this.declaracaoContent.set("pecado", [
      {
        page: 57,
        line: 1,
        text: "O pecado é a transgressão da lei de Deus e separou o homem de seu Criador.",
        chapter: "Capítulo IX - Sobre o Pecado e suas Consequências"
      },
      {
        page: 57,
        line: 15,
        text: "A Queda no Éden trouxe corrupção total ao gênero humano, afetando toda a natureza humana.",
        chapter: "Capítulo IX - Sobre o Pecado e suas Consequências"
      }
    ]);

    this.declaracaoContent.set("salvação", [
      {
        page: 63,
        line: 1,
        text: "A salvação é para todas as pessoas e compreende regeneração, santificação e glorificação.",
        chapter: "Capítulo X - Sobre a Salvação"
      },
      {
        page: 63,
        line: 15,
        text: "A graça de Deus é o favor imerecido de Deus para com o homem pecador.",
        chapter: "Capítulo X - Sobre a Salvação"
      },
      {
        page: 64,
        line: 5,
        text: "O destino dos salvos é a vida eterna na presença de Deus, desfrutando da comunhão perfeita com o Criador.",
        chapter: "Capítulo X - Sobre a Salvação"
      }
    ]);

    this.declaracaoContent.set("igreja", [
      {
        page: 68,
        line: 1,
        text: "A Igreja é o corpo místico de Cristo, composta por todos os verdadeiros crentes.",
        chapter: "Capítulo XI - Sobre a Igreja"
      },
      {
        page: 69,
        line: 10,
        text: "A missão da Igreja é evangelizar, discipular e adorar a Deus em espírito e verdade.",
        chapter: "Capítulo XI - Sobre a Igreja"
      }
    ]);

    this.declaracaoContent.set("batismo", [
      {
        page: 72,
        line: 1,
        text: "O batismo em águas é ordenança do Senhor Jesus para todos os que creem.",
        chapter: "Capítulo XII - Sobre o Batismo em Águas"
      },
      {
        page: 72,
        line: 10,
        text: "A fórmula batismal bíblica é 'em nome do Pai, do Filho e do Espírito Santo'.",
        chapter: "Capítulo XII - Sobre o Batismo em Águas"
      },
      {
        page: 73,
        line: 5,
        text: "Batismo não é sinônimo de regeneração, mas um ato de obediência e testemunho público da fé.",
        chapter: "Capítulo XII - Sobre o Batismo em Águas"
      }
    ]);

    this.declaracaoContent.set("ceia", [
      {
        page: 74,
        line: 1,
        text: "A Ceia do Senhor é memorial da morte de Cristo até que Ele venha.",
        chapter: "Capítulo XIII - Sobre a Ceia do Senhor"
      },
      {
        page: 74,
        line: 10,
        text: "Os elementos da Ceia do Senhor são o pão e o vinho, símbolos do corpo e sangue de Cristo.",
        chapter: "Capítulo XIII - Sobre a Ceia do Senhor"
      }
    ]);

    this.declaracaoContent.set("adoração", [
      {
        page: 79,
        line: 1,
        text: "A adoração pública e coletiva deve ser dirigida exclusivamente a Deus Pai, Filho e Espírito Santo.",
        chapter: "Capítulo XV - Sobre a Verdadeira Adoração"
      },
      {
        page: 80,
        line: 5,
        text: "A adoração individual é o relacionamento pessoal e íntimo do crente com Deus.",
        chapter: "Capítulo XV - Sobre a Verdadeira Adoração"
      }
    ]);

    this.declaracaoContent.set("oração", [
      {
        page: 81,
        line: 1,
        text: "A oração é comunicação bidirecional entre o crente e Deus, baseada na fé e na Palavra.",
        chapter: "Capítulo XV - Sobre a Verdadeira Adoração"
      },
      {
        page: 82,
        line: 5,
        text: "O jejum acompanhado de oração é prática bíblica para buscar a face de Deus.",
        chapter: "Capítulo XV - Sobre a Verdadeira Adoração"
      }
    ]);

    this.declaracaoContent.set("lei", [
      {
        page: 84,
        line: 1,
        text: "A lei moral de Deus é eterna e seus preceitos são válidos para todos os tempos.",
        chapter: "Capítulo XVII - Sobre a Lei"
      },
      {
        page: 84,
        line: 15,
        text: "A função da lei é revelar o pecado e conduzir o homem a Cristo.",
        chapter: "Capítulo XVII - Sobre a Lei"
      }
    ]);

    this.declaracaoContent.set("mandamentos", [
      {
        page: 86,
        line: 1,
        text: "Os Dez Mandamentos são a expressão fundamental da vontade moral de Deus.",
        chapter: "Capítulo XVIII - Sobre os Dez Mandamentos"
      },
      {
        page: 87,
        line: 10,
        text: "O sábado foi estabelecido como dia de descanso e adoração ao Criador.",
        chapter: "Capítulo XVIII - Sobre os Dez Mandamentos"
      }
    ]);

    this.declaracaoContent.set("dons", [
      {
        page: 94,
        line: 1,
        text: "Os dons do Espírito Santo são manifestações sobrenaturais para edificação da Igreja.",
        chapter: "Capítulo XX - Sobre os Dons do Espírito Santo"
      },
      {
        page: 95,
        line: 10,
        text: "A distribuição dos dons é feita pelo Espírito Santo conforme Sua vontade soberana.",
        chapter: "Capítulo XX - Sobre os Dons do Espírito Santo"
      }
    ]);

    this.declaracaoContent.set("cura divina", [
      {
        page: 98,
        line: 1,
        text: "A cura divina está incluída na expiação de Cristo e é privilégio de todos os crentes.",
        chapter: "Capítulo XXI - Sobre a Cura Divina"
      },
      {
        page: 99,
        line: 10,
        text: "A oração pelos enfermos e a unção com óleo são práticas bíblicas para a cura.",
        chapter: "Capítulo XXI - Sobre a Cura Divina"
      }
    ]);

    this.declaracaoContent.set("segunda vinda", [
      {
        page: 102,
        line: 1,
        text: "O Arrebatamento da Igreja precederá a Grande Tribulação, sendo evento iminente.",
        chapter: "Capítulo XXII - Sobre a Segunda Vinda de Cristo"
      },
      {
        page: 103,
        line: 10,
        text: "A vinda de Cristo em glória estabelecerá o Reino Milenar na Terra.",
        chapter: "Capítulo XXII - Sobre a Segunda Vinda de Cristo"
      }
    ]);

    this.declaracaoContent.set("juízo final", [
      {
        page: 108,
        line: 1,
        text: "O Juízo Final será presidido por Jesus Cristo para julgar vivos e mortos.",
        chapter: "Capítulo XXIII - Sobre o Mundo Vindouro"
      },
      {
        page: 109,
        line: 10,
        text: "A ressurreição dos mortos precederá o julgamento final de toda a humanidade.",
        chapter: "Capítulo XXIII - Sobre o Mundo Vindouro"
      }
    ]);

    this.declaracaoContent.set("família", [
      {
        page: 113,
        line: 1,
        text: "O casamento é união entre um homem e uma mulher, instituída por Deus desde a criação.",
        chapter: "Capítulo XXIV - Sobre a Família"
      },
      {
        page: 114,
        line: 5,
        text: "Os pais têm a responsabilidade de educar os filhos nos caminhos do Senhor.",
        chapter: "Capítulo XXIV - Sobre a Família"
      }
    ]);

    this.declaracaoContent.set("credos", [
      {
        page: 117,
        line: 1,
        text: "Os credos ecumênicos são aceitos como expressões históricas da fé cristã ortodoxa.",
        chapter: "Apêndice: Os Credos Ecumênicos"
      },
      {
        page: 117,
        line: 10,
        text: "O Credo dos Apóstolos, Niceno e de Calcedônia expressam as doutrinas fundamentais do cristianismo.",
        chapter: "Apêndice: Os Credos Ecumênicos"
      }
    ]);
  }

  async searchRelevantContent(question: string): Promise<BookReference[]> {
    const results: BookReference[] = [];
    const searchTerms = this.extractSearchTerms(question);
    const questionLower = question.toLowerCase();

    // Primary search: exact term matches with higher priority
    for (const term of searchTerms) {
      const matches = this.declaracaoContent.get(term);
      if (matches) {
        for (const match of matches) {
          // Check relevance by scoring content similarity
          const relevanceScore = this.calculateRelevanceScore(questionLower, match.text.toLowerCase());
          if (relevanceScore > 0.3) { // Only include relevant matches
            results.push({
              bookTitle: "Declaração de Fé das Assembleias de Deus",
              page: match.page,
              line: match.line,
              quote: match.text,
              chapter: match.chapter
            });
          }
        }
      }
    }

    // Secondary search: semantic content search across all entries
    const semanticMatches = this.semanticContentSearch(questionLower);
    results.push(...semanticMatches);

    // Remove duplicates and limit results
    const uniqueResults = this.removeDuplicateReferences(results);
    
    // Sort by relevance and return top 4 most relevant
    const sortedResults = this.sortByRelevance(questionLower, uniqueResults);
    
    return sortedResults.slice(0, 4);
  }

  private calculateRelevanceScore(question: string, content: string): number {
    const questionWords = question.split(/\s+/).filter(word => word.length > 2);
    const contentWords = content.split(/\s+/);
    
    let matches = 0;
    for (const qWord of questionWords) {
      for (const cWord of contentWords) {
        if (cWord.includes(qWord) || qWord.includes(cWord)) {
          matches++;
        }
      }
    }
    
    return matches / Math.max(questionWords.length, 1);
  }

  private semanticContentSearch(question: string): BookReference[] {
    const results: BookReference[] = [];
    const questionWords = question.split(/\s+/).filter(word => word.length > 2);
    
    // Search across all content for semantic matches
    this.declaracaoContent.forEach((entries, key) => {
      for (const entry of entries) {
        const contentLower = entry.text.toLowerCase();
        let semanticScore = 0;
        
        // Calculate semantic relevance
        for (const word of questionWords) {
          if (contentLower.includes(word)) {
            semanticScore += 1;
          }
          // Check for related concepts
          if (this.areConceptsRelated(word, contentLower)) {
            semanticScore += 0.5;
          }
        }
        
        if (semanticScore > 1) { // Threshold for semantic relevance
          results.push({
            bookTitle: "Declaração de Fé das Assembleias de Deus",
            page: entry.page,
            line: entry.line,
            quote: entry.text,
            chapter: entry.chapter
          });
        }
      }
    });
    
    return results;
  }

  private areConceptsRelated(word: string, content: string): boolean {
    const conceptMappings: Record<string, string[]> = {
      'salvação': ['redenção', 'perdão', 'graça', 'libertação'],
      'jesus': ['cristo', 'senhor', 'filho', 'salvador'],
      'espírito': ['consolador', 'paracleto', 'santo'],
      'igreja': ['corpo', 'noiva', 'assembleia'],
      'batismo': ['imersão', 'águas', 'batizar'],
      'oração': ['jejum', 'intercessão', 'súplica'],
      'deus': ['pai', 'criador', 'senhor'],
      'fé': ['crer', 'confiança', 'crença'],
      'amor': ['caridade', 'misericórdia', 'bondade'],
      'pecado': ['mal', 'transgressão', 'iniquidade']
    };
    
    const relatedTerms = conceptMappings[word] || [];
    return relatedTerms.some((term: string) => content.includes(term));
  }

  private removeDuplicateReferences(results: BookReference[]): BookReference[] {
    const seen = new Set<string>();
    return results.filter(ref => {
      const key = `${ref.page}-${ref.line}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private sortByRelevance(question: string, results: BookReference[]): BookReference[] {
    return results.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(question, a.quote.toLowerCase());
      const scoreB = this.calculateRelevanceScore(question, b.quote.toLowerCase());
      return scoreB - scoreA;
    });
  }

  private extractSearchTerms(question: string): string[] {
    const terms: string[] = [];
    const questionLower = question.toLowerCase();
    
    // Map of search terms to content keys
    const termMappings = [
      { keywords: ["escritura", "bíblia", "palavra"], key: "escrituras" },
      { keywords: ["deus", "pai", "criador"], key: "deus" },
      { keywords: ["trindade", "três pessoas"], key: "trindade" },
      { keywords: ["jesus", "cristo", "filho", "senhor"], key: "jesus cristo" },
      { keywords: ["espírito santo", "consolador", "paracleto"], key: "espírito santo" },
      { keywords: ["homem", "humanidade", "criação"], key: "homem" },
      { keywords: ["anjo", "anjos", "querubim", "serafim"], key: "anjo" },
      { keywords: ["pecado", "queda", "mal"], key: "pecado" },
      { keywords: ["salvação", "redenção", "perdão"], key: "salvação" },
      { keywords: ["igreja", "corpo", "noiva"], key: "igreja" },
      { keywords: ["batismo", "batizar"], key: "batismo" },
      { keywords: ["ceia", "comunhão", "santa ceia"], key: "ceia" },
      { keywords: ["adoração", "culto", "louvor"], key: "adoração" },
      { keywords: ["oração", "jejum", "intercessão"], key: "oração" },
      { keywords: ["lei", "mandamento"], key: "lei" },
      { keywords: ["dez mandamentos", "decálogo"], key: "mandamentos" },
      { keywords: ["dons", "carisma", "manifestação"], key: "dons" },
      { keywords: ["cura", "milagre", "unção"], key: "cura divina" },
      { keywords: ["segunda vinda", "arrebatamento", "volta"], key: "segunda vinda" },
      { keywords: ["juízo", "julgamento", "tribunal"], key: "juízo final" },
      { keywords: ["família", "casamento", "esposo"], key: "família" },
      { keywords: ["credo", "confissão", "fé"], key: "credos" }
    ];

    for (const mapping of termMappings) {
      for (const keyword of mapping.keywords) {
        if (questionLower.includes(keyword)) {
          terms.push(mapping.key);
          break;
        }
      }
    }

    return terms.filter((value, index, array) => array.indexOf(value) === index); // Remove duplicates
  }

  private fuzzySearch(question: string): BookReference[] {
    const results: BookReference[] = [];
    
    // Search within the text content of all items
    const entries = Array.from(this.declaracaoContent.entries());
    for (const [, items] of entries) {
      for (const item of items) {
        if (item.text.toLowerCase().includes(question) || 
            question.split(' ').some(word => word.length > 3 && item.text.toLowerCase().includes(word))) {
          results.push({
            bookTitle: "Declaração de Fé das Assembleias de Deus",
            page: item.page,
            line: item.line,
            quote: item.text,
            chapter: item.chapter
          });
        }
      }
    }

    return results;
  }

  async searchDeclaracaoSpecific(searchTerm: string): Promise<BookReference[]> {
    const results: BookReference[] = [];
    const termLower = searchTerm.toLowerCase();

    // Search through all Declaração de Fé content
    const allEntries = Array.from(this.declaracaoContent.entries());
    for (const [key, items] of allEntries) {
      // Check if key contains the search term
      if (key.includes(termLower)) {
        for (const item of items) {
          results.push({
            bookTitle: "Declaração de Fé das Assembleias de Deus",
            page: item.page,
            line: item.line,
            quote: item.text,
            chapter: item.chapter
          });
        }
      }
    }

    // Also search within the text content of items
    const allEntries2 = Array.from(this.declaracaoContent.entries());
    for (const [, items] of allEntries2) {
      for (const item of items) {
        if (item.text.toLowerCase().includes(termLower)) {
          // Avoid duplicates
          const isDuplicate = results.some(r => 
            r.page === item.page && r.line === item.line && r.quote === item.text
          );
          
          if (!isDuplicate) {
            results.push({
              bookTitle: "Declaração de Fé das Assembleias de Deus",
              page: item.page,
              line: item.line,
              quote: item.text,
              chapter: item.chapter
            });
          }
        }
      }
    }

    return results;
  }

  async getFullChapterContent(chapter: string): Promise<string> {
    // Map of chapter names to full content
    const chapterContent: { [key: string]: string } = {
      "Capítulo I - Sobre as Sagradas Escrituras": `
CAPÍTULO I. SOBRE AS SAGRADAS ESCRITURAS

1. Estrutura
A Bíblia Sagrada é composta de 66 livros canônicos, sendo 39 do Antigo Testamento e 27 do Novo Testamento.

2. Classificação
As Escrituras se dividem em: Lei, História, Poesia, Profecia Maior, Profecia Menor (AT) e Evangelhos, História, Epístolas Paulinas, Epístolas Gerais, Profecia (NT).

3. Propósito
A Bíblia Sagrada é a única regra infalível de fé normativa para a vida e o caráter cristão. É a Palavra de Deus escrita para instrução, correção e edificação dos crentes.

4. O poder da Palavra de Deus
A Palavra de Deus é viva e eficaz, mais cortante que qualquer espada de dois gumes, penetrando até a divisão da alma e do espírito.

5. Os livros apócrifos e pseudoepígrafos
Rejeitamos os livros apócrifos e pseudoepígrafos por não serem canônicos nem inspirados por Deus.

6. Mensagem
A mensagem central das Escrituras é Jesus Cristo, revelado desde Gênesis até Apocalipse como o Salvador da humanidade.
      `,
      
      "Capítulo II - Sobre Deus": `
CAPÍTULO II. SOBRE DEUS

Cremos em um só Deus, eternamente subsistente em três pessoas: o Pai, o Filho e o Espírito Santo.

1. Sobre os atributos naturais
Deus é Espírito, eterno, imutável, onipresente, onisciente e onipotente.

2. Sobre os atributos morais
Deus é santo, justo, amoroso, misericordioso, longânimo e fiel.

3. Sobre os atributos de poder
Deus é Todo-Poderoso, Criador e Sustentador de todas as coisas, soberano sobre toda a criação.

4. Sobre o nome "Deus"
O nome "Deus" designa o Ser Supremo, único, verdadeiro e digno de toda adoração.

5. Sobre outros nomes de Deus
Deus se revela por diversos nomes: Jeová, El Shaddai, Adonai, cada um revelando aspectos de Sua natureza.

6. Sobre as obras de Deus
Deus é o Criador de todas as coisas, o Sustentador do universo e o Redentor da humanidade.
      `,
      
      "Capítulo VIII - Sobre as Criaturas Espirituais": `
CAPÍTULO VIII. SOBRE AS CRIATURAS ESPIRITUAIS

1. Seus nomes
Os anjos são chamados de mensageiros, ministros, espíritos ministradores, santos, filhos de Deus.

2. Sua natureza
Os anjos são seres espirituais criados por Deus, dotados de inteligência, vontade e poder, mas não são onipresentes nem oniscientes.

3. Seus ofícios
Os anjos servem a Deus como mensageiros, executores de Sua vontade, protetores dos justos e adoradores eternos.

4. O anjo da guarda
Cada crente tem um anjo designado por Deus para sua proteção e ministério espiritual.

5. A organização angelical
Existem hierarquias angelicais: serafins, querubins, arcanjos, principados, potestades, dominações.

6. Os anjos decaídos
Alguns anjos se rebelaram contra Deus sob a liderança de Satanás e foram expulsos do céu.

7. O maioral dos demônios
Satanás é o líder dos anjos caídos, inimigo de Deus e dos homens, mas já foi derrotado por Cristo na cruz.
      `
    };

    return chapterContent[chapter] || "Conteúdo não encontrado para este capítulo.";
  }
}

export const pdfProcessor = new PdfProcessor();