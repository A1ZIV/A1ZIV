import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const NL = String.fromCharCode(10);

const DEFAULT_INPUT = `flustered — растерянный
cracked up — рассмеялся
head off — отправиться
thrilled — в восторге
bits — кусочки
thrilled to bits — в полном восторге
taken aback — ошарашен
edge — край
clammy — липкий / влажный
clammed up — замкнулся
fit — в форме / подходить
promotion — повышение
temper — самообладание
accidentally — случайно
tidy up — прибраться
fool — дурак
chuffed — довольный
satisfied — удовлетворённый
moved — тронутый
blast — громкость / взрыв
turn down — отказаться / убавить
mortified — ужасно смущённый
disappear — исчезнуть
crawl — ползти
tense — напряжённый
overwhelmed — перегруженный`;

const SENTENCES = {
  flustered: "I felt _____ when the teacher suddenly asked me to answer.",
  "cracked up": "Everyone _____ when the dog stole the sandwich.",
  "head off": "We need to _____ before it gets dark.",
  thrilled: "She was _____ when she heard the good news.",
  bits: "The glass broke into tiny _____.",
  "thrilled to bits": "He was _____ when he passed the exam.",
  "taken aback": "I was _____ by his rude answer.",
  edge: "Do not stand near the _____ of the cliff.",
  clammy: "My hands were _____ before the interview.",
  "clammed up": "He _____ and could not answer the question.",
  fit: "He is very _____ because he trains every day.",
  promotion: "She got a _____ and became a manager.",
  temper: "Do not lose your _____ over a small problem.",
  accidentally: "I _____ sent the message to the wrong person.",
  "tidy up": "Please _____ your room before guests arrive.",
  fool: "Do not be a _____. Think first.",
  chuffed: "I was really _____ when my teacher praised me.",
  satisfied: "Are you _____ with your result?",
  moved: "I was _____ by the sad story.",
  blast: "The music was at full _____.",
  "turn down": "She had to _____ the invitation because she was busy.",
  mortified: "He was _____ when everyone saw his mistake.",
  disappear: "My keys always _____ when I need them.",
  crawl: "The baby started to _____ across the floor.",
  tense: "The atmosphere was very _____ after the argument.",
  overwhelmed: "I feel _____ because I have too many tasks."
};

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
      return { word, meaning };
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

function sentenceFor(word) {
  const key = word.toLowerCase().trim();
  return SENTENCES[key] || `Use the word correctly: _____. Meaning: ${word}`;
}

function fileName(title) {
  return String(title || "vocabulary_workbook").toLowerCase().split(" ").filter(Boolean).join("_") + ".txt";
}

function matchMeanings(words) {
  const mixed = shuffle(words);
  const lines = ["EXERCISE 1. Match the words with the meanings.", ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
  lines.push("");
  mixed.forEach((item, index) => lines.push(`${String.fromCharCode(65 + index)}. ${item.meaning || "write the meaning"}`));
  lines.push("", "Answer Key:");
  words.forEach((item, index) => {
    const answerIndex = mixed.findIndex((mixedItem) => mixedItem.word === item.word);
    lines.push(`${index + 1}. ${String.fromCharCode(65 + answerIndex)} — ${item.word} = ${item.meaning}`);
  });
  return lines.join(NL);
}

function fillGaps(words) {
  const lines = ["EXERCISE 2. Fill in the gaps.", "", "Use the words:", words.map((item) => item.word).join(" – "), ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${sentenceFor(item.word)}`));
  lines.push("", "Answer Key:");
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
  return lines.join(NL);
}

function chooseOption(words) {
  if (words.length < 2) return "Choose the correct option needs at least 2 words.";
  const lines = ["EXERCISE 3. Choose the correct option.", ""];
  const answers = [];
  words.forEach((item, index) => {
    const wrongOptions = shuffle(words.filter((other) => other.word !== item.word)).slice(0, 3).map((other) => other.word);
    const options = shuffle([item.word, ...wrongOptions]);
    const correctLetter = String.fromCharCode(65 + options.indexOf(item.word));
    answers.push(`${index + 1}. ${correctLetter} — ${item.word}`);
    lines.push(`${index + 1}. ${sentenceFor(item.word)}`);
    options.forEach((option, optionIndex) => lines.push(`${String.fromCharCode(65 + optionIndex)}. ${option}`));
    lines.push("");
  });
  lines.push("Answer Key:", ...answers);
  return lines.join(NL);
}

function translation(words) {
  const lines = ["EXERCISE 4. Translate into English.", ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.meaning || "..."} — ______________________________`));
  lines.push("", "Answer Key:");
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}`));
  return lines.join(NL);
}

function personalSentences(words) {
  const lines = ["EXERCISE 5. Personal sentences.", ""];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word}: ________________________________________________________________`));
  lines.push("", "Teacher check: the student must use each word naturally and correctly.");
  return lines.join(NL);
}

