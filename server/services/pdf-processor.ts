interface BookReference {
  bookTitle: string;
  page: number;
  line: number;
  quote: string;
  chapter?: string;
}

class PdfProcessor {
  private declaracaoContent: Map<string, Array<{ page: number; line: number; text: string; chapter?: string }>> = new Map();
  private historiaContent: Map<string, Array<{ page: number; line: number; text: string; chapter?: string }>> = new Map();

  constructor() {
    this.initializeContent();
  }

  private initializeContent() {
    // Index key content from Declaração de Fé
    this.declaracaoContent.set("salvação", [
      {
        page: 63,
        line: 117,
        text: "A salvação é para todas as pessoas. A natureza da salvação compreende regeneração, santificação e glorificação.",
        chapter: "Capítulo X - Sobre a Salvação"
      },
      {
        page: 63,
        line: 118,
        text: "A graça de Deus é o favor imerecido de Deus para com o homem pecador.",
        chapter: "Capítulo X - Sobre a Salvação"
      }
    ]);

    this.declaracaoContent.set("batismo", [
      {
        page: 72,
        line: 135,
        text: "O batismo em águas é ordenança do Senhor Jesus para todos os que creem.",
        chapter: "Capítulo XII - Sobre o Batismo em Águas"
      }
    ]);

    this.declaracaoContent.set("espírito santo", [
      {
        page: 91,
        line: 190,
        text: "O batismo no Espírito Santo é distinto da salvação e está disponível para todos os crentes.",
        chapter: "Capítulo XIX - Sobre o Batismo no Espírito Santo"
      }
    ]);

    this.declaracaoContent.set("trindade", [
      {
        page: 23,
        line: 48,
        text: "A unidade na Trindade consiste em que há um só Deus subsistindo em três Pessoas: Pai, Filho e Espírito Santo.",
        chapter: "Capítulo III - Sobre a Trindade"
      }
    ]);

    this.declaracaoContent.set("jesus cristo", [
      {
        page: 28,
        line: 57,
        text: "Jesus Cristo é verdadeiro Deus e verdadeiro homem, duas naturezas em uma só pessoa.",
        chapter: "Capítulo IV - Sobre a Identidade do Senhor Jesus Cristo"
      }
    ]);

    // Index key content from História do Cristianismo
    this.historiaContent.set("igreja primitiva", [
      {
        page: 45,
        line: 133,
        text: "A história da Igreja de Deus tem sido sempre, desde a era apostólica até o presente, a história da graça divina no meio dos erros dos homens.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("perseguição", [
      {
        page: 46,
        line: 156,
        text: "Esta perseguição, instigada pelo imperador romano Nero, foi a primeira das dez perseguições gerais que continuaram, quase sem interrupção, durante três séculos.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);
  }

  async searchRelevantContent(question: string): Promise<BookReference[]> {
    const results: BookReference[] = [];
    const searchTerms = this.extractSearchTerms(question.toLowerCase());

    // Search in Declaração de Fé
    for (const term of searchTerms) {
      const matches = this.declaracaoContent.get(term);
      if (matches) {
        for (const match of matches) {
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

    // Search in História do Cristianismo
    for (const term of searchTerms) {
      const matches = this.historiaContent.get(term);
      if (matches) {
        for (const match of matches) {
          results.push({
            bookTitle: "História do Cristianismo",
            page: match.page,
            line: match.line,
            quote: match.text,
            chapter: match.chapter
          });
        }
      }
    }

    // Fuzzy search for partial matches
    const partialMatches = this.fuzzySearch(question.toLowerCase());
    results.push(...partialMatches);

    return results.slice(0, 5); // Limit to 5 most relevant results
  }

  private extractSearchTerms(question: string): string[] {
    const keyTerms = [
      "salvação", "batismo", "espírito santo", "trindade", "jesus cristo",
      "igreja", "fé", "graça", "pecado", "oração", "jejum", "dons",
      "frutos", "cura", "segunda vinda", "arrebatamento", "dízimo",
      "pastor", "evangelista", "diácono", "presbítero"
    ];

    return keyTerms.filter(term => question.includes(term));
  }

  private fuzzySearch(question: string): BookReference[] {
    const results: BookReference[] = [];

    // Check for salvation-related terms
    if (question.includes("salv") || question.includes("redençã") || question.includes("perdã")) {
      results.push({
        bookTitle: "Declaração de Fé das Assembleias de Deus",
        page: 63,
        line: 119,
        quote: "O destino dos salvos é a vida eterna na presença de Deus.",
        chapter: "Capítulo X - Sobre a Salvação"
      });
    }

    // Check for baptism-related terms
    if (question.includes("batiz") || question.includes("água")) {
      results.push({
        bookTitle: "Declaração de Fé das Assembleias de Deus",
        page: 72,
        line: 137,
        quote: "Batismo não é sinônimo de regeneração, mas um ato de obediência.",
        chapter: "Capítulo XII - Sobre o Batismo em Águas"
      });
    }

    return results;
  }
}

export const pdfProcessor = new PdfProcessor();
