/*
Mind Radar — основной JS-модуль.
Реализация: IndexedDB, NLP, геолокация, погода, визуализация, фильтры, PWA.
*/

// === Константы и глобальные переменные ===
const DB_NAME = "mindradar";
const DB_VERSION = 1;
const STORE_NAME = "thoughts";
const MAX_WORDS = 50;
const WEATHER_ICONS = {
  Sunny: "☀️",
  "Partly cloudy": "⛅",
  Cloudy: "☁️",
  Rain: "🌧️",
  Thunder: "⛈️",
  Snow: "❄️",
  Fog: "🌫️",
  Mist: "🌫️",
  "Overcast": "☁️",
  Drizzle: "🌦️",
  "Clear": "🌙",
  "Patchy rain possible": "🌦️",
  "Patchy snow possible": "🌨️",
  "Patchy sleet possible": "🌨️",
  "Patchy freezing drizzle possible": "🌧️",
  "Blowing snow": "🌨️",
  "Blizzard": "🌨️",
  "Freezing fog": "🌫️"
};
const STOP_WORDS = [
  "the", "a", "an", "and", "but", "or", "on", "in", "with", "of", "at", "by", "for", "to", "from", "up", "down", "out", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", "что", "это", "как", "так", "вот", "бы", "да", "нет", "у", "к", "до", "за", "из", "над", "по", "о", "об", "под", "при", "мы", "вы", "они", "он", "она", "оно", "я", "ты", "мы", "вы", "их", "его", "ее", "им", "ему", "нам", "вам", "тебе", "меня", "нас", "вас", "ли", "же", "быть", "есть", "были", "был", "была", "быть", "будет", "буду", "будешь", "будем", "будете", "будут"
];
const TIME_RANGES = {
  morning: [5, 12],
  afternoon: [12, 18],
  evening: [18, 24],
  night: [0, 5]
};
if (!window.Sentiment) {
  alert("Ошибка: Sentiment.js не загружен. Проверьте подключение к интернету или CDN.");
  throw new Error("Sentiment.js не загружен");
}
const sentiment = new window.Sentiment();

