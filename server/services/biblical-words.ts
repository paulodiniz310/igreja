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
      },
      {
        word: "משיח (Mashiach)",
        language: "hebraico",
        translation: "Ungido, Messias",
        context: "Termo hebraico para o Ungido de Deus prometido"
      }
    ]);

    this.wordDatabase.set("adoração", [
      {
        word: "προσκυνέω (proskyneo)",
        language: "grego",
        translation: "adorar, prostrar-se, reverenciar",
        context: "Adoração devida somente a Deus"
      },
      {
        word: "שחה (shachah)",
        language: "hebraico",
        translation: "prostrar-se, inclinar-se, adorar",
        context: "Ato de adoração e reverência no Antigo Testamento"
      }
    ]);

    this.wordDatabase.set("anjo", [
      {
        word: "ἄγγελος (angelos)",
        language: "grego",
        translation: "mensageiro, anjo",
        context: "Ser celestial enviado por Deus como mensageiro"
      },
      {
        word: "מלאך (malach)",
        language: "hebraico",
        translation: "mensageiro, anjo",
        context: "Ser espiritual criado por Deus para servi-Lo"
      }
    ]);

    this.wordDatabase.set("oração", [
      {
        word: "προσευχή (proseuche)",
        language: "grego",
        translation: "oração, súplica, petição",
        context: "Comunicação com Deus através da oração"
      },
      {
        word: "תפלה (tefilah)",
        language: "hebraico",
        translation: "oração, súplica",
        context: "Ato de orar e buscar a Deus"
      }
    ]);

    this.wordDatabase.set("santificação", [
      {
        word: "ἁγιασμός (hagiasmos)",
        language: "grego",
        translation: "santificação, consagração",
        context: "Processo de separação para Deus e purificação"
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

    // Provide contextual fallback words if no matches found
    if (results.length === 0) {
      const fallbackWords = this.getContextualFallbackWords(searchText);
      results.push(...fallbackWords);
    }

    // Remove duplicates
    const uniqueResults = results.filter((word, index, array) => 
      array.findIndex(w => w.word === word.word) === index
    );

    return uniqueResults.slice(0, 8); // Limit to 8 words
  }

  private getContextualFallbackWords(text: string): BiblicalWord[] {
    const fallbackWords: BiblicalWord[] = [];

    if (text.includes('deus') || text.includes('divindade') || text.includes('senhor')) {
      fallbackWords.push({
        word: "θεός (theos)",
        language: "grego",
        translation: "Deus, divindade",
        context: "Nome geral para Deus no Novo Testamento"
      });
    }

    if (text.includes('amor') || text.includes('amar')) {
      fallbackWords.push({
        word: "ἀγάπη (agape)",
        language: "grego",
        translation: "amor divino, amor sacrificial",
        context: "O amor incondicional de Deus pela humanidade"
      });
    }

    if (text.includes('fé') || text.includes('crer')) {
      fallbackWords.push({
        word: "πίστις (pistis)",
        language: "grego",
        translation: "fé, confiança, crença",
        context: "Confiança e entrega completa a Deus"
      });
    }

    if (text.includes('graça')) {
      fallbackWords.push({
        word: "χάρις (charis)",
        language: "grego",
        translation: "graça, favor imerecido",
        context: "Favor divino não merecido concedido aos pecadores"
      });
    }

    if (text.includes('paz')) {
      fallbackWords.push({
        word: "εἰρήνη (eirene)",
        language: "grego",
        translation: "paz, tranquilidade",
        context: "Paz que vem de Deus"
      });
    }

    if (text.includes('vida')) {
      fallbackWords.push({
        word: "ζωή (zoe)",
        language: "grego",
        translation: "vida, vida eterna",
        context: "Vida espiritual e eterna dada por Deus"
      });
    }

    return fallbackWords;
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
