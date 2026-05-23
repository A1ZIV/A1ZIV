
import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const NL = "\n";

const LANGUAGES = [
  "Russian",
  "Kazakh",
  "Swedish",
  "German",
  "Spanish",
  "French",
  "Italian",
  "Turkish",
  "Ukrainian",
  "Polish",
  "English"
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const TOPICS = [
  "General",
  "Business",
  "Finance",
  "Academic",
  "Travel",
  "Technology",
  "Everyday life",
  "School",
  "Work",
  "Health"
];

const MATERIAL_FORMATS = [
  ["vocabulary", "Vocabulary worksheet"],
  ["dialogue", "Ready dialogue"],
  ["reading", "Reading text"],
  ["grammar", "Grammar practice"],
  ["listening", "Listening script"],
  ["writing", "Writing practice"],
  ["useOfEnglish", "Use of English"]
];

const EXERCISE_TYPES = [
  ["sequence", "Full learning sequence"],
  ["list", "Vocabulary list only"],
  ["match", "Match meanings"],
  ["gap", "Fill in gaps"],
  ["choice", "Multiple choice"],
  ["translateToEnglish", "Translate into English"],
  ["translateFromEnglish", "Translate from English"],
  ["sentences", "Make sentences"],
  ["definitions", "Write definitions"],
  ["questions", "Personal questions"],
  ["spelling", "Spelling practice"],
  ["collocations", "Collocations"],
  ["wordFormation", "Word formation"],
  ["oddOneOut", "Odd one out"],
  ["miniStory", "Mini story"],
  ["mixed", "Mixed challenge"]
];

const BUILT_IN_WORDS = {
  A1: {
    General: [
      ["hello", "привет"], ["name", "имя"], ["family", "семья"], ["house", "дом"], ["water", "вода"], ["bread", "хлеб"], ["friend", "друг"], ["school", "школа"], ["book", "книга"], ["happy", "счастливый"], ["small", "маленький"], ["big", "большой"]
    ],
    Business: [
      ["job", "работа"], ["boss", "начальник"], ["shop", "магазин"], ["money", "деньги"], ["buy", "покупать"], ["sell", "продавать"], ["price", "цена"], ["work", "работать"], ["help", "помощь"], ["team", "команда"]
    ],
    Finance: [
      ["money", "деньги"], ["price", "цена"], ["bank", "банк"], ["card", "карта"], ["cash", "наличные"], ["pay", "платить"], ["buy", "покупать"], ["sell", "продавать"], ["cheap", "дешёвый"], ["expensive", "дорогой"]
    ],
    Academic: [
      ["book", "книга"], ["student", "ученик"], ["teacher", "учитель"], ["lesson", "урок"], ["answer", "ответ"], ["question", "вопрос"], ["read", "читать"], ["write", "писать"], ["learn", "учить"], ["test", "тест"]
    ]
  },
  A2: {
    General: [
      ["travel", "путешествовать"], ["journey", "поездка"], ["weather", "погода"], ["usually", "обычно"], ["sometimes", "иногда"], ["because", "потому что"], ["important", "важный"], ["comfortable", "удобный"], ["invite", "приглашать"], ["arrive", "прибывать"]
    ],
    Business: [
      ["meeting", "встреча"], ["customer", "клиент"], ["office", "офис"], ["email", "электронное письмо"], ["schedule", "расписание"], ["manager", "менеджер"], ["task", "задача"], ["project", "проект"], ["service", "услуга"], ["order", "заказ"]
    ],
    Finance: [
      ["salary", "зарплата"], ["budget", "бюджет"], ["invoice", "счёт"], ["payment", "оплата"], ["discount", "скидка"], ["receipt", "чек"], ["account", "счёт"], ["save money", "экономить деньги"], ["cost", "стоимость"], ["tax", "налог"]
    ],
    Academic: [
      ["homework", "домашнее задание"], ["explain", "объяснять"], ["example", "пример"], ["mistake", "ошибка"], ["improve", "улучшать"], ["practice", "практика"], ["subject", "предмет"], ["exam", "экзамен"], ["level", "уровень"], ["skill", "навык"]
    ]
  },
  B1: {
    General: [
      ["improve", "улучшать"], ["experience", "опыт"], ["decision", "решение"], ["responsible", "ответственный"], ["skill", "навык"], ["community", "сообщество"], ["journey", "путешествие"], ["relieved", "облегчённый"], ["disappointed", "разочарованный"], ["confident", "уверенный"]
    ],
    Business: [
      ["deadline", "крайний срок"], ["responsibility", "ответственность"], ["negotiate", "вести переговоры"], ["client", "клиент"], ["proposal", "предложение"], ["strategy", "стратегия"], ["feedback", "обратная связь"], ["target", "цель"], ["growth", "рост"], ["agreement", "соглашение"]
    ],
    Finance: [
      ["income", "доход"], ["expense", "расход"], ["profit", "прибыль"], ["loss", "убыток"], ["investment", "инвестиция"], ["loan", "кредит"], ["interest rate", "процентная ставка"], ["savings", "сбережения"], ["financial goal", "финансовая цель"], ["risk", "риск"]
    ],
    Academic: [
      ["research", "исследование"], ["evidence", "доказательство"], ["source", "источник"], ["summary", "краткое содержание"], ["argument", "аргумент"], ["compare", "сравнивать"], ["conclusion", "заключение"], ["method", "метод"], ["reliable", "надёжный"], ["analyse", "анализировать"]
    ]
  },
  B2: {
    General: [
      ["assumption", "предположение"], ["privacy", "конфиденциальность"], ["ambiguous", "двусмысленный"], ["subtle", "тонкий / едва заметный"], ["evaluate", "оценивать"], ["impact", "воздействие"], ["complex", "сложный"], ["approach", "подход"], ["challenge", "вызов"], ["solution", "решение"]
    ],
    Business: [
      ["market share", "доля рынка"], ["competitive advantage", "конкурентное преимущество"], ["stakeholder", "заинтересованная сторона"], ["revenue", "выручка"], ["brand awareness", "узнаваемость бренда"], ["leadership", "лидерство"], ["workflow", "рабочий процесс"], ["performance", "результативность"], ["deliverable", "результат работы"], ["scalable", "масштабируемый"]
    ],
    Finance: [
      ["cash flow", "денежный поток"], ["asset", "актив"], ["liability", "обязательство"], ["equity", "собственный капитал"], ["return on investment", "окупаемость инвестиций"], ["forecast", "прогноз"], ["diversify", "диверсифицировать"], ["capital", "капитал"], ["margin", "маржа"], ["liquidity", "ликвидность"]
    ],
    Academic: [
      ["hypothesis", "гипотеза"], ["criteria", "критерии"], ["interpretation", "интерпретация"], ["validity", "обоснованность"], ["framework", "структура"], ["perspective", "точка зрения"], ["bias", "предвзятость"], ["data", "данные"], ["findings", "результаты"], ["implication", "следствие"]
    ]
  },
  C1: {
    General: [
      ["scrutinise", "тщательно изучать"], ["mitigate", "смягчать"], ["substantiate", "обосновывать"], ["consequence", "последствие"], ["inherent", "присущий"], ["notion", "понятие"], ["nuance", "нюанс"], ["feasible", "осуществимый"], ["coherent", "последовательный"], ["constraint", "ограничение"]
    ],
    Business: [
      ["strategic alignment", "стратегическое согласование"], ["operational efficiency", "операционная эффективность"], ["value proposition", "ценностное предложение"], ["market penetration", "проникновение на рынок"], ["business model", "бизнес-модель"], ["resource allocation", "распределение ресурсов"], ["due diligence", "комплексная проверка"], ["benchmark", "ориентир"], ["sustainable growth", "устойчивый рост"], ["governance", "управление"]
    ],
    Finance: [
      ["working capital", "оборотный капитал"], ["leverage", "финансовый рычаг"], ["valuation", "оценка стоимости"], ["portfolio", "портфель"], ["yield", "доходность"], ["volatility", "волатильность"], ["capital allocation", "распределение капитала"], ["creditworthiness", "кредитоспособность"], ["fiscal discipline", "финансовая дисциплина"], ["risk exposure", "подверженность риску"]
    ],
    Academic: [
      ["methodology", "методология"], ["theoretical framework", "теоретическая база"], ["empirical evidence", "эмпирические доказательства"], ["correlation", "корреляция"], ["causation", "причинно-следственная связь"], ["paradigm", "парадигма"], ["premise", "предпосылка"], ["scope", "область исследования"], ["rigorous", "строгий"], ["contradictory", "противоречивый"]
    ]
  },
  C2: {
    General: [
      ["meticulous", "скрупулёзный"], ["discrepancy", "несоответствие"], ["convoluted", "запутанный"], ["pervasive", "широко распространённый"], ["elusive", "трудноуловимый"], ["scrutiny", "пристальное изучение"], ["detrimental", "вредный"], ["resilient", "устойчивый"], ["conundrum", "сложная проблема"], ["idiosyncratic", "своеобразный"]
    ],
    Business: [
      ["organisational inertia", "организационная инерция"], ["strategic inflection point", "стратегический переломный момент"], ["competitive moat", "устойчивое конкурентное преимущество"], ["execution bottleneck", "узкое место в реализации"], ["stakeholder buy-in", "поддержка заинтересованных сторон"], ["operational bottleneck", "операционное узкое место"], ["market saturation", "насыщение рынка"], ["corporate governance", "корпоративное управление"], ["long-term viability", "долгосрочная жизнеспособность"], ["commercial traction", "коммерческий спрос"]
    ],
    Finance: [
      ["fiduciary duty", "фидуциарная обязанность"], ["leverage ratio", "коэффициент финансового рычага"], ["liquidity constraint", "ограничение ликвидности"], ["capital structure", "структура капитала"], ["risk-adjusted return", "доходность с учётом риска"], ["debt covenant", "долговое обязательство"], ["asset impairment", "обесценение актива"], ["discounted cash flow", "дисконтированный денежный поток"], ["macroeconomic headwind", "макроэкономический встречный фактор"], ["solvency", "платёжеспособность"]
    ],
    Academic: [
      ["epistemological", "эпистемологический"], ["ontological", "онтологический"], ["interdisciplinary", "междисциплинарный"], ["counterintuitive", "противоречащий интуиции"], ["methodological limitation", "методологическое ограничение"], ["conceptual ambiguity", "концептуальная неоднозначность"], ["theoretical underpinning", "теоретическая основа"], ["longitudinal study", "лонгитюдное исследование"], ["replicability", "воспроизводимость"], ["scholarly consensus", "научный консенсус"]
    ]
  }
};

const KNOWN_TRANSLATIONS = {
  "привет": ["hello", "привет"],
  "здравствуйте": ["hello", "здравствуйте"],
  "спасибо": ["thank you", "спасибо"],
  "пока": ["goodbye", "пока"],
  "дом": ["house", "дом"],
  "школа": ["school", "школа"],
  "работа": ["job", "работа"],
  "деньги": ["money", "деньги"],
  "бизнес": ["business", "бизнес"],
  "финансы": ["finance", "финансы"],
  "инвестиция": ["investment", "инвестиция"],
  "инвестиции": ["investment", "инвестиции"],
  "бюджет": ["budget", "бюджет"],
  "стратегия": ["strategy", "стратегия"],
  "ответственность": ["responsibility", "ответственность"],
  "навык": ["skill", "навык"],
  "решение": ["decision", "решение"],
  "опыт": ["experience", "опыт"],
  "улучшать": ["improve", "улучшать"],
  "hello": ["hello", "привет"],
  "money": ["money", "деньги"],
  "budget": ["budget", "бюджет"],
  "strategy": ["strategy", "стратегия"],
  "investment": ["investment", "инвестиция"],
  "responsibility": ["responsibility", "ответственность"],
  "skill": ["skill", "навык"],
  "decision": ["decision", "решение"],
  "experience": ["experience", "опыт"],
  "improve": ["improve", "улучшать"]
};

function normaliseTopic(topic) {
  if (BUILT_IN_WORDS.A1[topic]) return topic;
  return "General";
}

function uniqueByWord(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.word.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function wordsToText(words) {
  return words.map((item) => `${item.word} — ${item.meaning}`).join(NL);
}

function parseWords(text, language = "Russian") {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const cleaned = line.replace(/\\n/g, "\n").trim();
      const divider = cleaned.includes("—") ? "—" : cleaned.includes("=") ? "=" : cleaned.includes("-") ? "-" : null;
      if (divider) {
        const [left, ...rest] = cleaned.split(divider);
        const word = String(left || "").trim();
        const meaning = rest.join("—").trim();
        if (!word) return null;
        return {
          word,
          meaning: meaning || "add the meaning",
          needsMeaning: !meaning
        };
      }

      const lower = cleaned.toLowerCase();
      if (KNOWN_TRANSLATIONS[lower]) {
        const [word, meaning] = KNOWN_TRANSLATIONS[lower];
        return { word, meaning, needsMeaning: false };
      }

      // If user types only one unknown word, keep it, but be honest in the worksheet.
      return {
        word: cleaned,
        meaning: "add the meaning",
        needsMeaning: true
      };
    })
    .filter(Boolean);
}