// === Поддержка русского языка для Sentiment.js ===
const ruLabels = {
  // Позитивные
  "люблю": 3, "счастлив": 3, "счастье": 3, "рад": 2, "радость": 3, "отлично": 3, "классно": 2, "круто": 2, "хорошо": 2, "улыбка": 2, "улыбаюсь": 2, "супер": 3, "замечательно": 3, "прекрасно": 3, "вдохновлён": 2, "вдохновение": 2, "спасибо": 2, "дружба": 2, "доверие": 2, "мир": 2, "любимый": 2, "любимая": 2, "любимые": 2, "достижение": 2, "успех": 3, "получилось": 2, "повезло": 2, "отдых": 2, "покой": 2, "уют": 2, "тепло": 2, "радостно": 2, "улыбаться": 2, "наслаждение": 3, "восхищён": 2, "кайф": 2, "гармония": 2, "спокойно": 2, "спокойствие": 2, "безмятежно": 2, "мечта": 2, "мечтаю": 2, "мечтал": 2, "доброта": 2, "доброжелательность": 2, "приятно": 2, "приятный": 2, "приятная": 2, "приятные": 2, "счастливчик": 2, "любовь": 3, "поддержка": 2, "улыбнулся": 2, "доброта": 2, "молодец": 2, "горжусь": 2, "вдохновляет": 2, "вдохновляю": 2, "мотивирован": 2, "мотивирует": 2, "энергия": 2, "энергичный": 2, "светло": 2, "светлый": 2, "ярко": 2, "яркий": 2, "душевно": 2, "душевный": 2, "счастливая": 3, "счастливый": 3, "доброжелательный": 2, "доброжелательная": 2, "доброжелательные": 2, "весело": 2, "весёлый": 2, "веселая": 2, "улыбчивый": 2, "улыбчивая": 2, "благодарю": 2, "вдохновляющая": 2, "любимый": 2, "любимая": 2, "любимые": 2, "дружелюбный": 2, "дружелюбная": 2, "дружелюбные": 2, "дружелюбие": 2, "дружно": 2, "дружный": 2, "дружная": 2, "дружные": 2, "восторг": 3, "восторжен": 2, "восторженно": 2, "вдохновенно": 2, "окрылён": 2, "окрылённый": 2, "вдохновляюще": 2,
  // Дополнительные позитивные синонимы и формы
  "прелестно": 2, "чудесно": 3, "чудо": 2, "великолепно": 3, "великолепный": 2, "великолепная": 2, "великолепные": 2, "потрясающе": 3, "потрясающий": 2, "потрясающая": 2, "потрясающие": 2, "блестяще": 2, "блестящий": 2, "блестящая": 2, "блестящие": 2, "шикарно": 2, "шикарный": 2, "шикарная": 2, "шикарные": 2, "изумительно": 3, "изумительный": 2, "изумительная": 2, "изумительные": 2, "восхитительно": 3, "восхитительный": 2, "восхитительная": 2, "восхитительные": 2, "сказочно": 2, "сказочный": 2, "сказочная": 2, "сказочные": 2, "красота": 2, "красивый": 2, "красивая": 2, "красивые": 2, "добро": 2, "добрый": 2, "добрая": 2, "добрые": 2, "ласка": 2, "ласковый": 2, "ласковая": 2, "ласковые": 2, "милый": 2, "милая": 2, "милые": 2, "милота": 2, "солнечно": 2, "солнечный": 2, "солнечная": 2, "солнечные": 2, "радужный": 2, "радужная": 2, "радужные": 2, "радужно": 2, "благополучно": 2, "благополучие": 2, "благополучный": 2, "благополучная": 2, "благополучные": 2, "вдохновляющий": 2, "вдохновляющая": 2, "вдохновляющие": 2, "вдохновенно": 2, "вдохновен": 2, "вдохновена": 2, "вдохновены": 2, "окрылённо": 2, "окрылённая": 2, "окрылённые": 2, "бодро": 2, "бодрый": 2, "бодрая": 2, "бодрые": 2, "бодрость": 2, "бодренько": 2, "бодренький": 2, "бодренькая": 2, "бодренькие": 2, "веселуха": 2, "веселенько": 2, "веселенький": 2, "веселенькая": 2, "веселенькие": 2, "приятель": 2, "приятельница": 2, "приятели": 2, "приятельский": 2, "приятельская": 2, "приятельские": 2, "дружочек": 2, "дружище": 2, "дружочки": 2, "дружелюбие": 2, "дружелюбно": 2, "дружелюбная": 2, "дружелюбный": 2, "дружелюбные": 2, "дружелюбен": 2, "дружелюбна": 2, "дружелюбны": 2, "дружеский": 2, "дружеская": 2, "дружеские": 2, "дружески": 2, "вдохновляюще": 2, "вдохновляющий": 2, "вдохновляющая": 2, "вдохновляющие": 2, "вдохновен": 2, "вдохновена": 2, "вдохновены": 2, "вдохновенно": 2, "окрылённо": 2, "окрылённая": 2, "окрылённые": 2, "бодро": 2, "бодрый": 2, "бодрая": 2, "бодрые": 2, "бодрость": 2, "бодренько": 2, "бодренький": 2, "бодренькая": 2, "бодренькие": 2, "веселуха": 2, "веселенько": 2, "веселенький": 2, "веселенькая": 2, "веселенькие": 2, "приятель": 2, "приятельница": 2, "приятели": 2, "приятельский": 2, "приятельская": 2, "приятельские": 2, "дружочек": 2, "дружище": 2, "дружочки": 2, "дружелюбие": 2, "дружелюбно": 2, "дружелюбная": 2, "дружелюбный": 2, "дружелюбные": 2, "дружелюбен": 2, "дружелюбна": 2, "дружелюбны": 2, "дружеский": 2, "дружеская": 2, "дружеские": 2, "дружески": 2,
  // Негативные
  "ненавижу": -3, "грусть": -2, "печаль": -2, "плохо": -2, "ужасно": -3, "разочарован": -2, "разочарование": -2, "злой": -3, "злость": -3, "боль": -2, "страх": -2, "одиночество": -2, "тревога": -2, "обида": -2, "обидно": -2, "обижен": -2, "устал": -2, "усталость": -2, "раздражён": -2, "раздражает": -2, "раздражение": -2, "стресс": -2, "проблема": -2, "проблемы": -2, "ошибка": -2, "ошибся": -2, "ошиблась": -2, "ненависть": -3, "зависть": -2, "завидую": -2, "тоска": -2, "тоскливо": -2, "разочарована": -2, "разочарованы": -2, "грустно": -2, "плохо": -2, "ужас": -3, "ужасный": -3, "ужасная": -3, "злой": -3, "злая": -3, "злые": -3, "злиться": -3, "злюсь": -3, "раздражённый": -2, "раздражённая": -2, "раздражённые": -2, "раздражает": -2, "раздражают": -2, "раздражаюсь": -2, "раздражённо": -2, "раздражение": -2, "раздражительный": -2, "раздражительная": -2, "раздражительные": -2, "раздражённость": -2, "беспокойство": -2, "беспокоит": -2, "беспокоюсь": -2, "беспокойный": -2, "беспокойная": -2, "беспокойные": -2, "беспокойно": -2, "тревожный": -2, "тревожная": -2, "тревожные": -2, "тревожусь": -2, "тревожно": -2, "страшно": -2, "страшный": -2, "страшная": -2, "страшные": -2, "страшусь": -2, "страх": -2, "паника": -3, "панический": -3, "паническая": -3, "панические": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3, "паника": -3, "паническое": -3, "панически": -3, "паникёр": -3, "паникёрша": -3, "паникёры": -3, "паниковать": -3, "паниковал": -3, "паниковала": -3, "паниковали": -3
};
const ruTokenizer = function (phrase) {
  return phrase.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
};
sentiment.registerLanguage("ru", { labels: ruLabels, tokenizer: ruTokenizer });

