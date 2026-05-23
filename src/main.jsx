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
  { level: "A1", topic: "Daily life", word: "house", sentence: "My _____ is near the park.", tr: { ru: "дом", kk: "үй", sv: "hus", de: "Haus", es: "casa", fr: "maison", it: "casa", tr: "ev", uk: "дім", pl: "dom" } },
  { level: "A1", topic: "Daily life", word: "family", sentence: "My _____ is very friendly.", tr: { ru: "семья", kk: "отбасы", sv: "familj", de: "Familie", es: "familia", fr: "famille", it: "famiglia", tr: "aile", uk: "сім'я", pl: "rodzina" } },
  { level: "A1", topic: "Food", word: "water", sentence: "Can I have some _____, please?", tr: { ru: "вода", kk: "су", sv: "vatten", de: "Wasser", es: "agua", fr: "eau", it: "acqua", tr: "su", uk: "вода", pl: "woda" } },
  { level: "A1", topic: "Food", word: "bread", sentence: "I eat _____ for breakfast.", tr: { ru: "хлеб", kk: "нан", sv: "bröd", de: "Brot", es: "pan", fr: "pain", it: "pane", tr: "ekmek", uk: "хліб", pl: "chleb" } },
  { level: "A2", topic: "School", word: "homework", sentence: "I finished my _____ before dinner.", tr: { ru: "домашнее задание", kk: "үй тапсырмасы", sv: "läxa", de: "Hausaufgaben", es: "tarea", fr: "devoirs", it: "compiti", tr: "ödev", uk: "домашнє завдання", pl: "praca domowa" } },
  { level: "A2", topic: "Travel", word: "ticket", sentence: "I bought a train _____.", tr: { ru: "билет", kk: "билет", sv: "biljett", de: "Ticket", es: "billete", fr: "billet", it: "biglietto", tr: "bilet", uk: "квиток", pl: "bilet" } },
  { level: "A2", topic: "Health", word: "tired", sentence: "I am very _____ after school.", tr: { ru: "уставший", kk: "шаршаған", sv: "trött", de: "müde", es: "cansado", fr: "fatigué", it: "stanco", tr: "yorgun", uk: "втомлений", pl: "zmęczony" } },
  { level: "B1", topic: "Emotions", word: "confident", sentence: "She feels _____ before the exam.", tr: { ru: "уверенный", kk: "сенімді", sv: "självsäker", de: "selbstbewusst", es: "seguro", fr: "confiant", it: "sicuro", tr: "kendinden emin", uk: "впевнений", pl: "pewny siebie" } },
  { level: "B1", topic: "Work", word: "deadline", sentence: "The project _____ is Friday.", tr: { ru: "крайний срок", kk: "соңғы мерзім", sv: "deadline", de: "Frist", es: "fecha límite", fr: "date limite", it: "scadenza", tr: "son teslim tarihi", uk: "дедлайн", pl: "termin" } },
  { level: "B1", topic: "Study", word: "improve", sentence: "I want to _____ my English.", tr: { ru: "улучшать", kk: "жақсарту", sv: "förbättra", de: "verbessern", es: "mejorar", fr: "améliorer", it: "migliorare", tr: "geliştirmek", uk: "покращувати", pl: "poprawić" } },
  { level: "B2", topic: "Business", word: "negotiate", sentence: "The companies will _____ the price.", tr: { ru: "вести переговоры", kk: "келіссөз жүргізу", sv: "förhandla", de: "verhandeln", es: "negociar", fr: "négocier", it: "negoziare", tr: "müzakere etmek", uk: "вести переговори", pl: "negocjować" } },
  { level: "B2", topic: "Technology", word: "privacy", sentence: "Online _____ is very important.", tr: { ru: "конфиденциальность", kk: "құпиялылық", sv: "integritet", de: "Datenschutz", es: "privacidad", fr: "confidentialité", it: "privacy", tr: "gizlilik", uk: "конфіденційність", pl: "prywatność" } },
  { level: "B2", topic: "Society", word: "responsibility", sentence: "Everyone has a _____ to help.", tr: { ru: "ответственность", kk: "жауапкершілік", sv: "ansvar", de: "Verantwortung", es: "responsabilidad", fr: "responsabilité", it: "responsabilità", tr: "sorumluluk", uk: "відповідальність", pl: "odpowiedzialność" } },
  { level: "C1", topic: "Academic", word: "assumption", sentence: "This argument is based on a weak _____.", tr: { ru: "предположение", kk: "болжам", sv: "antagande", de: "Annahme", es: "suposición", fr: "hypothèse", it: "ipotesi", tr: "varsayım", uk: "припущення", pl: "założenie" } },
  { level: "C1", topic: "Academic", word: "evidence", sentence: "The claim needs stronger _____.", tr: { ru: "доказательства", kk: "дәлел", sv: "bevis", de: "Beweise", es: "evidencia", fr: "preuves", it: "prove", tr: "kanıt", uk: "докази", pl: "dowody" } },
  { level: "C1", topic: "Business", word: "strategy", sentence: "The company changed its _____.", tr: { ru: "стратегия", kk: "стратегия", sv: "strategi", de: "Strategie", es: "estrategia", fr: "stratégie", it: "strategia", tr: "strateji", uk: "стратегія", pl: "strategia" } },
  { level: "C2", topic: "Advanced", word: "ambiguous", sentence: "The instructions were _____ and confusing.", tr: { ru: "двусмысленный", kk: "екіұшты", sv: "tvetydig", de: "mehrdeutig", es: "ambiguo", fr: "ambigu", it: "ambiguo", tr: "belirsiz", uk: "двозначний", pl: "niejednoznaczny" } },
  { level: "C2", topic: "Advanced", word: "subtle", sentence: "There was a _____ difference between the two ideas.", tr: { ru: "тонкий / едва заметный", kk: "нәзік / байқалмайтын", sv: "subtil", de: "subtil", es: "sutil", fr: "subtil", it: "sottile", tr: "ince", uk: "тонкий", pl: "subtelny" } },
  { level: "C2", topic: "Advanced", word: "meticulous", sentence: "She is _____ when checking details.", tr: { ru: "дотошный", kk: "ұқыпты", sv: "noggrann", de: "akribisch", es: "meticuloso", fr: "méticuleux", it: "meticoloso", tr: "titiz", uk: "ретельний", pl: "skrupulatny" } }
];

