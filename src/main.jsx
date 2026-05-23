import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const NL = String.fromCharCode(10);

const LANGUAGES = [
  { code: "ru", name: "Russian / Русский", builtIn: true },
  { code: "kk", name: "Kazakh / Қазақша", builtIn: true },
  { code: "sv", name: "Swedish / Svenska", builtIn: true },
  { code: "de", name: "German / Deutsch", builtIn: true },
  { code: "es", name: "Spanish / Español", builtIn: true },
  { code: "fr", name: "French / Français", builtIn: true },
  { code: "it", name: "Italian / Italiano", builtIn: true },
  { code: "tr", name: "Turkish / Türkçe", builtIn: true },
  { code: "uk", name: "Ukrainian / Українська", builtIn: true },
  { code: "pl", name: "Polish / Polski", builtIn: true },
  { code: "ar", name: "Arabic / العربية", builtIn: false },
  { code: "zh", name: "Chinese / 中文", builtIn: false },
  { code: "ja", name: "Japanese / 日本語", builtIn: false },
  { code: "ko", name: "Korean / 한국어", builtIn: false },
  { code: "pt", name: "Portuguese / Português", builtIn: false },
  { code: "nl", name: "Dutch / Nederlands", builtIn: false },
  { code: "fi", name: "Finnish / Suomi", builtIn: false },
  { code: "no", name: "Norwegian / Norsk", builtIn: false },
  { code: "da", name: "Danish / Dansk", builtIn: false },
  { code: "cs", name: "Czech / Čeština", builtIn: false },
  { code: "ro", name: "Romanian / Română", builtIn: false },
  { code: "el", name: "Greek / Ελληνικά", builtIn: false },
  { code: "hi", name: "Hindi / हिन्दी", builtIn: false },
  { code: "ur", name: "Urdu / اردو", builtIn: false },
  { code: "fa", name: "Persian / فارسی", builtIn: false },
  { code: "uz", name: "Uzbek / Oʻzbekcha", builtIn: false },
  { code: "ky", name: "Kyrgyz / Кыргызча", builtIn: false },
  { code: "az", name: "Azerbaijani / Azərbaycanca", builtIn: false },
  { code: "ka", name: "Georgian / ქართული", builtIn: false },
  { code: "hy", name: "Armenian / Հայերեն", builtIn: false },
  { code: "id", name: "Indonesian / Bahasa Indonesia", builtIn: false },
  { code: "vi", name: "Vietnamese / Tiếng Việt", builtIn: false },
  { code: "th", name: "Thai / ไทย", builtIn: false }
];