let db;
let allThoughts = [];
let currentFilters = {
  time: null,
  sentiment: [-5, 5],
  weather: null,
  keyword: null
};

// === IndexedDB ===
function openDB() {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    req.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };
    req.onerror = (e) => reject(e);
  });
}
function saveThought(thought) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(thought);
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e);
  });
}
function getAllThoughts() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result.sort((a, b) => b.id - a.id));
    req.onerror = (e) => reject(e);
  });
}

// === NLP: ключевые слова ===
function extractKeywords(text) {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !STOP_WORDS.includes(w));
  const freq = {};
  for (const w of words) freq[w] = (freq[w] || 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([w]) => w);
}

// === Геолокация ===
async function getLocation() {
  // Сначала пробуем Geolocation API
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          // Получаем город/страну через wttr.in
          try {
            const resp = await fetch(`https://wttr.in/${latitude},${longitude}?format=j1`);
            const data = await resp.json();
            const area = data.nearest_area?.[0];
            resolve({
              city: area?.areaName?.[0]?.value || "",
              country: area?.country?.[0]?.value || ""
            });
          } catch {
            resolve({ city: "", country: "" });
          }
        },
        async () => {
          // Fallback: ip-api
          try {
            const resp = await fetch("https://ip-api.com/json/?fields=city,countryCode");
            const data = await resp.json();
            resolve({ city: data.city || "", country: data.countryCode || "" });
          } catch {
            resolve({ city: "", country: "" });
          }
        },
        { timeout: 3000 }
      );
    } else {
      // Fallback: ip-api
      fetch("https://ip-api.com/json/?fields=city,countryCode")
        .then((resp) => resp.json())
        .then((data) => resolve({ city: data.city || "", country: data.countryCode || "" }))
        .catch(() => resolve({ city: "", country: "" }));
    }
  });
}

// === Погода ===
async function getWeather(lat, lon) {
  try {
    const resp = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
    const data = await resp.json();
    const current = data.current_condition?.[0];
    const desc = current?.weatherDesc?.[0]?.value || "";
    const temp = current?.temp_C || "";
    // Маппинг иконки
    let icon = WEATHER_ICONS[desc] || "❔";
    return { desc, temp, icon };
  } catch {
    return { desc: "", temp: "", icon: "❔" };
  }
}

// === Получение координат для погоды ===
async function getLatLon() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve([pos.coords.latitude, pos.coords.longitude]);
        },
        () => resolve([null, null]),
        { timeout: 3000 }
      );
    } else {
      resolve([null, null]);
    }
  });
}