function getAutoWords(level, topic, count, seed = 0) {
  const cleanTopic = normaliseTopic(topic);
  const topicWords = BUILT_IN_WORDS[level]?.[cleanTopic] || [];
  const generalWords = BUILT_IN_WORDS[level]?.General || [];
  const pool = uniqueByWord([...topicWords, ...generalWords]);
  const rotated = [...pool.slice(seed % Math.max(pool.length, 1)), ...pool.slice(0, seed % Math.max(pool.length, 1))];
  return rotated.slice(0, Math.max(1, Number(count) || 10)).map(([word, meaning]) => ({ word, meaning, needsMeaning: false }));
}

function sentenceFor(item, level, topic) {
  const word = item.word;
  const t = normaliseTopic(topic);
  if (t === "Finance") return `A careful manager must understand "${word}" before making a financial decision.`;
  if (t === "Business") return `The team discussed "${word}" during an important business meeting.`;
  if (t === "Academic") return `Students should use "${word}" correctly in an academic explanation.`;
  if (level === "A1" || level === "A2") return `I can use "${word}" in a simple sentence.`;
  if (level === "C1" || level === "C2") return `The speaker used "${word}" to express a precise and complex idea.`;
  return `The word "${word}" is useful in everyday communication.`;
}

function buildHeader({ title, level, topic, language, materialFormat, mode }) {
  return [
    String(title || "A1ZIV Vocabulary Practice").toUpperCase(),
    `Level: ${level}`,
    `Topic: ${topic}`,
    `Translation language: ${language}`,
    `Format: ${MATERIAL_FORMATS.find((x) => x[0] === materialFormat)?.[1] || materialFormat}`,
    `Mode: ${mode}`,
    "",
    "Learning sequence:",
    "1. Study the vocabulary list.",
    "2. Check meaning recognition.",
    "3. Practise words in context.",
    "4. Use words in speaking or writing.",
    "5. Test yourself and check the answers.",
    ""
  ].join(NL);
}

