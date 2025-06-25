interface BiblicalWord {
  word: string;
  language: "grego" | "hebraico" | "aramaico";
  translation: string;
  context: string;
}

class BiblicalWordsService {
  private wordDatabase: Map<string, BiblicalWord[]> = new Map();

  constructor() {
    this.initializeWordDatabase();
  }

  private initializeWordDatabase() {
    // Greek words
    this.wordDatabase.set("graça", [
      {
        word: "χάρις (charis)",
        language: "grego",
        translation: "graça, favor, benevolência divina, dom gracioso",
        context: "Usado em Efésios 2:8 para descrever o favor imerecido de Deus"
      }
    ]);

    this.wordDatabase.set("salvação", [
      {
        word: "σωτηρία (soteria)",
        language: "grego",
        translation: "salvação, libertação, preservação, segurança",
        context: "Conceito central da doutrina cristã, libertação do pecado"
      }
    ]);

    this.wordDatabase.set("fé", [
      {
        word: "πίστις (pistis)",
        language: "grego",
        translation: "fé, confiança, crença, fidelidade",
        context: "Confiança e dependência completa em Deus e Sua palavra"
      }
    ]);

    this.wordDatabase.set("espírito", [
      {
        word: "πνεῦμα (pneuma)",
        language: "grego",
        translation: "espírito, vento, sopro, alma",
        context: "Usado para o Espírito Santo e espírito humano"
      },
      {
        word: "רוח (ruach)",
        language: "hebraico",
        translation: "espírito, vento, sopro, fôlego",
        context: "Termo do Antigo Testamento para espírito e vento de Deus"
      }
    ]);

    this.wordDatabase.set("amor", [
      {
        word: "ἀγάπη (agape)",
        language: "grego",
        translation: "amor divino, amor incondicional",
        context: "O amor de Deus pelos homens e o amor cristão ao próximo"
      }
    ]);

    this.wordDatabase.set("paz", [
      {
        word: "εἰρήνη (eirene)",
        language: "grego",
        translation: "paz, tranquilidade, harmonia",
        context: "Paz de Deus que excede todo entendimento"
      },
      {
        word: "שלום (shalom)",
        language: "hebraico",
        translation: "paz, integridade, bem-estar completo",
        context: "Conceito hebraico de paz total e prosperidade"
      }
    ]);

    this.wordDatabase.set("batismo", [
      {
        word: "βάπτισμα (baptisma)",
        language: "grego",
        translation: "batismo, imersão, mergulho",
        context: "Ordenança cristã de imersão nas águas"
      }
    ]);

    this.wordDatabase.set("igreja", [
      {
        word: "ἐκκλησία (ekklesia)",
        language: "grego",
        translation: "igreja, assembleia, congregação dos chamados",
        context: "Comunidade dos fiéis chamados para fora do mundo"
      }
    ]);

    this.wordDatabase.set("jesus", [
      {
        word: "Ἰησοῦς (Iesous)",
        language: "grego",
        translation: "Jesus, Javé salva, o Salvador",
        context: "Nome grego derivado do hebraico Yeshua"
      },
      {
        word: "ישוע (Yeshua)",
        language: "hebraico",
        translation: "Javé é salvação, Salvador",
        context: "Nome original de Jesus em hebraico"
      }
    ]);

    this.wordDatabase.set("cristo", [
      {
        word: "Χριστός (Christos)",
        language: "grego",
        translation: "Cristo, o Ungido, Messias",
        context: "Título que indica Jesus como o Messias prometido"
      }
    ]);
  }

  async findOriginalWords(text: string): Promise<BiblicalWord[]> {
    const results: BiblicalWord[] = [];
    const searchText = text.toLowerCase();

    // Search for exact matches
    for (const [key, words] of this.wordDatabase.entries()) {
      if (searchText.includes(key)) {
        results.push(...words);
      }
    }

    // Search for partial matches and related terms
    const relatedTerms = this.findRelatedTerms(searchText);
    for (const term of relatedTerms) {
      const words = this.wordDatabase.get(term);
      if (words) {
        results.push(...words);
      }
    }

    // Remove duplicates
    const uniqueResults = results.filter((word, index, array) => 
      array.findIndex(w => w.word === word.word) === index
    );

    return uniqueResults.slice(0, 8); // Limit to 8 words
  }

  private findRelatedTerms(text: string): string[] {
    const relatedTerms: string[] = [];

    // Salvation-related terms
    if (text.includes("salv") || text.includes("redençã") || text.includes("perdã")) {
      relatedTerms.push("salvação", "graça", "fé");
    }

    // Spirit-related terms
    if (text.includes("espírit") || text.includes("pneuma") || text.includes("vento")) {
      relatedTerms.push("espírito");
    }

    // Love-related terms
    if (text.includes("amor") || text.includes("caridad")) {
      relatedTerms.push("amor");
    }

    // Jesus-related terms
    if (text.includes("jesus") || text.includes("cristo") || text.includes("messias")) {
      relatedTerms.push("jesus", "cristo");
    }

    // Baptism-related terms
    if (text.includes("batiz") || text.includes("imers")) {
      relatedTerms.push("batismo");
    }

    // Church-related terms
    if (text.includes("igreja") || text.includes("congregaç")) {
      relatedTerms.push("igreja");
    }

    return relatedTerms;
  }
}

export const biblicalWordsService = new BiblicalWordsService();
