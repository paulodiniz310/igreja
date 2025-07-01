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
    // Palavras sobre Graça e Favor Divino
    this.wordDatabase.set("graça", [
      {
        word: "χάρις (charis)",
        language: "grego",
        translation: "graça, favor, benevolência divina, dom gracioso",
        context: "Usado em Efésios 2:8 para descrever o favor imerecido de Deus"
      },
      {
        word: "חן (chen)",
        language: "hebraico",
        translation: "graça, favor, charme",
        context: "Favor divino encontrado no Antigo Testamento"
      }
    ]);

    // Palavras sobre Salvação e Libertação
    this.wordDatabase.set("salvação", [
      {
        word: "σωτηρία (soteria)",
        language: "grego",
        translation: "salvação, libertação, preservação, segurança",
        context: "Conceito central da doutrina cristã, libertação do pecado"
      },
      {
        word: "יְשׁוּעָה (yeshuah)",
        language: "hebraico",
        translation: "salvação, libertação, vitória",
        context: "Livramento divino, especialmente messiânico"
      },
      {
        word: "σῶζω (sozo)",
        language: "grego",
        translation: "salvar, curar, preservar, resgatar",
        context: "Verbo usado para salvação física e espiritual"
      }
    ]);

    // Palavras sobre Fé e Confiança
    this.wordDatabase.set("fé", [
      {
        word: "πίστις (pistis)",
        language: "grego",
        translation: "fé, confiança, crença, fidelidade",
        context: "Confiança e dependência completa em Deus e Sua palavra"
      },
      {
        word: "אֱמוּנָה (emunah)",
        language: "hebraico",
        translation: "fé, fidelidade, firmeza, confiança",
        context: "Confiança firme e inabalável em Deus"
      },
      {
        word: "πιστεύω (pisteuo)",
        language: "grego",
        translation: "crer, confiar, ter fé",
        context: "Ato de colocar confiança em Deus"
      }
    ]);

    // Palavras sobre Espírito
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
        translation: "vento, respiração, espírito, força vital",
        context: "Força vital de Deus, sopro divino que dá vida"
      },
      {
        word: "נְשָׁמָה (neshamah)",
        language: "hebraico",
        translation: "respiração, fôlego, alma",
        context: "Fôlego de vida soprado por Deus no homem"
      }
    ]);

    // Palavras sobre Amor
    this.wordDatabase.set("amor", [
      {
        word: "ἀγάπη (agape)",
        language: "grego",
        translation: "amor divino, amor incondicional",
        context: "O amor de Deus pelos homens e o amor cristão ao próximo"
      },
      {
        word: "אהבה (ahavah)",
        language: "hebraico",
        translation: "amor, afeição profunda",
        context: "Amor comprometido e escolha deliberada de amar"
      },
      {
        word: "φιλέω (phileo)",
        language: "grego",
        translation: "amar, gostar, ter afeição",
        context: "Amor fraternal e amizade"
      },
      {
        word: "חֶסֶד (chesed)",
        language: "hebraico",
        translation: "amor leal, bondade, misericórdia",
        context: "Amor fiel baseado em aliança"
      }
    ]);

    // Palavras sobre Pecado e Transgressão
    this.wordDatabase.set("pecado", [
      {
        word: "ἁμαρτία (hamartia)",
        language: "grego",
        translation: "pecado, erro, transgressão",
        context: "Errar o alvo, falhar em atingir o padrão de Deus"
      },
      {
        word: "חטא (chata)",
        language: "hebraico",
        translation: "pecar, errar, falhar",
        context: "Falhar em atingir o padrão divino, transgredir"
      },
      {
        word: "עָוֹן (avon)",
        language: "hebraico",
        translation: "iniquidade, culpa, perversidade",
        context: "Pecado com aspecto de culpa e distorção moral"
      },
      {
        word: "פֶּשַׁע (pesha)",
        language: "hebraico",
        translation: "transgressão, rebelião, revolta",
        context: "Rebelião deliberada contra Deus"
      },
      {
        word: "παράπτωμα (paraptoma)",
        language: "grego",
        translation: "transgressão, queda, deslize",
        context: "Ato de cair ou desviar do caminho correto"
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
        word: "מלאך (malak)",
        language: "hebraico",
        translation: "mensageiro, anjo",
        context: "Enviado divino, mensageiro de Deus"
      }
    ]);

    this.wordDatabase.set("deus", [
      {
        word: "θεός (theos)",
        language: "grego",
        translation: "Deus, divindade",
        context: "O Deus único, criador e sustentador do universo"
      },
      {
        word: "אלהים (Elohim)",
        language: "hebraico",
        translation: "Deus, seres divinos",
        context: "Nome plural de majestade para o Deus único"
      },
      {
        word: "יהוה (YHWH)",
        language: "hebraico",
        translation: "Jeová, Senhor",
        context: "Nome sagrado e pessoal de Deus revelado a Moisés"
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
      },
      {
        word: "קָדוֹשׁ (qadosh)",
        language: "hebraico",
        translation: "santo, sagrado, separado",
        context: "Separado para Deus, distinto do comum"
      }
    ]);

    // Palavras sobre Vida e Eternidade
    this.wordDatabase.set("vida", [
      {
        word: "ζωή (zoe)",
        language: "grego",
        translation: "vida, vida eterna",
        context: "Vida espiritual e eterna dada por Deus"
      },
      {
        word: "βίος (bios)",
        language: "grego",
        translation: "vida física, existência terrena",
        context: "Vida temporal e material"
      },
      {
        word: "חַיִּים (chayyim)",
        language: "hebraico",
        translation: "vida, vivos",
        context: "Vida como dádiva de Deus"
      },
      {
        word: "נֶפֶשׁ (nephesh)",
        language: "hebraico",
        translation: "alma, vida, ser vivente",
        context: "Totalidade do ser humano"
      }
    ]);

    // Palavras sobre Morte e Ressurreição
    this.wordDatabase.set("morte", [
      {
        word: "θάνατος (thanatos)",
        language: "grego",
        translation: "morte, separação",
        context: "Separação física e espiritual"
      },
      {
        word: "מָוֶת (mavet)",
        language: "hebraico",
        translation: "morte, fim da vida",
        context: "Fim da existência terrena"
      }
    ]);

    this.wordDatabase.set("ressurreição", [
      {
        word: "ἀνάστασις (anastasis)",
        language: "grego",
        translation: "ressurreição, levantamento",
        context: "Ato de levantar dos mortos"
      },
      {
        word: "תְּחִיָּה (techiyah)",
        language: "hebraico",
        translation: "reviver, ressuscitação",
        context: "Restauração da vida"
      }
    ]);

    // Palavras sobre Reino e Céu
    this.wordDatabase.set("reino", [
      {
        word: "βασιλεία (basileia)",
        language: "grego",
        translation: "reino, reinado, soberania",
        context: "Reino de Deus e sua autoridade"
      },
      {
        word: "מַלְכוּת (malchut)",
        language: "hebraico",
        translation: "reino, reinado, soberania",
        context: "Governo e autoridade divina"
      }
    ]);

    this.wordDatabase.set("céu", [
      {
        word: "οὐρανός (ouranos)",
        language: "grego",
        translation: "céu, céus, firmamento",
        context: "Habitação de Deus e destino dos salvos"
      },
      {
        word: "שָׁמַיִם (shamayim)",
        language: "hebraico",
        translation: "céus, firmamento",
        context: "Morada divina e espaço celestial"
      }
    ]);

    // Palavras sobre Justiça e Julgamento
    this.wordDatabase.set("justiça", [
      {
        word: "δικαιοσύνη (dikaiosyne)",
        language: "grego",
        translation: "justiça, retidão",
        context: "Justiça imputada por Deus ao crente"
      },
      {
        word: "צְדָקָה (tsedaqah)",
        language: "hebraico",
        translation: "justiça, retidão, caridade",
        context: "Fazer o que é certo diante de Deus"
      }
    ]);

    this.wordDatabase.set("julgamento", [
      {
        word: "κρίσις (krisis)",
        language: "grego",
        translation: "julgamento, juízo, decisão",
        context: "Avaliação divina das ações humanas"
      },
      {
        word: "מִשְׁפָּט (mishpat)",
        language: "hebraico",
        translation: "julgamento, justiça, direito",
        context: "Decisão judicial divina"
      }
    ]);

    // Palavras sobre Profecia e Revelação
    this.wordDatabase.set("profecia", [
      {
        word: "προφητεία (propheteia)",
        language: "grego",
        translation: "profecia, predição, revelação",
        context: "Mensagem divina através do profeta"
      },
      {
        word: "נְבוּאָה (nevuah)",
        language: "hebraico",
        translation: "profecia, palavra profética",
        context: "Revelação divina através do profeta"
      }
    ]);

    this.wordDatabase.set("revelação", [
      {
        word: "ἀποκάλυψις (apokalypsis)",
        language: "grego",
        translation: "revelação, manifestação, descobrimento",
        context: "Manifestação divina da verdade"
      },
      {
        word: "גִּלּוּי (gilluy)",
        language: "hebraico",
        translation: "revelação, descobrimento",
        context: "Revelação de mistérios divinos"
      }
    ]);

    // Palavras sobre Dons Espirituais
    this.wordDatabase.set("dons", [
      {
        word: "χάρισμα (charisma)",
        language: "grego",
        translation: "dom da graça, presente espiritual",
        context: "Dons concedidos pelo Espírito Santo"
      },
      {
        word: "δῶρον (doron)",
        language: "grego",
        translation: "dádiva, presente, oferta",
        context: "Presente divino aos crentes"
      },
      {
        word: "מַתָּנָה (mattanah)",
        language: "hebraico",
        translation: "presente, dádiva",
        context: "Dom concedido por Deus"
      }
    ]);

    // Palavras sobre Cura e Milagres
    this.wordDatabase.set("cura", [
      {
        word: "ἴασις (iasis)",
        language: "grego",
        translation: "cura, restauração",
        context: "Cura física e espiritual"
      },
      {
        word: "θεραπεία (therapeia)",
        language: "grego",
        translation: "cura, tratamento, serviço",
        context: "Ato de curar e restaurar"
      },
      {
        word: "רְפוּאָה (refuah)",
        language: "hebraico",
        translation: "cura, medicina, saúde",
        context: "Restauração da saúde por Deus"
      }
    ]);

    this.wordDatabase.set("milagre", [
      {
        word: "σημεῖον (semeion)",
        language: "grego",
        translation: "sinal, milagre, prodígio",
        context: "Sinal divino que aponta para Deus"
      },
      {
        word: "δύναμις (dynamis)",
        language: "grego",
        translation: "poder, força, milagre",
        context: "Poder sobrenatural de Deus"
      },
      {
        word: "אוֹת (ot)",
        language: "hebraico",
        translation: "sinal, marca, prodígio",
        context: "Sinal divino de confirmação"
      }
    ]);

    // Palavras sobre Guerra Espiritual
    this.wordDatabase.set("guerra", [
      {
        word: "πόλεμος (polemos)",
        language: "grego",
        translation: "guerra, batalha, conflito",
        context: "Guerra espiritual contra as trevas"
      },
      {
        word: "מִלְחָמָה (milchamah)",
        language: "hebraico",
        translation: "guerra, batalha, luta",
        context: "Conflito espiritual"
      }
    ]);

    this.wordDatabase.set("vitória", [
      {
        word: "νῖκος (nikos)",
        language: "grego",
        translation: "vitória, conquista",
        context: "Vitória em Cristo sobre o pecado"
      },
      {
        word: "תְּשׁוּעָה (teshuah)",
        language: "hebraico",
        translation: "salvação, vitória, libertação",
        context: "Vitória divina concedida ao povo"
      }
    ]);

    // Palavras sobre Aliança e Testamento
    this.wordDatabase.set("aliança", [
      {
        word: "διαθήκη (diatheke)",
        language: "grego",
        translation: "aliança, testamento, pacto",
        context: "Acordo solene entre Deus e seu povo"
      },
      {
        word: "בְּרִית (berit)",
        language: "hebraico",
        translation: "aliança, pacto, acordo",
        context: "Pacto estabelecido por Deus"
      }
    ]);

    // Palavras sobre Adoração e Louvor
    this.wordDatabase.set("louvor", [
      {
        word: "αἶνος (ainos)",
        language: "grego",
        translation: "louvor, elogio, glória",
        context: "Expressão de admiração a Deus"
      },
      {
        word: "תְּהִלָּה (tehillah)",
        language: "hebraico",
        translation: "louvor, glória, cântico",
        context: "Expressão de exaltação a Deus"
      },
      {
        word: "הַלְלוּיָהּ (hallelujah)",
        language: "hebraico",
        translation: "louvai ao Senhor",
        context: "Expressão de adoração e exaltação"
      }
    ]);

    // Palavras sobre Tempo e Eternidade
    this.wordDatabase.set("tempo", [
      {
        word: "χρόνος (chronos)",
        language: "grego",
        translation: "tempo cronológico, duração",
        context: "Tempo sequencial e mensurável"
      },
      {
        word: "καιρός (kairos)",
        language: "grego",
        translation: "tempo oportuno, momento apropriado",
        context: "Tempo de Deus, momento divino"
      },
      {
        word: "עֵת (et)",
        language: "hebraico",
        translation: "tempo, estação, período",
        context: "Tempo determinado por Deus"
      }
    ]);

    this.wordDatabase.set("eternidade", [
      {
        word: "αἰώνιος (aionios)",
        language: "grego",
        translation: "eterno, perpétuo, duradouro",
        context: "Qualidade da vida divina"
      },
      {
        word: "עוֹלָם (olam)",
        language: "hebraico",
        translation: "eternidade, mundo, era",
        context: "Tempo sem fim, eternidade"
      }
    ]);

    // Palavras sobre Livre Arbítrio e Escolha
    this.wordDatabase.set("livre", [
      {
        word: "ἐλεύθερος (eleutheros)",
        language: "grego",
        translation: "livre, liberado, independente",
        context: "Liberdade espiritual e moral em Cristo"
      },
      {
        word: "חפשי (chofshi)",
        language: "hebraico",
        translation: "livre, libertado",
        context: "Estado de liberdade dada por Deus"
      }
    ]);

    this.wordDatabase.set("arbítrio", [
      {
        word: "βουλή (boule)",
        language: "grego",
        translation: "vontade, conselho, decisão",
        context: "Capacidade de tomar decisões deliberadas"
      },
      {
        word: "רצון (ratzon)",
        language: "hebraico",
        translation: "vontade, desejo, arbítrio",
        context: "Vontade e capacidade de escolha"
      }
    ]);

    this.wordDatabase.set("escolha", [
      {
        word: "ἐκλογή (ekloge)",
        language: "grego",
        translation: "escolha, seleção, eleição",
        context: "Ato de escolher ou ser escolhido por Deus"
      },
      {
        word: "בחר (bachar)",
        language: "hebraico",
        translation: "escolher, eleger, selecionar",
        context: "Ato de fazer uma escolha ou eleição"
      }
    ]);

    // Palavras sobre Milênio e Reino
    this.wordDatabase.set("milênio", [
      {
        word: "χίλια ἔτη (chilia ete)",
        language: "grego",
        translation: "mil anos",
        context: "Período profético de mil anos do reino de Cristo"
      }
    ]);

    this.wordDatabase.set("reino", [
      {
        word: "βασιλεία (basileia)",
        language: "grego",
        translation: "reino, reinado, soberania",
        context: "Reino de Deus e governo divino"
      },
      {
        word: "מלכות (malchut)",
        language: "hebraico",
        translation: "reino, reinado, soberania",
        context: "Reino e autoridade divina"
      }
    ]);
  }

  async findOriginalWords(text: string): Promise<BiblicalWord[]> {
    const results: BiblicalWord[] = [];
    const searchText = text.toLowerCase();

    // Extract key words from the question (simple approach)
    const words = searchText.split(/\s+/).filter(word => 
      word.length > 2 && 
      !['que', 'oque', 'como', 'quando', 'onde', 'por', 'para', 'com', 'sem', 'sobre', 'entre', 'uma', 'uns', 'das', 'dos', 'nas', 'nos'].includes(word)
    );
    
    // Search for each key word in the question
    for (const word of words) {
      const exactWords = this.wordDatabase.get(word);
      if (exactWords) {
        results.push(...exactWords);
      }
    }

    // Search for exact matches in full text
    const entries = Array.from(this.wordDatabase.entries());
    for (const [key, words] of entries) {
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
    const lowerText = text.toLowerCase();

    // Salvation-related terms
    if (lowerText.includes("salv") || lowerText.includes("redençã") || lowerText.includes("perdã") || lowerText.includes("liberta")) {
      relatedTerms.push("salvação", "graça", "fé", "vida");
    }

    // Spirit-related terms
    if (lowerText.includes("espírit") || lowerText.includes("pneuma") || lowerText.includes("vento") || lowerText.includes("consolador")) {
      relatedTerms.push("espírito", "dons");
    }

    // Love-related terms
    if (lowerText.includes("amor") || lowerText.includes("caridad") || lowerText.includes("misericórd")) {
      relatedTerms.push("amor", "graça", "paz");
    }

    // Jesus-related terms
    if (lowerText.includes("jesus") || lowerText.includes("cristo") || lowerText.includes("messias") || lowerText.includes("salvador")) {
      relatedTerms.push("jesus", "cristo", "salvação", "ressurreição");
    }

    // Baptism-related terms
    if (lowerText.includes("batiz") || lowerText.includes("imers") || lowerText.includes("águas")) {
      relatedTerms.push("batismo", "santificação");
    }

    // Church-related terms
    if (lowerText.includes("igreja") || lowerText.includes("congregaç") || lowerText.includes("assembleia")) {
      relatedTerms.push("igreja", "adoração", "louvor");
    }

    // Prophecy-related terms
    if (lowerText.includes("profec") || lowerText.includes("visão") || lowerText.includes("sonho")) {
      relatedTerms.push("profecia", "revelação", "dons");
    }

    // Healing-related terms
    if (lowerText.includes("cur") || lowerText.includes("sará") || lowerText.includes("restaur") || lowerText.includes("saúde")) {
      relatedTerms.push("cura", "milagre", "dons");
    }

    // Spiritual warfare terms
    if (lowerText.includes("guerr") || lowerText.includes("bat") || lowerText.includes("demôn") || lowerText.includes("satan")) {
      relatedTerms.push("guerra", "vitória", "oração");
    }

    // Death and eternal life terms
    if (lowerText.includes("mort") || lowerText.includes("eternal") || lowerText.includes("vida eterna")) {
      relatedTerms.push("morte", "vida", "ressurreição", "eternidade");
    }

    // Justice and judgment terms
    if (lowerText.includes("just") || lowerText.includes("julgam") || lowerText.includes("juízo")) {
      relatedTerms.push("justiça", "julgamento", "pecado");
    }

    // Heaven and kingdom terms
    if (lowerText.includes("céu") || lowerText.includes("reino") || lowerText.includes("paraíso")) {
      relatedTerms.push("céu", "reino", "eternidade");
    }

    // Prayer and worship terms
    if (lowerText.includes("oraç") || lowerText.includes("ador") || lowerText.includes("louv")) {
      relatedTerms.push("oração", "adoração", "louvor", "santificação");
    }

    // Covenant and law terms
    if (lowerText.includes("alianç") || lowerText.includes("pacto") || lowerText.includes("testament")) {
      relatedTerms.push("aliança", "fé", "graça");
    }

    // Time and prophecy terms
    if (lowerText.includes("tempo") || lowerText.includes("último") || lowerText.includes("fim")) {
      relatedTerms.push("tempo", "profecia", "julgamento");
    }

    return relatedTerms;
  }
}

export const biblicalWordsService = new BiblicalWordsService();