// === Вспомогательные функции ===
function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function abbreviateLocation(loc) {
  if (!loc.city && !loc.country) return "?";
  if (loc.city && loc.country) return `${loc.city},${loc.country}`;
  return loc.city || loc.country;
}
function sentimentEmoji(score) {
  if (score < -1) return "😞";
  if (score > 1) return "😊";
  return "😐";
}
function highlightKeywords(text, keywords) {
  let res = text;
  for (const kw of keywords) {
    res = res.replace(new RegExp(`\\b${kw}\\b`, "gi"), `<mark>${kw}</mark>`);
  }
  return res;
}

// === Визуализация тег-клауда ===
function renderTagCloud(thoughts, container, onClick) {
  container.innerHTML = "";
  const freq = {};
  for (const t of thoughts) for (const k of t.keywords) freq[k] = (freq[k] || 0) + 1;
  const min = Math.min(...Object.values(freq), 1);
  const max = Math.max(...Object.values(freq), 1);
  const canvas = document.createElement("canvas");
  canvas.width = container.offsetWidth || 320;
  canvas.height = 120;
  canvas.classList.add('fade-in');
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const placed = [];
  const kwRects = [];
  let i = 0;
  for (const [kw, count] of Object.entries(freq)) {
    const fontSize = 12 + ((count - min) / (max - min || 1)) * (48 - 12);
    const avgSentiment = avgSentimentForKeyword(thoughts, kw);
    ctx.font = `bold ${fontSize}px system-ui`;
    ctx.fillStyle = sentimentColor(avgSentiment);
    // Позиционирование: случайно, избегая наложений (упрощённо)
    let x, y, tries = 0;
    do {
      x = Math.random() * (canvas.width - 80) + 10;
      y = Math.random() * (canvas.height - 40) + 30;
      tries++;
    } while (overlaps(x, y, fontSize, placed) && tries < 50);
    placed.push({ x, y, size: fontSize });
    ctx.fillText(kw, x, y);
    // Для клика: сохраняем координаты
    kwRects.push({ kw, x, y: y - fontSize, w: ctx.measureText(kw).width, h: fontSize });
    i++;
  }
  // Обработка клика
  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (const r of kwRects) {
      if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
        onClick(r.kw);
        break;
      }
    }
  };
  function overlaps(x, y, size, placed) {
    return placed.some(p => Math.abs(p.x - x) < (p.size + size) / 2 && Math.abs(p.y - y) < (p.size + size) / 2);
  }
  function avgSentimentForKeyword(thoughts, kw) {
    const vals = thoughts.filter(t => t.keywords.includes(kw)).map(t => t.sentiment);
    if (!vals.length) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }
  function sentimentColor(score) {
    if (score < -1) return "#f87171"; // red
    if (score > 1) return "#22c55e"; // green
    return "#a3a3a3"; // gray
  }
}

// === Визуализация мыслей ===
function renderEntries(thoughts, container) {
  container.innerHTML = "";
  // Удаляем skeleton после загрузки мыслей
  document.querySelectorAll('.skeleton').forEach(el => el.remove());
  if (!thoughts.length) {
    container.innerHTML = '<div class="empty fade-in">Нет мыслей</div>';
    return;
  }
  for (const t of thoughts) {
    const entry = document.createElement("div");
    entry.className = "entry fade-in";
    entry.innerHTML = `
      <span class="weather">${t.weather.icon}</span>
      <span class="loc">${abbreviateLocation(t.location)}</span>
      <span class="time">${formatTime(t.timestamp)}</span>
      <span class="sentiment">${sentimentEmoji(t.sentiment)}</span>
      <span class="text">${highlightKeywords(t.text, t.keywords)}</span>
    `;
    container.appendChild(entry);
  }
}