const DEFAULT_INPUT = WORD_BANK.slice(7, 16).map((item) => `${item.word} — ${item.tr.ru}`).join(NL);

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
      return { word, meaning, sentence: `Use the word correctly: _____.`, topic: "Custom", level: "Custom", tr: {} };
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

function pickAutoWords(level, topic, count) {
  let pool = WORD_BANK.filter((item) => item.level === level);
  if (topic !== "Any topic") pool = pool.filter((item) => item.topic === topic);
  if (pool.length < count) pool = WORD_BANK.filter((item) => level === "Mixed" || item.level === level || topic === "Any topic");
  if (pool.length < count) pool = WORD_BANK;
  return shuffle(pool).slice(0, Math.min(count, pool.length));
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

function dialoguePractice(words, level) {
  const lines = ["DIALOGUE PRACTICE", "", `Level focus: ${level}.`, ""];
  lines.push("Student A: ask questions naturally.");
  lines.push("Student B: answer with details and use the target vocabulary.", "");
  words.slice(0, 10).forEach((item, index) => lines.push(`${index + 1}. Create a short dialogue using: ${item.word}`));
  return lines.join(NL);
}

function fullWorkbook(words, settings) {
  const parts = [
    header(settings),
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
    "FINAL MEMORY TEST",
    "Close the word list and write the English words.",
    ""
  ];
  words.forEach((item, index) => parts.push(`${index + 1}. ${translationOf(item, settings.targetLanguage)} — ______________________________`));
  return parts.join(NL);
}

function buildWorksheet(words, settings) {
  if (!words.length) return "No words found. Choose automatic mode or paste words like: confident — уверенный";
  if (settings.format === "dialogue") return header(settings) + wordList(words, settings.targetLanguage) + NL + NL + dialoguePractice(words, settings.level);
  if (settings.format === "speaking") return header(settings) + wordList(words, settings.targetLanguage) + NL + NL + speakingPractice(words, settings.level);

  const map = {
    wordlist: () => wordList(words, settings.targetLanguage),
    match: () => matchMeanings(words, settings.targetLanguage, settings.showAnswers),
    gap: () => fillGaps(words, settings.showAnswers),
    choose: () => multipleChoice(words, settings.targetLanguage, settings.showAnswers),
    intoEnglish: () => translateIntoEnglish(words, settings.targetLanguage, settings.showAnswers),
    fromEnglish: () => translateFromEnglish(words, settings.targetLanguage, settings.showAnswers),
    sentences: () => makeSentences(words),
    full: () => fullWorkbook(words, settings)
  };
  if (settings.exerciseType === "full") return map.full();
  return [header(settings), wordList(words, settings.targetLanguage), "", (map[settings.exerciseType] || map.full)()].join(NL);
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
  const source = shuffle(words).slice(0, Math.min(words.length, 12));
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
  const [showAnswers, setShowAnswers] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [testSeed, setTestSeed] = useState(1);
  const [answers, setAnswers] = useState({});
  const [testChecked, setTestChecked] = useState(false);

  const customWords = useMemo(() => parseWords(input), [input]);
  const autoWords = useMemo(() => pickAutoWords(level, topic, Number(wordCount) || 10), [level, topic, wordCount]);
  const words = autoMode ? autoWords : customWords;
  const settings = { title, level, format, targetLanguage, exerciseType, autoMode, showAnswers };
  const generatedText = output || buildWorksheet(words, settings);
  const topics = ["Any topic", ...Array.from(new Set(WORD_BANK.map((item) => item.topic))).sort()];
  const selectedLang = languageByCode(targetLanguage);
  const testQuestions = useMemo(() => buildTestQuestions(words, targetLanguage), [words, targetLanguage, testSeed]);
  const score = testQuestions.reduce((total, question) => total + (answerIsCorrect(answers[question.id], question.expected) ? 1 : 0), 0);

  function handleGenerate() {
    setOutput(buildWorksheet(words, settings));
  }

  function handleGenerateTest() {
    setTestSeed((seed) => seed + 1);
    setAnswers({});
    setTestChecked(false);
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

  function handleDownload() {
    const blob = new Blob([generatedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName(title);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function updateAnswer(id, value) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl border p-6 shadow-sm md:p-8">
          <p className="mb-2 text-sm font-semibold">AI-style worksheet and test generator without API</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1>Vocabulary Exercise Generator</h1>
              <p className="mt-3 max-w-3xl">Generate worksheets with a vocabulary list first, or create a real interactive test that checks answers and gives a score.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveTab("worksheet")}>Generate worksheet</button>
              <button onClick={() => setActiveTab("test")}>Generate test</button>
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
                  <option value="worksheet">worksheet</option><option value="test">paper test</option><option value="dialogue">dialogue</option><option value="speaking">speaking practice</option>
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
                <label>Paste your own words here</label>
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
                  <button onClick={handleDownload}>Download</button>
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
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