function fullWorkbook(words, title) {
  const lines = [String(title || "Vocabulary Practice Workbook").toUpperCase(), "", "Words to learn:"];
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.word} — ${item.meaning || "..."}`));
  lines.push("", matchMeanings(words), "", fillGaps(words), "", chooseOption(words), "", translation(words), "", personalSentences(words));
  lines.push("", "FINAL MEMORY TEST", "Close the word list and write the English words.", "");
  words.forEach((item, index) => lines.push(`${index + 1}. ${item.meaning || "..."} — ______________________________`));
  return lines.join(NL);
}

function buildHeader(title, level, age, format) {
  const lines = [
    String(title || "Vocabulary Practice Workbook").toUpperCase(),
    `Level: ${level}`,
    `Age group: ${age}`,
    `Format: ${format}`,
    ""
  ];

  if (format === "test") lines.push("Instructions: Complete the tasks without using notes. Teacher checks the answers at the end.", "");
  if (format === "dialogue") lines.push("Instructions: Use the vocabulary in a natural dialogue. Focus on accuracy and fluency.", "");
  if (format === "speaking") lines.push("Instructions: Answer in full sentences and use the target vocabulary in speech.", "");
  if (format === "worksheet") lines.push("Instructions: Complete the worksheet and check your answers with the teacher.", "");

  return lines.join(NL);
}

function dialoguePractice(words, level, age) {
  const lines = ["DIALOGUE PRACTICE", "", "Use the words below in a natural conversation:", words.map((item) => item.word).join(" – "), ""];
  lines.push("Student A: Ask questions and react naturally.");
  lines.push("Student B: Answer with details and use the target vocabulary.", "");
  lines.push("Example prompts:");
  words.slice(0, 10).forEach((item, index) => lines.push(`${index + 1}. Create a short dialogue using: ${item.word}`));
  lines.push("", `Level focus: ${level}. Age group: ${age}.`);
  return lines.join(NL);
}

function speakingPractice(words, level, age) {
  const lines = ["SPEAKING PRACTICE", "", "Answer the questions. Use the target words in your answers.", ""];
  words.slice(0, 12).forEach((item, index) => lines.push(`${index + 1}. Tell a short story or example using: ${item.word}`));
  lines.push("", "Follow-up challenge:", "Choose 5 words and make one longer answer with all of them.");
  lines.push("", `Level focus: ${level}. Age group: ${age}.`);
  return lines.join(NL);
}

function testFormat(words, type, title) {
  const lines = ["TEST VERSION", "", buildWorksheet(words, type, title, "B1", "teens", "worksheet"), "", "Score: ______ / ______"];
  return lines.join(NL);
}

function buildWorksheet(words, type, title, level = "B1", age = "teens", format = "worksheet") {
  if (words.length === 0) return "Paste your words first. Example: flustered — растерянный";
  if (format === "dialogue") return buildHeader(title, level, age, format) + dialoguePractice(words, level, age);
  if (format === "speaking") return buildHeader(title, level, age, format) + speakingPractice(words, level, age);
  const generators = {
    match: () => matchMeanings(words),
    gap: () => fillGaps(words),
    choose: () => chooseOption(words),
    translation: () => translation(words),
    personal: () => personalSentences(words),
    full: () => fullWorkbook(words, title)
  };
  const body = format === "test" ? testFormat(words, type, title) : (generators[type] || generators.full)();
  return buildHeader(title, level, age, format) + body;
}

function App() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [exerciseType, setExerciseType] = useState("full");
  const [level, setLevel] = useState("B1");
  const [age, setAge] = useState("teens");
  const [format, setFormat] = useState("worksheet");
  const [title, setTitle] = useState("Vocabulary Practice Workbook");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const words = useMemo(() => parseWords(input), [input]);
  const generatedText = output || buildWorksheet(words, exerciseType, title, level, age, format);

  function handleGenerate() {
    setOutput(buildWorksheet(words, exerciseType, title, level, age, format));
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

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
          <p className="mb-2 text-sm font-semibold text-slate-500">Worksheet generator</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">Vocabulary Exercise Generator</h1>
              <p className="mt-3 max-w-2xl text-slate-600">Paste words, choose an exercise type, and generate a ready worksheet instantly.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleGenerate} className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700">Generate</button>
              <button onClick={handleCopy} className="rounded-2xl border bg-white px-6 py-3 font-semibold hover:bg-slate-50">{copied ? "Copied" : "Copy"}</button>
              <button onClick={handleDownload} className="rounded-2xl border bg-white px-6 py-3 font-semibold hover:bg-slate-50">Download</button>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Input</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">{words.length} words</span>
            </div>

            <label className="mb-2 block text-sm font-semibold">Worksheet title</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="mb-4 w-full rounded-2xl border bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-slate-300" />

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold">Level</label>
                <select value={level} onChange={(event) => setLevel(event.target.value)} className="mb-4 w-full rounded-2xl border bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-slate-300">
                  <option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option><option value="C1">C1</option><option value="C2">C2</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Age</label>
                <select value={age} onChange={(event) => setAge(event.target.value)} className="mb-4 w-full rounded-2xl border bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-slate-300">
                  <option value="kids">kids</option><option value="teens">teens</option><option value="adults">adults</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Format</label>
                <select value={format} onChange={(event) => setFormat(event.target.value)} className="mb-4 w-full rounded-2xl border bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-slate-300">
                  <option value="worksheet">worksheet</option><option value="test">test</option><option value="dialogue">dialogue</option><option value="speaking">speaking practice</option>
                </select>
              </div>
            </div>

            <label className="mb-2 block text-sm font-semibold">Exercise type</label>
            <select value={exerciseType} onChange={(event) => setExerciseType(event.target.value)} className="mb-4 w-full rounded-2xl border bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-slate-300">
              <option value="match">Match meanings</option><option value="gap">Fill in gaps</option><option value="choose">Choose the correct option</option><option value="translation">Translation</option><option value="personal">Personal sentences</option><option value="full">Full workbook</option>
            </select>

            <label className="mb-2 block text-sm font-semibold">Paste words here</label>
            <textarea value={input} onChange={(event) => setInput(event.target.value)} className="h-[460px] w-full resize-none rounded-2xl border bg-slate-50 p-4 font-mono text-sm leading-6 outline-none focus:ring-2 focus:ring-slate-300" />
            <p className="mt-2 text-xs text-slate-500">Format: word — meaning. One word per line.</p>
          </section>

          <section className="rounded-3xl border bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Generated result</h2>
              <button onClick={handleGenerate} className="rounded-xl px-4 py-2 text-sm font-semibold hover:bg-slate-100">Regenerate</button>
            </div>
            {!output ? (
              <div className="flex h-[620px] flex-col items-center justify-center rounded-2xl border bg-slate-50 text-center text-slate-500">
                <p className="text-lg font-bold text-slate-700">Press Generate</p>
                <p className="mt-2 max-w-sm text-sm">Your worksheet will appear here.</p>
              </div>
            ) : (
              <pre className="h-[620px] overflow-auto whitespace-pre-wrap rounded-2xl border bg-slate-50 p-5 text-sm leading-6 text-slate-800">{output}</pre>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
