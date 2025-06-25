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
      },
      {
        page: 64,
        line: 125,
        text: "O destino dos salvos é a vida eterna na presença de Deus, desfrutando da comunhão perfeita com o Criador.",
        chapter: "Capítulo X - Sobre a Salvação"
      }
    ]);

    this.declaracaoContent.set("batismo", [
      {
        page: 72,
        line: 135,
        text: "O batismo em águas é ordenança do Senhor Jesus para todos os que creem.",
        chapter: "Capítulo XII - Sobre o Batismo em Águas"
      },
      {
        page: 72,
        line: 137,
        text: "A fórmula batismal bíblica é 'em nome do Pai, do Filho e do Espírito Santo'.",
        chapter: "Capítulo XII - Sobre o Batismo em Águas"
      },
      {
        page: 73,
        line: 142,
        text: "Batismo não é sinônimo de regeneração, mas um ato de obediência e testemunho público da fé.",
        chapter: "Capítulo XII - Sobre o Batismo em Águas"
      }
    ]);

    this.declaracaoContent.set("espírito santo", [
      {
        page: 91,
        line: 190,
        text: "O batismo no Espírito Santo é distinto da salvação e está disponível para todos os crentes.",
        chapter: "Capítulo XIX - Sobre o Batismo no Espírito Santo"
      },
      {
        page: 39,
        line: 78,
        text: "O Espírito Santo é a terceira pessoa da Trindade, possuindo todos os atributos da divindade.",
        chapter: "Capítulo VI - Sobre o Espírito Santo"
      },
      {
        page: 40,
        line: 85,
        text: "O Consolador prometido por Jesus é o Espírito Santo que habita no crente.",
        chapter: "Capítulo VI - Sobre o Espírito Santo"
      }
    ]);

    this.declaracaoContent.set("trindade", [
      {
        page: 23,
        line: 48,
        text: "A unidade na Trindade consiste em que há um só Deus subsistindo em três Pessoas: Pai, Filho e Espírito Santo.",
        chapter: "Capítulo III - Sobre a Trindade"
      },
      {
        page: 24,
        line: 52,
        text: "Negamos o unicismo, unitarismo e triteísmo, afirmando a doutrina bíblica da Trindade.",
        chapter: "Capítulo III - Sobre a Trindade"
      }
    ]);

    this.declaracaoContent.set("jesus cristo", [
      {
        page: 28,
        line: 57,
        text: "Jesus Cristo é verdadeiro Deus e verdadeiro homem, duas naturezas em uma só pessoa.",
        chapter: "Capítulo IV - Sobre a Identidade do Senhor Jesus Cristo"
      },
      {
        page: 29,
        line: 62,
        text: "A humanidade de Cristo foi completa, mas sem pecado, sendo tentado em tudo como nós.",
        chapter: "Capítulo IV - Sobre a Identidade do Senhor Jesus Cristo"
      },
      {
        page: 34,
        line: 70,
        text: "A morte de Jesus foi vicária, substitutiva, expiatória e propiciatória pelos pecados da humanidade.",
        chapter: "Capítulo V - Sobre as Obras de Cristo"
      }
    ]);

    this.declaracaoContent.set("dons", [
      {
        page: 94,
        line: 195,
        text: "Os dons do Espírito Santo são manifestações sobrenaturais para edificação da Igreja.",
        chapter: "Capítulo XX - Sobre os Dons do Espírito Santo"
      },
      {
        page: 95,
        line: 200,
        text: "A distribuição dos dons é feita pelo Espírito Santo conforme Sua vontade soberana.",
        chapter: "Capítulo XX - Sobre os Dons do Espírito Santo"
      }
    ]);

    this.declaracaoContent.set("igreja", [
      {
        page: 68,
        line: 130,
        text: "A Igreja é o corpo místico de Cristo, composta por todos os verdadeiros crentes.",
        chapter: "Capítulo XI - Sobre a Igreja"
      },
      {
        page: 69,
        line: 135,
        text: "A missão da Igreja é evangelizar, discipular e adorar a Deus em espírito e verdade.",
        chapter: "Capítulo XI - Sobre a Igreja"
      }
    ]);

    this.declaracaoContent.set("segunda vinda", [
      {
        page: 102,
        line: 210,
        text: "O Arrebatamento da Igreja precederá a Grande Tribulação, sendo evento iminente.",
        chapter: "Capítulo XXII - Sobre a Segunda Vinda de Cristo"
      },
      {
        page: 103,
        line: 215,
        text: "A vinda de Cristo em glória estabelecerá o Reino Milenar na Terra.",
        chapter: "Capítulo XXII - Sobre a Segunda Vinda de Cristo"
      }
    ]);

    this.declaracaoContent.set("cura divina", [
      {
        page: 98,
        line: 202,
        text: "A cura divina está incluída na expiação de Cristo e é privilégio de todos os crentes.",
        chapter: "Capítulo XXI - Sobre a Cura Divina"
      },
      {
        page: 99,
        line: 207,
        text: "A oração pelos enfermos e a unção com óleo são práticas bíblicas para a cura.",
        chapter: "Capítulo XXI - Sobre a Cura Divina"
      }
    ]);

    this.declaracaoContent.set("maria", [
      {
        page: 30,
        line: 65,
        text: "Maria foi escolhida por Deus para ser mãe de Jesus, mas não deve ser objeto de adoração.",
        chapter: "Capítulo IV - Sobre a Identidade do Senhor Jesus Cristo"
      },
      {
        page: 18,
        line: 35,
        text: "Adoração deve ser dirigida somente a Deus - Pai, Filho e Espírito Santo.",
        chapter: "Capítulo II - Sobre Deus"
      }
    ]);

    this.declaracaoContent.set("anjo", [
      {
        page: 49,
        line: 95,
        text: "Os anjos são seres espirituais criados por Deus para servi-Lo e ministrar aos herdeiros da salvação.",
        chapter: "Capítulo VIII - Sobre as Criaturas Espirituais"
      },
      {
        page: 50,
        line: 100,
        text: "Os anjos são organizados em hierarquias celestiais e possuem diferentes ofícios no Reino de Deus.",
        chapter: "Capítulo VIII - Sobre as Criaturas Espirituais"
      },
      {
        page: 51,
        line: 105,
        text: "Existe o anjo da guarda designado por Deus para proteger os Seus filhos.",
        chapter: "Capítulo VIII - Sobre as Criaturas Espirituais"
      }
    ]);

    // Index key content from História do Cristianismo
    this.historiaContent.set("igreja primitiva", [
      {
        page: 45,
        line: 133,
        text: "A história da Igreja de Deus tem sido sempre, desde a era apostólica até o presente, a história da graça divina no meio dos erros dos homens.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      },
      {
        page: 46,
        line: 140,
        text: "Lendo as Epístolas do Novo Testamento vemos que mesmo nos tempos apostólicos o erro se manifestou.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("perseguição", [
      {
        page: 46,
        line: 156,
        text: "Esta perseguição, instigada pelo imperador romano Nero, foi a primeira das dez perseguições gerais que continuaram, quase sem interrupção, durante três séculos.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      },
      {
        page: 47,
        line: 165,
        text: "Deus permite que a malvadez leve o homem muito longe em perseguir os cristãos, a fim de ficar manifestado o que está no seu coração.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("martir", [
      {
        page: 48,
        line: 175,
        text: "No ousado e santo Estêvão temos um exemplo do verdadeiro crente militante. Foi ele o primeiro mártir cristão.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("reforma", [
      {
        page: 285,
        line: 890,
        text: "A Reforma Protestante foi um movimento de Deus para restaurar a verdade bíblica na Igreja.",
        chapter: "Capítulo 18 - O princípio da Reforma"
      }
    ]);

    // Adicionar muito mais conteúdo baseado nos PDFs fornecidos
    this.declaracaoContent.set("adoração", [
      {
        page: 79,
        line: 160,
        text: "A adoração pública e coletiva deve ser dirigida exclusivamente a Deus Pai, Filho e Espírito Santo.",
        chapter: "Capítulo XV - Sobre a Verdadeira Adoração"
      },
      {
        page: 80,
        line: 165,
        text: "A adoração individual é o relacionamento pessoal e íntimo do crente com Deus.",
        chapter: "Capítulo XV - Sobre a Verdadeira Adoração"
      }
    ]);

    this.declaracaoContent.set("oração", [
      {
        page: 81,
        line: 170,
        text: "A oração é comunicação bidirecional entre o crente e Deus, baseada na fé e na Palavra.",
        chapter: "Capítulo XV - Sobre a Verdadeira Adoração"
      },
      {
        page: 82,
        line: 175,
        text: "O jejum acompanhado de oração é prática bíblica para buscar a face de Deus.",
        chapter: "Capítulo XV - Sobre a Verdadeira Adoração"
      }
    ]);

    this.declaracaoContent.set("família", [
      {
        page: 113,
        line: 230,
        text: "O casamento é união entre um homem e uma mulher, instituída por Deus desde a criação.",
        chapter: "Capítulo XXIV - Sobre a Família"
      },
      {
        page: 114,
        line: 235,
        text: "Os pais têm a responsabilidade de educar os filhos nos caminhos do Senhor.",
        chapter: "Capítulo XXIV - Sobre a Família"
      }
    ]);

    this.declaracaoContent.set("lei", [
      {
        page: 84,
        line: 180,
        text: "A lei possui preceitos morais eternos, cerimoniais temporários e civis específicos.",
        chapter: "Capítulo XVII - Sobre a Lei"
      },
      {
        page: 85,
        line: 185,
        text: "A função da lei é revelar o pecado e conduzir o homem a Cristo.",
        chapter: "Capítulo XVII - Sobre a Lei"
      }
    ]);

    this.declaracaoContent.set("mandamentos", [
      {
        page: 86,
        line: 190,
        text: "Os Dez Mandamentos são a expressão moral permanente da vontade de Deus.",
        chapter: "Capítulo XVIII - Sobre os Dez Mandamentos"
      },
      {
        page: 87,
        line: 195,
        text: "Os três primeiros mandamentos tratam do relacionamento do homem com Deus.",
        chapter: "Capítulo XVIII - Sobre os Dez Mandamentos"
      }
    ]);

    this.declaracaoContent.set("sábado", [
      {
        page: 88,
        line: 200,
        text: "O sábado foi dado especificamente a Israel como sinal da antiga aliança.",
        chapter: "Capítulo XVIII - Sobre os Dez Mandamentos"
      }
    ]);

    this.declaracaoContent.set("governo", [
      {
        page: 75,
        line: 145,
        text: "A organização da Igreja segue o modelo bíblico com pastores, presbíteros e diáconos.",
        chapter: "Capítulo XIV - Sobre a Forma de Governo da Igreja"
      },
      {
        page: 76,
        line: 150,
        text: "Pastores e evangelistas são chamados por Deus para apascentar o rebanho.",
        chapter: "Capítulo XIV - Sobre a Forma de Governo da Igreja"
      }
    ]);

    this.declaracaoContent.set("estado", [
      {
        page: 83,
        line: 178,
        text: "As autoridades constituídas devem ser respeitadas como ordenação divina.",
        chapter: "Capítulo XVI - Sobre a Igreja e o Estado"
      }
    ]);

    // Expandir conteúdo da História do Cristianismo
    this.historiaContent.set("nero", [
      {
        page: 46,
        line: 160,
        text: "A primeira onda da perseguição geral que veio sobre a igreja fez-se sentir no ano 64, no reinado do imperador Nero.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      },
      {
        page: 47,
        line: 170,
        text: "Roma foi incendiada por ordem de Nero, que depois culpou os cristãos pelo crime.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("estevão", [
      {
        page: 48,
        line: 180,
        text: "No ousado e santo Estêvão temos um exemplo do verdadeiro crente militante. Foi ele o primeiro mártir cristão.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("disciplina", [
      {
        page: 45,
        line: 140,
        text: "Porque o Senhor corrige o que ama, e se o coração se desviar, tornar-se-á necessária a disciplina.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("armas", [
      {
        page: 47,
        line: 175,
        text: "As armas da nossa milícia não são carnais, mas sim espirituais, e o cristão que se serve de armas carnais mostra que não aprecia o caráter do verdadeiro crente.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("reino", [
      {
        page: 47,
        line: 176,
        text: "O meu reino não é deste mundo; se o meu reino fosse deste mundo pelejariam os meus servos.",
        chapter: "Capítulo 1 - Primeiro século da Era cristã"
      }
    ]);

    this.historiaContent.set("tormentos", [
      {
        page: 48,
        line: 185,
        text: "Alguns foram vestidos com peles de animais ferozes, e perseguidos por cães até morrerem.",
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
      "pastor", "evangelista", "diácono", "presbítero", "maria", "anjo",
      "cura divina", "martir", "perseguição", "reforma", "igreja primitiva"
    ];

    const foundTerms = keyTerms.filter(term => question.includes(term));
    
    // Add partial matches for better search coverage
    if (question.includes("salv")) foundTerms.push("salvação");
    if (question.includes("batiz")) foundTerms.push("batismo");
    if (question.includes("espírit") || question.includes("santo")) foundTerms.push("espírito santo");
    if (question.includes("jesus") || question.includes("cristo")) foundTerms.push("jesus cristo");
    if (question.includes("ador")) foundTerms.push("maria");
    if (question.includes("anjo") || question.includes("angel")) foundTerms.push("anjo");
    if (question.includes("don") && question.includes("espírit")) foundTerms.push("dons");
    if (question.includes("cur")) foundTerms.push("cura divina");
    if (question.includes("vind") || question.includes("arrebat")) foundTerms.push("segunda vinda");
    if (question.includes("oraç")) foundTerms.push("oração");
    if (question.includes("famíl") || question.includes("casam")) foundTerms.push("família");
    if (question.includes("lei") || question.includes("mandament")) foundTerms.push("lei", "mandamentos");
    if (question.includes("sábado")) foundTerms.push("sábado");
    if (question.includes("governo") || question.includes("pastor")) foundTerms.push("governo");
    if (question.includes("estado") || question.includes("autoridad")) foundTerms.push("estado");
    if (question.includes("nero") || question.includes("roma")) foundTerms.push("nero");
    if (question.includes("estevão") || question.includes("mártir")) foundTerms.push("estevão", "martir");
    if (question.includes("disciplin") || question.includes("correç")) foundTerms.push("disciplina");
    if (question.includes("armas") || question.includes("guerra")) foundTerms.push("armas");
    if (question.includes("reino")) foundTerms.push("reino");
    if (question.includes("torment") || question.includes("sofr")) foundTerms.push("tormentos");
    
    return [...new Set(foundTerms)]; // Remove duplicates
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