function vocabularyList(words, language) {
  const lines = [`VOCABULARY LIST: ENGLISH — ${language}`, ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word} — ${item.meaning}`));
  if (words.some((w) => w.needsMeaning)) {
    lines.push("", "NOTE: Some words do not have translations yet. Add them in this format: word — translation.");
  }
  return lines.join(NL);
}

function matchMeanings(words, showAnswers) {
  const meanings = shuffle(words);
  const lines = ["EXERCISE. Match the words with the meanings.", ""];
  words.forEach((item, i) => lines.push(`${i + 1}. ${item.word}`));
  lines.push("");
  meanings.forEach((item, i) => lines.push(`${String.fromCharCode(65 + i)}. ${item.meaning}`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, i) => {
      const answerIndex = meanings.findIndex((m) => m.word === item.word);
      lines.push(`${i + 1}. ${String.fromCharCode(65 + answerIndex)} — ${item.word} = ${item.meaning}`);
    });
  }
  return lines.join(NL);
}

function fillGaps(words, showAnswers, level, topic) {
  const lines = ["EXERCISE. Fill in the gaps.", "", `Use the words: ${words.map((w) => w.word).join(", ")}`, ""];
  words.forEach((item, i) => {
    lines.push(`${i + 1}. ${sentenceFor({ ...item, word: "_____" }, level, topic).replace('"_____"', "_____")}`);
  });
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, i) => lines.push(`${i + 1}. ${item.word}`));
  }
  return lines.join(NL);
}

function multipleChoice(words, showAnswers, level, topic) {
  const lines = ["EXERCISE. Choose the correct option.", ""];
  const answers = [];
  words.forEach((item, i) => {
    const distractors = shuffle(words.filter((w) => w.word !== item.word)).slice(0, 3).map((w) => w.word);
    const options = shuffle([item.word, ...distractors]);
    const letter = String.fromCharCode(65 + options.indexOf(item.word));
    answers.push(`${i + 1}. ${letter} — ${item.word}`);
    lines.push(`${i + 1}. ${sentenceFor({ ...item, word: "_____" }, level, topic).replace('"_____"', "_____")}`);
    options.forEach((option, index) => lines.push(`${String.fromCharCode(65 + index)}. ${option}`));
    lines.push("");
  });
  if (showAnswers) lines.push("Answer Key:", ...answers);
  return lines.join(NL);
}

function translateToEnglish(words, showAnswers, language) {
  const lines = [`EXERCISE. Translate from ${language} into English.`, ""];
  words.forEach((item, i) => lines.push(`${i + 1}. ${item.meaning} — ______________________________`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, i) => lines.push(`${i + 1}. ${item.word}`));
  }
  return lines.join(NL);
}

function translateFromEnglish(words, showAnswers, language) {
  const lines = [`EXERCISE. Translate from English into ${language}.`, ""];
  words.forEach((item, i) => lines.push(`${i + 1}. ${item.word} — ______________________________`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, i) => lines.push(`${i + 1}. ${item.meaning}`));
  }
  return lines.join(NL);
}

function makeSentences(words) {
  const lines = ["EXERCISE. Make your own sentences.", ""];
  words.forEach((item, i) => lines.push(`${i + 1}. ${item.word}: ________________________________________________________________`));
  return lines.join(NL);
}

function definitions(words, showAnswers) {
  const lines = ["EXERCISE. Write definitions in English.", ""];
  words.forEach((item, i) => lines.push(`${i + 1}. ${item.word}: ________________________________________________________________`));
  if (showAnswers) {
    lines.push("", "Suggested answer key:");
    words.forEach((item, i) => lines.push(`${i + 1}. ${item.word} means "${item.meaning}".`));
  }
  return lines.join(NL);
}

function questions(words, level, topic) {
  const lines = ["EXERCISE. Answer the questions using the target vocabulary.", ""];
  words.forEach((item, i) => {
    if (topic === "Finance") lines.push(`${i + 1}. How can "${item.word}" affect a financial decision?`);
    else if (topic === "Business") lines.push(`${i + 1}. How can "${item.word}" be useful in a business situation?`);
    else lines.push(`${i + 1}. When could you use the word "${item.word}" in real life?`);
  });
  lines.push("", `Level focus: ${level}. Use full answers, not one-word answers.`);
  return lines.join(NL);
}

function spelling(words, showAnswers) {
  const lines = ["EXERCISE. Spelling practice.", ""];
  words.forEach((item, i) => lines.push(`${i + 1}. ${item.word[0] || ""}${"_".repeat(Math.max(2, item.word.length - 2))}${item.word.at(-1) || ""} — ${item.meaning}`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, i) => lines.push(`${i + 1}. ${item.word}`));
  }
  return lines.join(NL);
}

function collocations(words) {
  const lines = ["EXERCISE. Collocation practice.", ""];
  words.forEach((item, i) => lines.push(`${i + 1}. Write two words that can naturally go with "${item.word}": __________ / __________`));
  lines.push("", "Example: make a decision, financial decision, business strategy.");
  return lines.join(NL);
}

function wordFormation(words) {
  const lines = ["EXERCISE. Word formation.", ""];
  words.forEach((item, i) => lines.push(`${i + 1}. ${item.word}: noun __________ / verb __________ / adjective __________`));
  return lines.join(NL);
}

function oddOneOut(words) {
  const lines = ["EXERCISE. Odd one out.", ""];
  const groups = [];
  for (let i = 0; i < words.length; i += 4) groups.push(words.slice(i, i + 4));
  groups.forEach((group, index) => {
    if (group.length > 2) lines.push(`${index + 1}. ${group.map((w) => w.word).join(" / ")} — odd one out: __________ because ____________________`);
  });
  return lines.join(NL);
}

function miniStory(words, level, topic) {
  const lines = ["EXERCISE. Mini story.", "", `Write a short ${level} story about ${topic.toLowerCase()} using these words:`, words.map((w) => w.word).join(", "), "", "Your story:", "________________________________________________________________", "________________________________________________________________", "________________________________________________________________"];
  return lines.join(NL);
}

function readyDialogue(words, level, topic, showAnswers, exerciseType) {
  const selected = words.slice(0, 8);
  const context = topic === "Finance"
    ? "Two colleagues are discussing a financial decision."
    : topic === "Business"
      ? "Two colleagues are planning a business project."
      : "Two students are preparing for an important task.";

  const lines = ["READY DIALOGUE", `Scenario: ${context}`, ""];
  const speakers = ["A", "B"];
  selected.forEach((item, index) => {
    const speaker = speakers[index % 2];
    if (topic === "Finance") {
      lines.push(`${speaker}: We need to consider ${item.word} carefully because it can affect our financial plan.`);
    } else if (topic === "Business") {
      lines.push(`${speaker}: I think ${item.word} is important for this project because the team needs a clear direction.`);
    } else {
      lines.push(`${speaker}: I want to use ${item.word} correctly because it helps me express the idea better.`);
    }
  });

  lines.push("", "TARGET VOCABULARY IN THE DIALOGUE", vocabularyList(selected, "selected language"));

  if (exerciseType === "gap" || exerciseType === "sequence") {
    lines.push("", "DIALOGUE GAP TASK");
    selected.forEach((item, index) => lines.push(`${index + 1}. Complete the dialogue line with: ${item.meaning} — __________`));
    if (showAnswers) {
      lines.push("", "Answer Key:");
      selected.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
    }
  } else {
    lines.push("", buildExerciseByType(selected, exerciseType, showAnswers, level, topic, "selected language", false));
  }

  return lines.join(NL);
}

function readingText(words, level, topic, showAnswers, exerciseType, language) {
  const selected = words.slice(0, 8);
  const title = topic === "Finance" ? "A Careful Financial Decision" : topic === "Business" ? "A Team Meeting That Changed the Plan" : "Learning New Vocabulary Effectively";
  const lines = ["READING TEXT", title, ""];
  lines.push(`The situation required a ${level}-level understanding of the topic. The people involved had to think carefully about ${selected[0]?.word || "the issue"} and explain their ideas clearly.`);
  lines.push(`At first, there was some confusion, but the group used words such as ${selected.slice(1, 5).map((w) => w.word).join(", ")} to describe the problem.`);
  lines.push(`Finally, they reached a more practical conclusion and understood why ${selected.slice(5, 8).map((w) => w.word).join(", ")} mattered in this context.`);
  lines.push("");
  lines.push("COMPREHENSION QUESTIONS");
  lines.push("1. What was the main situation in the text?");
  lines.push("2. Which target words were used to explain the problem?");
  lines.push("3. What did the group understand at the end?");
  lines.push("");
  lines.push(buildExerciseByType(selected, exerciseType, showAnswers, level, topic, language, false));
  return lines.join(NL);
}

function grammarPractice(words, level, topic, showAnswers) {
  const lines = ["GRAMMAR PRACTICE", "", `Level focus: ${level}`, "Use the target vocabulary in grammatically correct sentences.", ""];
  lines.push("Task 1. Complete the sentences.");
  words.slice(0, 6).forEach((item, i) => lines.push(`${i + 1}. If we want to understand ${item.word}, we should ______________________________.`));
  lines.push("", "Task 2. Rewrite the sentences in a more advanced way.");
  words.slice(0, 4).forEach((item, i) => lines.push(`${i + 1}. This is important. → ${item.word}: ______________________________________.`));
  if (showAnswers) lines.push("", "Teacher note: accept answers that are grammatically correct and use the target vocabulary naturally.");
  return lines.join(NL);
}

function listeningScript(words, level, topic, showAnswers, language) {
  const lines = ["LISTENING SCRIPT", "", `Topic: ${topic}. Level: ${level}.`, ""];
  lines.push(`Today we are going to discuss vocabulary connected with ${topic.toLowerCase()}. These words are useful because they help speakers explain ideas more precisely.`);
  words.slice(0, 8).forEach((item) => lines.push(`The word "${item.word}" means "${item.meaning}". A speaker might use it in context when discussing ${topic.toLowerCase()}.`));
  lines.push("", "LISTENING TASK");
  lines.push("Listen and write the missing target words.");
  words.slice(0, 8).forEach((item, i) => lines.push(`${i + 1}. ${item.meaning} — ____________________`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.slice(0, 8).forEach((item, i) => lines.push(`${i + 1}. ${item.word}`));
  }
  return lines.join(NL);
}

function writingPractice(words, level, topic) {
  return [
    "WRITING PRACTICE",
    "",
    `Write a ${level}-level paragraph about ${topic.toLowerCase()}.`,
    "Use at least 6 target words:",
    words.slice(0, 10).map((w) => w.word).join(", "),
    "",
    "Writing space:",
    "________________________________________________________________",
    "________________________________________________________________",
    "________________________________________________________________",
    "",
    "Checklist:",
    "1. Did you use the target vocabulary?",
    "2. Did you write full sentences?",
    "3. Is your grammar accurate?",
    "4. Is your idea clear?"
  ].join(NL);
}

function useOfEnglish(words, showAnswers) {
  return [
    "USE OF ENGLISH",
    "",
    wordFormation(words),
    "",
    collocations(words),
    "",
    showAnswers ? "Teacher note: answers may vary. Check logic, grammar and natural usage." : ""
  ].join(NL);
}

function buildExerciseByType(words, type, showAnswers, level, topic, language, includeList = true) {
  const parts = [];
  if (includeList) parts.push(vocabularyList(words, language), "");
  if (type === "list") parts.push("");
  else if (type === "match") parts.push(matchMeanings(words, showAnswers));
  else if (type === "gap") parts.push(fillGaps(words, showAnswers, level, topic));
  else if (type === "choice") parts.push(multipleChoice(words, showAnswers, level, topic));
  else if (type === "translateToEnglish") parts.push(translateToEnglish(words, showAnswers, language));
  else if (type === "translateFromEnglish") parts.push(translateFromEnglish(words, showAnswers, language));
  else if (type === "sentences") parts.push(makeSentences(words));
  else if (type === "definitions") parts.push(definitions(words, showAnswers));
  else if (type === "questions") parts.push(questions(words, level, topic));
  else if (type === "spelling") parts.push(spelling(words, showAnswers));
  else if (type === "collocations") parts.push(collocations(words));
  else if (type === "wordFormation") parts.push(wordFormation(words));
  else if (type === "oddOneOut") parts.push(oddOneOut(words));
  else if (type === "miniStory") parts.push(miniStory(words, level, topic));
  else if (type === "mixed") parts.push(matchMeanings(words, showAnswers), "", fillGaps(words, showAnswers, level, topic), "", translateToEnglish(words, showAnswers, language), "", makeSentences(words));
  else parts.push(matchMeanings(words, showAnswers), "", fillGaps(words, showAnswers, level, topic), "", multipleChoice(words, showAnswers, level, topic), "", translateToEnglish(words, showAnswers, language), "", makeSentences(words));
  return parts.join(NL);
}

function buildMaterial({ words, title, level, topic, language, materialFormat, exerciseType, showAnswers, mode }) {
  if (!words.length) return "Add words first. Recommended format: English word — translation.";
  const header = buildHeader({ title, level, topic, language, materialFormat, mode });
  let body = "";
  if (materialFormat === "dialogue") body = readyDialogue(words, level, topic, showAnswers, exerciseType);
  else if (materialFormat === "reading") body = readingText(words, level, topic, showAnswers, exerciseType, language);
  else if (materialFormat === "grammar") body = grammarPractice(words, level, topic, showAnswers);
  else if (materialFormat === "listening") body = listeningScript(words, level, topic, showAnswers, language);
  else if (materialFormat === "writing") body = writingPractice(words, level, topic);
  else if (materialFormat === "useOfEnglish") body = useOfEnglish(words, showAnswers);
  else body = buildExerciseByType(words, exerciseType, showAnswers, level, topic, language);
  return `${header}${body}`;
}

function makeTestQuestions(words) {
  return shuffle(words).slice(0, Math.min(words.length, 10)).map((item) => {
    const options = shuffle([item.word, ...shuffle(words.filter((w) => w.word !== item.word)).slice(0, 3).map((w) => w.word)]);
    return { prompt: item.meaning, answer: item.word, options };
  });
}

function fileName(base, suffix, ext) {
  return `${String(base || "a1ziv").toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${suffix}.${ext}`;
}

function htmlWrap(text) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>A1ZIV worksheet</title><style>body{font-family:Arial,sans-serif;line-height:1.6;padding:32px;color:#111827}pre{white-space:pre-wrap;font-family:Arial,sans-serif}</style></head><body><pre>${String(text).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]))}</pre></body></html>`;
}

function App() {
  const [title, setTitle] = useState("A1ZIV Vocabulary Practice");
  const [level, setLevel] = useState("B1");
  const [topic, setTopic] = useState("Business");
  const [language, setLanguage] = useState("Russian");
  const [count, setCount] = useState(10);
  const [materialFormat, setMaterialFormat] = useState("vocabulary");
  const [exerciseType, setExerciseType] = useState("sequence");
  const [showAnswers, setShowAnswers] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [manualText, setManualText] = useState("");
  const [seed, setSeed] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState("txt");
  const [testAnswers, setTestAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [copied, setCopied] = useState("");

  const autoWords = useMemo(() => getAutoWords(level, topic, count, seed), [level, topic, count, seed]);
  const manualWords = useMemo(() => parseWords(manualText, language), [manualText, language]);

  const activeWords = autoMode ? autoWords : manualWords;
  const mode = autoMode ? "automatic vocabulary" : "custom edited vocabulary";

  const teacherVersion = useMemo(() => buildMaterial({ words: activeWords, title, level, topic, language, materialFormat, exerciseType, showAnswers: true, mode }), [activeWords, title, level, topic, language, materialFormat, exerciseType, mode]);
  const studentVersion = useMemo(() => buildMaterial({ words: activeWords, title, level, topic, language, materialFormat, exerciseType, showAnswers: false, mode }), [activeWords, title, level, topic, language, materialFormat, exerciseType, mode]);
  const previewText = showAnswers ? teacherVersion : studentVersion;
  const testQuestions = useMemo(() => makeTestQuestions(activeWords), [activeWords]);

  useEffect(() => {
    setTestAnswers({});
    setScore(null);
  }, [manualText, level, topic, count, seed, autoMode, language]);

  function handleEditCurrentWords() {
    const current = activeWords.length ? activeWords : autoWords;
    setManualText(wordsToText(current));
    setAutoMode(false);
  }

  function handleUseAutoWords() {
    setAutoMode(true);
    // Important: do NOT delete manualText. The user's custom list stays saved.
  }

  function handleRegenerateWords() {
    if (autoMode) {
      setSeed((x) => x + 3);
    } else {
      // In manual mode, regenerate must not erase the user's words.
      // It only refreshes the preview from the current textarea.
      setManualText((text) => text);
    }
  }

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      alert("Copy did not work. Select the text manually.");
    }
  }

  function download(text, suffix) {
    const ext = downloadFormat === "html" ? "html" : "txt";
    const content = downloadFormat === "html" ? htmlWrap(text) : text;
    const blob = new Blob([content], { type: downloadFormat === "html" ? "text/html;charset=utf-8" : "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName(title, suffix, ext);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function saveAs(text, suffix) {
    if (!window.showSaveFilePicker) {
      download(text, suffix);
      return;
    }
    const ext = downloadFormat === "html" ? "html" : "txt";
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName(title, suffix, ext),
      types: [{ description: downloadFormat.toUpperCase(), accept: { [downloadFormat === "html" ? "text/html" : "text/plain"]: [`.${ext}`] } }]
    });
    const writable = await handle.createWritable();
    await writable.write(downloadFormat === "html" ? htmlWrap(text) : text);
    await writable.close();
  }

  function checkTest() {
    let total = 0;
    testQuestions.forEach((q, index) => {
      if (testAnswers[index] === q.answer) total += 1;
    });
    setScore(total);
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">A1ZIV learning tool</p>
        <h1>English worksheet and vocabulary test generator</h1>
        <p className="hero-text">Create student and teacher versions, ready dialogues, readings, grammar tasks and interactive tests by level, topic and language.</p>
        <div className="hero-actions">
          <a href="#generator" className="button">Generate worksheet</a>
          <a href="#test" className="button secondary">Generate test</a>
        </div>
      </header>

      <section className="examples">
        <div><strong>B1 Business</strong><span> vocabulary worksheet</span></div>
        <div><strong>C1 Finance</strong><span> reading + tasks</span></div>
        <div><strong>A2 General</strong><span> interactive test</span></div>
      </section>

      <main id="generator" className="layout">
        <section className="panel controls">
          <h2>1. Choose settings</h2>

          <label>Worksheet/Test title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <div className="grid-2">
            <div>
              <label>Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                {LEVELS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label>Topic</label>
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                {TOPICS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div>
              <label>Translation language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {LANGUAGES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label>Number of words</label>
              <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
                {[5, 8, 10, 12, 15, 20].map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <label>Material format</label>
          <select value={materialFormat} onChange={(e) => setMaterialFormat(e.target.value)}>
            {MATERIAL_FORMATS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>

          <label>Exercise type</label>
          <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
            {EXERCISE_TYPES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>

          <div className="checkbox-row">
            <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} />
            <span>Show answer key in preview</span>
          </div>

          <div className="mode-box">
            <h3>2. Vocabulary source</h3>
            <p><strong>Current mode:</strong> {mode}</p>
            <div className="button-row">
              <button onClick={handleRegenerateWords}>Regenerate words</button>
              <button onClick={handleUseAutoWords} className="secondary">Use automatic words</button>
              <button onClick={handleEditCurrentWords} className="secondary">Edit current words</button>
            </div>
            <p className="hint">Manual words never disappear. Regenerate does not delete your custom list. Use format: <strong>word — translation</strong>. One word per line.</p>

            <label>Edit / paste your own words</label>
            <textarea
              value={manualText}
              onChange={(e) => {
                setManualText(e.target.value.replace(/\\n/g, "\n"));
                setAutoMode(false);
              }}
              placeholder={"strategy — стратегия\nbudget — бюджет\ninvestment — инвестиция"}
            />
            {!autoMode && manualWords.some((w) => w.needsMeaning) && (
              <p className="warning">Some words have no translation. Add meanings for better and more logical exercises.</p>
            )}
          </div>
        </section>

        <section className="panel output-panel">
          <h2>3. Output</h2>
          <div className="button-grid">
            <button onClick={() => copyText(studentVersion, "student")}>{copied === "student" ? "Copied" : "Copy Student Version"}</button>
            <button onClick={() => copyText(teacherVersion, "teacher")}>{copied === "teacher" ? "Copied" : "Copy Teacher Version"}</button>
            <button onClick={() => download(studentVersion, "student")}>Download Student</button>
            <button onClick={() => download(teacherVersion, "teacher")}>Download Teacher</button>
          </div>

          <label>Download format</label>
          <select value={downloadFormat} onChange={(e) => setDownloadFormat(e.target.value)}>
            <option value="txt">TXT</option>
            <option value="html">HTML</option>
          </select>
          <button className="wide secondary" onClick={() => saveAs(previewText, showAnswers ? "teacher" : "student")}>Choose where to save / Save as...</button>

          <pre className="result">{previewText}</pre>
        </section>
      </main>

      <section id="test" className="panel test-panel">
        <h2>Interactive test</h2>
        <p>Study the vocabulary, answer the questions, and check the score.</p>
        <div className="result mini">{vocabularyList(activeWords, language)}</div>

        {testQuestions.map((q, index) => (
          <div key={`${q.prompt}-${index}`} className="question-card">
            <p><strong>{index + 1}. Choose the English word for:</strong> {q.prompt}</p>
            {q.options.map((option) => (
              <label key={option} className="option-row">
                <input type="radio" name={`q-${index}`} checked={testAnswers[index] === option} onChange={() => setTestAnswers({ ...testAnswers, [index]: option })} />
                {option}
              </label>
            ))}
          </div>
        ))}

        <button onClick={checkTest}>Check my test</button>
        {score !== null && <div className="score">Score: {score} / {testQuestions.length}</div>}
      </section>

      <footer className="footer">
        <div>
          <h3>A1ZIV</h3>
          <p>Educational worksheet and vocabulary practice generator. Always review generated materials before official use.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p><a href="mailto:ksam54041@gmai.com">ksam54041@gmai.com</a></p>
        </div>
        <details>
          <summary>Privacy Policy</summary>
          <p>This site does not require accounts, passwords or payments. Text entered into the generator stays in the browser unless the user sends feedback by email.</p>
        </details>
        <details>
          <summary>Terms of Use</summary>
          <p>The site is provided for educational purposes. Users are responsible for checking generated content before using it with students or in official materials.</p>
        </details>
        <details>
          <summary>Disclaimer</summary>
          <p>Generated translations, grammar tasks and exercises may contain mistakes. The tool supports learning but does not replace a qualified teacher.</p>
        </details>
        <details>
          <summary>Cookies</summary>
          <p>The current version does not use advertising cookies or tracking cookies.</p>
        </details>
        <p className="copyright">© 2026 A1ZIV / Alexandr Balyuba. All rights reserved.</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
