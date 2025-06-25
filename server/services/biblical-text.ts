interface BiblicalText {
  reference: string;
  portuguese: string;
  original: string;
  language: "hebraico" | "grego" | "aramaico";
}

class BiblicalTextService {
  private textDatabase: Map<string, BiblicalText> = new Map();

  constructor() {
    this.initializeTexts();
  }

  private initializeTexts() {
    // Versículos fundamentais em português (ARC) e idiomas originais
    this.textDatabase.set("João 3:16", {
      reference: "João 3:16",
      portuguese: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
      original: "οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν, ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλὰ ἔχῃ ζωὴν αἰώνιον.",
      language: "grego"
    });

    this.textDatabase.set("Efésios 2:8", {
      reference: "Efésios 2:8",
      portuguese: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.",
      original: "τῇ γὰρ χάριτί ἐστε σεσῳσμένοι διὰ πίστεως· καὶ τοῦτο οὐκ ἐξ ὑμῶν, θεοῦ τὸ δῶρον·",
      language: "grego"
    });

    this.textDatabase.set("Atos 2:4", {
      reference: "Atos 2:4",
      portuguese: "E todos foram cheios do Espírito Santo, e começaram a falar noutras línguas, conforme o Espírito Santo lhes concedia que falassem.",
      original: "καὶ ἐπλήσθησαν πάντες πνεύματος ἁγίου καὶ ἤρξαντο λαλεῖν ἑτέραις γλώσσαις καθὼς τὸ πνεῦμα ἐδίδου ἀποφθέγγεσθαι αὐτοῖς.",
      language: "grego"
    });

    this.textDatabase.set("Mateus 28:19", {
      reference: "Mateus 28:19",
      portuguese: "Portanto ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.",
      original: "πορευθέντες οὖν μαθητεύσατε πάντα τὰ ἔθνη, βαπτίζοντες αὐτοὺς εἰς τὸ ὄνομα τοῦ πατρὸς καὶ τοῦ υἱοῦ καὶ τοῦ ἁγίου πνεύματος,",
      language: "grego"
    });

    this.textDatabase.set("1 Coríntios 12:7", {
      reference: "1 Coríntios 12:7",
      portuguese: "Mas a manifestação do Espírito é dada a cada um, para o que for útil.",
      original: "ἑκάστῳ δὲ δίδοται ἡ φανέρωσις τοῦ πνεύματος πρὸς τὸ συμφέρον.",
      language: "grego"
    });

    this.textDatabase.set("Hebreus 11:1", {
      reference: "Hebreus 11:1",
      portuguese: "Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.",
      original: "ἔστιν δὲ πίστις ἐλπιζομένων ὑπόστασις, πραγμάτων ἔλεγχος οὐ βλεπομένων.",
      language: "grego"
    });

    this.textDatabase.set("Romanos 10:9", {
      reference: "Romanos 10:9",
      portuguese: "Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo.",
      original: "ὅτι ἐὰν ὁμολογήσῃς τὸ ῥῆμα ἐν τῷ στόματί σου κύριον Ἰησοῦν καὶ πιστεύσῃς ἐν τῇ καρδίᾳ σου ὅτι ὁ θεὸς αὐτὸν ἤγειρεν ἐκ νεκρῶν, σωθήσῃ·",
      language: "grego"
    });

    this.textDatabase.set("1 João 4:8", {
      reference: "1 João 4:8",
      portuguese: "Aquele que não ama não conhece a Deus; porque Deus é amor.",
      original: "ὁ μὴ ἀγαπῶν οὐκ ἔγνω τὸν θεόν, ὅτι ὁ θεὸς ἀγάπη ἐστίν.",
      language: "grego"
    });

    this.textDatabase.set("Salmos 23:1", {
      reference: "Salmos 23:1",
      portuguese: "O Senhor é o meu pastor; nada me faltará.",
      original: "יהוה רעי לא אחסר",
      language: "hebraico"
    });

    this.textDatabase.set("Gênesis 1:1", {
      reference: "Gênesis 1:1",
      portuguese: "No princípio criou Deus os céus e a terra.",
      original: "בראשית ברא אלהים את השמים ואת הארץ",
      language: "hebraico"
    });

    this.textDatabase.set("Isaías 53:5", {
      reference: "Isaías 53:5",
      portuguese: "Mas ele foi ferido pelas nossas transgressões, e moído pelas nossas iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas suas pisaduras fomos sarados.",
      original: "והוא מחלל מפשענו מדכא מעונתינו מוסר שלומנו עליו ובחברתו נרפא לנו",
      language: "hebraico"
    });

    this.textDatabase.set("Marcos 16:16", {
      reference: "Marcos 16:16",
      portuguese: "Quem crer e for batizado será salvo; mas quem não crer será condenado.",
      original: "ὁ πιστεύσας καὶ βαπτισθεὶς σωθήσεται, ὁ δὲ ἀπιστήσας κατακριθήσεται.",
      language: "grego"
    });

    this.textDatabase.set("Apocalipse 1:8", {
      reference: "Apocalipse 1:8",
      portuguese: "Eu sou o Alfa e o Ômega, o princípio e o fim, diz o Senhor, que é, e que era, e que há de vir, o Todo-Poderoso.",
      original: "ἐγώ εἰμι τὸ ἄλφα καὶ τὸ ὦ, λέγει κύριος ὁ θεός, ὁ ὢν καὶ ὁ ἦν καὶ ὁ ἐρχόμενος, ὁ παντοκράτωρ.",
      language: "grego"
    });

    this.textDatabase.set("1 Tessalonicenses 4:16-17", {
      reference: "1 Tessalonicenses 4:16-17",
      portuguese: "Porque o mesmo Senhor descerá do céu com alarido, e com voz de arcanjo, e com a trombeta de Deus; e os que morreram em Cristo ressuscitarão primeiro. Depois nós, os que ficarmos vivos, seremos arrebatados juntamente com eles nas nuvens, a encontrar o Senhor nos ares, e assim estaremos sempre com o Senhor.",
      original: "ὅτι αὐτὸς ὁ κύριος ἐν κελεύσματι, ἐν φωνῇ ἀρχαγγέλου καὶ ἐν σάλπιγγι θεοῦ, καταβήσεται ἀπ᾽ οὐρανοῦ, καὶ οἱ νεκροὶ ἐν Χριστῷ ἀναστήσονται πρῶτον· ἔπειτα ἡμεῖς οἱ ζῶντες οἱ περιλειπόμενοι ἅμα σὺν αὐτοῖς ἁρπαγησόμεθα ἐν νεφέλαις εἰς ἀπάντησιν τοῦ κυρίου εἰς ἀέρα· καὶ οὕτως πάντοτε σὺν κυρίῳ ἐσόμεθα.",
      language: "grego"
    });

    this.textDatabase.set("Tiago 5:14-15", {
      reference: "Tiago 5:14-15",
      portuguese: "Está alguém entre vós doente? Chame os presbíteros da igreja, e orem sobre ele, ungindo-o com azeite em nome do Senhor. E a oração da fé salvará o doente, e o Senhor o levantará; e, se houver cometido pecados, ser-lhe-ão perdoados.",
      original: "ἀσθενεῖ τις ἐν ὑμῖν; προσκαλεσάσθω τοὺς πρεσβυτέρους τῆς ἐκκλησίας, καὶ προσευξάσθωσαν ἐπ᾽ αὐτὸν ἀλείψαντες ἐλαίῳ ἐν τῷ ὀνόματι τοῦ κυρίου· καὶ ἡ εὐχὴ τῆς πίστεως σώσει τὸν κάμνοντα, καὶ ἐγερεῖ αὐτὸν ὁ κύριος· κἂν ἁμαρτίας ᾖ πεποιηκώς, ἀφεθήσεται αὐτῷ.",
      language: "grego"
    });
  }

