import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const NL = String.fromCharCode(10);
const CONTACT_EMAIL = "ksam54041@gmail.com";
const LEARNED_WORDS_STORAGE_KEY = "a1ziv_learned_words_v1";

function clampWordCount(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return 10;
  return Math.max(1, Math.min(100, Math.round(number)));
}

function normaliseWordKey(word) {
  return String(word || "").trim().toLowerCase();
}

function loadLearnedWords() {
  try {
    const raw = window.localStorage.getItem(LEARNED_WORDS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function saveLearnedWords(words) {
  try {
    window.localStorage.setItem(LEARNED_WORDS_STORAGE_KEY, JSON.stringify(words));
  } catch {
    // Local storage may be unavailable in some browsers. The site still works without archive persistence.
  }
}

const LANGUAGES = [
  "Russian", "Kazakh", "Swedish", "German", "Spanish", "Italian", "Japanese", "Chinese", "Norwegian", "Portuguese", "Czech", "French", "Dutch"
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const TOPICS = ["Everyday life", "School", "Travel", "Work", "Business", "Finance", "Technology", "Health", "Environment", "Emotions", "Crime", "Culture"];

const TASK_TYPES = [
  { value: "full", label: "Full learning sequence" },
  { value: "match", label: "Match words and meanings" },
  { value: "gap", label: "Fill in the gaps" },
  { value: "mcq", label: "Multiple choice" },
  { value: "translation_en", label: "Translate into English" },
  { value: "translation_target", label: "Translate from English" },
  { value: "definitions", label: "Write definitions" },
  { value: "sentences", label: "Make sentences" },
  { value: "questions", label: "Personal questions" },
  { value: "collocations", label: "Collocations" },
  { value: "word_formation", label: "Word formation" },
  { value: "odd", label: "Odd one out" },
  { value: "story", label: "Mini story" },
  { value: "mixed", label: "Mixed challenge" }
];

const FORMATS = [
  { value: "worksheet", label: "Vocabulary worksheet" },
  { value: "test", label: "Paper test" },
  { value: "dialogue", label: "Ready dialogue" },
  { value: "reading", label: "Reading text" },
  { value: "grammar", label: "Grammar practice" },
  { value: "listening", label: "Listening script" },
  { value: "writing", label: "Writing practice" },
  { value: "useofenglish", label: "Use of English" }
];

const BASE_WORDS = {
  A1: {
    "Everyday life": ["house|дом|үй|hus|Haus", "family|семья|отбасы|familj|Familie", "food|еда|тамақ|mat|Essen", "water|вода|су|vatten|Wasser", "friend|друг|дос|vän|Freund", "happy|счастливый|бақытты|glad|glücklich", "small|маленький|кішкентай|liten|klein", "big|большой|үлкен|stor|groß", "morning|утро|таң|morgon|Morgen", "evening|вечер|кеш|kväll|Abend"],
    Business: ["shop|магазин|дүкен|butik|Geschäft", "buy|покупать|сатып алу|köpa|kaufen", "sell|продавать|сату|sälja|verkaufen", "price|цена|баға|pris|Preis", "money|деньги|ақша|pengar|Geld", "work|работа|жұмыс|arbete|Arbeit", "boss|начальник|бастық|chef|Chef", "customer|клиент|клиент|kund|Kunde", "office|офис|кеңсе|kontor|Büro", "help|помогать|көмектесу|hjälpa|helfen"],
    Finance: ["money|деньги|ақша|pengar|Geld", "bank|банк|банк|bank|Bank", "card|карта|карта|kort|Karte", "cash|наличные|қолма-қол ақша|kontanter|Bargeld", "price|цена|баға|pris|Preis", "pay|платить|төлеу|betala|bezahlen", "save|копить|жинау|spara|sparen", "cost|стоить|құны|kosta|kosten", "coin|монета|тиын|mynt|Münze", "bill|счёт|шот|räkning|Rechnung"]
  },
  A2: {
    "Everyday life": ["appointment|встреча|кездесу|möte|Termin", "neighbour|сосед|көрші|granne|Nachbar", "borrow|занимать|қарызға алу|låna|ausleihen", "return|возвращать|қайтару|lämna tillbaka|zurückgeben", "prepare|готовить|дайындау|förbereda|vorbereiten", "decide|решать|шешу|bestämma|entscheiden", "invite|приглашать|шақыру|bjuda in|einladen", "comfortable|удобный|ыңғайлы|bekväm|bequem", "busy|занятый|бос емес|upptagen|beschäftigt", "problem|проблема|мәселе|problem|Problem"],
    Business: ["meeting|встреча|жиналыс|möte|Besprechung", "manager|менеджер|менеджер|chef|Manager", "order|заказ|тапсырыс|beställning|Bestellung", "delivery|доставка|жеткізу|leverans|Lieferung", "schedule|расписание|кесте|schema|Zeitplan", "task|задача|тапсырма|uppgift|Aufgabe", "email|электронное письмо|электрондық хат|e-post|E-Mail", "client|клиент|клиент|kund|Kunde", "plan|план|жоспар|plan|Plan", "report|отчёт|есеп|rapport|Bericht"],
    Finance: ["budget|бюджет|бюджет|budget|Budget", "income|доход|табыс|inkomst|Einkommen", "expense|расход|шығын|utgift|Ausgabe", "receipt|чек|түбіртек|kvitto|Quittung", "discount|скидка|жеңілдік|rabatt|Rabatt", "salary|зарплата|жалақы|lön|Gehalt", "rent|аренда|жалға алу ақысы|hyra|Miete", "account|счёт|шот|konto|Konto", "transfer|перевод|аударым|överföring|Überweisung", "payment|платёж|төлем|betalning|Zahlung"]
  },
  B1: {
    "Everyday life": ["confident|уверенный|сенімді|självsäker|selbstbewusst", "improve|улучшать|жақсарту|förbättra|verbessern", "experience|опыт|тәжірибе|erfarenhet|Erfahrung", "challenge|вызов|қиындық|utmaning|Herausforderung", "support|поддержка|қолдау|stöd|Unterstützung", "opportunity|возможность|мүмкіндік|möjlighet|Gelegenheit", "responsible|ответственный|жауапты|ansvarig|verantwortlich", "decision|решение|шешім|beslut|Entscheidung", "achieve|достигать|жету|uppnå|erreichen", "avoid|избегать|болдырмау|undvika|vermeiden"],
    Business: ["deadline|срок|мерзім|deadline|Frist", "negotiate|вести переговоры|келіссөз жүргізу|förhandla|verhandeln", "proposal|предложение|ұсыныс|förslag|Vorschlag", "customer service|обслуживание клиентов|клиенттерге қызмет көрсету|kundservice|Kundendienst", "teamwork|командная работа|топтық жұмыс|lagarbete|Teamarbeit", "target|цель|мақсат|mål|Ziel", "strategy|стратегия|стратегия|strategi|Strategie", "feedback|обратная связь|кері байланыс|feedback|Rückmeldung", "performance|результативность|нәтиже|prestation|Leistung", "growth|рост|өсу|tillväxt|Wachstum"],
    Finance: ["profit|прибыль|пайда|vinst|Gewinn", "loss|убыток|шығын|förlust|Verlust", "investment|инвестиция|инвестиция|investering|Investition", "savings|сбережения|жинақ|sparande|Ersparnisse", "loan|кредит|несие|lån|Darlehen", "interest|процент|пайыз|ränta|Zinsen", "tax|налог|салық|skatt|Steuer", "invoice|счёт-фактура|шот-фактура|faktura|Rechnung", "cash flow|денежный поток|ақша ағыны|kassaflöde|Cashflow", "debt|долг|қарыз|skuld|Schuld"]
  },
  B2: {
    "Everyday life": ["evaluate|оценивать|бағалау|utvärdera|bewerten", "assumption|предположение|болжам|antagande|Annahme", "evidence|доказательство|дәлел|bevis|Beweis", "priority|приоритет|басымдық|prioritet|Priorität", "reliable|надёжный|сенімді|pålitlig|zuverlässig", "maintain|поддерживать|қолдау|upprätthålla|aufrechterhalten", "significant|значительный|маңызды|betydande|bedeutend", "concern|беспокойство|алаңдаушылық|oro|Sorge", "approach|подход|тәсіл|tillvägagångssätt|Ansatz", "outcome|результат|нәтиже|resultat|Ergebnis"],
    Business: ["stakeholder|заинтересованная сторона|мүдделі тарап|intressent|Interessengruppe", "revenue|выручка|кіріс|intäkt|Umsatz", "market share|доля рынка|нарық үлесі|marknadsandel|Marktanteil", "competitive advantage|конкурентное преимущество|бәсекелік артықшылық|konkurrensfördel|Wettbewerbsvorteil", "brand awareness|узнаваемость бренда|бренд танымалдығы|varumärkeskännedom|Markenbekanntheit", "operations|операционная деятельность|операциялар|verksamhet|Betrieb", "efficiency|эффективность|тиімділік|effektivitet|Effizienz", "risk assessment|оценка рисков|тәуекелді бағалау|riskbedömning|Risikobewertung", "contract|договор|келісімшарт|avtal|Vertrag", "supplier|поставщик|жеткізуші|leverantör|Lieferant"],
    Finance: ["liability|обязательство|міндеттеме|skuld|Verbindlichkeit", "asset|актив|актив|tillgång|Vermögenswert", "equity|собственный капитал|меншікті капитал|eget kapital|Eigenkapital", "margin|маржа|маржа|marginal|Marge", "forecast|прогноз|болжам|prognos|Prognose", "audit|аудит|аудит|revision|Prüfung", "liquidity|ликвидность|өтімділік|likviditet|Liquidität", "portfolio|портфель|портфель|portfölj|Portfolio", "return on investment|окупаемость инвестиций|инвестиция қайтарымы|avkastning på investering|Kapitalrendite", "financial statement|финансовая отчётность|қаржылық есеп|finansiell rapport|Finanzbericht"]
  },
  C1: {
    "Everyday life": ["nuance|нюанс|нюанс|nyans|Nuance", "interpretation|интерпретация|түсіндіру|tolkning|Interpretation", "constraint|ограничение|шектеу|begränsning|Einschränkung", "implication|последствие|салдар|konsekvens|Auswirkung", "substantial|существенный|елеулі|betydande|erheblich", "coherent|связный|бірізді|sammanhängande|kohärent", "perspective|точка зрения|көзқарас|perspektiv|Perspektive", "criteria|критерии|өлшемдер|kriterier|Kriterien", "justify|обосновывать|негіздеу|motivera|begründen", "contradiction|противоречие|қайшылық|motsägelse|Widerspruch"],
    Business: ["scalability|масштабируемость|масштабталу|skalbarhet|Skalierbarkeit", "due diligence|комплексная проверка|тиісті тексеру|företagsbesiktning|Due Diligence", "value proposition|ценностное предложение|құндылық ұсынысы|värdeerbjudande|Wertversprechen", "market penetration|проникновение на рынок|нарыққа ену|marknadspenetration|Marktdurchdringung", "operational bottleneck|операционное узкое место|операциялық тар орын|operativ flaskhals|betrieblicher Engpass", "strategic alignment|стратегическое согласование|стратегиялық сәйкестік|strategisk anpassning|strategische Ausrichtung", "cost optimisation|оптимизация затрат|шығындарды оңтайландыру|kostnadsoptimering|Kostenoptimierung", "corporate governance|корпоративное управление|корпоративтік басқару|bolagsstyrning|Unternehmensführung", "benchmarking|сравнительный анализ|салыстырмалы талдау|benchmarking|Benchmarking", "resource allocation|распределение ресурсов|ресурстарды бөлу|resursfördelning|Ressourcenzuweisung"],
    Finance: ["capital allocation|распределение капитала|капиталды бөлу|kapitalallokering|Kapitalallokation", "working capital|оборотный капитал|айналым капиталы|rörelsekapital|Betriebskapital", "leverage ratio|коэффициент финансового рычага|левередж коэффициенті|skuldsättningsgrad|Verschuldungsgrad", "fiduciary duty|фидуциарная обязанность|сенімгерлік міндет|förvaltaransvar|Treuepflicht", "valuation|оценка стоимости|бағалау|värdering|Bewertung", "solvency|платёжеспособность|төлем қабілеттілігі|solvens|Zahlungsfähigkeit", "diversification|диверсификация|әртараптандыру|diversifiering|Diversifikation", "depreciation|амортизация|амортизация|avskrivning|Abschreibung", "compliance|соответствие требованиям|талаптарға сәйкестік|regelefterlevnad|Compliance", "financial resilience|финансовая устойчивость|қаржылық тұрақтылық|finansiell motståndskraft|finanzielle Widerstandsfähigkeit"]
  },
  C2: {
    "Everyday life": ["ambiguous|двусмысленный|екіұшты|tvetydig|mehrdeutig", "meticulous|скрупулёзный|мұқият|noggrann|akribisch", "scrutinize|тщательно изучать|мұқият тексеру|granska noggrant|genau prüfen", "discrepancy|несоответствие|сәйкессіздік|avvikelse|Diskrepanz", "intricate|сложный|күрделі|invecklad|kompliziert", "pervasive|повсеместный|кең таралған|genomgripande|allgegenwärtig", "counterintuitive|парадоксальный|түйсікке қайшы|kontraintuitiv|kontraintuitiv", "underpin|лежать в основе|негіз болу|ligga till grund för|untermauern", "mitigate|смягчать|жеңілдету|mildra|abmildern", "obsolete|устаревший|ескірген|föråldrad|veraltet"],
    Business: ["strategic inflection point|стратегический переломный момент|стратегиялық бұрылыс нүктесі|strategisk brytpunkt|strategischer Wendepunkt", "market saturation|насыщение рынка|нарықтың қанығуы|marknadsmättnad|Marktsättigung", "organisational inertia|организационная инерция|ұйымдық инерция|organisatorisk tröghet|organisatorische Trägheit", "competitive moat|защитное конкурентное преимущество|бәсекелік қорғаныс|konkurrensvallgrav|Wettbewerbsgraben", "regulatory headwinds|регуляторные препятствия|реттеуші кедергілер|regulatorisk motvind|regulatorischer Gegenwind", "cross-functional synergy|межфункциональная синергия|кросс-функционалды синергия|tvärfunktionell synergi|funktionsübergreifende Synergie", "enterprise-grade solution|решение корпоративного уровня|кәсіпорын деңгейіндегі шешім|företagsklassad lösning|Unternehmenslösung", "pricing elasticity|ценовая эластичность|баға икемділігі|priselasticitet|Preiselastizität", "operational leverage|операционный рычаг|операциялық левередж|operativ hävstång|operativer Hebel", "shareholder value creation|создание акционерной стоимости|акционерлік құн жасау|skapande av aktieägarvärde|Schaffung von Aktionärswert"],
    Finance: ["risk-adjusted return|доходность с поправкой на риск|тәуекелге түзетілген кіріс|riskjusterad avkastning|risikobereinigte Rendite", "discounted cash flow|дисконтированный денежный поток|дисконтталған ақша ағыны|diskonterat kassaflöde|diskontierter Cashflow", "capital adequacy|достаточность капитала|капитал жеткіліктілігі|kapitaltäckning|Kapitaladäquanz", "counterparty risk|риск контрагента|контрагент тәуекелі|motpartsrisk|Kontrahentenrisiko", "asset-liability mismatch|несоответствие активов и обязательств|актив пен міндеттеме сәйкессіздігі|obalans mellan tillgångar och skulder|Aktiv-Passiv-Inkongruenz", "impairment charge|обесценение актива|құнсыздану шығыны|nedskrivningskostnad|Wertminderungsaufwand", "covenant breach|нарушение ковенанта|ковенантты бұзу|kovenantbrott|Vertragsklauselverletzung", "liquidity crunch|кризис ликвидности|өтімділік дағдарысы|likviditetskris|Liquiditätsengpass", "macroeconomic volatility|макроэкономическая волатильность|макроэкономикалық құбылмалылық|makroekonomisk volatilitet|makroökonomische Volatilität", "earnings accretion|рост прибыли на акцию|пайданың артуы|vinstökning|Gewinnsteigerung"]
  }
};

const EXTRA_TOPICS = {
  School: ["teacher|учитель|мұғалім|lärare|Lehrer", "exam|экзамен|емтихан|prov|Prüfung", "homework|домашнее задание|үй жұмысы|läxa|Hausaufgabe", "subject|предмет|пән|ämne|Fach", "grade|оценка|баға|betyg|Note"],
  Travel: ["airport|аэропорт|әуежай|flygplats|Flughafen", "ticket|билет|билет|biljett|Ticket", "luggage|багаж|жүк|bagage|Gepäck", "destination|пункт назначения|баратын жер|destination|Reiseziel", "delay|задержка|кешігу|försening|Verspätung"],
  Work: ["colleague|коллега|әріптес|kollega|Kollege", "shift|смена|ауысым|skift|Schicht", "training|обучение|оқыту|utbildning|Schulung", "responsibility|ответственность|жауапкершілік|ansvar|Verantwortung", "promotion|повышение|жоғарылату|befordran|Beförderung"],
  Technology: ["device|устройство|құрылғы|enhet|Gerät", "software|программное обеспечение|бағдарлама|programvara|Software", "privacy|конфиденциальность|құпиялылық|integritet|Datenschutz", "update|обновление|жаңарту|uppdatering|Aktualisierung", "network|сеть|желі|nätverk|Netzwerk"],
  Health: ["symptom|симптом|белгі|symtom|Symptom", "treatment|лечение|емдеу|behandling|Behandlung", "recovery|выздоровление|сауығу|återhämtning|Genesung", "balanced diet|сбалансированное питание|теңгерімді тамақтану|balanserad kost|ausgewogene Ernährung", "mental health|психическое здоровье|психикалық денсаулық|psykisk hälsa|psychische Gesundheit"],
  Environment: ["pollution|загрязнение|ластану|förorening|Verschmutzung", "recycle|перерабатывать|қайта өңдеу|återvinna|recyceln", "climate|климат|климат|klimat|Klima", "sustainable|устойчивый|тұрақты|hållbar|nachhaltig", "wildlife|дикая природа|жабайы табиғат|djurliv|Tierwelt"],
  Emotions: ["anxious|тревожный|мазасыз|orolig|ängstlich", "relieved|облегчённый|жеңілдеген|lättad|erleichtert", "frustrated|расстроенный|ашулы|frustrerad|frustriert", "overwhelmed|перегруженный|қатты шаршаған|överväldigad|überfordert", "grateful|благодарный|ризашылық білдіретін|tacksam|dankbar"],
  Crime: ["suspect|подозреваемый|күдікті|misstänkt|Verdächtiger", "evidence|доказательство|дәлел|bevis|Beweis", "witness|свидетель|куәгер|vittne|Zeuge", "investigate|расследовать|тергеу|utreda|ermitteln", "sentence|приговор|үкім|dom|Urteil"],
  Culture: ["tradition|традиция|дәстүр|tradition|Tradition", "identity|идентичность|бірегейлік|identitet|Identität", "heritage|наследие|мұра|arv|Erbe", "custom|обычай|әдет-ғұрып|sed|Brauch", "diversity|разнообразие|алуан түрлілік|mångfald|Vielfalt"]
};

const LANGUAGE_INDEX = { Russian: 1, Kazakh: 2, Swedish: 3, German: 4 };

const EXTRA_LANGUAGE_TRANSLATIONS = {
  Spanish: {
    house:"casa", family:"familia", food:"comida", water:"agua", friend:"amigo", happy:"feliz", small:"pequeño", big:"grande", morning:"mañana", evening:"tarde",
    teacher:"profesor", exam:"examen", homework:"tarea", subject:"asignatura", grade:"nota", school:"escuela",
    airport:"aeropuerto", ticket:"billete", luggage:"equipaje", destination:"destino", delay:"retraso", travel:"viajar",
    work:"trabajo", colleague:"compañero", shift:"turno", training:"formación", responsibility:"responsabilidad", promotion:"ascenso",
    shop:"tienda", buy:"comprar", sell:"vender", price:"precio", money:"dinero", boss:"jefe", customer:"cliente", office:"oficina", help:"ayudar",
    meeting:"reunión", manager:"gerente", order:"pedido", delivery:"entrega", schedule:"horario", task:"tarea", email:"correo electrónico", client:"cliente", plan:"plan", report:"informe",
    deadline:"fecha límite", negotiate:"negociar", negotiation:"negociación", proposal:"propuesta", "customer service":"atención al cliente", teamwork:"trabajo en equipo", target:"objetivo", strategy:"estrategia", feedback:"retroalimentación", performance:"rendimiento", growth:"crecimiento",
    budget:"presupuesto", income:"ingresos", expense:"gasto", receipt:"recibo", discount:"descuento", salary:"salario", rent:"alquiler", account:"cuenta", transfer:"transferencia", payment:"pago",
    profit:"beneficio", loss:"pérdida", investment:"inversión", savings:"ahorros", loan:"préstamo", interest:"interés", tax:"impuesto", invoice:"factura", "cash flow":"flujo de caja", debt:"deuda",
    asset:"activo", liability:"pasivo", equity:"patrimonio", margin:"margen", forecast:"pronóstico", audit:"auditoría", liquidity:"liquidez", portfolio:"cartera", "return on investment":"retorno de la inversión", "financial statement":"estado financiero",
    technology:"tecnología", device:"dispositivo", software:"software", privacy:"privacidad", update:"actualización", network:"red",
    health:"salud", symptom:"síntoma", treatment:"tratamiento", recovery:"recuperación", "balanced diet":"dieta equilibrada", "mental health":"salud mental",
    environment:"medio ambiente", pollution:"contaminación", recycle:"reciclar", climate:"clima", sustainable:"sostenible", wildlife:"vida silvestre",
    anxious:"ansioso", relieved:"aliviado", frustrated:"frustrado", overwhelmed:"abrumado", grateful:"agradecido",
    suspect:"sospechoso", evidence:"prueba", witness:"testigo", investigate:"investigar", sentence:"sentencia",
    tradition:"tradición", identity:"identidad", heritage:"patrimonio", custom:"costumbre", diversity:"diversidad",
    confident:"seguro", improve:"mejorar", experience:"experiencia", challenge:"desafío", support:"apoyo", opportunity:"oportunidad", responsible:"responsable", decision:"decisión", achieve:"lograr", avoid:"evitar",
    evaluate:"evaluar", assumption:"suposición", priority:"prioridad", reliable:"fiable", maintain:"mantener", significant:"significativo", concern:"preocupación", approach:"enfoque", outcome:"resultado",
    ambiguous:"ambiguo", meticulous:"meticuloso", scrutinize:"examinar minuciosamente", discrepancy:"discrepancia", intricate:"complejo", pervasive:"generalizado", counterintuitive:"contraintuitivo", underpin:"fundamentar", mitigate:"mitigar", obsolete:"obsoleto"
  },
  Italian: {
    house:"casa", family:"famiglia", food:"cibo", water:"acqua", friend:"amico", happy:"felice", small:"piccolo", big:"grande", morning:"mattina", evening:"sera",
    teacher:"insegnante", exam:"esame", homework:"compiti", subject:"materia", grade:"voto",
    airport:"aeroporto", ticket:"biglietto", luggage:"bagaglio", destination:"destinazione", delay:"ritardo",
    work:"lavoro", colleague:"collega", shift:"turno", training:"formazione", responsibility:"responsabilità", promotion:"promozione",
    shop:"negozio", buy:"comprare", sell:"vendere", price:"prezzo", money:"denaro", boss:"capo", customer:"cliente", office:"ufficio", help:"aiutare",
    meeting:"riunione", manager:"responsabile", order:"ordine", delivery:"consegna", schedule:"programma", task:"compito", email:"email", client:"cliente", plan:"piano", report:"rapporto",
    deadline:"scadenza", negotiate:"negoziare", negotiation:"negoziazione", proposal:"proposta", "customer service":"servizio clienti", teamwork:"lavoro di squadra", target:"obiettivo", strategy:"strategia", feedback:"feedback", performance:"prestazione", growth:"crescita",
    budget:"bilancio", income:"reddito", expense:"spesa", receipt:"ricevuta", discount:"sconto", salary:"stipendio", rent:"affitto", account:"conto", transfer:"trasferimento", payment:"pagamento",
    profit:"profitto", loss:"perdita", investment:"investimento", savings:"risparmi", loan:"prestito", interest:"interesse", tax:"tassa", invoice:"fattura", "cash flow":"flusso di cassa", debt:"debito",
    asset:"attività", liability:"passività", equity:"capitale proprio", margin:"margine", forecast:"previsione", audit:"revisione", liquidity:"liquidità", portfolio:"portafoglio", "financial statement":"bilancio finanziario",
    device:"dispositivo", software:"software", privacy:"privacy", update:"aggiornamento", network:"rete",
    symptom:"sintomo", treatment:"trattamento", recovery:"recupero", "balanced diet":"dieta equilibrata", "mental health":"salute mentale",
    pollution:"inquinamento", recycle:"riciclare", climate:"clima", sustainable:"sostenibile", wildlife:"fauna selvatica",
    anxious:"ansioso", relieved:"sollevato", frustrated:"frustrato", overwhelmed:"sopraffatto", grateful:"grato",
    suspect:"sospetto", evidence:"prova", witness:"testimone", investigate:"indagare", sentence:"sentenza",
    tradition:"tradizione", identity:"identità", heritage:"patrimonio", custom:"usanza", diversity:"diversità",
    confident:"sicuro", improve:"migliorare", experience:"esperienza", challenge:"sfida", support:"supporto", opportunity:"opportunità", responsible:"responsabile", decision:"decisione", achieve:"raggiungere", avoid:"evitare",
    evaluate:"valutare", assumption:"ipotesi", priority:"priorità", reliable:"affidabile", maintain:"mantenere", significant:"significativo", concern:"preoccupazione", approach:"approccio", outcome:"risultato",
    ambiguous:"ambiguo", meticulous:"meticoloso", scrutinize:"esaminare attentamente", discrepancy:"discrepanza", intricate:"intricato", pervasive:"pervasivo", counterintuitive:"controintuitivo", underpin:"sostenere", mitigate:"mitigare", obsolete:"obsoleto"
  },
  French: {
    house:"maison", family:"famille", food:"nourriture", water:"eau", friend:"ami", happy:"heureux", small:"petit", big:"grand", morning:"matin", evening:"soir",
    teacher:"professeur", exam:"examen", homework:"devoirs", subject:"matière", grade:"note",
    airport:"aéroport", ticket:"billet", luggage:"bagages", destination:"destination", delay:"retard",
    work:"travail", colleague:"collègue", shift:"service", training:"formation", responsibility:"responsabilité", promotion:"promotion",
    shop:"magasin", buy:"acheter", sell:"vendre", price:"prix", money:"argent", boss:"patron", customer:"client", office:"bureau", help:"aider",
    meeting:"réunion", manager:"responsable", order:"commande", delivery:"livraison", schedule:"emploi du temps", task:"tâche", email:"e-mail", client:"client", plan:"plan", report:"rapport",
    deadline:"date limite", negotiate:"négocier", negotiation:"négociation", proposal:"proposition", "customer service":"service client", teamwork:"travail d’équipe", target:"objectif", strategy:"stratégie", feedback:"retour", performance:"performance", growth:"croissance",
    budget:"budget", income:"revenu", expense:"dépense", receipt:"reçu", discount:"réduction", salary:"salaire", rent:"loyer", account:"compte", transfer:"virement", payment:"paiement",
    profit:"bénéfice", loss:"perte", investment:"investissement", savings:"épargne", loan:"prêt", interest:"intérêt", tax:"impôt", invoice:"facture", "cash flow":"flux de trésorerie", debt:"dette",
    asset:"actif", liability:"passif", equity:"capitaux propres", margin:"marge", forecast:"prévision", audit:"audit", liquidity:"liquidité", portfolio:"portefeuille", "financial statement":"état financier",
    device:"appareil", software:"logiciel", privacy:"confidentialité", update:"mise à jour", network:"réseau",
    symptom:"symptôme", treatment:"traitement", recovery:"rétablissement", "balanced diet":"alimentation équilibrée", "mental health":"santé mentale",
    pollution:"pollution", recycle:"recycler", climate:"climat", sustainable:"durable", wildlife:"faune",
    anxious:"anxieux", relieved:"soulagé", frustrated:"frustré", overwhelmed:"débordé", grateful:"reconnaissant",
    suspect:"suspect", evidence:"preuve", witness:"témoin", investigate:"enquêter", sentence:"peine",
    tradition:"tradition", identity:"identité", heritage:"patrimoine", custom:"coutume", diversity:"diversité",
    confident:"confiant", improve:"améliorer", experience:"expérience", challenge:"défi", support:"soutien", opportunity:"opportunité", responsible:"responsable", decision:"décision", achieve:"réaliser", avoid:"éviter",
    evaluate:"évaluer", assumption:"hypothèse", priority:"priorité", reliable:"fiable", maintain:"maintenir", significant:"important", concern:"préoccupation", approach:"approche", outcome:"résultat",
    ambiguous:"ambigu", meticulous:"méticuleux", scrutinize:"examiner attentivement", discrepancy:"écart", intricate:"complexe", pervasive:"omniprésent", counterintuitive:"contre-intuitif", underpin:"sous-tendre", mitigate:"atténuer", obsolete:"obsolète"
  },
  Portuguese: {
    house:"casa", family:"família", food:"comida", water:"água", friend:"amigo", happy:"feliz", small:"pequeno", big:"grande", morning:"manhã", evening:"noite",
    teacher:"professor", exam:"exame", homework:"dever de casa", subject:"disciplina", grade:"nota", airport:"aeroporto", ticket:"bilhete", luggage:"bagagem", destination:"destino", delay:"atraso",
    work:"trabalho", colleague:"colega", shift:"turno", training:"treinamento", responsibility:"responsabilidade", promotion:"promoção",
    shop:"loja", buy:"comprar", sell:"vender", price:"preço", money:"dinheiro", boss:"chefe", customer:"cliente", office:"escritório", help:"ajudar",
    meeting:"reunião", manager:"gerente", order:"pedido", delivery:"entrega", schedule:"agenda", task:"tarefa", email:"e-mail", client:"cliente", plan:"plano", report:"relatório",
    deadline:"prazo", negotiate:"negociar", proposal:"proposta", "customer service":"atendimento ao cliente", teamwork:"trabalho em equipe", target:"meta", strategy:"estratégia", feedback:"feedback", performance:"desempenho", growth:"crescimento",
    budget:"orçamento", income:"renda", expense:"despesa", receipt:"recibo", discount:"desconto", salary:"salário", rent:"aluguel", account:"conta", transfer:"transferência", payment:"pagamento",
    profit:"lucro", loss:"perda", investment:"investimento", savings:"poupança", loan:"empréstimo", interest:"juros", tax:"imposto", invoice:"fatura", "cash flow":"fluxo de caixa", debt:"dívida",
    confident:"confiante", improve:"melhorar", experience:"experiência", challenge:"desafio", support:"apoio", opportunity:"oportunidade", responsible:"responsável", decision:"decisão", achieve:"alcançar", avoid:"evitar"
  },
  Dutch: {
    house:"huis", family:"familie", food:"eten", water:"water", friend:"vriend", happy:"blij", small:"klein", big:"groot", morning:"ochtend", evening:"avond",
    teacher:"leraar", exam:"examen", homework:"huiswerk", subject:"vak", grade:"cijfer", airport:"luchthaven", ticket:"ticket", luggage:"bagage", destination:"bestemming", delay:"vertraging",
    work:"werk", colleague:"collega", shift:"dienst", training:"training", responsibility:"verantwoordelijkheid", promotion:"promotie",
    shop:"winkel", buy:"kopen", sell:"verkopen", price:"prijs", money:"geld", boss:"baas", customer:"klant", office:"kantoor", help:"helpen",
    meeting:"vergadering", manager:"manager", order:"bestelling", delivery:"levering", schedule:"schema", task:"taak", email:"e-mail", client:"klant", plan:"plan", report:"rapport",
    deadline:"deadline", negotiate:"onderhandelen", proposal:"voorstel", "customer service":"klantenservice", teamwork:"teamwerk", target:"doel", strategy:"strategie", feedback:"feedback", performance:"prestatie", growth:"groei",
    budget:"budget", income:"inkomen", expense:"uitgave", receipt:"bon", discount:"korting", salary:"salaris", rent:"huur", account:"rekening", transfer:"overschrijving", payment:"betaling",
    profit:"winst", loss:"verlies", investment:"investering", savings:"spaargeld", loan:"lening", interest:"rente", tax:"belasting", invoice:"factuur", "cash flow":"kasstroom", debt:"schuld",
    confident:"zelfverzekerd", improve:"verbeteren", experience:"ervaring", challenge:"uitdaging", support:"steun", opportunity:"kans", responsible:"verantwoordelijk", decision:"beslissing", achieve:"bereiken", avoid:"vermijden"
  },
  Czech: {
    house:"dům", family:"rodina", food:"jídlo", water:"voda", friend:"přítel", happy:"šťastný", small:"malý", big:"velký", morning:"ráno", evening:"večer",
    teacher:"učitel", exam:"zkouška", homework:"domácí úkol", subject:"předmět", grade:"známka", airport:"letiště", ticket:"lístek", luggage:"zavazadlo", destination:"destinace", delay:"zpoždění",
    work:"práce", colleague:"kolega", shift:"směna", training:"školení", responsibility:"odpovědnost", promotion:"povýšení",
    shop:"obchod", buy:"koupit", sell:"prodat", price:"cena", money:"peníze", boss:"šéf", customer:"zákazník", office:"kancelář", help:"pomoci",
    meeting:"schůzka", manager:"manažer", order:"objednávka", delivery:"doručení", schedule:"rozvrh", task:"úkol", email:"e-mail", client:"klient", plan:"plán", report:"zpráva",
    deadline:"termín", negotiate:"vyjednávat", proposal:"návrh", "customer service":"zákaznický servis", teamwork:"týmová práce", target:"cíl", strategy:"strategie", feedback:"zpětná vazba", performance:"výkon", growth:"růst",
    budget:"rozpočet", income:"příjem", expense:"výdaj", receipt:"účtenka", discount:"sleva", salary:"plat", rent:"nájem", account:"účet", transfer:"převod", payment:"platba",
    profit:"zisk", loss:"ztráta", investment:"investice", savings:"úspory", loan:"půjčka", interest:"úrok", tax:"daň", invoice:"faktura", "cash flow":"peněžní tok", debt:"dluh"
  },
  Norwegian: {
    house:"hus", family:"familie", food:"mat", water:"vann", friend:"venn", happy:"glad", small:"liten", big:"stor", morning:"morgen", evening:"kveld",
    teacher:"lærer", exam:"eksamen", homework:"lekser", subject:"fag", grade:"karakter", airport:"flyplass", ticket:"billett", luggage:"bagasje", destination:"destinasjon", delay:"forsinkelse",
    work:"arbeid", colleague:"kollega", shift:"skift", training:"opplæring", responsibility:"ansvar", promotion:"forfremmelse",
    shop:"butikk", buy:"kjøpe", sell:"selge", price:"pris", money:"penger", boss:"sjef", customer:"kunde", office:"kontor", help:"hjelpe",
    meeting:"møte", manager:"leder", order:"bestilling", delivery:"levering", schedule:"timeplan", task:"oppgave", email:"e-post", client:"kunde", plan:"plan", report:"rapport",
    deadline:"frist", negotiate:"forhandle", proposal:"forslag", "customer service":"kundeservice", teamwork:"teamarbeid", target:"mål", strategy:"strategi", feedback:"tilbakemelding", performance:"prestasjon", growth:"vekst",
    budget:"budsjett", income:"inntekt", expense:"utgift", receipt:"kvittering", discount:"rabatt", salary:"lønn", rent:"husleie", account:"konto", transfer:"overføring", payment:"betaling",
    profit:"fortjeneste", loss:"tap", investment:"investering", savings:"sparing", loan:"lån", interest:"rente", tax:"skatt", invoice:"faktura", "cash flow":"kontantstrøm", debt:"gjeld"
  },
  Japanese: {
    house:"家", family:"家族", food:"食べ物", water:"水", friend:"友達", happy:"幸せな", small:"小さい", big:"大きい", morning:"朝", evening:"夕方",
    teacher:"先生", exam:"試験", homework:"宿題", subject:"科目", grade:"成績", airport:"空港", ticket:"切符", luggage:"荷物", destination:"目的地", delay:"遅延",
    work:"仕事", colleague:"同僚", shift:"シフト", training:"研修", responsibility:"責任", promotion:"昇進",
    shop:"店", buy:"買う", sell:"売る", price:"価格", money:"お金", boss:"上司", customer:"顧客", office:"オフィス", help:"助ける",
    meeting:"会議", manager:"マネージャー", order:"注文", delivery:"配達", schedule:"予定", task:"課題", email:"メール", client:"顧客", plan:"計画", report:"報告書",
    deadline:"締め切り", negotiate:"交渉する", proposal:"提案", "customer service":"カスタマーサービス", teamwork:"チームワーク", target:"目標", strategy:"戦略", feedback:"フィードバック", performance:"業績", growth:"成長",
    budget:"予算", income:"収入", expense:"支出", receipt:"領収書", discount:"割引", salary:"給料", rent:"家賃", account:"口座", transfer:"送金", payment:"支払い",
    profit:"利益", loss:"損失", investment:"投資", savings:"貯金", loan:"ローン", interest:"利子", tax:"税金", invoice:"請求書", "cash flow":"キャッシュフロー", debt:"借金"
  },
  Chinese: {
    house:"房子", family:"家庭", food:"食物", water:"水", friend:"朋友", happy:"高兴的", small:"小的", big:"大的", morning:"早上", evening:"晚上",
    teacher:"老师", exam:"考试", homework:"作业", subject:"科目", grade:"成绩", airport:"机场", ticket:"票", luggage:"行李", destination:"目的地", delay:"延误",
    work:"工作", colleague:"同事", shift:"班次", training:"培训", responsibility:"责任", promotion:"晋升",
    shop:"商店", buy:"买", sell:"卖", price:"价格", money:"钱", boss:"老板", customer:"顾客", office:"办公室", help:"帮助",
    meeting:"会议", manager:"经理", order:"订单", delivery:"配送", schedule:"日程", task:"任务", email:"电子邮件", client:"客户", plan:"计划", report:"报告",
    deadline:"截止日期", negotiate:"谈判", proposal:"提案", "customer service":"客户服务", teamwork:"团队合作", target:"目标", strategy:"策略", feedback:"反馈", performance:"表现", growth:"增长",
    budget:"预算", income:"收入", expense:"支出", receipt:"收据", discount:"折扣", salary:"工资", rent:"租金", account:"账户", transfer:"转账", payment:"付款",
    profit:"利润", loss:"损失", investment:"投资", savings:"储蓄", loan:"贷款", interest:"利息", tax:"税", invoice:"发票", "cash flow":"现金流", debt:"债务"
  }
};

const FALLBACK_TRANSLATIONS = {};

const KNOWN_CUSTOM_WORDS = {
  "привет": { word: "hello", meaning: "привет" },
  "здравствуйте": { word: "hello", meaning: "здравствуйте" },
  "пока": { word: "goodbye", meaning: "пока" },
  "спасибо": { word: "thank you", meaning: "спасибо" },
  "пожалуйста": { word: "please", meaning: "пожалуйста" },
  "да": { word: "yes", meaning: "да" },
  "нет": { word: "no", meaning: "нет" },
  "стратегия": { word: "strategy", meaning: "стратегия" },
  "бюджет": { word: "budget", meaning: "бюджет" },
  "инвестиция": { word: "investment", meaning: "инвестиция" },
  "инвестиции": { word: "investment", meaning: "инвестиции" },
  "прибыль": { word: "profit", meaning: "прибыль" },
  "клиент": { word: "client", meaning: "клиент" },
  "переговоры": { word: "negotiation", meaning: "переговоры" },
  "вести переговоры": { word: "negotiate", meaning: "вести переговоры" },
  "предложение": { word: "proposal", meaning: "предложение" },
  "командная работа": { word: "teamwork", meaning: "командная работа" },
  "цель": { word: "target", meaning: "цель" },
  "обратная связь": { word: "feedback", meaning: "обратная связь" },
  "рост": { word: "growth", meaning: "рост" }
};

const WORD_CLUES = {
  hello: "You say this word when you meet someone.",
  goodbye: "You say this word when you leave someone.",
  "thank you": "You say this phrase when someone helps you.",
  please: "You use this word to make a request polite.",
  yes: "This word means that you agree or accept something.",
  no: "This word means that you refuse or disagree.",
  strategy: "A plan used to reach a goal or solve a problem.",
  budget: "A plan for how money will be spent.",
  investment: "Money put into something to get future value or profit.",
  profit: "Money a business earns after costs are paid.",
  client: "A person or company that buys a service.",
  negotiate: "To discuss conditions in order to reach an agreement.",
  negotiation: "A discussion where people try to reach an agreement.",
  proposal: "A formal suggestion or plan offered for discussion.",
  "customer service": "Help and support given to customers.",
  teamwork: "People working together to reach the same goal.",
  target: "A goal or result that someone wants to achieve.",
  feedback: "Comments that help someone improve their work.",
  performance: "How well a person, team, or company does something.",
  growth: "An increase or development over time.",
  deadline: "The final time or date when something must be finished.",
  revenue: "Money a company receives from sales before costs are removed.",
  equity: "The value owned in a company or asset after debts are removed.",
  asset: "Something valuable owned by a person or company.",
  liability: "A financial obligation or debt that must be paid.",
  cashflow: "The movement of money into and out of a business.",
  "cash flow": "The movement of money into and out of a business."
};

const WORD_SENTENCES = {
  hello: "When I entered the classroom, I said '_____' to everyone.",
  goodbye: "At the end of the call, she said '_____' and closed her laptop.",
  "thank you": "After receiving help, he said '_____' politely.",
  please: "Could you help me with this task, _____?",
  yes: "When the teacher asked if he understood, he said _____.",
  no: "She said _____ because she could not attend the meeting.",
  strategy: "The team needs a clear _____ before launching the project.",
  budget: "We cannot buy new equipment because the _____ is limited.",
  investment: "The company made a large _____ in new technology.",
  profit: "The business increased its _____ after reducing costs.",
  client: "The consultant prepared a report for the _____.",
  negotiate: "The two companies will _____ before signing the contract.",
  negotiation: "The _____ lasted two hours before both sides agreed.",
  proposal: "The manager sent a new _____ to the client.",
  "customer service": "Good _____ helps customers solve problems quickly.",
  teamwork: "The project succeeded because of strong _____.",
  target: "Our sales _____ for this month is higher than before.",
  feedback: "The teacher gave useful _____ after the presentation.",
  performance: "The employee's _____ improved after extra training.",
  growth: "The company showed strong _____ this year.",
  deadline: "We must finish the report before the _____."
};


function translationForWord(word, language) {
  if (LANGUAGE_INDEX[language]) return null;
  const extraMap = EXTRA_LANGUAGE_TRANSLATIONS[language] || {};
  const clean = String(word || "").trim();
  return extraMap[clean] || extraMap[clean.toLowerCase()] || null;
}

function parseEntry(entry, language) {
  const parts = entry.split("|");
  const word = (parts[0] || "word").trim();
  const idx = LANGUAGE_INDEX[language];

  if (idx) {
    return { word, meaning: parts[idx] || parts[1] || word };
  }

  const translated = translationForWord(word, language);
  if (!translated) return null;
  return { word, meaning: translated };
}

function collectRawEntries(level, topic) {
  const levelData = BASE_WORDS[level] || BASE_WORDS.B1;
  const exactTopic = levelData[topic] || EXTRA_TOPICS[topic] || [];
  const sameLevelAllTopics = Object.values(levelData).flat();
  const extraTopic = EXTRA_TOPICS[topic] || [];
  const allLevels = LEVELS.flatMap((lvl) => Object.values(BASE_WORDS[lvl] || {}).flat());
  const allExtraTopics = Object.values(EXTRA_TOPICS).flat();

  return [
    ...exactTopic,
    ...extraTopic,
    ...sameLevelAllTopics,
    ...allLevels,
    ...allExtraTopics
  ];
}

function topicWords(level, topic, language) {
  const translated = collectRawEntries(level, topic)
    .map((entry) => parseEntry(entry, language))
    .filter(Boolean)
    .filter((item) => item.word && item.meaning && item.meaning !== item.word);

  return uniqueWords(translated);
}

function uniqueWords(words) {
  const seen = new Set();
  return words.filter((item) => {
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

function normalizeManualLine(line) {
  const clean = line.trim();
  const lower = clean.toLowerCase();
  if (KNOWN_CUSTOM_WORDS[lower]) return KNOWN_CUSTOM_WORDS[lower];

  const divider = clean.includes("—") ? "—" : clean.includes(" - ") ? " - " : clean.includes("-") ? "-" : clean.includes(":") ? ":" : null;
  if (!divider) {
    return { word: clean, meaning: "add translation" };
  }

  const parts = clean.split(divider);
  const left = (parts[0] || "").trim();
  const right = parts.slice(1).join(" — ").trim();
  if (!left) return null;

  const leftKnown = KNOWN_CUSTOM_WORDS[left.toLowerCase()];
  if (leftKnown && !right) return leftKnown;

  return { word: left, meaning: right || "add translation" };
}

function parseCustomWords(text) {
  return text
    .split(/\n+/)
    .map((line) => normalizeManualLine(line))
    .filter(Boolean)
    .filter((item) => item.word);
}

function clueFor(item) {
  const key = String(item.word || "").toLowerCase().trim();
  return WORD_CLUES[key] || `This word belongs to the vocabulary list. Choose the best option from the list.`;
}

function gapSentenceFor(item, level, topic) {
  const key = String(item.word || "").toLowerCase().trim();
  if (WORD_SENTENCES[key]) return WORD_SENTENCES[key];
  if (topic === "Finance") return `The finance team used this term in the report: _____.`;
  if (topic === "Business") return `The manager used this term during the meeting: _____.`;
  if (topic === "Technology") return `The speaker used this term to describe a digital idea: _____.`;
  if (level === "A1" || level === "A2") return `Write the correct vocabulary word here: _____.`;
  if (level === "C1" || level === "C2") return `Use the most precise vocabulary item to complete the idea: _____.`;
  return `Complete the sentence with the correct vocabulary word: _____.`;
}

function sentenceFor(word, level, topic) {
  const target = word || "_____";
  if (target === "_____") return "Complete the sentence with the correct vocabulary word: _____.";
  if (topic === "Finance") return `The finance team used ${target} as an important term in the report.`;
  if (topic === "Business") return `During the meeting, the manager used ${target} in a clear business context.`;
  if (topic === "Technology") return `The team used ${target} to describe a digital solution.`;
  if (level === "A1" || level === "A2") return `I can use ${target} in a short everyday sentence.`;
  if (level === "C1" || level === "C2") return `The speaker used ${target} to express a more precise and sophisticated idea.`;
  return `The student used ${target} correctly in a clear context.`;
}

function header(title, level, topic, language, format) {
  return [
    title.toUpperCase(),
    `Level: ${level}`,
    `Topic: ${topic}`,
    `Translation language: ${language}`,
    `Format: ${FORMATS.find((f) => f.value === format)?.label || format}`,
    "",
    "Learning sequence:",
    "1. Study the vocabulary list.",
    "2. Check meaning recognition.",
    "3. Practise the words in context.",
    "4. Use the words in speaking or writing.",
    "5. Test yourself and check the answers.",
    ""
  ].join(NL);
}

function vocabularyList(words) {
  return ["VOCABULARY LIST", "", ...words.map((item, i) => `${i + 1}. ${item.word} — ${item.meaning}`), ""].join(NL);
}


function wordsToEditableText(words) {
  return words.map((item) => `${item.word} — ${item.meaning}`).join(NL);
}

function answerKey(words) {
  return ["ANSWER KEY", "", ...words.map((item, i) => `${i + 1}. ${item.word} — ${item.meaning}`)].join(NL);
}

function matchTask(words, showAnswers) {
  const mixed = shuffle(words);
  const lines = ["EXERCISE. Match the words with the meanings.", ""];
  words.forEach((item, i) => lines.push(`${i + 1}. ${item.word}`));
  lines.push("");
  mixed.forEach((item, i) => lines.push(`${String.fromCharCode(65 + i)}. ${item.meaning}`));
  if (showAnswers) {
    lines.push("", "Answer Key:");
    words.forEach((item, i) => lines.push(`${i + 1}. ${String.fromCharCode(65 + mixed.findIndex((x) => x.word === item.word))}`));
  }
  return lines.join(NL);
}

function gapTask(words, level, topic, showAnswers) {
  const lines = ["EXERCISE. Fill in the gaps.", "", `Use the words: ${words.map((w) => w.word).join(" / ")}`, ""];
  words.forEach((item, i) => {
    lines.push(`${i + 1}. ${gapSentenceFor(item, level, topic)}`);
  });
  if (showAnswers) lines.push("", "Answer Key:", ...words.map((item, i) => `${i + 1}. ${item.word} — ${item.meaning}`));
  return lines.join(NL);
}

function mcqTask(words, level, topic, showAnswers) {
  const lines = ["EXERCISE. Choose the correct option.", ""];
  const answers = [];
  words.forEach((item, i) => {
    const options = shuffle([item.word, ...shuffle(words.filter((x) => x.word !== item.word)).slice(0, 3).map((x) => x.word)]);
    answers.push(`${i + 1}. ${String.fromCharCode(65 + options.indexOf(item.word))} — ${item.word} = ${item.meaning}`);
    lines.push(`${i + 1}. ${clueFor(item)}`);
    options.forEach((op, idx) => lines.push(`${String.fromCharCode(65 + idx)}. ${op}`));
    lines.push("");
  });
  if (showAnswers) lines.push("Answer Key:", ...answers);
  return lines.join(NL);
}

function translationTask(words, direction, showAnswers) {
  const lines = [direction === "en" ? "EXERCISE. Translate into English." : "EXERCISE. Translate from English.", ""];
  words.forEach((item, i) => {
    lines.push(direction === "en" ? `${i + 1}. ${item.meaning} — ______________________________` : `${i + 1}. ${item.word} — ______________________________`);
  });
  if (showAnswers) lines.push("", "Answer Key:", ...words.map((item, i) => `${i + 1}. ${direction === "en" ? item.word : item.meaning}`));
  return lines.join(NL);
}

function otherTask(words, type, level, topic, showAnswers) {
  const label = TASK_TYPES.find((t) => t.value === type)?.label || "Practice";
  const lines = [`EXERCISE. ${label}.`, ""];
  if (type === "definitions") words.forEach((item, i) => lines.push(`${i + 1}. Define '${item.word}' in English: ______________________________`));
  else if (type === "sentences") words.forEach((item, i) => lines.push(`${i + 1}. Write a natural sentence with '${item.word}': ______________________________`));
  else if (type === "questions") words.forEach((item, i) => lines.push(`${i + 1}. Answer a personal question using '${item.word}'.`));
  else if (type === "collocations") words.forEach((item, i) => lines.push(`${i + 1}. Write two words that naturally go with '${item.word}'.`));
  else if (type === "word_formation") words.forEach((item, i) => lines.push(`${i + 1}. Make a new form of '${item.word}' and use it in a sentence.`));
  else if (type === "odd") words.forEach((item, i) => lines.push(`${i + 1}. ${item.word} / ${words[(i + 1) % words.length].word} / ${words[(i + 2) % words.length].word} / __________ — Which one is different and why?`));
  else if (type === "story") lines.push(`Write a short ${level}-level story about ${topic}. Use these words: ${words.map((w) => w.word).join(", ")}.`);
  else lines.push("Complete a mixed challenge: translate 5 words, write 5 sentences, and explain 3 meanings in English.");
  if (showAnswers) lines.push("", "Teacher note: open answers. Check accuracy, natural use, and level-appropriate complexity.");
  return lines.join(NL);
}

function buildReading(words, level, topic, showAnswers) {
  const wordLine = words.slice(0, 6).map((w) => w.word).join(", ");
  const complexity = level === "A1" || level === "A2" ? "simple" : level === "C1" || level === "C2" ? "analytical and detailed" : "clear and realistic";
  const text = `READING TEXT\n\nThis ${complexity} text is about ${topic}. The main idea is that learners should not only memorise vocabulary, but also understand how words work in context. In this topic, words such as ${wordLine} help the reader describe situations more accurately. A good learner studies the meaning first, then notices examples, and finally uses the words independently. This process makes vocabulary active instead of passive.`;
  return [text, "", "COMPREHENSION TASKS", "1. What is the main idea of the text?", "2. Why is context important for vocabulary learning?", `3. Find and explain three words connected to ${topic}.`, "4. Write a short summary of the text.", showAnswers ? "\nAnswer Key: Answers may vary. Check understanding, examples, and accurate use of target vocabulary." : ""].join(NL);
}

function buildDialogue(words, level, topic, showAnswers) {
  const a = words[0]?.word || "strategy";
  const b = words[1]?.word || "decision";
  const c = words[2]?.word || "evidence";
  return [
    "READY DIALOGUE", "",
    `A: We need to talk about ${topic.toLowerCase()} today. I think ${a} is the key point.`,
    `B: I agree, but we also need to consider ${b}. Without it, the plan may not work.`,
    `A: True. Do we have enough ${c} to support this idea?`,
    `B: Not yet. Let's collect examples and then make a stronger answer.`,
    `A: Good. This will help us use the vocabulary at ${level} level, not just memorise it.`,
    "", matchTask(words.slice(0, Math.min(8, words.length)), showAnswers)
  ].join(NL);
}

function buildGrammar(words, level, topic, showAnswers) {
  const grammar = level === "A1" ? "Present Simple" : level === "A2" ? "Past Simple and comparatives" : level === "B1" ? "Present Perfect and conditionals" : level === "B2" ? "passive voice and relative clauses" : level === "C1" ? "inversion, hedging, and complex clauses" : "advanced nominalisation and precision structures";
  return [
    "GRAMMAR PRACTICE", "", `Focus: ${grammar}`, "",
    `1. Write three sentences about ${topic} using: ${words[0]?.word || "the first word"}.`,
    `2. Rewrite this sentence in a more ${level}-appropriate way: People use vocabulary to speak better.`,
    `3. Complete the sentence: If learners practise ${words[1]?.word || "new vocabulary"}, they ____________________.`,
    `4. Correct the mistake: The student very interested in ${topic}.`,
    showAnswers ? "\nAnswer Key: 1 open answer. 2 possible: Vocabulary practice enables learners to communicate with greater precision. 3 open conditional. 4 The student is very interested in the topic." : ""
  ].join(NL);
}

function buildListening(words, level, topic, showAnswers) {
  return [
    "LISTENING SCRIPT", "",
    `Speaker: Today I want to explain why ${topic.toLowerCase()} vocabulary matters. At ${level} level, students need more than translations. They need examples, context, and practice. Words such as ${words.slice(0, 6).map((w) => w.word).join(", ")} become useful only when learners can recognise them, understand them, and use them in their own speech.`,
    "", "LISTENING TASKS", "1. Write the topic of the talk.", "2. Write three words you heard.", "3. Explain why translation alone is not enough.", "4. Retell the script in your own words.", showAnswers ? "\nAnswer Key: 1 depends on selected topic. 2 target words. 3 context and active use are necessary. 4 open answer." : ""
  ].join(NL);
}

function buildWriting(words, level, topic, showAnswers) {
  return ["WRITING PRACTICE", "", `Task 1: Write a ${level}-level paragraph about ${topic}. Use at least five words from the list.`, `Task 2: Write an opinion paragraph using these words: ${words.slice(0, 5).map((w) => w.word).join(", ")}.`, "Task 3: Improve your paragraph by adding examples and linking words.", showAnswers ? "\nTeacher note: assess content, organisation, vocabulary accuracy, and grammar control." : ""].join(NL);
}

function buildUseOfEnglish(words, level, topic, showAnswers) {
  return ["USE OF ENGLISH", "", otherTask(words.slice(0, 5), "word_formation", level, topic, showAnswers), "", otherTask(words.slice(0, 5), "collocations", level, topic, showAnswers), "", mcqTask(words.slice(0, 5), level, topic, showAnswers)].join(NL);
}

function buildMainTask(words, taskType, level, topic, showAnswers) {
  if (taskType === "match") return matchTask(words, showAnswers);
  if (taskType === "gap") return gapTask(words, level, topic, showAnswers);
  if (taskType === "mcq") return mcqTask(words, level, topic, showAnswers);
  if (taskType === "translation_en") return translationTask(words, "en", showAnswers);
  if (taskType === "translation_target") return translationTask(words, "target", showAnswers);
  if (taskType === "full") return [matchTask(words, showAnswers), "", gapTask(words, level, topic, showAnswers), "", mcqTask(words.slice(0, Math.min(8, words.length)), level, topic, showAnswers), "", otherTask(words, "sentences", level, topic, showAnswers)].join(NL);
  return otherTask(words, taskType, level, topic, showAnswers);
}

function buildMaterial({ words, title, level, topic, language, format, taskType, showAnswers }) {
  const intro = header(title, level, topic, language, format) + vocabularyList(words);
  let body = "";
  if (format === "reading") body = buildReading(words, level, topic, showAnswers);
  else if (format === "dialogue") body = buildDialogue(words, level, topic, showAnswers);
  else if (format === "grammar") body = buildGrammar(words, level, topic, showAnswers);
  else if (format === "listening") body = buildListening(words, level, topic, showAnswers);
  else if (format === "writing") body = buildWriting(words, level, topic, showAnswers);
  else if (format === "useofenglish") body = buildUseOfEnglish(words, level, topic, showAnswers);
  else if (format === "test") body = ["TEST VERSION", "", buildMainTask(words, taskType, level, topic, false), "", "Score: ______ / ______", showAnswers ? "\n" + answerKey(words) : ""].join(NL);
  else body = buildMainTask(words, taskType, level, topic, showAnswers);
  return intro + body;
}

function htmlEscape(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wordDocumentContent(text, documentTitle) {
  const safeTitle = htmlEscape(documentTitle || "A1ZIV Vocabulary Practice");
  const body = htmlEscape(text).replace(/\n/g, "<br />");
  return `<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>${safeTitle}</title>
  <style>
    @page { size: A4; margin: 2cm; }
    body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #111827; }
    h1 { font-size: 18pt; margin-bottom: 12pt; }
    .worksheet { white-space: normal; }
  </style>
</head>
<body>
  <h1>${safeTitle}</h1>
  <div class="worksheet">${body}</div>
</body>
</html>`;
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function makeFileName(title, suffix, ext) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}_${suffix}.${ext}`;
}

function Hero({ onGenerateClick, onTestClick }) {
  return (
    <section className="hero-panel">
      <div>
        <p className="eyebrow">A1ZIV · English material generator</p>
        <h1>Generate worksheets, vocabulary tests, dialogues and reading tasks in seconds.</h1>
        <p className="hero-text">For English teachers and tutors who need quick, level-based materials by topic and translation language. No login. No setup. Instant classroom-ready drafts.</p>
        <div className="hero-actions">
          <button onClick={onGenerateClick}>Generate worksheet</button>
          <button className="secondary-button" onClick={onTestClick}>Generate test</button>
        </div>
      </div>
      <div className="feature-grid">
        <div><strong>Level-based</strong><span>A1 to C2 vocabulary and tasks</span></div>
        <div><strong>Teacher-ready</strong><span>Student and teacher versions</span></div>
        <div><strong>Multi-format</strong><span>Reading, grammar, dialogue, tests</span></div>
        <div><strong>Feedback-ready</strong><span>Policies, contact and rating</span></div>
      </div>
    </section>
  );
}

function PolicyFooter() {
  const [open, setOpen] = useState("privacy");
  const policies = {
    privacy: ["Privacy Policy", "A1ZIV is an educational prototype. It does not require user accounts, passwords, payment details or sensitive personal information. Text entered into the generator is processed in the browser for creating learning materials. Feedback sent by email is handled through the user's email application and is visible to the recipient email address."],
    terms: ["Terms of Use", "This website is provided for educational purposes. Users are responsible for checking generated materials before using them in official lessons, exams, publications or paid products. The site must not be used for illegal, harmful or misleading purposes."],
    disclaimer: ["Educational Disclaimer", "Generated translations, grammar tasks, readings and answer keys may contain errors. Teachers should review and adapt all materials before classroom use. A1ZIV does not replace a qualified teacher, official exam board or certified translator."],
    cookies: ["Cookie Notice", "This prototype does not intentionally use tracking cookies or advertising cookies. Hosting providers or browsers may use technical mechanisms required for website delivery and security."],
    copyright: ["Copyright Notice", "© 2026 A1ZIV / Alexandr Balyuba. All rights reserved. Website structure, educational templates and branding may not be copied as a complete product without permission."],
    contact: ["Contact", `For questions, feedback, complaints or suggestions, contact: ${CONTACT_EMAIL}`]
  };
  return (
    <footer className="site-footer">
      <div className="policy-tabs">
        {Object.keys(policies).map((key) => <button key={key} className={open === key ? "active-tab" : "ghost-button"} onClick={() => setOpen(key)}>{policies[key][0]}</button>)}
      </div>
      <div className="policy-box"><h3>{policies[open][0]}</h3><p>{policies[open][1]}</p></div>
      <p className="footer-small">A1ZIV is a prototype educational tool. Always review generated content before teaching.</p>
    </footer>
  );
}

function CommercialBox() {
  return (
    <section className="feedback-panel">
      <h2>Free now · Premium tools later</h2>
      <p>A1ZIV is currently free as an educational prototype. Premium teacher tools may be added later, such as advanced exports, saved worksheets, larger vocabulary banks, AI-powered generation and classroom management features.</p>
      <div className="feature-grid">
        <div><strong>Free educational prototype</strong><span>Use the current worksheet and test tools without payment.</span></div>
        <div><strong>Premium features coming soon</strong><span>Future paid tools may include PDF export, saved materials and smarter generation.</span></div>
        <div><strong>Collaboration</strong><span>Teachers, tutors and schools can contact us for ideas or partnership requests.</span></div>
        <div><strong>Support this project</strong><span>Feedback and sharing help improve A1ZIV before monetisation.</span></div>
      </div>
      <p className="footer-small">For collaboration, partnership requests or support questions, contact: {CONTACT_EMAIL}</p>
    </section>
  );
}

function FeedbackBox() {
  const [rating, setRating] = useState(5);
  const [type, setType] = useState("Suggestion");
  const [message, setMessage] = useState("");
  function sendFeedback() {
    const subject = encodeURIComponent(`A1ZIV Feedback: ${type} (${rating}/5)`);
    const body = encodeURIComponent(`Feedback type: ${type}\nRating: ${rating}/5\n\nMessage:\n${message || "No message written."}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }
  return (
    <section className="feedback-panel">
      <h2>Feedback & rating</h2>
      <p>Write a suggestion, complaint, bug report or feature request. Your message will open as an email draft.</p>
      <div className="grid-2">
        <label>Feedback type<select value={type} onChange={(e) => setType(e.target.value)}><option>Suggestion</option><option>Complaint</option><option>Bug report</option><option>Feature request</option><option>Content quality issue</option></select></label>
        <label>Rating<select value={rating} onChange={(e) => setRating(e.target.value)}><option value="5">★★★★★ 5</option><option value="4">★★★★☆ 4</option><option value="3">★★★☆☆ 3</option><option value="2">★★☆☆☆ 2</option><option value="1">★☆☆☆☆ 1</option></select></label>
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your feedback here..." />
      <button onClick={sendFeedback}>Send feedback by email</button>
    </section>
  );
}

function App() {
  const [mode, setMode] = useState("worksheet");
  const [title, setTitle] = useState("A1ZIV Vocabulary Practice");
  const [level, setLevel] = useState("B1");
  const [topic, setTopic] = useState("Business");
  const [language, setLanguage] = useState("Russian");
  const [format, setFormat] = useState("worksheet");
  const [taskType, setTaskType] = useState("full");
  const [count, setCount] = useState(10);
  const [manual, setManual] = useState(false);
  const [customText, setCustomText] = useState("");
  const [downloadType, setDownloadType] = useState("txt");
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [seed, setSeed] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [learnedWords, setLearnedWords] = useState(() => loadLearnedWords());

  const learnedSet = useMemo(() => new Set(learnedWords.map(normaliseWordKey)), [learnedWords]);

  const words = useMemo(() => {
    const safeCount = clampWordCount(count);
    if (manual) return uniqueWords(parseCustomWords(customText)).slice(0, safeCount);
    if (!hasGenerated) return [];
    const generated = uniqueWords(topicWords(level, topic, language));
    const available = generated.filter((item) => !learnedSet.has(normaliseWordKey(item.word)));
    const source = available.length ? available : generated;
    const rotation = source.length ? seed % source.length : 0;
    const rotated = [...source.slice(rotation), ...source.slice(0, rotation)];
    return rotated.slice(0, safeCount);
  }, [manual, customText, level, topic, language, count, seed, learnedSet, hasGenerated]);

  const availableAutoWordsCount = useMemo(() => {
    if (manual) return 0;
    return uniqueWords(topicWords(level, topic, language)).filter((item) => !learnedSet.has(normaliseWordKey(item.word))).length;
  }, [manual, level, topic, language, learnedSet]);

  const studentText = useMemo(() => buildMaterial({ words, title, level, topic, language, format, taskType, showAnswers: false }), [words, title, level, topic, language, format, taskType]);
  const teacherText = useMemo(() => buildMaterial({ words, title, level, topic, language, format, taskType, showAnswers: true }), [words, title, level, topic, language, format, taskType]);

  const score = words.reduce((sum, item, i) => sum + ((answers[i] || "").trim().toLowerCase() === item.word.toLowerCase() ? 1 : 0), 0);

  function copyText(text) { navigator.clipboard.writeText(text).catch(() => alert("Copy failed. Select the text manually.")); }
  function fileDataForDownload(text) {
    if (downloadType === "word") {
      return {
        ext: "doc",
        mime: "application/msword;charset=utf-8",
        content: wordDocumentContent(text, title)
      };
    }
    if (downloadType === "html") {
      return {
        ext: "html",
        mime: "text/html;charset=utf-8",
        content: `<!doctype html><html><head><meta charset="utf-8"><title>${htmlEscape(title)}</title></head><body><pre>${htmlEscape(text)}</pre></body></html>`
      };
    }
    return { ext: "txt", mime: "text/plain;charset=utf-8", content: text };
  }

  function download(text, suffix) {
    const file = fileDataForDownload(text);
    downloadFile(makeFileName(title, suffix, file.ext), file.content, file.mime);
  }

  async function saveAs(text, suffix) {
    const file = fileDataForDownload(text);
    if (!window.showSaveFilePicker) { download(text, suffix); return; }
    const handle = await window.showSaveFilePicker({
      suggestedName: makeFileName(title, suffix, file.ext),
      types: [{ description: file.ext.toUpperCase(), accept: { [file.mime.split(";")[0]]: [`.${file.ext}`] } }]
    });
    const writable = await handle.createWritable();
    await writable.write(file.content);
    await writable.close();
  }

  function startEditingCurrentWords() {
    setCustomText(words.length ? wordsToEditableText(words) : "");
    setManual(true);
    setHasGenerated(true);
  }

  function useAutomaticWords() {
    setManual(false);
    setHasGenerated(true);
    setSeed((s) => s + 1);
  }

  function generateWords() {
    if (manual) {
      setHasGenerated(true);
      return;
    }
    setHasGenerated(true);
    setSeed((s) => s + 1);
  }

  useEffect(() => {
    setAnswers({});
    setChecked(false);
  }, [studentText]);

  useEffect(() => {
    saveLearnedWords(learnedWords);
  }, [learnedWords]);

  function markCurrentWordsAsLearned() {
    if (!words.length) return;
    const updated = Array.from(new Set([...learnedWords, ...words.map((item) => normaliseWordKey(item.word))])).filter(Boolean);
    setLearnedWords(updated);
    if (!manual) setSeed((s) => s + 1);
  }

  function clearLearnedArchive() {
    setLearnedWords([]);
    setSeed((s) => s + 1);
  }

  return (
    <div className="app-shell">
      <Hero onGenerateClick={() => { setMode("worksheet"); generateWords(); }} onTestClick={() => { setMode("test"); generateWords(); }} />

      <section className="example-strip">
        <h2>Example outputs</h2>
        <div className="examples"><span>B1 Vocabulary Worksheet</span><span>C1 Business Dialogue</span><span>B2 Finance Reading</span><span>A2 Grammar Test</span></div>
      </section>

      <main className="generator-grid">
        <section className="control-panel">
          <h2>1. Choose material settings</h2>
          <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <div className="grid-2">
            <label>Level<select value={level} onChange={(e) => { setLevel(e.target.value); setSeed((s) => s + 1); }} >{LEVELS.map((x) => <option key={x}>{x}</option>)}</select></label>
            <label>Topic<select value={topic} onChange={(e) => { setTopic(e.target.value); setSeed((s) => s + 1); }} >{TOPICS.map((x) => <option key={x}>{x}</option>)}</select></label>
          </div>
          <div className="grid-2">
            <label>Translation language<select value={language} onChange={(e) => setLanguage(e.target.value)}>{LANGUAGES.map((x) => <option key={x}>{x}</option>)}</select></label>
            <label>Number of words<input type="number" min="1" max="100" value={count} onChange={(e) => setCount(clampWordCount(e.target.value))} /></label>
          </div>
          <label>Material format<select value={format} onChange={(e) => setFormat(e.target.value)}>{FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}</select></label>
          <label>Exercise type<select value={taskType} onChange={(e) => setTaskType(e.target.value)}>{TASK_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></label>
          <div className="button-row"><button onClick={generateWords}>{manual ? "Update tasks from my words" : hasGenerated ? "Regenerate words" : "Generate words"}</button><button className="secondary-button" onClick={manual ? useAutomaticWords : startEditingCurrentWords}>{manual ? "Use automatic words" : "Edit current words"}</button></div>
          {!manual && words.length > 0 && <div className="button-row"><button className="secondary-button" onClick={markCurrentWordsAsLearned}>Mark current words as learned</button><button className="secondary-button" onClick={clearLearnedArchive}>Clear learned archive</button></div>}
          {!manual && (hasGenerated || learnedWords.length > 0) && <p className="footer-small">Learned archive: {learnedWords.length} word(s). These words will not appear again in automatic generation. Available new words for this selection: {availableAutoWordsCount}.</p>}
          {!manual && learnedWords.length > 0 && <div className="word-preview"><h3>Learned words archive</h3>{learnedWords.slice(0, 40).map((word) => <span key={word}>{word}</span>)}{learnedWords.length > 40 && <span>+ {learnedWords.length - 40} more</span>}</div>}
          {manual && <p className="footer-small">Manual words are not affected by the learned archive. Use automatic mode to avoid repeated learned words.</p>}
          {manual && <label>Edit words<textarea value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="word — translation\nstrategy — стратегия\nbudget — бюджет" /></label>}
          {!manual && words.length > 0 && <div className="word-preview"><h3>Current words</h3>{words.map((w) => <span key={w.word}>{w.word} — {w.meaning}</span>)}</div>}
          {!manual && words.length === 0 && <div className="word-preview"><h3>No words generated yet</h3><span>Choose settings and click Generate words.</span></div>}
        </section>

        <section className="result-panel">
          <div className="tabs"><button className={mode === "worksheet" ? "active-tab" : "ghost-button"} onClick={() => setMode("worksheet")}>Generate worksheet</button><button className={mode === "test" ? "active-tab" : "ghost-button"} onClick={() => setMode("test")}>Generate test</button></div>
          {words.length === 0 ? (
            <div className="score-box"><strong>No material generated yet.</strong><p>Choose your level, topic, language and number of words, then click Generate words. This keeps the site clean for first-time visitors.</p></div>
          ) : mode === "worksheet" ? (
            <>
              <h2>2. Student / Teacher versions</h2>
              <div className="grid-2"><button onClick={() => copyText(studentText)}>Copy Student Version</button><button onClick={() => copyText(teacherText)}>Copy Teacher Version</button></div>
              <div className="grid-2"><button className="secondary-button" onClick={() => download(studentText, "student")}>Download Student</button><button className="secondary-button" onClick={() => download(teacherText, "teacher")}>Download Teacher</button></div>
              <div className="grid-2"><label>Download format<select value={downloadType} onChange={(e) => setDownloadType(e.target.value)}><option value="txt">TXT</option><option value="html">HTML</option><option value="word">Word (.doc)</option></select></label><button className="secondary-button" onClick={() => saveAs(teacherText, "teacher")}>Choose where to save / Save as...</button></div>
              <pre>{teacherText}</pre>
            </>
          ) : (
            <>
              <h2>Interactive test</h2>
              <p>Write the English word for each translation. Then check your score.</p>
              {words.map((item, i) => <label key={item.word}>{i + 1}. {item.meaning}<input value={answers[i] || ""} onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })} placeholder="Type English word" /></label>)}
              <button onClick={() => setChecked(true)}>Check my test</button>
              {checked && <div className="score-box"><strong>Score: {score} / {words.length}</strong><p>{score === words.length ? "Excellent work." : "Review the vocabulary list and try again."}</p></div>}
            </>
          )}
        </section>
      </main>

      <CommercialBox />
      <FeedbackBox />
      <PolicyFooter />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