// === Фильтры ===
function renderFilters(container, onFilter) {
  // Pill-style фильтры времени
  const times = [
    { key: '', label: 'Все' },
    { key: 'morning', label: 'Утро' },
    { key: 'afternoon', label: 'День' },
    { key: 'evening', label: 'Вечер' },
    { key: 'night', label: 'Ночь' }
  ];
  const weather = [
    { key: '', label: 'Любая' },
    { key: '☀️', label: 'Солнце' },
    { key: '⛅', label: 'Облачно' },
    { key: '☁️', label: 'Пасмурно' },
    { key: '🌧️', label: 'Дождь' },
    { key: '⛈️', label: 'Гроза' },
    { key: '❄️', label: 'Снег' },
    { key: '🌫️', label: 'Туман' }
  ];
  container.innerHTML = '';
  // Время суток
  const timeDiv = document.createElement('div');
  timeDiv.className = 'pill-filters';
  times.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'pill' + (currentFilters.time === t.key ? ' active' : '');
    btn.textContent = t.label;
    btn.onclick = () => {
      currentFilters.time = t.key;
      renderFilters(container, onFilter);
      onFilter();
    };
    timeDiv.appendChild(btn);
  });
  container.appendChild(timeDiv);
  // Погода
  const weatherDiv = document.createElement('div');
  weatherDiv.className = 'pill-filters';
  weather.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'pill' + (currentFilters.weather === w.key ? ' active' : '');
    btn.textContent = w.label;
    btn.onclick = () => {
      currentFilters.weather = w.key;
      renderFilters(container, onFilter);
      onFilter();
    };
    weatherDiv.appendChild(btn);
  });
  container.appendChild(weatherDiv);
  // Настроение
  const sentimentDiv = document.createElement('div');
  sentimentDiv.className = 'filter-group';
  sentimentDiv.innerHTML = `
    <label>Настроение:</label>
    <input type="range" id="filter-sentiment" min="-5" max="5" value="${currentFilters.sentiment ? currentFilters.sentiment[0] : 0}" step="1">
    <span id="sentiment-value">${currentFilters.sentiment ? currentFilters.sentiment[0] : 0}</span>
  `;
  container.appendChild(sentimentDiv);
  container.querySelector('#filter-sentiment').oninput = function() {
    document.getElementById('sentiment-value').textContent = this.value;
    currentFilters.sentiment = [parseInt(this.value), 5];
    onFilter();
  };
  // Сброс
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Сбросить фильтры';
  resetBtn.onclick = () => {
    currentFilters = { time: null, sentiment: [-5, 5], weather: null, keyword: null };
    renderFilters(container, onFilter);
    onFilter();
  };
  container.appendChild(resetBtn);
}


function applyFilters(thoughts) {
  return thoughts.filter(t => {
    // Время суток
    if (currentFilters.time) {
      const h = new Date(t.timestamp).getHours();
      const [start, end] = TIME_RANGES[currentFilters.time];
      if (start < end) {
        if (h < start || h >= end) return false;
      } else {
        if (h < start && h >= end) return false;
      }
    }
    // Настроение
    if (t.sentiment < currentFilters.sentiment[0] || t.sentiment > currentFilters.sentiment[1]) return false;
    // Погода
    if (currentFilters.weather && t.weather.icon !== currentFilters.weather) return false;
    // Ключевое слово
    if (currentFilters.keyword && !t.keywords.includes(currentFilters.keyword)) return false;
    return true;
  });
}

// === Основная логика ===
async function main() {
  db = await openDB();
  allThoughts = await getAllThoughts();
  updateUI();
  // Фильтры
  const filters = document.getElementById("filters");
  renderFilters(filters, updateUI);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("thought-input");
  const text = input.value.trim();
  if (!text) return;
  if (wordCount(text) > MAX_WORDS) {
    alert("Максимум 50 слов!");
    return;
  }
  input.value = "";
  // 1. NLP
  const sentimentRes = sentiment.analyze(text, { language: "ru" });
  const sentimentScore = Math.max(-5, Math.min(5, sentimentRes.score));
  const keywords = extractKeywords(text);
  // 2. Геолокация
  const location = await getLocation();
  // 3. Погода
  let latlon = await getLatLon();
  if (!latlon[0]) latlon = [0, 0];
  const weather = await getWeather(latlon[0], latlon[1]);
  // 4. Время
  const timestamp = Date.now();
  // 5. Сохраняем
  const thought = {
    id: timestamp,
    text,
    timestamp,
    location,
    weather,
    sentiment: sentimentScore,
    keywords
  };
  await saveThought(thought);
  allThoughts.unshift(thought);
  updateUI();
}

document.getElementById("thought-form").addEventListener("submit", handleFormSubmit);

function updateUI() {
  const filtered = applyFilters(allThoughts);
  renderEntries(filtered, document.getElementById("entries"));
  renderTagCloud(allThoughts, document.getElementById("tagcloud"), (kw) => {
    currentFilters.keyword = kw;
    updateUI();
  });
}

// PWA: регистрация service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

main();