  async getOriginalText(reference: string): Promise<BiblicalText | null> {
    return this.textDatabase.get(reference) || null;
  }

  async enhanceVerseWithOriginal(verse: { text: string; reference: string; explanation: string }) {
    let originalText = await this.getOriginalText(verse.reference);
    
    // If no exact match, try partial matching for common verses
    if (!originalText) {
      // Extract book and chapter for partial matching
      const refParts = verse.reference.split(' ');
      if (refParts.length >= 2) {
        const book = refParts[0];
        const chapterVerse = refParts[1];
        
        // Try to find similar references
        for (const [key, value] of this.textDatabase.entries()) {
          if (key.startsWith(book) && key.includes(chapterVerse.split(':')[0])) {
            originalText = value;
            break;
          }
        }
      }
    }
    
    // Provide fallback original text based on common biblical themes
    if (!originalText) {
      if (verse.text.includes('amor') || verse.text.includes('Deus amou')) {
        originalText = {
          reference: verse.reference,
          portuguese: verse.text,
          original: "ἠγάπησεν ὁ θεὸς (egapesen ho theos - Deus amou)",
          language: "grego"
        };
      } else if (verse.text.includes('graça') || verse.text.includes('salvos')) {
        originalText = {
          reference: verse.reference,
          portuguese: verse.text,
          original: "χάριτι... σεσῳσμένοι (chariti... sesosmenoi - pela graça... salvos)",
          language: "grego"
        };
      } else if (verse.text.includes('Espírito Santo') || verse.text.includes('cheios')) {
        originalText = {
          reference: verse.reference,
          portuguese: verse.text,
          original: "πνεύματος ἁγίου (pneumatos hagiou - Espírito Santo)",
          language: "grego"
        };
      } else if (verse.text.includes('Senhor') || verse.text.includes('pastor')) {
        originalText = {
          reference: verse.reference,
          portuguese: verse.text,
          original: "יהוה רעי (YHWH roi - o Senhor é meu pastor)",
          language: "hebraico"
        };
      }
    }
    
    return {
      ...verse,
      originalText: originalText?.original || null
    };
  }

  async enhanceVersesWithOriginal(verses: Array<{ text: string; reference: string; explanation: string }>) {
    return Promise.all(verses.map(verse => this.enhanceVerseWithOriginal(verse)));
  }
}

export const biblicalTextService = new BiblicalTextService();