const WORD_BANK = [
  {
    "level": "A1",
    "topic": "Daily life",
    "word": "house",
    "sentence": "My _____ is near the park.",
    "tr": {
      "ru": "дом",
      "kk": "үй",
      "sv": "hus",
      "de": "Haus",
      "es": "casa",
      "fr": "maison",
      "it": "casa",
      "tr": "ev",
      "uk": "дім",
      "pl": "dom"
    }
  },
  {
    "level": "A1",
    "topic": "Daily life",
    "word": "family",
    "sentence": "My _____ is very friendly.",
    "tr": {
      "ru": "семья",
      "kk": "отбасы",
      "sv": "familj",
      "de": "Familie",
      "es": "familia",
      "fr": "famille",
      "it": "famiglia",
      "tr": "aile",
      "uk": "сім’я",
      "pl": "rodzina"
    }
  },
  {
    "level": "A1",
    "topic": "Daily life",
    "word": "friend",
    "sentence": "This is my best _____.",
    "tr": {
      "ru": "друг",
      "kk": "дос",
      "sv": "vän",
      "de": "Freund",
      "es": "amigo",
      "fr": "ami",
      "it": "amico",
      "tr": "arkadaş",
      "uk": "друг",
      "pl": "przyjaciel"
    }
  },
  {
    "level": "A1",
    "topic": "Daily life",
    "word": "room",
    "sentence": "My _____ is small but nice.",
    "tr": {
      "ru": "комната",
      "kk": "бөлме",
      "sv": "rum",
      "de": "Zimmer",
      "es": "habitación",
      "fr": "chambre",
      "it": "stanza",
      "tr": "oda",
      "uk": "кімната",
      "pl": "pokój"
    }
  },
  {
    "level": "A1",
    "topic": "Daily life",
    "word": "school",
    "sentence": "I go to _____ every day.",
    "tr": {
      "ru": "школа",
      "kk": "мектеп",
      "sv": "skola",
      "de": "Schule",
      "es": "escuela",
      "fr": "école",
      "it": "scuola",
      "tr": "okul",
      "uk": "школа",
      "pl": "szkoła"
    }
  },
  {
    "level": "A1",
    "topic": "Food",
    "word": "water",
    "sentence": "Can I have some _____, please?",
    "tr": {
      "ru": "вода",
      "kk": "су",
      "sv": "vatten",
      "de": "Wasser",
      "es": "agua",
      "fr": "eau",
      "it": "acqua",
      "tr": "su",
      "uk": "вода",
      "pl": "woda"
    }
  },
  {
    "level": "A1",
    "topic": "Food",
    "word": "bread",
    "sentence": "I eat _____ for breakfast.",
    "tr": {
      "ru": "хлеб",
      "kk": "нан",
      "sv": "bröd",
      "de": "Brot",
      "es": "pan",
      "fr": "pain",
      "it": "pane",
      "tr": "ekmek",
      "uk": "хліб",
      "pl": "chleb"
    }
  },
  {
    "level": "A1",
    "topic": "Food",
    "word": "apple",
    "sentence": "She has an _____ in her bag.",
    "tr": {
      "ru": "яблоко",
      "kk": "алма",
      "sv": "äpple",
      "de": "Apfel",
      "es": "manzana",
      "fr": "pomme",
      "it": "mela",
      "tr": "elma",
      "uk": "яблуко",
      "pl": "jabłko"
    }
  },
  {
    "level": "A1",
    "topic": "Food",
    "word": "milk",
    "sentence": "I drink _____ in the morning.",
    "tr": {
      "ru": "молоко",
      "kk": "сүт",
      "sv": "mjölk",
      "de": "Milch",
      "es": "leche",
      "fr": "lait",
      "it": "latte",
      "tr": "süt",
      "uk": "молоко",
      "pl": "mleko"
    }
  },
  {
    "level": "A1",
    "topic": "Travel",
    "word": "bus",
    "sentence": "We take the _____ to school.",
    "tr": {
      "ru": "автобус",
      "kk": "автобус",
      "sv": "buss",
      "de": "Bus",
      "es": "autobús",
      "fr": "bus",
      "it": "autobus",
      "tr": "otobüs",
      "uk": "автобус",
      "pl": "autobus"
    }
  },
  {
    "level": "A1",
    "topic": "People",
    "word": "mother",
    "sentence": "My _____ is at home.",
    "tr": {
      "ru": "мама",
      "kk": "ана",
      "sv": "mamma",
      "de": "Mutter",
      "es": "madre",
      "fr": "mère",
      "it": "madre",
      "tr": "anne",
      "uk": "мама",
      "pl": "matka"
    }
  },
  {
    "level": "A1",
    "topic": "People",
    "word": "teacher",
    "sentence": "The _____ explains the task.",
    "tr": {
      "ru": "учитель",
      "kk": "мұғалім",
      "sv": "lärare",
      "de": "Lehrer",
      "es": "profesor",
      "fr": "professeur",
      "it": "insegnante",
      "tr": "öğretmen",
      "uk": "вчитель",
      "pl": "nauczyciel"
    }
  },
  {
    "level": "A2",
    "topic": "School",
    "word": "homework",
    "sentence": "I finished my _____ before dinner.",
    "tr": {
      "ru": "домашнее задание",
      "kk": "үй тапсырмасы",
      "sv": "läxa",
      "de": "Hausaufgaben",
      "es": "tarea",
      "fr": "devoirs",
      "it": "compiti",
      "tr": "ödev",
      "uk": "домашнє завдання",
      "pl": "praca domowa"
    }
  },
  {
    "level": "A2",
    "topic": "Travel",
    "word": "ticket",
    "sentence": "I bought a train _____.",
    "tr": {
      "ru": "билет",
      "kk": "билет",
      "sv": "biljett",
      "de": "Ticket",
      "es": "billete",
      "fr": "billet",
      "it": "biglietto",
      "tr": "bilet",
      "uk": "квиток",
      "pl": "bilet"
    }
  },
  {
    "level": "A2",
    "topic": "Health",
    "word": "tired",
    "sentence": "I am very _____ after school.",
    "tr": {
      "ru": "уставший",
      "kk": "шаршаған",
      "sv": "trött",
      "de": "müde",
      "es": "cansado",
      "fr": "fatigué",
      "it": "stanco",
      "tr": "yorgun",
      "uk": "втомлений",
      "pl": "zmęczony"
    }
  },
  {
    "level": "A2",
    "topic": "Daily life",
    "word": "busy",
    "sentence": "I am _____ today.",
    "tr": {
      "ru": "занятый",
      "kk": "бос емес",
      "sv": "upptagen",
      "de": "beschäftigt",
      "es": "ocupado",
      "fr": "occupé",
      "it": "occupato",
      "tr": "meşgul",
      "uk": "зайнятий",
      "pl": "zajęty"
    }
  },
  {
    "level": "A2",
    "topic": "Daily life",
    "word": "clean",
    "sentence": "Please _____ your desk.",
    "tr": {
      "ru": "убирать / чистить",
      "kk": "тазалау",
      "sv": "städa",
      "de": "putzen",
      "es": "limpiar",
      "fr": "nettoyer",
      "it": "pulire",
      "tr": "temizlemek",
      "uk": "прибирати",
      "pl": "sprzątać"
    }
  },
  {
    "level": "A2",
    "topic": "Shopping",
    "word": "price",
    "sentence": "What is the _____ of this bag?",
    "tr": {
      "ru": "цена",
      "kk": "баға",
      "sv": "pris",
      "de": "Preis",
      "es": "precio",
      "fr": "prix",
      "it": "prezzo",
      "tr": "fiyat",
      "uk": "ціна",
      "pl": "cena"
    }
  },
  {
    "level": "A2",
    "topic": "Travel",
    "word": "station",
    "sentence": "Meet me at the bus _____.",
    "tr": {
      "ru": "станция / остановка",
      "kk": "бекет",
      "sv": "station",
      "de": "Bahnhof",
      "es": "estación",
      "fr": "gare",
      "it": "stazione",
      "tr": "istasyon",
      "uk": "станція",
      "pl": "stacja"
    }
  },
  {
    "level": "A2",
    "topic": "Health",
    "word": "medicine",
    "sentence": "Take this _____ after lunch.",
    "tr": {
      "ru": "лекарство",
      "kk": "дәрі",
      "sv": "medicin",
      "de": "Medizin",
      "es": "medicina",
      "fr": "médicament",
      "it": "medicina",
      "tr": "ilaç",
      "uk": "ліки",
      "pl": "lekarstwo"
    }
  },
  {
    "level": "A2",
    "topic": "Work",
    "word": "meeting",
    "sentence": "We have a _____ at ten.",
    "tr": {
      "ru": "встреча",
      "kk": "кездесу",
      "sv": "möte",
      "de": "Besprechung",
      "es": "reunión",
      "fr": "réunion",
      "it": "riunione",
      "tr": "toplantı",
      "uk": "зустріч",
      "pl": "spotkanie"
    }
  },
  {
    "level": "A2",
    "topic": "Emotions",
    "word": "worried",
    "sentence": "She is _____ about the test.",
    "tr": {
      "ru": "взволнованный / обеспокоенный",
      "kk": "уайымдаған",
      "sv": "orolig",
      "de": "besorgt",
      "es": "preocupado",
      "fr": "inquiet",
      "it": "preoccupato",
      "tr": "endişeli",
      "uk": "стурбований",
      "pl": "zmartwiony"
    }
  },
  {
    "level": "A2",
    "topic": "Study",
    "word": "practice",
    "sentence": "You need more _____ before the exam.",
    "tr": {
      "ru": "практика",
      "kk": "тәжірибе",
      "sv": "övning",
      "de": "Übung",
      "es": "práctica",
      "fr": "pratique",
      "it": "pratica",
      "tr": "pratik",
      "uk": "практика",
      "pl": "praktyka"
    }
  },
  {
    "level": "A2",
    "topic": "Travel",
    "word": "arrive",
    "sentence": "We will _____ at six.",
    "tr": {
      "ru": "прибывать",
      "kk": "келу",
      "sv": "anlända",
      "de": "ankommen",
      "es": "llegar",
      "fr": "arriver",
      "it": "arrivare",
      "tr": "varmak",
      "uk": "прибувати",
      "pl": "przybyć"
    }
  },
  {
    "level": "B1",
    "topic": "Emotions",
    "word": "confident",
    "sentence": "She feels _____ before the exam.",
    "tr": {
      "ru": "уверенный",
      "kk": "сенімді",
      "sv": "självsäker",
      "de": "selbstbewusst",
      "es": "seguro",
      "fr": "confiant",
      "it": "sicuro",
      "tr": "kendinden emin",
      "uk": "впевнений",
      "pl": "pewny siebie"
    }
  },
  {
    "level": "B1",
    "topic": "Work",
    "word": "deadline",
    "sentence": "The project _____ is Friday.",
    "tr": {
      "ru": "крайний срок",
      "kk": "соңғы мерзім",
      "sv": "deadline",
      "de": "Frist",
      "es": "fecha límite",
      "fr": "date limite",
      "it": "scadenza",
      "tr": "son teslim tarihi",
      "uk": "дедлайн",
      "pl": "termin"
    }
  },
  {
    "level": "B1",
    "topic": "Study",
    "word": "improve",
    "sentence": "I want to _____ my English.",
    "tr": {
      "ru": "улучшать",
      "kk": "жақсарту",
      "sv": "förbättra",
      "de": "verbessern",
      "es": "mejorar",
      "fr": "améliorer",
      "it": "migliorare",
      "tr": "geliştirmek",
      "uk": "покращувати",
      "pl": "poprawić"
    }
  },
  {
    "level": "B1",
    "topic": "Work",
    "word": "responsible",
    "sentence": "She is _____ for the report.",
    "tr": {
      "ru": "ответственный",
      "kk": "жауапты",
      "sv": "ansvarig",
      "de": "verantwortlich",
      "es": "responsable",
      "fr": "responsable",
      "it": "responsabile",
      "tr": "sorumlu",
      "uk": "відповідальний",
      "pl": "odpowiedzialny"
    }
  },
  {
    "level": "B1",
    "topic": "Daily life",
    "word": "decision",
    "sentence": "It was a difficult _____.",
    "tr": {
      "ru": "решение",
      "kk": "шешім",
      "sv": "beslut",
      "de": "Entscheidung",
      "es": "decisión",
      "fr": "décision",
      "it": "decisione",
      "tr": "karar",
      "uk": "рішення",
      "pl": "decyzja"
    }
  },
  {
    "level": "B1",
    "topic": "Emotions",
    "word": "disappointed",
    "sentence": "He was _____ with the result.",
    "tr": {
      "ru": "разочарованный",
      "kk": "көңілі қалған",
      "sv": "besviken",
      "de": "enttäuscht",
      "es": "decepcionado",
      "fr": "déçu",
      "it": "deluso",
      "tr": "hayal kırıklığına uğramış",
      "uk": "розчарований",
      "pl": "rozczarowany"
    }
  },
  {
    "level": "B1",
    "topic": "Society",
    "word": "community",
    "sentence": "The whole _____ helped them.",
    "tr": {
      "ru": "сообщество",
      "kk": "қауымдастық",
      "sv": "gemenskap",
      "de": "Gemeinschaft",
      "es": "comunidad",
      "fr": "communauté",
      "it": "comunità",
      "tr": "topluluk",
      "uk": "громада",
      "pl": "społeczność"
    }
  },
  {
    "level": "B1",
    "topic": "Work",
    "word": "experience",
    "sentence": "She has a lot of work _____.",
    "tr": {
      "ru": "опыт",
      "kk": "тәжірибе",
      "sv": "erfarenhet",
      "de": "Erfahrung",
      "es": "experiencia",
      "fr": "expérience",
      "it": "esperienza",
      "tr": "deneyim",
      "uk": "досвід",
      "pl": "doświadczenie"
    }
  },
  {
    "level": "B1",
    "topic": "Study",
    "word": "explain",
    "sentence": "Can you _____ this rule?",
    "tr": {
      "ru": "объяснять",
      "kk": "түсіндіру",
      "sv": "förklara",
      "de": "erklären",
      "es": "explicar",
      "fr": "expliquer",
      "it": "spiegare",
      "tr": "açıklamak",
      "uk": "пояснювати",
      "pl": "wyjaśniać"
    }
  },
  {
    "level": "B1",
    "topic": "Travel",
    "word": "journey",
    "sentence": "The _____ took three hours.",
    "tr": {
      "ru": "путешествие / поездка",
      "kk": "сапар",
      "sv": "resa",
      "de": "Reise",
      "es": "viaje",
      "fr": "voyage",
      "it": "viaggio",
      "tr": "yolculuk",
      "uk": "подорож",
      "pl": "podróż"
    }
  },
  {
    "level": "B1",
    "topic": "Emotions",
    "word": "relieved",
    "sentence": "I felt _____ after the test.",
    "tr": {
      "ru": "облегчённый",
      "kk": "жеңілдеген",
      "sv": "lättad",
      "de": "erleichtert",
      "es": "aliviado",
      "fr": "soulagé",
      "it": "sollevato",
      "tr": "rahatlamış",
      "uk": "полегшений",
      "pl": "odczuwający ulgę"
    }
  },
  {
    "level": "B1",
    "topic": "Work",
    "word": "skill",
    "sentence": "Communication is an important _____.",
    "tr": {
      "ru": "навык",
      "kk": "дағды",
      "sv": "färdighet",
      "de": "Fähigkeit",
      "es": "habilidad",
      "fr": "compétence",
      "it": "abilità",
      "tr": "beceri",
      "uk": "навичка",
      "pl": "umiejętność"
    }
  },
  {
    "level": "B2",
    "topic": "Business",
    "word": "negotiate",
    "sentence": "The companies will _____ the price.",
    "tr": {
      "ru": "вести переговоры",
      "kk": "келіссөз жүргізу",
      "sv": "förhandla",
      "de": "verhandeln",
      "es": "negociar",
      "fr": "négocier",
      "it": "negoziare",
      "tr": "müzakere etmek",
      "uk": "вести переговори",
      "pl": "negocjować"
    }
  },
  {
    "level": "B2",
    "topic": "Technology",
    "word": "privacy",
    "sentence": "Online _____ is very important.",
    "tr": {
      "ru": "конфиденциальность",
      "kk": "құпиялылық",
      "sv": "integritet",
      "de": "Datenschutz",
      "es": "privacidad",
      "fr": "confidentialité",
      "it": "privacy",
      "tr": "gizlilik",
      "uk": "конфіденційність",
      "pl": "prywatność"
    }
  },
  {
    "level": "B2",
    "topic": "Society",
    "word": "responsibility",
    "sentence": "Everyone has a _____ to help.",
    "tr": {
      "ru": "ответственность",
      "kk": "жауапкершілік",
      "sv": "ansvar",
      "de": "Verantwortung",
      "es": "responsabilidad",
      "fr": "responsabilité",
      "it": "responsabilità",
      "tr": "sorumluluk",
      "uk": "відповідальність",
      "pl": "odpowiedzialność"
    }
  },
  {
    "level": "B2",
    "topic": "Business",
    "word": "proposal",
    "sentence": "They accepted our business _____.",
    "tr": {
      "ru": "предложение",
      "kk": "ұсыныс",
      "sv": "förslag",
      "de": "Vorschlag",
      "es": "propuesta",
      "fr": "proposition",
      "it": "proposta",
      "tr": "teklif",
      "uk": "пропозиція",
      "pl": "propozycja"
    }
  },
  {
    "level": "B2",
    "topic": "Technology",
    "word": "device",
    "sentence": "This _____ saves time.",
    "tr": {
      "ru": "устройство",
      "kk": "құрылғы",
      "sv": "enhet",
      "de": "Gerät",
      "es": "dispositivo",
      "fr": "appareil",
      "it": "dispositivo",
      "tr": "cihaz",
      "uk": "пристрій",
      "pl": "urządzenie"
    }
  },
  {
    "level": "B2",
    "topic": "Society",
    "word": "impact",
    "sentence": "The law had a strong _____.",
    "tr": {
      "ru": "влияние",
      "kk": "әсер",
      "sv": "påverkan",
      "de": "Auswirkung",
      "es": "impacto",
      "fr": "impact",
      "it": "impatto",
      "tr": "etki",
      "uk": "вплив",
      "pl": "wpływ"
    }
  },
  {
    "level": "B2",
    "topic": "Business",
    "word": "budget",
    "sentence": "We need to reduce the _____.",
    "tr": {
      "ru": "бюджет",
      "kk": "бюджет",
      "sv": "budget",
      "de": "Budget",
      "es": "presupuesto",
      "fr": "budget",
      "it": "bilancio",
      "tr": "bütçe",
      "uk": "бюджет",
      "pl": "budżet"
    }
  },
  {
    "level": "B2",
    "topic": "Academic",
    "word": "argument",
    "sentence": "Her _____ was clear and logical.",
    "tr": {
      "ru": "аргумент",
      "kk": "дәйек",
      "sv": "argument",
      "de": "Argument",
      "es": "argumento",
      "fr": "argument",
      "it": "argomento",
      "tr": "argüman",
      "uk": "аргумент",
      "pl": "argument"
    }
  },
  {
    "level": "B2",
    "topic": "Emotions",
    "word": "frustrated",
    "sentence": "He felt _____ because nothing worked.",
    "tr": {
      "ru": "раздражённый / расстроенный",
      "kk": "ашуланған",
      "sv": "frustrerad",
      "de": "frustriert",
      "es": "frustrado",
      "fr": "frustré",
      "it": "frustrato",
      "tr": "sinirli",
      "uk": "розчарований",
      "pl": "sfrustrowany"
    }
  },
  {
    "level": "B2",
    "topic": "Work",
    "word": "efficient",
    "sentence": "This method is faster and more _____.",
    "tr": {
      "ru": "эффективный",
      "kk": "тиімді",
      "sv": "effektiv",
      "de": "effizient",
      "es": "eficiente",
      "fr": "efficace",
      "it": "efficiente",
      "tr": "verimli",
      "uk": "ефективний",
      "pl": "wydajny"
    }
  },
  {
    "level": "B2",
    "topic": "Business",
    "word": "profit",
    "sentence": "The company made a large _____.",
    "tr": {
      "ru": "прибыль",
      "kk": "пайда",
      "sv": "vinst",
      "de": "Gewinn",
      "es": "beneficio",
      "fr": "profit",
      "it": "profitto",
      "tr": "kâr",
      "uk": "прибуток",
      "pl": "zysk"
    }
  },
  {
    "level": "B2",
    "topic": "Technology",
    "word": "security",
    "sentence": "Data _____ protects users.",
    "tr": {
      "ru": "безопасность",
      "kk": "қауіпсіздік",
      "sv": "säkerhet",
      "de": "Sicherheit",
      "es": "seguridad",
      "fr": "sécurité",
      "it": "sicurezza",
      "tr": "güvenlik",
      "uk": "безпека",
      "pl": "bezpieczeństwo"
    }
  },
  {
    "level": "C1",
    "topic": "Academic",
    "word": "assumption",
    "sentence": "This argument is based on a weak _____.",
    "tr": {
      "ru": "предположение",
      "kk": "болжам",
      "sv": "antagande",
      "de": "Annahme",
      "es": "suposición",
      "fr": "hypothèse",
      "it": "ipotesi",
      "tr": "varsayım",
      "uk": "припущення",
      "pl": "założenie"
    }
  },
  {
    "level": "C1",
    "topic": "Academic",
    "word": "evidence",
    "sentence": "The claim needs stronger _____.",
    "tr": {
      "ru": "доказательства",
      "kk": "дәлел",
      "sv": "bevis",
      "de": "Beweise",
      "es": "evidencia",
      "fr": "preuves",
      "it": "prove",
      "tr": "kanıt",
      "uk": "докази",
      "pl": "dowody"
    }
  },
  {
    "level": "C1",
    "topic": "Business",
    "word": "strategy",
    "sentence": "The company changed its _____.",
    "tr": {
      "ru": "стратегия",
      "kk": "стратегия",
      "sv": "strategi",
      "de": "Strategie",
      "es": "estrategia",
      "fr": "stratégie",
      "it": "strategia",
      "tr": "strateji",
      "uk": "стратегія",
      "pl": "strategia"
    }
  },
  {
    "level": "C1",
    "topic": "Academic",
    "word": "evaluate",
    "sentence": "Researchers must _____ the results carefully.",
    "tr": {
      "ru": "оценивать",
      "kk": "бағалау",
      "sv": "utvärdera",
      "de": "bewerten",
      "es": "evaluar",
      "fr": "évaluer",
      "it": "valutare",
      "tr": "değerlendirmek",
      "uk": "оцінювати",
      "pl": "oceniać"
    }
  },
  {
    "level": "C1",
    "topic": "Society",
    "word": "inequality",
    "sentence": "Education can reduce _____.",
    "tr": {
      "ru": "неравенство",
      "kk": "теңсіздік",
      "sv": "ojämlikhet",
      "de": "Ungleichheit",
      "es": "desigualdad",
      "fr": "inégalité",
      "it": "disuguaglianza",
      "tr": "eşitsizlik",
      "uk": "нерівність",
      "pl": "nierówność"
    }
  },
  {
    "level": "C1",
    "topic": "Academic",
    "word": "interpret",
    "sentence": "Students must _____ the data.",
    "tr": {
      "ru": "интерпретировать",
      "kk": "түсіндіру",
      "sv": "tolka",
      "de": "interpretieren",
      "es": "interpretar",
      "fr": "interpréter",
      "it": "interpretare",
      "tr": "yorumlamak",
      "uk": "інтерпретувати",
      "pl": "interpretować"
    }
  },
  {
    "level": "C1",
    "topic": "Business",
    "word": "implement",
    "sentence": "The team will _____ a new plan.",
    "tr": {
      "ru": "внедрять",
      "kk": "іске асыру",
      "sv": "genomföra",
      "de": "umsetzen",
      "es": "implementar",
      "fr": "mettre en œuvre",
      "it": "implementare",
      "tr": "uygulamak",
      "uk": "впроваджувати",
      "pl": "wdrażać"
    }
  },
  {
    "level": "C1",
    "topic": "Academic",
    "word": "criteria",
    "sentence": "The essay must meet the assessment _____.",
    "tr": {
      "ru": "критерии",
      "kk": "өлшемдер",
      "sv": "kriterier",
      "de": "Kriterien",
      "es": "criterios",
      "fr": "critères",
      "it": "criteri",
      "tr": "kriterler",
      "uk": "критерії",
      "pl": "kryteria"
    }
  },
  {
    "level": "C1",
    "topic": "Business",
    "word": "sustainable",
    "sentence": "The company needs a _____ model.",
    "tr": {
      "ru": "устойчивый",
      "kk": "тұрақты",
      "sv": "hållbar",
      "de": "nachhaltig",
      "es": "sostenible",
      "fr": "durable",
      "it": "sostenibile",
      "tr": "sürdürülebilir",
      "uk": "сталий",
      "pl": "zrównoważony"
    }
  },
  {
    "level": "C1",
    "topic": "Academic",
    "word": "perspective",
    "sentence": "This gives us a different _____.",
    "tr": {
      "ru": "точка зрения",
      "kk": "көзқарас",
      "sv": "perspektiv",
      "de": "Perspektive",
      "es": "perspectiva",
      "fr": "perspective",
      "it": "prospettiva",
      "tr": "bakış açısı",
      "uk": "перспектива",
      "pl": "perspektywa"
    }
  },
  {
    "level": "C1",
    "topic": "Society",
    "word": "legislation",
    "sentence": "New _____ changed the rules.",
    "tr": {
      "ru": "законодательство",
      "kk": "заңнама",
      "sv": "lagstiftning",
      "de": "Gesetzgebung",
      "es": "legislación",
      "fr": "législation",
      "it": "legislazione",
      "tr": "mevzuat",
      "uk": "законодавство",
      "pl": "ustawodawstwo"
    }
  },
  {
    "level": "C1",
    "topic": "Academic",
    "word": "relevant",
    "sentence": "Only _____ examples should be included.",
    "tr": {
      "ru": "релевантный / уместный",
      "kk": "маңызды / қатысты",
      "sv": "relevant",
      "de": "relevant",
      "es": "relevante",
      "fr": "pertinent",
      "it": "rilevante",
      "tr": "ilgili",
      "uk": "релевантний",
      "pl": "istotny"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "ambiguous",
    "sentence": "The instructions were _____ and confusing.",
    "tr": {
      "ru": "двусмысленный",
      "kk": "екіұшты",
      "sv": "tvetydig",
      "de": "mehrdeutig",
      "es": "ambiguo",
      "fr": "ambigu",
      "it": "ambiguo",
      "tr": "belirsiz",
      "uk": "двозначний",
      "pl": "niejednoznaczny"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "subtle",
    "sentence": "There was a _____ difference between the two ideas.",
    "tr": {
      "ru": "тонкий / едва заметный",
      "kk": "нәзік / байқалмайтын",
      "sv": "subtil",
      "de": "subtil",
      "es": "sutil",
      "fr": "subtil",
      "it": "sottile",
      "tr": "ince",
      "uk": "тонкий",
      "pl": "subtelny"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "meticulous",
    "sentence": "She is _____ when checking details.",
    "tr": {
      "ru": "дотошный",
      "kk": "ұқыпты",
      "sv": "noggrann",
      "de": "akribisch",
      "es": "meticuloso",
      "fr": "méticuleux",
      "it": "meticoloso",
      "tr": "titiz",
      "uk": "ретельний",
      "pl": "skrupulatny"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "scrutinize",
    "sentence": "The committee will _____ every detail.",
    "tr": {
      "ru": "тщательно изучать",
      "kk": "мұқият тексеру",
      "sv": "granska",
      "de": "genau prüfen",
      "es": "examinar minuciosamente",
      "fr": "examiner minutieusement",
      "it": "esaminare attentamente",
      "tr": "incelemek",
      "uk": "ретельно перевіряти",
      "pl": "dokładnie analizować"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "convoluted",
    "sentence": "The explanation was too _____ to follow.",
    "tr": {
      "ru": "запутанный",
      "kk": "күрделі / шатасқан",
      "sv": "invecklad",
      "de": "kompliziert",
      "es": "enrevesado",
      "fr": "alambiqué",
      "it": "contorto",
      "tr": "karmaşık",
      "uk": "заплутаний",
      "pl": "zawiły"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "mitigate",
    "sentence": "They tried to _____ the risks.",
    "tr": {
      "ru": "смягчать / уменьшать",
      "kk": "азайту",
      "sv": "mildra",
      "de": "mindern",
      "es": "mitigar",
      "fr": "atténuer",
      "it": "mitigare",
      "tr": "azaltmak",
      "uk": "пом’якшувати",
      "pl": "łagodzić"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "inherent",
    "sentence": "There are _____ problems in this system.",
    "tr": {
      "ru": "присущий",
      "kk": "тән",
      "sv": "inneboende",
      "de": "inhärent",
      "es": "inherente",
      "fr": "inhérent",
      "it": "intrinseco",
      "tr": "doğasında olan",
      "uk": "властивий",
      "pl": "wrodzony"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "nuance",
    "sentence": "The debate lacks _____.",
    "tr": {
      "ru": "нюанс",
      "kk": "реңк / нюанс",
      "sv": "nyans",
      "de": "Nuance",
      "es": "matiz",
      "fr": "nuance",
      "it": "sfumatura",
      "tr": "nüans",
      "uk": "нюанс",
      "pl": "niuans"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "paradox",
    "sentence": "This creates a strange _____.",
    "tr": {
      "ru": "парадокс",
      "kk": "парадокс",
      "sv": "paradox",
      "de": "Paradox",
      "es": "paradoja",
      "fr": "paradoxe",
      "it": "paradosso",
      "tr": "paradoks",
      "uk": "парадокс",
      "pl": "paradoks"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "resilient",
    "sentence": "The system is surprisingly _____.",
    "tr": {
      "ru": "устойчивый / стойкий",
      "kk": "төзімді",
      "sv": "motståndskraftig",
      "de": "widerstandsfähig",
      "es": "resiliente",
      "fr": "résilient",
      "it": "resiliente",
      "tr": "dirençli",
      "uk": "стійкий",
      "pl": "odporny"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "undermine",
    "sentence": "False information can _____ trust.",
    "tr": {
      "ru": "подрывать",
      "kk": "әлсірету",
      "sv": "underminera",
      "de": "untergraben",
      "es": "socavar",
      "fr": "saper",
      "it": "minare",
      "tr": "zayıflatmak",
      "uk": "підривати",
      "pl": "podważać"
    }
  },
  {
    "level": "C2",
    "topic": "Advanced",
    "word": "discrepancy",
    "sentence": "There is a clear _____ in the data.",
    "tr": {
      "ru": "несоответствие",
      "kk": "сәйкессіздік",
      "sv": "avvikelse",
      "de": "Diskrepanz",
      "es": "discrepancia",
      "fr": "écart",
      "it": "discrepanza",
      "tr": "tutarsızlık",
      "uk": "розбіжність",
      "pl": "rozbieżność"
    }
  }
];


function bankWord(level, topic, word, sentence, ru, kk, sv, de, es, fr, it, tr, uk, pl) {
  return { level, topic, word, sentence, tr: { ru, kk, sv, de, es, fr, it, tr, uk, pl } };
}

const EXTRA_WORD_BANK = [
  bankWord("A1", "Business", "shop", "The _____ is open today.", "магазин", "дүкен", "butik", "Geschäft", "tienda", "magasin", "negozio", "dükkan", "магазин", "sklep"),
  bankWord("A1", "Business", "sell", "They _____ books in this shop.", "продавать", "сату", "sälja", "verkaufen", "vender", "vendre", "vendere", "satmak", "продавати", "sprzedawać"),
  bankWord("A1", "Business", "buy", "I want to _____ a notebook.", "покупать", "сатып алу", "köpa", "kaufen", "comprar", "acheter", "comprare", "satın almak", "купувати", "kupować"),
  bankWord("A1", "Business", "price", "What is the _____ of this pen?", "цена", "баға", "pris", "Preis", "precio", "prix", "prezzo", "fiyat", "ціна", "cena"),
  bankWord("A1", "Business", "work", "My father goes to _____ every morning.", "работа", "жұмыс", "arbete", "Arbeit", "trabajo", "travail", "lavoro", "iş", "робота", "praca"),
  bankWord("A1", "Finance", "money", "I need some _____ for the bus.", "деньги", "ақша", "pengar", "Geld", "dinero", "argent", "soldi", "para", "гроші", "pieniądze"),
  bankWord("A1", "Finance", "coin", "I found a small _____ on the floor.", "монета", "тиын", "mynt", "Münze", "moneda", "pièce", "moneta", "bozuk para", "монета", "moneta"),
  bankWord("A1", "Finance", "card", "Can I pay by _____?", "карта", "карта", "kort", "Karte", "tarjeta", "carte", "carta", "kart", "картка", "karta"),
  bankWord("A1", "Finance", "pay", "I will _____ for the ticket.", "платить", "төлеу", "betala", "bezahlen", "pagar", "payer", "pagare", "ödemek", "платити", "płacić"),
  bankWord("A1", "Finance", "bank", "The _____ is near the station.", "банк", "банк", "bank", "Bank", "banco", "banque", "banca", "banka", "банк", "bank"),

  bankWord("A2", "Business", "customer", "The _____ asked for help.", "клиент", "клиент", "kund", "Kunde", "cliente", "client", "cliente", "müşteri", "клієнт", "klient"),
  bankWord("A2", "Business", "order", "We need to prepare the _____.", "заказ", "тапсырыс", "beställning", "Bestellung", "pedido", "commande", "ordine", "sipariş", "замовлення", "zamówienie"),
  bankWord("A2", "Business", "product", "This _____ is popular.", "продукт", "өнім", "produkt", "Produkt", "producto", "produit", "prodotto", "ürün", "продукт", "produkt"),
  bankWord("A2", "Business", "service", "The hotel offers good _____.", "услуга", "қызмет", "service", "Dienstleistung", "servicio", "service", "servizio", "hizmet", "послуга", "usługa"),
  bankWord("A2", "Business", "meeting", "We have a _____ at ten.", "встреча", "кездесу", "möte", "Treffen", "reunión", "réunion", "riunione", "toplantı", "зустріч", "spotkanie"),
  bankWord("A2", "Finance", "save", "I try to _____ money every month.", "копить", "жинау", "spara", "sparen", "ahorrar", "économiser", "risparmiare", "biriktirmek", "заощаджувати", "oszczędzać"),
  bankWord("A2", "Finance", "spend", "Do not _____ all your money.", "тратить", "жұмсау", "spendera", "ausgeben", "gastar", "dépenser", "spendere", "harcamak", "витрачати", "wydawać"),
  bankWord("A2", "Finance", "cheap", "This bag is very _____.", "дешёвый", "арзан", "billig", "billig", "barato", "bon marché", "economico", "ucuz", "дешевий", "tani"),
  bankWord("A2", "Finance", "expensive", "The phone is too _____.", "дорогой", "қымбат", "dyr", "teuer", "caro", "cher", "costoso", "pahalı", "дорогий", "drogi"),
  bankWord("A2", "Finance", "bill", "The restaurant _____ was high.", "счёт", "шот", "räkning", "Rechnung", "cuenta", "addition", "conto", "hesap", "рахунок", "rachunek"),

  bankWord("B1", "Business", "manager", "The _____ explained the plan.", "менеджер", "менеджер", "chef", "Manager", "gerente", "responsable", "manager", "yönetici", "менеджер", "menedżer"),
  bankWord("B1", "Business", "deadline", "We must finish before the _____.", "крайний срок", "соңғы мерзім", "deadline", "Frist", "plazo", "date limite", "scadenza", "son tarih", "дедлайн", "termin"),
  bankWord("B1", "Business", "client", "The _____ wants a clear answer.", "клиент", "клиент", "kund", "Kunde", "cliente", "client", "cliente", "müşteri", "клієнт", "klient"),
  bankWord("B1", "Business", "project", "This _____ needs teamwork.", "проект", "жоба", "projekt", "Projekt", "proyecto", "projet", "progetto", "proje", "проєкт", "projekt"),
  bankWord("B1", "Business", "agreement", "They signed an _____.", "соглашение", "келісім", "avtal", "Vereinbarung", "acuerdo", "accord", "accordo", "anlaşma", "угода", "umowa"),
  bankWord("B1", "Finance", "budget", "The family made a monthly _____.", "бюджет", "бюджет", "budget", "Budget", "presupuesto", "budget", "bilancio", "bütçe", "бюджет", "budżet"),
  bankWord("B1", "Finance", "income", "Her monthly _____ increased.", "доход", "табыс", "inkomst", "Einkommen", "ingresos", "revenu", "reddito", "gelir", "дохід", "dochód"),
  bankWord("B1", "Finance", "expense", "Rent is my biggest _____.", "расход", "шығын", "utgift", "Ausgabe", "gasto", "dépense", "spesa", "gider", "витрата", "wydatek"),
  bankWord("B1", "Finance", "profit", "The company made a _____.", "прибыль", "пайда", "vinst", "Gewinn", "beneficio", "profit", "profitto", "kâr", "прибуток", "zysk"),
  bankWord("B1", "Finance", "debt", "He wants to pay off his _____.", "долг", "қарыз", "skuld", "Schuld", "deuda", "dette", "debito", "borç", "борг", "dług"),

  bankWord("B2", "Business", "negotiate", "They will _____ the contract tomorrow.", "вести переговоры", "келіссөз жүргізу", "förhandla", "verhandeln", "negociar", "négocier", "negoziare", "müzakere etmek", "вести переговори", "negocjować"),
  bankWord("B2", "Business", "strategy", "The team needs a clear _____.", "стратегия", "стратегия", "strategi", "Strategie", "estrategia", "stratégie", "strategia", "strateji", "стратегія", "strategia"),
  bankWord("B2", "Business", "responsibility", "She took _____ for the result.", "ответственность", "жауапкершілік", "ansvar", "Verantwortung", "responsabilidad", "responsabilité", "responsabilità", "sorumluluk", "відповідальність", "odpowiedzialność"),
  bankWord("B2", "Business", "proposal", "His _____ was practical.", "предложение", "ұсыныс", "förslag", "Vorschlag", "propuesta", "proposition", "proposta", "teklif", "пропозиція", "propozycja"),
  bankWord("B2", "Business", "risk", "Every decision has some _____.", "риск", "тәуекел", "risk", "Risiko", "riesgo", "risque", "rischio", "risk", "ризик", "ryzyko"),
  bankWord("B2", "Finance", "investment", "The _____ may grow over time.", "инвестиция", "инвестиция", "investering", "Investition", "inversión", "investissement", "investimento", "yatırım", "інвестиція", "inwestycja"),
  bankWord("B2", "Finance", "revenue", "The company increased its _____.", "выручка", "түсім", "intäkter", "Umsatz", "ingresos", "chiffre d’affaires", "ricavi", "gelir", "виручка", "przychód"),
  bankWord("B2", "Finance", "cash flow", "Healthy _____ is important for survival.", "денежный поток", "ақша ағыны", "kassaflöde", "Cashflow", "flujo de caja", "flux de trésorerie", "flusso di cassa", "nakit akışı", "грошовий потік", "przepływ gotówki"),
  bankWord("B2", "Finance", "loan", "The bank approved the _____.", "кредит", "несие", "lån", "Kredit", "préstamo", "prêt", "prestito", "kredi", "кредит", "pożyczka"),
  bankWord("B2", "Finance", "asset", "The building is a valuable _____.", "актив", "актив", "tillgång", "Vermögenswert", "activo", "actif", "bene", "varlık", "актив", "aktywo"),

  bankWord("C1", "Business", "stakeholder", "Every _____ has different priorities.", "заинтересованная сторона", "мүдделі тарап", "intressent", "Stakeholder", "parte interesada", "partie prenante", "parte interessata", "paydaş", "зацікавлена сторона", "interesariusz"),
  bankWord("C1", "Business", "leverage", "The firm can _____ its network.", "использовать как преимущество", "тиімді пайдалану", "utnyttja", "nutzen", "aprovechar", "exploiter", "sfruttare", "kaldıraç olarak kullanmak", "використати", "wykorzystać"),
  bankWord("C1", "Business", "implementation", "The _____ stage was difficult.", "внедрение", "іске асыру", "genomförande", "Umsetzung", "implementación", "mise en œuvre", "attuazione", "uygulama", "впровадження", "wdrożenie"),
  bankWord("C1", "Business", "competitive advantage", "Speed became their _____.", "конкурентное преимущество", "бәсекелік артықшылық", "konkurrensfördel", "Wettbewerbsvorteil", "ventaja competitiva", "avantage concurrentiel", "vantaggio competitivo", "rekabet avantajı", "конкурентна перевага", "przewaga konkurencyjna"),
  bankWord("C1", "Business", "scalable", "The model is _____.", "масштабируемый", "масштабталатын", "skalbar", "skalierbar", "escalable", "évolutif", "scalabile", "ölçeklenebilir", "масштабований", "skalowalny"),
  bankWord("C1", "Finance", "liquidity", "The firm needs enough _____.", "ликвидность", "өтімділік", "likviditet", "Liquidität", "liquidez", "liquidité", "liquidità", "likidite", "ліквідність", "płynność"),
  bankWord("C1", "Finance", "forecast", "The analyst updated the _____.", "прогноз", "болжам", "prognos", "Prognose", "pronóstico", "prévision", "previsione", "tahmin", "прогноз", "prognoza"),
  bankWord("C1", "Finance", "valuation", "The _____ seemed too optimistic.", "оценка стоимости", "бағалау", "värdering", "Bewertung", "valoración", "valorisation", "valutazione", "değerleme", "оцінка вартості", "wycena"),
  bankWord("C1", "Finance", "margin", "The profit _____ improved.", "маржа", "маржа", "marginal", "Marge", "margen", "marge", "margine", "marj", "маржа", "marża"),
  bankWord("C1", "Finance", "return", "Investors expect a strong _____.", "доходность", "қайтарым", "avkastning", "Rendite", "rendimiento", "rendement", "rendimento", "getiri", "дохідність", "zwrot"),

  bankWord("C2", "Business", "due diligence", "The acquisition requires careful _____.", "комплексная проверка", "жан-жақты тексеру", "företagsbesiktning", "Due Diligence", "diligencia debida", "audit préalable", "due diligence", "durum tespiti", "належна перевірка", "due diligence"),
  bankWord("C2", "Business", "strategic alignment", "The board questioned the _____.", "стратегическое соответствие", "стратегиялық сәйкестік", "strategisk anpassning", "strategische Ausrichtung", "alineación estratégica", "alignement stratégique", "allineamento strategico", "stratejik uyum", "стратегічне узгодження", "zgodność strategiczna"),
  bankWord("C2", "Business", "operational resilience", "The crisis tested their _____.", "операционная устойчивость", "операциялық тұрақтылық", "operativ motståndskraft", "operative Resilienz", "resiliencia operativa", "résilience opérationnelle", "resilienza operativa", "operasyonel dayanıklılık", "операційна стійкість", "odporność operacyjna"),
  bankWord("C2", "Business", "governance", "Weak _____ can destroy trust.", "корпоративное управление", "басқару", "styrning", "Governance", "gobernanza", "gouvernance", "governance", "yönetişim", "врядування", "ład korporacyjny"),
  bankWord("C2", "Business", "market positioning", "Their _____ was deliberately premium.", "позиционирование на рынке", "нарықтағы орны", "marknadspositionering", "Marktpositionierung", "posicionamiento de mercado", "positionnement sur le marché", "posizionamento di mercato", "pazar konumlandırması", "ринкове позиціонування", "pozycjonowanie rynkowe"),
  bankWord("C2", "Finance", "capital allocation", "Poor _____ limits long-term growth.", "распределение капитала", "капитал бөлу", "kapitalallokering", "Kapitalallokation", "asignación de capital", "allocation du capital", "allocazione del capitale", "sermaye tahsisi", "розподіл капіталу", "alokacja kapitału"),
  bankWord("C2", "Finance", "leverage ratio", "The _____ worried investors.", "коэффициент финансового рычага", "левередж коэффициенті", "skuldsättningsgrad", "Verschuldungsgrad", "ratio de apalancamiento", "ratio d’endettement", "rapporto di leva", "kaldıraç oranı", "коефіцієнт левериджу", "wskaźnik dźwigni"),
  bankWord("C2", "Finance", "working capital", "The CFO improved _____.", "оборотный капитал", "айналым капиталы", "rörelsekapital", "Working Capital", "capital de trabajo", "fonds de roulement", "capitale circolante", "işletme sermayesi", "оборотний капітал", "kapitał obrotowy"),
  bankWord("C2", "Finance", "impairment", "The asset faced an _____ charge.", "обесценение", "құнсыздану", "nedskrivning", "Wertminderung", "deterioro", "dépréciation", "svalutazione", "değer düşüklüğü", "знецінення", "utrata wartości"),
  bankWord("C2", "Finance", "fiduciary duty", "Directors have a _____.", "фидуциарная обязанность", "сенімгерлік міндет", "förvaltaransvar", "Treuepflicht", "deber fiduciario", "devoir fiduciaire", "dovere fiduciario", "mütevelli yükümlülüğü", "фідуціарний обов’язок", "obowiązek powierniczy")
];

const COMPLETE_WORD_BANK = [...WORD_BANK, ...EXTRA_WORD_BANK];

const DEFAULT_INPUT = COMPLETE_WORD_BANK.slice(7, 16).map((item) => `${item.word} — ${item.tr.ru}`).join(NL);

function languageByCode(code) {
  return LANGUAGES.find((lang) => lang.code === code) || LANGUAGES[0];
}

function translationOf(item, code) {
  if (item.tr && item.tr[code]) return item.tr[code];
  return item.meaning || "teacher checks / add translation manually";
}

function parseWords(text) {
  return text
    .split(NL)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const divider = line.includes("—") ? "—" : "-";
      const parts = line.split(divider);
      const word = String(parts[0] || "").trim();
      const meaning = parts.slice(1).join(" — ").trim();
      return {
        word,
        meaning,
        sentence: meaning
          ? `In this vocabulary set, _____ means: ${meaning}.`
          : `Use the word correctly: _____.`,
        topic: "Custom",
        level: "Custom",
        tr: {}
      };
    })
    .filter((item) => item.word.length > 0);
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i = i - 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

function seededShuffle(items, seed = 1) {
  const result = [...items];
  let value = Number(seed) || 1;
  function random() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  }
  for (let i = result.length - 1; i > 0; i = i - 1) {
    const j = Math.floor(random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

function pickAutoWords(level, topic, count, seed = 1) {
  const needed = Math.max(3, Math.min(Number(count) || 10, 18));

  let levelPool = level === "Mixed"
    ? [...COMPLETE_WORD_BANK]
    : COMPLETE_WORD_BANK.filter((item) => item.level === level);

  if (topic !== "Any topic") {
    const exactTopicPool = levelPool.filter((item) => item.topic === topic);
    const sameTopicAllLevels = COMPLETE_WORD_BANK.filter((item) => item.topic === topic);

    if (exactTopicPool.length >= needed) {
      levelPool = exactTopicPool;
    } else if (exactTopicPool.length > 0) {
      const filler = levelPool.filter((item) => item.topic !== topic);
      levelPool = [...exactTopicPool, ...filler];
    } else if (sameTopicAllLevels.length > 0) {
      levelPool = sameTopicAllLevels;
    }
  }

  const shuffled = seededShuffle(levelPool, seed);
  return shuffled.slice(0, Math.min(needed, shuffled.length));
}

function fileName(title) {
  return String(title || "vocabulary_workbook").toLowerCase().split(" ").filter(Boolean).join("_") + ".txt";
}

function header({ title, level, format, targetLanguage, autoMode }) {
  const lang = languageByCode(targetLanguage);
  const lines = [
    String(title || "Vocabulary Practice Workbook").toUpperCase(),
    `Level: ${level}`,
    `Format: ${format}`,
    `Translation language: ${lang.name}`,
    autoMode ? "Mode: automatic vocabulary" : "Mode: custom pasted vocabulary",
    ""
  ];
  if (!lang.builtIn) {
    lines.push(`Note: ${lang.name} is available as a task language, but automatic answer-key translations are limited. For exact answers, paste your own bilingual list: word — meaning.`, "");
  }
  return lines.join(NL);
}

function wordList(words, langCode) {
  const lang = languageByCode(langCode);
  const lines = [`VOCABULARY LIST: ENGLISH — ${lang.name}`, ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word} — ${translationOf(item, langCode)}`));
  return lines.join(NL);
}

function learningPath() {
  return [
    "LEARNING SEQUENCE",
    "1. Study the vocabulary list first.",
    "2. Check meaning recognition.",
    "3. Practise the words in context.",
    "4. Use the words in speaking or writing.",
    "5. Test yourself and check your score.",
    ""
  ].join(NL);
}

function exampleSentence(item) {
  const sentence = item.sentence || "Use the word correctly: _____.";
  if (sentence.includes("_____")) return sentence.replace("_____", item.word);
  return `${item.word}: ${sentence}`;
}

function matchMeanings(words, langCode, showAnswers = true) {
  const mixed = shuffle(words);
  const lines = ["EXERCISE 1. Match the English words with the translations/meanings.", ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
  lines.push("");
  mixed.forEach((item, index) => lines.push(`${String.fromCharCode(65 + index)}. ${translationOf(item, langCode)}`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, index) => {
      const answerIndex = mixed.findIndex((mixedItem) => mixedItem.word === item.word);
      lines.push(`${index + 1}. ${String.fromCharCode(65 + answerIndex)} — ${item.word} = ${translationOf(item, langCode)}`);
    });
  }
  return lines.join(NL);
}

function fillGaps(words, showAnswers = true) {
  const lines = ["EXERCISE 2. Fill in the gaps.", "", "Use the words:", words.map((item) => item.word).join(" – "), ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.sentence || `Use the word correctly: _____.`}`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
  }
  return lines.join(NL);
}

function multipleChoice(words, langCode, showAnswers = true) {
  const lines = ["EXERCISE 3. Choose the correct English word.", ""];
  const answers = [];
  words.forEach((item, index) => {
    const options = shuffle([item, ...shuffle(words.filter((other) => other.word !== item.word)).slice(0, 3)]).map((option) => option.word);
    const correctLetter = String.fromCharCode(65 + options.indexOf(item.word));
    answers.push(`${index + 1}. ${correctLetter} — ${item.word}`);
    lines.push(`${index + 1}. ${translationOf(item, langCode)}`);
    options.forEach((option, optionIndex) => lines.push(`${String.fromCharCode(65 + optionIndex)}. ${option}`));
    lines.push("");
  });
  if (showAnswers) lines.push("Answer Key:", ...answers);
  return lines.join(NL);
}

function translateIntoEnglish(words, langCode, showAnswers = true) {
  const lang = languageByCode(langCode);
  const lines = [`EXERCISE 4. Translate from ${lang.name} into English.`, ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${translationOf(item, langCode)} — ______________________________`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
  }
  return lines.join(NL);
}

function translateFromEnglish(words, langCode, showAnswers = true) {
  const lang = languageByCode(langCode);
  const lines = [`EXERCISE 5. Translate from English into ${lang.name}.`, ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word} — ______________________________`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, index) => lines.push(`${index + 1}. ${translationOf(item, langCode)}`));
  }
  return lines.join(NL);
}

function makeSentences(words) {
  const lines = ["EXERCISE 6. Make your own sentences.", ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}: ________________________________________________________________`));
  lines.push("", "Teacher check: the student must use each word naturally and correctly.");
  return lines.join(NL);
}

function speakingPractice(words, level) {
  const lines = ["SPEAKING PRACTICE", "", `Level focus: ${level}.`, ""];
  words.forEach((item, index) => lines.push(`${index + 1}. Give a real-life example using the word: ${item.word}`));
  lines.push("", "Challenge: choose five words and connect them in one longer answer.");
  return lines.join(NL);
}

function dialogueScenario(level) {
  if (level === "A1" || level === "A2") return "Two classmates are talking after school.";
  if (level === "B1") return "Two students are planning a small class project.";
  if (level === "B2") return "Two colleagues are preparing for a meeting.";
  if (level === "C1") return "Two team members are discussing a difficult decision.";
  return "Two senior colleagues are discussing a complex professional situation.";
}

function readyDialogue(words, level) {
  const selected = words.slice(0, 10);
  const lines = [
    "READY DIALOGUE",
    `Scenario: ${dialogueScenario(level)}`,
    "",
    "A: Before we start, let's review the vocabulary and use it in real context.",
    `B: Good idea. The first useful word is ${selected[0]?.word || "important"}: ${translationOf(selected[0] || { meaning: "important" }, "ru")}.`,
    `A: My example is: ${selected[0] ? exampleSentence(selected[0]) : "This word is useful in many situations."}`,
    `B: Another word we need is ${selected[1]?.word || "plan"}.`,
    `A: Right. For example: ${selected[1] ? exampleSentence(selected[1]) : "We should make a clear plan."}`,
    `B: I also want to practise ${selected[2]?.word || "communication"}, because it is easy to forget in speech.`,
    `A: Then let's make one more sentence: ${selected[2] ? exampleSentence(selected[2]) : "Communication helps people work together."}`,
    `B: What about ${selected[3]?.word || "decision"}? Can you use it naturally?`,
    `A: Yes: ${selected[3] ? exampleSentence(selected[3]) : "We need to make a good decision."}`,
    `B: Great. Now we should use ${selected[4]?.word || "the last word"} in a longer answer.`,
    `A: Example: ${selected[4] ? exampleSentence(selected[4]) : "The last word should appear in a natural sentence."}`,
    "B: Perfect. Now the vocabulary is not just a list; it is connected to examples and practice."
  ];
  return lines.join(NL);
}

function gappedDialogue(words, level, showAnswers = true) {
  const selected = words.slice(0, 8);
  const lines = [
    "DIALOGUE EXERCISE: Fill in the missing words.",
    "Use the vocabulary list before the dialogue.",
    ""
  ];
  selected.forEach((item, index) => {
    const sentence = exampleSentence(item).replace(new RegExp(item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "_____");
    lines.push(`${index + 1}. ${sentence}`);
  });
  if (showAnswers) {
    lines.push("", "Answer Key:");
    selected.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
  }
  return lines.join(NL);
}

function dialogueComprehension(words, level, showAnswers = true) {
  const lines = [
    "DIALOGUE EXERCISE: Comprehension questions.",
    "Answer in full sentences.",
    "",
    "1. What problem are the speakers discussing?",
    "2. Why do they need to be careful before making a decision?",
    "3. Which vocabulary word means that something is not simple or obvious?",
    "4. What should they do before speaking to the other team?",
    "5. Choose three target words and explain how they are used in the dialogue."
  ];
  if (showAnswers) {
    lines.push("", "Suggested Answer Key:");
    lines.push("1. They are discussing a situation that may affect the whole project.");
    lines.push("2. They may choose the wrong solution if they decide too quickly.");
    lines.push(`3. Possible answer: ${words[4]?.word || "subtle/complex"}.`);
    lines.push("4. They should prepare their ideas first.");
    lines.push("5. Teacher check: answers should explain the meaning in context.");
  }
  return lines.join(NL);
}

function dialogueRolePlay(words, level) {
  const selected = words.slice(0, 8).map((item) => item.word).join(" – ");
  const lines = [
    "DIALOGUE EXERCISE: Role-play.",
    "",
    "Student A: You think the project needs a safer plan.",
    "Student B: You think the team should act quickly.",
    "",
    `Use at least 6 of these words: ${selected}`,
    "",
    "Step 1. Prepare your arguments.",
    "Step 2. Have a 2–3 minute dialogue.",
    "Step 3. Finish with a decision both speakers can accept."
  ];
  return lines.join(NL);
}

function dialoguePractice(words, level, langCode, exerciseType, showAnswers = true) {
  const lines = ["DIALOGUE PRACTICE", "", `Level focus: ${level}.`, ""];
  lines.push(readyDialogue(words, level));
  lines.push("", "TARGET VOCABULARY IN THE DIALOGUE", "");
  words.slice(0, 10).forEach((item, index) => lines.push(`${index + 1}. ${item.word} — ${translationOf(item, langCode)}`));
  lines.push("", "DIALOGUE TASK BASED ON YOUR EXERCISE TYPE", "");

  if (exerciseType === "gap") lines.push(gappedDialogue(words, level, showAnswers));
  else if (exerciseType === "choose") lines.push(multipleChoice(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "match") lines.push(matchMeanings(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "intoEnglish") lines.push(translateIntoEnglish(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "fromEnglish") lines.push(translateFromEnglish(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "collocations") lines.push(collocationPractice(words.slice(0, 8), showAnswers));
  else if (exerciseType === "definitions") lines.push(definitionPractice(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "questions") lines.push(dialogueComprehension(words, level, showAnswers));
  else if (exerciseType === "sentences") lines.push(dialogueRolePlay(words, level));
  else if (exerciseType === "spelling") lines.push(spellingPractice(words.slice(0, 8), showAnswers));
  else if (exerciseType === "transformation") lines.push(sentenceTransformation(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "wordFormation") lines.push(wordFormation(words.slice(0, 8), showAnswers));
  else if (exerciseType === "oddOneOut") lines.push(oddOneOut(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "miniStory") lines.push(miniStory(words.slice(0, 8)));
  else if (exerciseType === "mixedChallenge") lines.push(mixedChallenge(words.slice(0, 10), langCode, showAnswers));
  else lines.push(gappedDialogue(words, level, showAnswers), "", dialogueComprehension(words, level, showAnswers), "", dialogueRolePlay(words, level));

  return lines.join(NL);
}

function spellingPractice(words, showAnswers = true) {
  const lines = ["EXERCISE 7. Spelling practice. Write the full English word.", ""];
  words.forEach((item, index) => {
    const hidden = item.word.split("").map((char, i) => (char === " " ? " / " : i % 2 === 0 ? char : "_")).join("");
    lines.push(`${index + 1}. ${hidden} — ______________________________`);
  });
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
  }
  return lines.join(NL);
}

function definitionPractice(words, langCode, showAnswers = true) {
  const lines = ["EXERCISE 8. Write a simple English definition.", "", "Do not translate. Explain the word in English.", ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word} (${translationOf(item, langCode)}) — ________________________________________________________________`));
  if (showAnswers) lines.push("", "Teacher check: accept clear English definitions that match the meaning.");
  return lines.join(NL);
}

function questionPractice(words, level) {
  const lines = ["EXERCISE 9. Answer the questions using the target words.", "", `Level focus: ${level}. Answer in full sentences.`, ""];
  words.forEach((item, index) => lines.push(`${index + 1}. Can you describe a situation connected with \"${item.word}\"?`));
  return lines.join(NL);
}

function sentenceTransformation(words, langCode, showAnswers = true) {
  const lines = ["EXERCISE 10. Sentence transformation.", "", "Rewrite each sentence using the word in brackets. Keep the meaning similar.", ""];
  words.forEach((item, index) => {
    const base = item.sentence || `This sentence should use the word ${item.word}.`;
    lines.push(`${index + 1}. ${base.replace("_____", translationOf(item, langCode))} (${item.word})`);
    lines.push("   → ________________________________________________________________");
  });
  if (showAnswers) lines.push("", "Teacher check: the answer must use the word in brackets naturally and keep a similar meaning.");
  return lines.join(NL);
}

function wordFormation(words, showAnswers = true) {
  const lines = ["EXERCISE 11. Word formation.", "", "Make a new word form. Example: educate → education / educational.", ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word} → ______________________________`));
  if (showAnswers) lines.push("", "Teacher check: accept correct noun, verb, adjective, or adverb forms when possible.");
  return lines.join(NL);
}

function collocationPractice(words, showAnswers = true) {
  const lines = ["EXERCISE 12. Collocations.", "", "Write two natural word combinations for each word.", ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}: 1) ____________________  2) ____________________`));
  if (showAnswers) lines.push("", "Teacher check: accept natural collocations, for example verb + noun, adjective + noun, or phrase combinations.");
  return lines.join(NL);
}

function oddOneOut(words, langCode, showAnswers = true) {
  const groups = [];
  const shuffled = shuffle(words);
  for (let i = 0; i < shuffled.length; i += 4) {
    const group = shuffled.slice(i, i + 4);
    if (group.length >= 3) groups.push(group);
  }
  const lines = ["EXERCISE 13. Odd one out.", "", "Choose the word that is least connected with the others and explain why.", ""];
  groups.forEach((group, index) => {
    lines.push(`${index + 1}. ${group.map((item) => item.word).join(" / ")}`);
    lines.push("   Odd word: ____________________  Reason: ______________________________");
  });
  if (showAnswers) lines.push("", "Teacher check: answers may vary if the explanation is logical.");
  return lines.join(NL);
}

function miniStory(words) {
  const lines = ["EXERCISE 14. Mini story.", "", "Write one short story using all the words below.", ""];
  lines.push(words.map((item) => item.word).join(" – "));
  lines.push("", "Story:", "________________________________________________________________", "________________________________________________________________", "________________________________________________________________");
  lines.push("", "Teacher check: the story must use the target words correctly and naturally.");
  return lines.join(NL);
}

function mixedChallenge(words, langCode, showAnswers = true) {
  const parts = [
    "MIXED CHALLENGE",
    "",
    "Part A. Translate five words into English.",
    ""
  ];
  words.slice(0, 5).forEach((item, index) => parts.push(`${index + 1}. ${translationOf(item, langCode)} — ______________________________`));
  parts.push("", "Part B. Fill in five gaps.", "");
  words.slice(5, 10).forEach((item, index) => parts.push(`${index + 1}. ${item.sentence || `Use the word correctly: _____.`}`));
  parts.push("", "Part C. Write three personal examples.", "");
  words.slice(0, 3).forEach((item, index) => parts.push(`${index + 1}. ${item.word}: ________________________________________________________________`));
  if (showAnswers) {
    parts.push("", "Answer Key:");
    words.slice(0, 5).forEach((item, index) => parts.push(`A${index + 1}. ${item.word}`));
    words.slice(5, 10).forEach((item, index) => parts.push(`B${index + 1}. ${item.word}`));
    parts.push("C. Teacher check.");
  }
  return parts.join(NL);
}


function levelParagraphCount(level) {
  if (level === "A1" || level === "A2") return 2;
  if (level === "B1" || level === "B2") return 3;
  return 4;
}

function readingTitle(level, topic = "General") {
  if (topic === "Finance") {
    if (level === "A1" || level === "A2") return "Money in Everyday Life";
    if (level === "B1" || level === "B2") return "Managing Money and Making Financial Choices";
    return "Financial Strategy and Long-Term Value";
  }
  if (topic === "Business") {
    if (level === "A1" || level === "A2") return "A Small Shop and Its Customers";
    if (level === "B1" || level === "B2") return "A Team Project at Work";
    return "Business Strategy and Competitive Advantage";
  }
  if (level === "A1") return "A Simple Day";
  if (level === "A2") return "A Useful School Project";
  if (level === "B1") return "Learning New Skills";
  if (level === "B2") return "Making Better Decisions";
  if (level === "C1") return "How People Evaluate Complex Choices";
  return "The Subtle Art of Strategic Thinking";
}

function buildReadingText(words, level) {
  const selected = words.slice(0, Math.min(words.length, 10));
  const paragraphs = [];
  const topic = selected[0]?.topic || "General";
  const title = readingTitle(level, topic);
  const simple = level === "A1" || level === "A2";
  const medium = level === "B1" || level === "B2";
  const count = levelParagraphCount(level);
  const topicFrame = topic === "Finance" ? "financial decision" : topic === "Business" ? "business situation" : "learning situation";

  for (let i = 0; i < count; i += 1) {
    const a = selected[(i * 3) % selected.length]?.word || "skill";
    const b = selected[(i * 3 + 1) % selected.length]?.word || "decision";
    const c = selected[(i * 3 + 2) % selected.length]?.word || "experience";
    if (simple) {
      paragraphs.push(`Paragraph ${i + 1}. This text is about ${a}, ${b}, and ${c} in a ${topicFrame}. The student sees the words in a clear situation. The story is short, so it is easy to read and understand. Each word helps the student remember the meaning and use it in a sentence.`);
    } else if (medium) {
      paragraphs.push(`Paragraph ${i + 1}. During the ${topicFrame}, the learners had to think carefully about ${a}. At first, they did not fully understand how ${b} could affect the result. After a short discussion, they connected the idea with their own ${c} and became more confident using the vocabulary in context.`);
    } else {
      paragraphs.push(`Paragraph ${i + 1}. The ${topicFrame} revealed that ${a} was not merely an isolated term, but part of a wider conceptual pattern. When the group examined ${b}, they noticed how easily a superficial interpretation could distort the final judgement. By connecting the concept to ${c}, they developed a more precise and defensible understanding of the topic.`);
    }
  }

  return [`READING TEXT: ${title}`, "", ...paragraphs].join(NL + NL);
}

function readingPractice(words, level, langCode, exerciseType, showAnswers = true) {
  const lines = ["READING PRACTICE", "", `Level focus: ${level}.`, "", buildReadingText(words, level), "", "READING TASKS", ""];
  lines.push("Task 1. Read the text and answer the questions.", "");
  lines.push("1. What is the main topic of the text?");
  lines.push("2. Which target words appear in the text?");
  lines.push("3. Why are the words useful for learning English?");
  lines.push("4. Choose two target words and explain their meaning from context.");
  lines.push("5. Write one sentence that summarises the text.", "");

  if (exerciseType === "gap") lines.push(fillGaps(words.slice(0, 8), showAnswers));
  else if (exerciseType === "choose") lines.push(multipleChoice(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "match") lines.push(matchMeanings(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "intoEnglish") lines.push(translateIntoEnglish(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "fromEnglish") lines.push(translateFromEnglish(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "definitions") lines.push(definitionPractice(words.slice(0, 8), langCode, showAnswers));
  else if (exerciseType === "questions") lines.push(questionPractice(words.slice(0, 8), level));
  else lines.push("Task 2. Vocabulary in context.", "", mixedChallenge(words.slice(0, 10), langCode, showAnswers));

  if (showAnswers) {
    lines.push("", "Suggested Reading Answer Key:");
    lines.push("1. The text is about learning and using the target vocabulary in context.");
    lines.push("2. Answers depend on the generated word list.");
    lines.push("3. The words are useful because they are connected to examples, not memorised alone.");
    lines.push("4–5. Teacher check: accept logical answers supported by the text.");
  }
  return lines.join(NL);
}

function grammarFocusForLevel(level) {
  if (level === "A1") return "Present Simple and basic sentence order";
  if (level === "A2") return "Past Simple, comparatives, and basic question forms";
  if (level === "B1") return "Present Perfect, modals, and conditionals";
  if (level === "B2") return "passive voice, relative clauses, and complex sentences";
  if (level === "C1") return "inversion, nominalisation, and advanced linking";
  return "cleft sentences, advanced modality, and subtle register shifts";
}

function grammarPractice(words, level, langCode, showAnswers = true) {
  const focus = grammarFocusForLevel(level);
  const lines = ["GRAMMAR PRACTICE", "", `Level focus: ${level}.`, `Grammar focus: ${focus}.`, "", "Mini explanation:"];
  lines.push(`Use the target vocabulary while practising ${focus}. The aim is not only to know the words, but to use them inside accurate sentences.`);
  lines.push("", "Task 1. Complete the sentences with the correct word and correct grammar form.", "");
  words.slice(0, 8).forEach((item, index) => {
    lines.push(`${index + 1}. If students practise ${translationOf(item, langCode)}, they can use \"${item.word}\" more accurately: ______________________________.`);
  });
  lines.push("", "Task 2. Correct the grammar mistakes.", "");
  words.slice(0, 6).forEach((item, index) => {
    lines.push(`${index + 1}. He don't understand the word ${item.word}. → ______________________________`);
  });
  lines.push("", "Task 3. Make one advanced sentence with each word.", "");
  words.slice(0, 6).forEach((item, index) => lines.push(`${index + 1}. ${item.word}: ________________________________________________________________`));
  if (showAnswers) {
    lines.push("", "Suggested Answer Key:");
    lines.push("Task 1: teacher checks that the sentence uses the word naturally and follows the grammar focus.");
    lines.push("Task 2 example: He doesn't understand the word. / He did not understand the word.");
    lines.push("Task 3: accept accurate sentences using the target word correctly.");
  }
  return lines.join(NL);
}

function listeningPractice(words, level, langCode, showAnswers = true) {
  const lines = ["LISTENING PRACTICE", "", `Level focus: ${level}.`, "", "Teacher script / audio script:", ""];
  lines.push(buildReadingText(words, level));
  lines.push("", "Listening tasks:", "");
  lines.push("1. Listen once and write the general topic.");
  lines.push("2. Listen again and write five target words you hear.");
  lines.push("3. Match the words to their meanings.");
  lines.push("4. Complete the missing information from the script.", "");
  lines.push(matchMeanings(words.slice(0, 8), langCode, showAnswers));
  if (showAnswers) lines.push("", "Listening answer key: use the script above to check students' answers.");
  return lines.join(NL);
}

function writingPractice(words, level, langCode, showAnswers = true) {
  const selected = words.slice(0, 10).map((item) => item.word).join(" – ");
  const lines = ["WRITING PRACTICE", "", `Level focus: ${level}.`, "", "Use the target vocabulary in a structured written answer.", ""];
  lines.push(`Required words: ${selected}`);
  lines.push("", "Task 1. Write a short paragraph using at least 5 target words.");
  lines.push("________________________________________________________________");
  lines.push("________________________________________________________________");
  lines.push("", "Task 2. Write a longer answer using at least 8 target words.");
  if (level === "A1" || level === "A2") lines.push("Topic: Describe your day or school life.");
  else if (level === "B1" || level === "B2") lines.push("Topic: Describe a problem, a decision, and the result.");
  else lines.push("Topic: Analyse a complex situation and explain your reasoning.");
  lines.push("________________________________________________________________");
  lines.push("________________________________________________________________");
  lines.push("________________________________________________________________");
  if (showAnswers) lines.push("", "Teacher check: mark vocabulary accuracy, grammar accuracy, structure, and natural word use.");
  return lines.join(NL);
}

function useOfEnglishPractice(words, level, langCode, showAnswers = true) {
  const lines = ["USE OF ENGLISH PRACTICE", "", `Level focus: ${level}.`, "", "Task 1. Word formation", ""];
  lines.push(wordFormation(words.slice(0, 8), showAnswers));
  lines.push("", "Task 2. Sentence transformation", "");
  lines.push(sentenceTransformation(words.slice(0, 8), langCode, showAnswers));
  lines.push("", "Task 3. Collocations", "");
  lines.push(collocationPractice(words.slice(0, 8), showAnswers));
  return lines.join(NL);
}

function htmlDocument(text, title) {
  const safeTitle = String(title || "Vocabulary Practice Workbook").replace(/[<>&]/g, "");
  const safeText = String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!doctype html><html><head><meta charset="UTF-8"><title>${safeTitle}</title><style>body{font-family:Arial,sans-serif;line-height:1.55;padding:40px;max-width:900px;margin:auto;color:#111}pre{white-space:pre-wrap;font-family:Arial,sans-serif}</style></head><body><pre>${safeText}</pre></body></html>`;
}

function fullWorkbook(words, settings) {
  const parts = [
    header(settings),
    learningPath(),
    wordList(words, settings.targetLanguage),
    "",
    matchMeanings(words, settings.targetLanguage, settings.showAnswers),
    "",
    fillGaps(words, settings.showAnswers),
    "",
    multipleChoice(words, settings.targetLanguage, settings.showAnswers),
    "",
    translateIntoEnglish(words, settings.targetLanguage, settings.showAnswers),
    "",
    translateFromEnglish(words, settings.targetLanguage, settings.showAnswers),
    "",
    makeSentences(words),
    "",
    spellingPractice(words, settings.showAnswers),
    "",
    definitionPractice(words, settings.targetLanguage, settings.showAnswers),
    "",
    questionPractice(words, settings.level),
    "",
    sentenceTransformation(words, settings.targetLanguage, settings.showAnswers),
    "",
    wordFormation(words, settings.showAnswers),
    "",
    collocationPractice(words, settings.showAnswers),
    "",
    oddOneOut(words, settings.targetLanguage, settings.showAnswers),
    "",
    miniStory(words),
    "",
    "FINAL MEMORY TEST",
    "Close the word list and write the English words.",
    ""
  ];
  words.forEach((item, index) => parts.push(`${index + 1}. ${translationOf(item, settings.targetLanguage)} — ______________________________`));
  return parts.join(NL);
}

function buildWorksheet(words, settings) {
  if (!words.length) return "No words found. Choose automatic mode or paste words like: confident — уверенный";
  if (settings.format === "dialogue") return header(settings) + learningPath() + wordList(words, settings.targetLanguage) + NL + NL + dialoguePractice(words, settings.level, settings.targetLanguage, settings.exerciseType, settings.showAnswers);
  if (settings.format === "speaking") return header(settings) + learningPath() + wordList(words, settings.targetLanguage) + NL + NL + speakingPractice(words, settings.level);
  if (settings.format === "reading") return header(settings) + learningPath() + wordList(words, settings.targetLanguage) + NL + NL + readingPractice(words, settings.level, settings.targetLanguage, settings.exerciseType, settings.showAnswers);
  if (settings.format === "grammar") return header(settings) + learningPath() + wordList(words, settings.targetLanguage) + NL + NL + grammarPractice(words, settings.level, settings.targetLanguage, settings.showAnswers);
  if (settings.format === "listening") return header(settings) + learningPath() + wordList(words, settings.targetLanguage) + NL + NL + listeningPractice(words, settings.level, settings.targetLanguage, settings.showAnswers);
  if (settings.format === "writing") return header(settings) + learningPath() + wordList(words, settings.targetLanguage) + NL + NL + writingPractice(words, settings.level, settings.targetLanguage, settings.showAnswers);
  if (settings.format === "useOfEnglish") return header(settings) + learningPath() + wordList(words, settings.targetLanguage) + NL + NL + useOfEnglishPractice(words, settings.level, settings.targetLanguage, settings.showAnswers);

  const map = {
    wordlist: () => wordList(words, settings.targetLanguage),
    match: () => matchMeanings(words, settings.targetLanguage, settings.showAnswers),
    gap: () => fillGaps(words, settings.showAnswers),
    choose: () => multipleChoice(words, settings.targetLanguage, settings.showAnswers),
    intoEnglish: () => translateIntoEnglish(words, settings.targetLanguage, settings.showAnswers),
    fromEnglish: () => translateFromEnglish(words, settings.targetLanguage, settings.showAnswers),
    sentences: () => makeSentences(words),
    spelling: () => spellingPractice(words, settings.showAnswers),
    definitions: () => definitionPractice(words, settings.targetLanguage, settings.showAnswers),
    questions: () => questionPractice(words, settings.level),
    transformation: () => sentenceTransformation(words, settings.targetLanguage, settings.showAnswers),
    wordFormation: () => wordFormation(words, settings.showAnswers),
    collocations: () => collocationPractice(words, settings.showAnswers),
    oddOneOut: () => oddOneOut(words, settings.targetLanguage, settings.showAnswers),
    miniStory: () => miniStory(words),
    mixedChallenge: () => mixedChallenge(words, settings.targetLanguage, settings.showAnswers),
    full: () => fullWorkbook(words, settings)
  };
  if (settings.exerciseType === "full") return map.full();
  return [header(settings), learningPath(), wordList(words, settings.targetLanguage), "", (map[settings.exerciseType] || map.full)()].join(NL);
}

function normalizeAnswer(value) {
  return String(value || "").toLowerCase().trim().replace(/[.,!?;:()]/g, "").replace(/\s+/g, " ");
}

function answerIsCorrect(value, expected) {
  const user = normalizeAnswer(value);
  const correct = normalizeAnswer(expected);
  if (!user || !correct) return false;
  const variants = correct.split("/").map((item) => item.trim()).filter(Boolean);
  return variants.some((variant) => user === variant || user.includes(variant) || variant.includes(user));
}

function buildTestQuestions(words, langCode) {
  const source = shuffle(words).slice(0, Math.min(words.length, 16));
  return source.map((item, index) => {
    const type = ["mc", "intoEnglish", "fromEnglish", "gap"][index % 4];
    if (type === "mc") {
      const options = shuffle([item, ...shuffle(words.filter((other) => other.word !== item.word)).slice(0, 3)]).map((option) => option.word);
      return { id: `${item.word}-${index}`, type, item, options, prompt: `Choose the English word for: ${translationOf(item, langCode)}`, expected: item.word };
    }
    if (type === "intoEnglish") return { id: `${item.word}-${index}`, type, item, prompt: `Translate into English: ${translationOf(item, langCode)}`, expected: item.word };
    if (type === "fromEnglish") return { id: `${item.word}-${index}`, type, item, prompt: `Translate into target language: ${item.word}`, expected: translationOf(item, langCode) };
    return { id: `${item.word}-${index}`, type, item, prompt: item.sentence || `Use the word correctly: _____.`, expected: item.word };
  });
}

function wordsToEditableText(words, langCode) {
  return words.map((item) => `${item.word} — ${translationOf(item, langCode)}`).join(NL);
}


const CONTACT_EMAIL = "ksam54041@gmai.com";

const LEGAL_SECTIONS = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "A1ZIV is a browser-based learning tool for generating vocabulary worksheets, readings, grammar practice, listening scripts, and interactive tests.",
      "This website does not require registration, does not ask for your name, email address, payment details, school details, or account password, and does not intentionally collect personal data.",
      "The words, answers, settings, and test results you type or generate are processed in your browser for the purpose of creating learning materials. Do not paste private, sensitive, confidential, medical, financial, or legally protected information into the generator.",
      "The site is hosted on Vercel. Basic technical data, such as IP address, browser information, device information, pages visited, and request logs may be processed by the hosting provider for security, performance, abuse prevention, and service operation.",
      "This website currently does not use user accounts, payment processing, advertising cookies, tracking pixels, newsletters, or third-party analytics inside the app code.",
      "If analytics, accounts, payments, AI APIs, contact forms, or advertising are added later, this policy should be updated before those features are made public."
    ]
  },
  terms: {
    title: "Terms of Use",
    body: [
      "By using A1ZIV, you agree to use the website only for lawful educational purposes.",
      "The generated materials are provided for study support, lesson preparation, and vocabulary practice. The site does not guarantee that every generated translation, answer key, grammar item, reading text, or test score is perfect.",
      "Teachers, students, and users should review all generated materials before using them in class, exams, paid lessons, or official assessment.",
      "You are responsible for the content you paste into the website and for how you use downloaded materials.",
      "You must not use the website to create harmful, illegal, abusive, discriminatory, sexually explicit, or copyright-infringing materials.",
      "A1ZIV may be changed, updated, paused, or removed at any time while the project is under development."
    ]
  },
  disclaimer: {
    title: "Educational Disclaimer",
    body: [
      "A1ZIV is an educational support tool, not a certified exam board, official language assessment provider, school, university, legal adviser, or professional translator.",
      "Level labels such as A1, A2, B1, B2, C1, and C2 are used as practical learning categories. They are not official certification results.",
      "Interactive test scores are practice scores only. They should not be treated as official exam results or proof of language level.",
      "Built-in translations are strongest for the supported language pairs shown on the website. For important work, check translations with a qualified teacher, native speaker, or reliable dictionary.",
      "Reading, grammar, listening, writing, finance, business, and other generated tasks are for learning practice and may need human editing."
    ]
  },
  cookies: {
    title: "Cookie Notice",
    body: [
      "The current A1ZIV app code does not intentionally set advertising cookies, analytics cookies, or marketing trackers.",
      "The hosting platform may use essential technical cookies, local browser mechanisms, or server logs to keep the website secure, available, and functional.",
      "If future versions add analytics, login, payments, saved progress, or advertising, this cookie notice should be updated and, where required, a consent banner should be added."
    ]
  },
  copyright: {
    title: "Copyright and Content Notice",
    body: [
      "A1ZIV interface, project structure, and original generated-template logic are protected as project content unless otherwise stated.",
      "Users may download and use generated worksheets for personal study, classroom practice, and tutoring materials, but they are responsible for checking the accuracy and legality of the final content.",
      "Do not upload or paste copyrighted textbook pages, paid course content, private school materials, or third-party materials unless you have the right to use them.",
      "Project copyright notice: © 2026 A1ZIV / Alexandr Balyuba. All rights reserved."
    ]
  },
  contact: {
    title: "Contact",
    body: [
      "For questions about the website, corrections, takedown requests, privacy questions, or content issues, contact the project owner.",
      "Email: ksam54041@gmai.com",
      "When contacting, include the website link, the issue, and a short explanation of what should be corrected or removed."
    ]
  }
};

function LegalModal({ sectionKey, onClose }) {
  if (!sectionKey) return null;
  const section = LEGAL_SECTIONS[sectionKey];
  if (!section) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-3xl border bg-slate-950 p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sky-300">A1ZIV legal information</p>
            <h2 className="text-2xl font-black">{section.title}</h2>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="space-y-4 text-sm leading-7 text-slate-200">
          {section.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <div className="mt-6 rounded-2xl border p-4 text-sm text-slate-300">
          Last updated: 2026. This text is a practical website policy template, not legal advice. Before using the site commercially, review it with a qualified legal professional for your country and target users.
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("worksheet");
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [autoMode, setAutoMode] = useState(true);
  const [exerciseType, setExerciseType] = useState("full");
  const [level, setLevel] = useState("B1");
  const [format, setFormat] = useState("worksheet");
  const [title, setTitle] = useState("Vocabulary Practice Workbook");
  const [targetLanguage, setTargetLanguage] = useState("ru");
  const [topic, setTopic] = useState("Any topic");
  const [wordCount, setWordCount] = useState(10);
  const [generationSeed, setGenerationSeed] = useState(1);
  const [showAnswers, setShowAnswers] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("txt");
  const [testSeed, setTestSeed] = useState(1);
  const [answers, setAnswers] = useState({});
  const [testChecked, setTestChecked] = useState(false);
  const [legalOpen, setLegalOpen] = useState(null);
  const [feedbackType, setFeedbackType] = useState("Suggestion");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const customWords = useMemo(() => parseWords(input), [input]);
  const autoWords = useMemo(() => pickAutoWords(level, topic, Number(wordCount) || 10, generationSeed), [level, topic, wordCount, generationSeed]);
  const words = autoMode ? autoWords : customWords;
  const settings = { title, level, format, targetLanguage, exerciseType, autoMode, showAnswers };
  const generatedText = buildWorksheet(words, settings);
  const levelTopics = level === "Mixed" ? COMPLETE_WORD_BANK : COMPLETE_WORD_BANK.filter((item) => item.level === level);
  const topics = ["Any topic", ...Array.from(new Set(levelTopics.map((item) => item.topic))).sort()];
  const selectedLang = languageByCode(targetLanguage);
  const testQuestions = useMemo(() => buildTestQuestions(words, targetLanguage), [words, targetLanguage, testSeed]);
  const score = testQuestions.reduce((total, question) => total + (answerIsCorrect(answers[question.id], question.expected) ? 1 : 0), 0);

  function handleGenerate() {
    setOutput("");
    setGenerationSeed((seed) => seed + 1);
  }

  function handleGenerateTest() {
    setTestSeed((seed) => seed + 1);
    setAnswers({});
    setTestChecked(false);
  }

  function handleEditWords() {
    setInput(wordsToEditableText(words, targetLanguage));
    setAutoMode(false);
    setOutput("");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("Copy did not work. Please select the text manually.");
    }
  }

  function downloadBlob(content, name, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function handleDownload() {
    if (downloadFormat === "html") {
      downloadBlob(htmlDocument(generatedText, title), fileName(title).replace(/\.txt$/, ".html"), "text/html;charset=utf-8");
      return;
    }
    downloadBlob(generatedText, fileName(title), "text/plain;charset=utf-8");
  }

  async function handleSaveAs() {
    const isHtml = downloadFormat === "html";
    const content = isHtml ? htmlDocument(generatedText, title) : generatedText;
    const suggestedName = isHtml ? fileName(title).replace(/\.txt$/, ".html") : fileName(title);
    const mime = isHtml ? "text/html" : "text/plain";

    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName,
          types: [{ description: isHtml ? "HTML file" : "Text file", accept: { [mime]: [isHtml ? ".html" : ".txt"] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        return;
      } catch (error) {
        if (error && error.name === "AbortError") return;
      }
    }

    alert("Your browser does not allow websites to choose a folder directly. The file will be saved to your default Downloads folder, or your browser will ask where to save it if that setting is enabled.");
    downloadBlob(content, suggestedName, `${mime};charset=utf-8`);
  }

  function updateAnswer(id, value) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  function handleSendFeedback() {
    const message = feedbackText.trim();
    if (!message) {
      alert("Please write your suggestion, complaint, or feedback first.");
      return;
    }
    const subject = encodeURIComponent(`A1ZIV feedback: ${feedbackType} (${rating}/5 stars)`);
    const body = encodeURIComponent([
      "A1ZIV website feedback",
      "",
      `Type: ${feedbackType}`,
      `Rating: ${rating}/5`,
      `Page: ${window.location.href}`,
      "",
      "Message:",
      message
    ].join(NL));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFeedbackSent(true);
  }


  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl border p-6 shadow-sm md:p-8">
          <p className="mb-2 text-sm font-semibold">AI-style worksheet, reading, grammar, and test generator without API</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1>Vocabulary Exercise Generator</h1>
              <p className="mt-3 max-w-3xl">Generate vocabulary worksheets, dialogues, readings, grammar tasks, writing tasks, listening scripts, or a real interactive test that checks answers and gives a score.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveTab("worksheet")}>Generate worksheet</button>
              <button onClick={() => setActiveTab("test")}>Generate test</button>
              <button onClick={handleEditWords}>Edit words</button>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Settings</h2>
              <span className="rounded-full px-3 py-1 text-sm font-semibold">{words.length} words</span>
            </div>

            <label>Worksheet/Test title</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label>Level</label>
                <select value={level} onChange={(event) => setLevel(event.target.value)}>
                  <option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option><option value="C1">C1</option><option value="C2">C2</option><option value="Mixed">Mixed</option>
                </select>
              </div>
              <div>
                <label>Format</label>
                <select value={format} onChange={(event) => setFormat(event.target.value)}>
                  <option value="worksheet">worksheet</option>
                  <option value="test">paper test</option>
                  <option value="dialogue">dialogue</option>
                  <option value="speaking">speaking practice</option>
                  <option value="reading">reading</option>
                  <option value="grammar">grammar</option>
                  <option value="listening">listening script</option>
                  <option value="writing">writing practice</option>
                  <option value="useOfEnglish">use of English</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label>Translation language</label>
                <select value={targetLanguage} onChange={(event) => setTargetLanguage(event.target.value)}>
                  {LANGUAGES.map((lang) => <option key={lang.code} value={lang.code}>{lang.name}{lang.builtIn ? " ✓" : ""}</option>)}
                </select>
              </div>
              <div>
                <label>Exercise type</label>
                <select value={exerciseType} onChange={(event) => setExerciseType(event.target.value)}>
                  <option value="full">Full workbook</option>
                  <option value="wordlist">Word list only</option>
                  <option value="match">Match meanings</option>
                  <option value="gap">Fill in gaps</option>
                  <option value="choose">Multiple choice</option>
                  <option value="intoEnglish">Translate into English</option>
                  <option value="fromEnglish">Translate from English</option>
                  <option value="sentences">Make sentences</option>
                  <option value="spelling">Spelling practice</option>
                  <option value="definitions">Write definitions</option>
                  <option value="questions">Personal questions</option>
                  <option value="transformation">Sentence transformation</option>
                  <option value="wordFormation">Word formation</option>
                  <option value="collocations">Collocations</option>
                  <option value="oddOneOut">Odd one out</option>
                  <option value="miniStory">Mini story</option>
                  <option value="mixedChallenge">Mixed challenge</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={showAnswers} onChange={(event) => setShowAnswers(event.target.checked)} className="w-auto" />
                Show answer key in worksheet
              </label>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <strong>Edit words</strong>
                  <p className="text-sm">Click this to turn the generated vocabulary into an editable list. When you change the words, the worksheet, dialogue, and test update automatically.</p>
                </div>
                <button onClick={handleEditWords}>Edit current words</button>
              </div>
            </div>

            <div className="rounded-2xl border p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={autoMode} onChange={(event) => setAutoMode(event.target.checked)} className="w-auto" />
                Generate vocabulary automatically
              </label>
              <p className="text-sm">Built-in answer-key translations are strongest for: Russian, Kazakh, Swedish, German, Spanish, French, Italian, Turkish, Ukrainian, and Polish.</p>
            </div>

            {autoMode ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label>Topic</label>
                  <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                    {topics.map((topicName) => <option key={topicName} value={topicName}>{topicName}</option>)}
                  </select>
                </div>
                <div>
                  <label>Number of words</label>
                  <input type="number" min="3" max="18" value={wordCount} onChange={(event) => setWordCount(event.target.value)} />
                </div>
              </div>
            ) : (
              <>
                <label>Edit / paste your own words here</label>
                <textarea value={input} onChange={(event) => setInput(event.target.value)} />
                <p className="text-sm">Format: English word — translation/meaning. One word per line.</p>
              </>
            )}

            {!selectedLang.builtIn && (
              <div className="rounded-2xl border p-4">
                <strong>Important:</strong> {selectedLang.name} is included as an option, but this free offline version cannot accurately translate every word into this language automatically. Paste your own bilingual list for exact answer keys, or later connect a real AI API.
              </div>
            )}
          </section>

          {activeTab === "worksheet" ? (
            <section className="rounded-3xl border p-5 shadow-sm md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Generated worksheet</h2>
                <div className="flex flex-wrap gap-2">
                  <button onClick={handleGenerate}>Regenerate</button>
                  <button onClick={handleCopy}>{copied ? "Copied" : "Copy"}</button>
                  <select value={downloadFormat} onChange={(event) => setDownloadFormat(event.target.value)} className="w-auto min-w-[110px]"><option value="txt">TXT</option><option value="html">HTML</option></select>
              <button onClick={handleDownload}>Download</button>
                  <button onClick={handleSaveAs}>Save as...</button>
              <button onClick={handleSaveAs}>Choose where to save</button>
                </div>
              </div>
              <pre className="h-[680px] overflow-auto whitespace-pre-wrap rounded-2xl border p-5 text-sm leading-6">{generatedText}</pre>
            </section>
          ) : (
            <section className="rounded-3xl border p-5 shadow-sm md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Interactive test</h2>
                <button onClick={handleGenerateTest}>New test</button>
              </div>

              <div className="mb-5 rounded-2xl border p-4">
                <h3 className="text-lg font-bold">Vocabulary before the test</h3>
                <pre className="mt-3 whitespace-pre-wrap rounded-2xl border p-4 text-sm leading-6">{wordList(words, targetLanguage)}</pre>
              </div>

              <div className="space-y-4">
                {testQuestions.map((question, index) => {
                  const userValue = answers[question.id] || "";
                  const correct = answerIsCorrect(userValue, question.expected);
                  return (
                    <div key={question.id} className="rounded-2xl border p-4">
                      <p className="font-bold">{index + 1}. {question.prompt}</p>
                      {question.type === "mc" ? (
                        <div className="mt-3 grid gap-2">
                          {question.options.map((option) => (
                            <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border p-3">
                              <input type="radio" name={question.id} value={option} checked={userValue === option} onChange={(event) => updateAnswer(question.id, event.target.value)} className="w-auto" />
                              {option}
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input className="mt-3" value={userValue} onChange={(event) => updateAnswer(question.id, event.target.value)} placeholder="Type your answer here" />
                      )}
                      {testChecked && (
                        <p className="mt-2 text-sm font-semibold">{correct ? "✅ Correct" : `❌ Correct answer: ${question.expected}`}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border p-4">
                <button onClick={() => setTestChecked(true)}>Check my test</button>
                {testChecked && <p className="mt-4 text-xl font-black">Score: {score} / {testQuestions.length}</p>}
              </div>
            </section>
          )}
        </main>


        <section className="rounded-3xl border p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-start">
            <div>
              <p className="mb-2 text-sm font-semibold text-sky-300">Feedback</p>
              <h2 className="text-2xl font-black">Rate A1ZIV</h2>
              <p className="mt-2 text-sm">Leave a suggestion, complaint, bug report, or improvement idea. This helps improve the learning generator.</p>
              <div className="mt-4 flex gap-2" aria-label="Rate this website from 1 to 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="min-w-[46px] px-3 py-2 text-xl"
                    title={`${star} star${star === 1 ? "" : "s"}`}
                  >
                    {star <= rating ? "★" : "☆"}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold">Your rating: {rating} / 5</p>
            </div>
            <div className="space-y-4">
              <div>
                <label>Feedback type</label>
                <select value={feedbackType} onChange={(event) => setFeedbackType(event.target.value)}>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Bug report">Bug report</option>
                  <option value="Feature request">Feature request</option>
                  <option value="Translation correction">Translation correction</option>
                  <option value="General review">General review</option>
                </select>
              </div>
              <div>
                <label>Your message</label>
                <textarea
                  value={feedbackText}
                  onChange={(event) => setFeedbackText(event.target.value)}
                  placeholder="Write what should be improved, what is wrong, or what feature you want next..."
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={handleSendFeedback}>Send feedback by email</button>
                <span className="text-sm">Contact: {CONTACT_EMAIL}</span>
              </div>
              {feedbackSent && <p className="rounded-2xl border p-3 text-sm">Your email app should open with the feedback prepared. Send it from your email to finish.</p>}
              <p className="text-xs">This version does not store reviews in a database. It prepares an email so feedback can be sent officially to the project contact address.</p>
            </div>
          </div>
        </section>

        <footer className="rounded-3xl border p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr] md:items-start">
            <div>
              <h2 className="text-xl font-bold">A1ZIV</h2>
              <p className="mt-2 text-sm">Educational vocabulary, reading, grammar, writing, listening, and test generator. Use generated materials for practice and review them before official or paid use.</p>
              <p className="mt-3 text-xs">© 2026 A1ZIV / Alexandr Balyuba. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <button onClick={() => setLegalOpen("privacy")}>Privacy Policy</button>
              <button onClick={() => setLegalOpen("terms")}>Terms of Use</button>
              <button onClick={() => setLegalOpen("disclaimer")}>Disclaimer</button>
              <button onClick={() => setLegalOpen("cookies")}>Cookies</button>
              <button onClick={() => setLegalOpen("copyright")}>Copyright</button>
              <button onClick={() => setLegalOpen("contact")}>Contact</button>
            </div>
          </div>
        </footer>

        <LegalModal sectionKey={legalOpen} onClose={() => setLegalOpen(null)} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
