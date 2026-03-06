"use client";
import { useEffect, useState, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// COLOR THEMES
// ═══════════════════════════════════════════════════════════════════
const THEMES = {
  dark: {
    name: "🌙 Raat",
    bg: "#05050e",
    surface: "rgba(255,255,255,0.04)",
    surfaceStrong: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.08)",
    text: "#fff",
    textMuted: "rgba(255,255,255,0.55)",
    textFaint: "rgba(255,255,255,0.25)",
    card: "rgba(255,255,255,0.04)",
    orb1: "rgba(139,92,246,0.12)",
    orb2: "rgba(244,63,94,0.08)",
    orb3: "rgba(6,182,212,0.06)",
  },
  saffron: {
    name: "🪔 Diwali",
    bg: "#120a00",
    surface: "rgba(245,158,11,0.10)",
    surfaceStrong: "rgba(245,158,11,0.18)",
    border: "rgba(245,158,11,0.20)",
    text: "#fff8e7",
    textMuted: "rgba(255,220,100,0.75)",
    textFaint: "rgba(255,200,80,0.40)",
    card: "rgba(245,158,11,0.08)",
    orb1: "rgba(245,158,11,0.18)",
    orb2: "rgba(239,68,68,0.12)",
    orb3: "rgba(252,211,77,0.10)",
  },
  rose: {
    name: "🌸 Gulab",
    bg: "#100308",
    surface: "rgba(244,63,94,0.09)",
    surfaceStrong: "rgba(244,63,94,0.16)",
    border: "rgba(244,63,94,0.18)",
    text: "#fff0f3",
    textMuted: "rgba(255,180,190,0.80)",
    textFaint: "rgba(255,150,170,0.40)",
    card: "rgba(244,63,94,0.07)",
    orb1: "rgba(244,63,94,0.18)",
    orb2: "rgba(236,72,153,0.12)",
    orb3: "rgba(251,113,133,0.09)",
  },
  ocean: {
    name: "🌊 Sagar",
    bg: "#020c14",
    surface: "rgba(6,182,212,0.09)",
    surfaceStrong: "rgba(6,182,212,0.16)",
    border: "rgba(6,182,212,0.18)",
    text: "#f0fffe",
    textMuted: "rgba(103,232,249,0.75)",
    textFaint: "rgba(103,232,249,0.38)",
    card: "rgba(6,182,212,0.07)",
    orb1: "rgba(6,182,212,0.18)",
    orb2: "rgba(59,130,246,0.12)",
    orb3: "rgba(16,185,129,0.09)",
  },
  forest: {
    name: "🌿 Jungle",
    bg: "#020e06",
    surface: "rgba(16,185,129,0.09)",
    surfaceStrong: "rgba(16,185,129,0.16)",
    border: "rgba(16,185,129,0.18)",
    text: "#f0fff5",
    textMuted: "rgba(110,231,183,0.75)",
    textFaint: "rgba(110,231,183,0.38)",
    card: "rgba(16,185,129,0.07)",
    orb1: "rgba(16,185,129,0.18)",
    orb2: "rgba(132,204,22,0.11)",
    orb3: "rgba(6,182,212,0.09)",
  },
};

// ═══════════════════════════════════════════════════════════════════
// LANGUAGE CONTENT — Pure English / Pure Hindi / Pure Punjabi
// ═══════════════════════════════════════════════════════════════════
const UI_TEXT = {
  en: {
    tagline: "How are you feeling today?",
    subtitle: "Choose your mood —  wisdom 💭, Punjabi songs 🎵, and mood lifters just for you ⚡",
    bhasha: "Language:",
    dailyChallenge: "Daily Challenge",
    complete: "Complete",
    done: "✅ Done!",
    recentRead: "✦ Recently Read 📖",
    levelLabel: "Level",
    xpNext: "XP → Level",
    tabs: { thought: "💭 Thought", songs: "🎵 Songs", lifter: "⚡ Lift", breathe: "🌊 Breathe", fav: "❤️ Saved", history: "🕐 History" },
    newThought: "🔄 New Thought",
    saved: "❤️ Saved!",
    save: "🤍 Save",
    copy: "📋 Copy",
    copied: "✅ Copied!",
    share: "🔗 Share",
    listen: "🔊 Listen (TTS)",
    affirmation: "✨ Affirmation",
    explain: "📖 Explain",
    hide: "Hide",
    todayAffirmation: "✨ Today's Affirmation",
    explanation: "📖 Understanding",
    journalPrompt: "Write your feelings ✍️",
    journalSub: "What did this thought make you feel?",
    writeBtn: "Write →",
    aiThinking: "I am thinking... 🌸",
    startBreathe: "▶ Start (+15 XP) 🌊",
    stopBreathe: "⏹ Stop",
    inhale: "Breathe in... 🫁",
    hold: "Hold... ⏸️",
    exhale: "Release... 💨",
    wait: "Wait... ⌛",
    boxBreathing: "🌊 Box Breathing — 4-4-4-4",
    boxSub: "Inhale → Hold → Exhale → Wait. 4 rounds. You'll feel completely calm. 🕊️",
    moodLifters: "⚡ Mood Lifters",
    checkOff: "Check each one as you complete it. You got this! 💪",
    allDone: "Zabardast! All done!",
    allDoneSub: "You are amazing. Really. 💪🌟",
    songIntro: "🎵 Punjabi Songs",
    songSub: "Tap a song — it plays right here! No new tab needed 🎶",
    nowPlaying: "Playing",
    stopSong: "✕ Stop",
    searchSaved: "Search saved thoughts…",
    clearAll: "Clear",
    noSaved: "No saved thoughts",
    noSavedSub: "Save a thought you like! 🌸",
    noHistory: "No history yet 🌸",
    musicOn: "Ambient music playing 🎵",
    footer: "Soul — Your Soul's Companion 🌸 Made with ❤️ in India",
    journal: "📔 Journal",
    stats: "📊 Stats",
    back: "← Back",
    myJournal: "📔 My Journal",
    myStats: "📊 My Stats",
    mood: "Mood:",
    characters: "characters",
    saveJournal: "Save (+20 XP) 📝",
    noJournal: "No entries yet",
    noJournalSub: "Start writing your first entry! ✍️",
    topMoods: "🌟 Top Moods",
    recentLog: "🕐 Recent Mood Log",
    noLog: "No entries yet. Pick a mood to start! 🌸",
    thoughtsRead: "Thoughts Read",
    savedQuotes: "Saved Quotes",
    moodCheckins: "Mood Check-ins",
    dayStreak: "Day Streak",
    totalXp: "Total XP",
    level: "Level",
    journals: "Journals",
    searchHistory: "Search history…",
    allMoods: "All Moods",
  },
  hi: {
    tagline: "आज कैसा महसूस कर रहे हो?",
    subtitle: "अपना मूड चुनो — AI की बुद्धि 💭, पंजाबी गाने 🎵, और मूड लिफ्टर सिर्फ तुम्हारे लिए ⚡",
    bhasha: "भाषा:",
    dailyChallenge: "आज की चुनौती",
    complete: "पूरा करो",
    done: "✅ हो गया!",
    recentRead: "✦ हाल ही में पढ़ा 📖",
    levelLabel: "स्तर",
    xpNext: "XP → स्तर",
    tabs: { thought: "💭 विचार", songs: "🎵 गाने", lifter: "⚡ उठाओ", breathe: "🌊 सांस", fav: "❤️ सहेजे", history: "🕐 इतिहास" },
    newThought: "🔄 नया विचार",
    saved: "❤️ सहेजा!",
    save: "🤍 सहेजो",
    copy: "📋 कॉपी",
    copied: "✅ कॉपी हो गया!",
    share: "🔗 शेयर",
    listen: "🔊 सुनिए (TTS)",
    affirmation: "✨ पुष्टि",
    explain: "📖 समझाओ",
    hide: "छुपाओ",
    todayAffirmation: "✨ आज की पुष्टि",
    explanation: "📖 समझ",
    journalPrompt: "अपनी भावनाएं लिखो ✍️",
    journalSub: "इस विचार ने क्या महसूस कराया?",
    writeBtn: "लिखो →",
    aiThinking: "AI सोच रहा है... 🌸",
    startBreathe: "▶ शुरू करो (+15 XP) 🌊",
    stopBreathe: "⏹ रोको",
    inhale: "सांस लो... 🫁",
    hold: "रोको... ⏸️",
    exhale: "छोड़ो... 💨",
    wait: "प्रतीक्षा... ⌛",
    boxBreathing: "🌊 बॉक्स ब्रीदिंग — 4-4-4-4",
    boxSub: "सांस लो → रोको → छोड़ो → रुको। 4 बार। बिल्कुल शांत हो जाओगे। 🕊️",
    moodLifters: "⚡ मूड लिफ्टर",
    checkOff: "जैसे-जैसे करते जाओ, टिक करते जाओ। तुम कर सकते हो! 💪",
    allDone: "शाबाश! सब हो गया!",
    allDoneSub: "तुम अद्भुत हो। सच में। 💪🌟",
    songIntro: "🎵 पंजाबी गाने",
    songSub: "गाने पर टैप करो — यहीं बजेगा! नया टैब नहीं खुलेगा 🎶",
    nowPlaying: "बज रहा है",
    stopSong: "✕ बंद करो",
    searchSaved: "सहेजे विचार खोजो…",
    clearAll: "साफ करो",
    noSaved: "कोई सहेजा विचार नहीं",
    noSavedSub: "कोई अच्छा विचार सहेजो! 🌸",
    noHistory: "अभी तक कोई इतिहास नहीं 🌸",
    musicOn: "परिवेश संगीत बज रहा है 🎵",
    footer: "Soul — तेरी रूह का साथी 🌸 भारत में ❤️ के साथ बनाया",
    journal: "📔 डायरी",
    stats: "📊 आँकड़े",
    back: "← वापस",
    myJournal: "📔 मेरी डायरी",
    myStats: "📊 मेरे आँकड़े",
    mood: "मूड:",
    characters: "अक्षर",
    saveJournal: "सहेजो (+20 XP) 📝",
    noJournal: "अभी कोई प्रविष्टि नहीं",
    noJournalSub: "अपनी पहली प्रविष्टि लिखना शुरू करो! ✍️",
    topMoods: "🌟 सबसे ज़्यादा मूड",
    recentLog: "🕐 हाल का मूड लॉग",
    noLog: "अभी कोई प्रविष्टि नहीं। मूड चुनो! 🌸",
    thoughtsRead: "विचार पढ़े",
    savedQuotes: "सहेजे उद्धरण",
    moodCheckins: "मूड चेक-इन",
    dayStreak: "दिन की लकीर",
    totalXp: "कुल XP",
    level: "स्तर",
    journals: "डायरी प्रविष्टियां",
    searchHistory: "इतिहास खोजो…",
    allMoods: "सभी मूड",
  },
  pa: {
    tagline: "ਅੱਜ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?",
    subtitle: "ਆਪਣਾ ਮੂਡ ਚੁਣੋ — AI ਦੀ ਸਿਆਣਪ 💭, ਪੰਜਾਬੀ ਗੀਤ 🎵, ਅਤੇ ਮੂਡ ਲਿਫ਼ਟਰ ਸਿਰਫ਼ ਤੁਹਾਡੇ ਲਈ ⚡",
    bhasha: "ਭਾਸ਼ਾ:",
    dailyChallenge: "ਅੱਜ ਦੀ ਚੁਣੌਤੀ",
    complete: "ਪੂਰਾ ਕਰੋ",
    done: "✅ ਹੋ ਗਿਆ!",
    recentRead: "✦ ਹਾਲ ਹੀ ਵਿੱਚ ਪੜ੍ਹਿਆ 📖",
    levelLabel: "ਪੱਧਰ",
    xpNext: "XP → ਪੱਧਰ",
    tabs: { thought: "💭 ਵਿਚਾਰ", songs: "🎵 ਗੀਤ", lifter: "⚡ ਚੁੱਕੋ", breathe: "🌊 ਸਾਹ", fav: "❤️ ਸੁਰੱਖਿਅਤ", history: "🕐 ਇਤਿਹਾਸ" },
    newThought: "🔄 ਨਵਾਂ ਵਿਚਾਰ",
    saved: "❤️ ਸੁਰੱਖਿਅਤ!",
    save: "🤍 ਸੁਰੱਖਿਅਤ ਕਰੋ",
    copy: "📋 ਕਾਪੀ",
    copied: "✅ ਕਾਪੀ ਹੋ ਗਈ!",
    share: "🔗 ਸਾਂਝਾ ਕਰੋ",
    listen: "🔊 ਸੁਣੋ (TTS)",
    affirmation: "✨ ਪੁਸ਼ਟੀ",
    explain: "📖 ਸਮਝਾਓ",
    hide: "ਲੁਕਾਓ",
    todayAffirmation: "✨ ਅੱਜ ਦੀ ਪੁਸ਼ਟੀ",
    explanation: "📖 ਸਮਝ",
    journalPrompt: "ਆਪਣੀਆਂ ਭਾਵਨਾਵਾਂ ਲਿਖੋ ✍️",
    journalSub: "ਇਸ ਵਿਚਾਰ ਨੇ ਕੀ ਮਹਿਸੂਸ ਕਰਾਇਆ?",
    writeBtn: "ਲਿਖੋ →",
    aiThinking: "AI ਸੋਚ ਰਿਹਾ ਹੈ... 🌸",
    startBreathe: "▶ ਸ਼ੁਰੂ ਕਰੋ (+15 XP) 🌊",
    stopBreathe: "⏹ ਰੋਕੋ",
    inhale: "ਸਾਹ ਲਓ... 🫁",
    hold: "ਰੋਕੋ... ⏸️",
    exhale: "ਛੱਡੋ... 💨",
    wait: "ਉਡੀਕ... ⌛",
    boxBreathing: "🌊 ਬਾਕਸ ਬ੍ਰੀਥਿੰਗ — 4-4-4-4",
    boxSub: "ਸਾਹ ਲਓ → ਰੋਕੋ → ਛੱਡੋ → ਉਡੀਕ ਕਰੋ। 4 ਵਾਰ। ਬਿਲਕੁਲ ਸ਼ਾਂਤ ਹੋ ਜਾਓਗੇ। 🕊️",
    moodLifters: "⚡ ਮੂਡ ਲਿਫ਼ਟਰ",
    checkOff: "ਜਿਵੇਂ-ਜਿਵੇਂ ਕਰਦੇ ਜਾਓ, ਟਿੱਕ ਕਰਦੇ ਜਾਓ। ਤੁਸੀਂ ਕਰ ਸਕਦੇ ਹੋ! 💪",
    allDone: "ਸ਼ਾਬਾਸ਼! ਸਭ ਹੋ ਗਿਆ!",
    allDoneSub: "ਤੁਸੀਂ ਕਮਾਲ ਦੇ ਹੋ। ਸੱਚਮੁੱਚ। 💪🌟",
    songIntro: "🎵 ਪੰਜਾਬੀ ਗੀਤ",
    songSub: "ਗੀਤ ਉੱਤੇ ਟੈਪ ਕਰੋ — ਇੱਥੇ ਵੱਜੇਗਾ! ਨਵੀਂ ਟੈਬ ਨਹੀਂ ਖੁੱਲ੍ਹੇਗੀ 🎶",
    nowPlaying: "ਵੱਜ ਰਿਹਾ ਹੈ",
    stopSong: "✕ ਬੰਦ ਕਰੋ",
    searchSaved: "ਸੁਰੱਖਿਅਤ ਵਿਚਾਰ ਲੱਭੋ…",
    clearAll: "ਸਾਫ਼ ਕਰੋ",
    noSaved: "ਕੋਈ ਸੁਰੱਖਿਅਤ ਵਿਚਾਰ ਨਹੀਂ",
    noSavedSub: "ਕੋਈ ਵਧੀਆ ਵਿਚਾਰ ਸੁਰੱਖਿਅਤ ਕਰੋ! 🌸",
    noHistory: "ਅਜੇ ਕੋਈ ਇਤਿਹਾਸ ਨਹੀਂ 🌸",
    musicOn: "ਪਿਛੋਕੜ ਸੰਗੀਤ ਵੱਜ ਰਿਹਾ ਹੈ 🎵",
    footer: "Soul — ਤੇਰੀ ਰੂਹ ਦਾ ਸਾਥੀ 🌸 ਭਾਰਤ ਵਿੱਚ ❤️ ਨਾਲ ਬਣਾਇਆ",
    journal: "📔 ਡਾਇਰੀ",
    stats: "📊 ਅੰਕੜੇ",
    back: "← ਵਾਪਸ",
    myJournal: "📔 ਮੇਰੀ ਡਾਇਰੀ",
    myStats: "📊 ਮੇਰੇ ਅੰਕੜੇ",
    mood: "ਮੂਡ:",
    characters: "ਅੱਖਰ",
    saveJournal: "ਸੁਰੱਖਿਅਤ ਕਰੋ (+20 XP) 📝",
    noJournal: "ਅਜੇ ਕੋਈ ਐਂਟਰੀ ਨਹੀਂ",
    noJournalSub: "ਆਪਣੀ ਪਹਿਲੀ ਐਂਟਰੀ ਲਿਖਣਾ ਸ਼ੁਰੂ ਕਰੋ! ✍️",
    topMoods: "🌟 ਸਭ ਤੋਂ ਵੱਧ ਮੂਡ",
    recentLog: "🕐 ਹਾਲੀਆ ਮੂਡ ਲੌਗ",
    noLog: "ਅਜੇ ਕੋਈ ਐਂਟਰੀ ਨਹੀਂ। ਮੂਡ ਚੁਣੋ! 🌸",
    thoughtsRead: "ਵਿਚਾਰ ਪੜ੍ਹੇ",
    savedQuotes: "ਸੁਰੱਖਿਅਤ ਹਵਾਲੇ",
    moodCheckins: "ਮੂਡ ਚੈੱਕ-ਇਨ",
    dayStreak: "ਦਿਨਾਂ ਦੀ ਲੜੀ",
    totalXp: "ਕੁੱਲ XP",
    level: "ਪੱਧਰ",
    journals: "ਡਾਇਰੀ ਐਂਟਰੀਆਂ",
    searchHistory: "ਇਤਿਹਾਸ ਲੱਭੋ…",
    allMoods: "ਸਾਰੇ ਮੂਡ",
  },
};

// ═══════════════════════════════════════════════════════════════════
// THOUGHT STYLES & AI FETCH
// ═══════════════════════════════════════════════════════════════════
const THOUGHT_STYLES = [
  "a Sufi mystic",
  "Kabir Das",
  "Guru Nanak Dev Ji",
  "Bhagavad Gita philosophy",
  "an elder's wisdom",
  "Rumi",
  "an ancient Indian proverb",
  "Mirabai's bhakti",
  "Bulleh Shah",
  "Mirza Ghalib",
];

async function fetchAIThought(mood, lang, callCount = 0) {
  const langInstructions = {
    en: "Respond ONLY in pure English. No Hindi or Punjabi words at all. Clean, poetic English only.",
    hi: "केवल शुद्ध हिंदी में जवाब दो। देवनागरी लिपि में। कोई अंग्रेजी शब्द नहीं। Hinglish नहीं।",
    pa: "ਸਿਰਫ਼ ਸ਼ੁੱਧ ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ। ਗੁਰਮੁਖੀ ਲਿਪੀ ਵਿੱਚ। ਕੋਈ ਅੰਗਰੇਜ਼ੀ ਸ਼ਬਦ ਨਹੀਂ।",
  };
  const langName = { en: "pure English", hi: "pure Hindi (Devanagari script only)", pa: "pure Punjabi (Gurmukhi script only)" };

  const style = THOUGHT_STYLES[Math.floor(Math.random() * THOUGHT_STYLES.length)];
  const seed = Math.floor(Math.random() * 99999);

  const prompt = `You are a wise Indian spiritual guide. Generate ONE unique quote/thought for someone feeling "${mood}".
Style: Voice of ${style}.
Uniqueness seed: ${seed}-${Date.now()}-${callCount}

${langInstructions[lang]}

Respond ONLY in valid JSON (no markdown, no backticks):
{
  "quote": "<unique quote in ${langName[lang]}>",
  "author": "<real person: Kabir Das, Guru Nanak, Mirabai, Bulleh Shah, Mirza Ghalib, Rumi, or 'Ancient Wisdom'>",
  "explanation": "<2-3 sentences in ${langName[lang]} explaining the quote with warmth>",
  "affirmation": "<short powerful affirmation in ${langName[lang]}, max 10 words>"
}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    const text = data.content?.map((c) => c.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const m = clean.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    return JSON.parse(clean);
  } catch {
    const fallbacks = {
      en: [
        { quote: "After every night, the morning comes. Difficult times too shall pass.", author: "Ancient Wisdom", explanation: "Life has its ebbs and flows. Patience is the river that carries us through.", affirmation: "I am strong. I rise through every difficulty." },
        { quote: "Flow like water — do not fight the stone, the path forms itself.", author: "Punjabi Folk Wisdom", explanation: "Resistance exhausts us. Yielding like water, we find our way around every obstacle.", affirmation: "I am flexible. I find a way forward." },
      ],
      hi: [
        { quote: "हर रात के बाद सुबह आती है, कठिन समय भी गुज़र जाता है।", author: "प्राचीन ज्ञान", explanation: "जीवन में उतार-चढ़ाव आते रहते हैं। धैर्य रखो, सब ठीक होगा।", affirmation: "मैं मज़बूत हूँ। मैं सक्षम हूँ।" },
        { quote: "मन के हारे हार है, मन के जीते जीत।", author: "कबीर दास", explanation: "सब कुछ मन की शक्ति पर निर्भर करता है। मन को मज़बूत करो।", affirmation: "मेरा मन शांत है, मेरा दिल मज़बूत है।" },
      ],
      pa: [
        { quote: "ਹਰ ਰਾਤ ਤੋਂ ਬਾਅਦ ਸਵੇਰ ਆਉਂਦੀ ਹੈ, ਔਖਾ ਵੇਲਾ ਵੀ ਲੰਘ ਜਾਂਦਾ ਹੈ।", author: "ਪ੍ਰਾਚੀਨ ਬੁੱਧੀ", explanation: "ਜ਼ਿੰਦਗੀ ਵਿੱਚ ਉਤਾਰ-ਚੜ੍ਹਾਅ ਆਉਂਦੇ ਰਹਿੰਦੇ ਹਨ। ਧੀਰਜ ਰੱਖੋ।", affirmation: "ਮੈਂ ਮਜ਼ਬੂਤ ਹਾਂ। ਮੈਂ ਸਮਰੱਥ ਹਾਂ।" },
        { quote: "ਵਾਹਿਗੁਰੂ ਦੀ ਰਜ਼ਾ ਵਿੱਚ ਰਹੋ, ਸਭ ਕੁਝ ਠੀਕ ਹੋ ਜਾਵੇਗਾ।", author: "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ", explanation: "ਪਰਮਾਤਮਾ ਦੀ ਕਿਰਪਾ ਹਮੇਸ਼ਾ ਸਾਡੇ ਨਾਲ ਹੈ। ਭਰੋਸਾ ਰੱਖੋ।", affirmation: "ਮੈਂ ਸ਼ਾਂਤ ਹਾਂ। ਮੈਂ ਅਮਨ ਵਿੱਚ ਹਾਂ।" },
      ],
    };
    const pool = fallbacks[lang] || fallbacks.en;
    return pool[callCount % pool.length];
  }
}

// ═══════════════════════════════════════════════════════════════════
// MOODS
// ═══════════════════════════════════════════════════════════════════
const MOODS = [
  { id:"motivated", label:"Motivated", labelHi:"प्रेरित", labelPa:"ਪ੍ਰੇਰਿਤ", emoji:"⚡", grad:["#f59e0b","#ef4444"], accent:"#f59e0b", bg:"rgba(245,158,11,0.08)" },
  { id:"happy", label:"Happy", labelHi:"खुश", labelPa:"ਖੁਸ਼", emoji:"🌞", grad:["#facc15","#84cc16"], accent:"#facc15", bg:"rgba(250,204,21,0.08)" },
  { id:"love", label:"In Love", labelHi:"प्यार में", labelPa:"ਪਿਆਰ ਵਿੱਚ", emoji:"💖", grad:["#f43f5e","#ec4899"], accent:"#f43f5e", bg:"rgba(244,63,94,0.08)" },
  { id:"calm", label:"Calm", labelHi:"शांत", labelPa:"ਸ਼ਾਂਤ", emoji:"🌊", grad:["#06b6d4","#3b82f6"], accent:"#06b6d4", bg:"rgba(6,182,212,0.08)" },
  { id:"sad", label:"Sad", labelHi:"उदास", labelPa:"ਉਦਾਸ", emoji:"💧", grad:["#60a5fa","#818cf8"], accent:"#60a5fa", bg:"rgba(96,165,250,0.08)" },
  { id:"anxious", label:"Anxious", labelHi:"चिंतित", labelPa:"ਚਿੰਤਤ", emoji:"🌀", grad:["#a78bfa","#7c3aed"], accent:"#a78bfa", bg:"rgba(167,139,250,0.08)" },
  { id:"angry", label:"Angry", labelHi:"गुस्सा", labelPa:"ਗੁੱਸਾ", emoji:"🔥", grad:["#ef4444","#b91c1c"], accent:"#ef4444", bg:"rgba(239,68,68,0.08)" },
  { id:"lonely", label:"Lonely", labelHi:"अकेला", labelPa:"ਇਕੱਲਾ", emoji:"🌙", grad:["#8b5cf6","#4c1d95"], accent:"#8b5cf6", bg:"rgba(139,92,246,0.08)" },
  { id:"grateful", label:"Grateful", labelHi:"आभारी", labelPa:"ਸ਼ੁਕਰਗੁਜ਼ਾਰ", emoji:"🙏", grad:["#10b981","#059669"], accent:"#10b981", bg:"rgba(16,185,129,0.08)" },
  { id:"broken", label:"Heartbroken", labelHi:"टूटा दिल", labelPa:"ਟੁੱਟਾ ਦਿਲ", emoji:"💔", grad:["#fb7185","#6b7280"], accent:"#fb7185", bg:"rgba(251,113,133,0.08)" },
  { id:"excited", label:"Excited", labelHi:"उत्साहित", labelPa:"ਉਤਸ਼ਾਹਿਤ", emoji:"🎉", grad:["#e879f9","#f43f5e"], accent:"#e879f9", bg:"rgba(232,121,249,0.08)" },
  { id:"confused", label:"Confused", labelHi:"उलझन में", labelPa:"ਉਲਝਣ ਵਿੱਚ", emoji:"🤔", grad:["#f97316","#eab308"], accent:"#f97316", bg:"rgba(249,115,22,0.08)" },
  { id:"tired", label:"Tired", labelHi:"थका हुआ", labelPa:"ਥੱਕਿਆ", emoji:"😴", grad:["#94a3b8","#475569"], accent:"#94a3b8", bg:"rgba(148,163,184,0.08)" },
  { id:"hopeful", label:"Hopeful", labelHi:"उम्मीदवार", labelPa:"ਆਸਵੰਦ", emoji:"🌅", grad:["#fb923c","#fbbf24"], accent:"#fb923c", bg:"rgba(251,146,60,0.08)" },
  { id:"proud", label:"Proud", labelHi:"गर्वित", labelPa:"ਮਾਣ", emoji:"🦁", grad:["#fbbf24","#d97706"], accent:"#fbbf24", bg:"rgba(251,191,36,0.08)" },
  { id:"spiritual", label:"Spiritual", labelHi:"आध्यात्मिक", labelPa:"ਅਧਿਆਤਮਿਕ", emoji:"🕉️", grad:["#f59e0b","#7c3aed"], accent:"#c084fc", bg:"rgba(192,132,252,0.08)" },
];

// ═══════════════════════════════════════════════════════════════════
// SONGS
// ═══════════════════════════════════════════════════════════════════
const SONGS = {
  motivated:[
    {title:"295",artist:"Sidhu Moosewala",vibe:"Rebellion & Strength 💪",yt:"k2GqGDAvZ0s"},
    {title:"Jatt Da Muqabla",artist:"Sidhu Moosewala",vibe:"Raw Power ⚡",yt:"bRGHFHqSbCo"},
    {title:"Bamb Aa Gaya",artist:"Karan Aujla ft. Amrit Maan",vibe:"High Energy 🔥",yt:"WVTLaqoZYAI"},
    {title:"Chitta Kurta",artist:"Karan Aujla",vibe:"Boss Energy 👑",yt:"2_8EFApWIMM"},
  ],
  happy:[
    {title:"5 Taara",artist:"Diljit Dosanjh",vibe:"Pure Joy & Bhangra 🕺",yt:"yFGqJpnFwEA"},
    {title:"Ikk Kudi",artist:"Diljit Dosanjh",vibe:"Happy Soul 🌞",yt:"8P6o8vFSKBQ"},
    {title:"Proper Patola",artist:"Badshah ft. Diljit",vibe:"Dance Anthem 🎉",yt:"f2jj7bJJ3qM"},
    {title:"Lamberghini",artist:"The Doorbeen ft. Ragini",vibe:"Pure Fun 🎊",yt:"IZ9bBBBi40k"},
  ],
  love:[
    {title:"Do You Know",artist:"Diljit Dosanjh",vibe:"Deep Love 💖",yt:"fz6WO3WKRGA"},
    {title:"High End",artist:"B Praak",vibe:"Emotional Love 💕",yt:"Qc_k4WGF7nA"},
    {title:"Ni Main Sass Kuttni",artist:"Mehtab Virk",vibe:"Desi Romance 🌹",yt:"xAL9Y8GYV1E"},
  ],
  calm:[
    {title:"Bulleya",artist:"Amit Mishra",vibe:"Sufi Peace ☮️",yt:"w9xWfgIDQgs"},
    {title:"Aaj Din Chadheya",artist:"Rabbi Shergill",vibe:"Soulful 🕊️",yt:"gXIe2RFBpQk"},
    {title:"Tu Jaane Na",artist:"Atif Aslam",vibe:"Peaceful 🧘",yt:"2c3UBfBxAGo"},
  ],
  sad:[
    {title:"Mann Bharrya",artist:"B Praak",vibe:"Deep Pain 💧",yt:"eP46QPdCBwM"},
    {title:"Teri Mitti",artist:"B Praak",vibe:"Emotional 🇮🇳",yt:"csDNKaJHOIs"},
    {title:"Qismat",artist:"B Praak",vibe:"Fate & Pain 😔",yt:"g_Hhc72UGRY"},
    {title:"Pachtaoge",artist:"B Praak",vibe:"Regret & Loss 🌧️",yt:"Gk1vfMVRFbI"},
  ],
  anxious:[
    {title:"Bulleya",artist:"Amit Mishra",vibe:"Sufi Calm 🌬️",yt:"w9xWfgIDQgs"},
    {title:"Tu Jaane Na",artist:"Atif Aslam",vibe:"Let Go 🌊",yt:"2c3UBfBxAGo"},
    {title:"Mahi Ve",artist:"Nusrat Fateh Ali Khan",vibe:"Sufi Healing 🎶",yt:"qcIz6Rnm0ec"},
  ],
  angry:[
    {title:"295",artist:"Sidhu Moosewala",vibe:"Release the Fire 🔥",yt:"k2GqGDAvZ0s"},
    {title:"Jatt Da Muqabla",artist:"Sidhu Moosewala",vibe:"Power 💢",yt:"bRGHFHqSbCo"},
    {title:"Bamb Aa Gaya",artist:"Karan Aujla",vibe:"Energy Release ⚡",yt:"WVTLaqoZYAI"},
  ],
  lonely:[
    {title:"Mann Bharrya 2.0",artist:"B Praak",vibe:"Deep Loneliness 🌙",yt:"4Mx5lrNiMX0"},
    {title:"Dil Diyan Gallan",artist:"Atif Aslam",vibe:"Missing Someone 🌙",yt:"Rq_YRvpvCrY"},
  ],
  grateful:[
    {title:"Waheguru",artist:"Diljit Dosanjh",vibe:"Divine Gratitude 🙏",yt:"jtA9qGJdmx4"},
    {title:"Ardas Karo",artist:"Gurdas Maan",vibe:"Prayer & Thanks 🌟",yt:"bZhp9Xmm24I"},
  ],
  broken:[
    {title:"Mann Bharrya",artist:"B Praak",vibe:"Heartbreak Anthem 😢",yt:"eP46QPdCBwM"},
    {title:"Pachtaoge",artist:"B Praak",vibe:"Regret & Loss 🌧️",yt:"Gk1vfMVRFbI"},
    {title:"Ranjha",artist:"B Praak & Jaani",vibe:"Pain of Separation 💔",yt:"PmRGwWuXW4Q"},
  ],
  excited:[
    {title:"5 Taara",artist:"Diljit Dosanjh",vibe:"Bhangra Energy 🎊",yt:"yFGqJpnFwEA"},
    {title:"Bamb Aa Gaya",artist:"Karan Aujla",vibe:"Unstoppable! 🚀",yt:"WVTLaqoZYAI"},
    {title:"Proper Patola",artist:"Badshah ft. Diljit",vibe:"Party! 🎉",yt:"f2jj7bJJ3qM"},
  ],
  confused:[
    {title:"Bulleya",artist:"Amit Mishra",vibe:"Who Am I? 🤔",yt:"w9xWfgIDQgs"},
    {title:"Ikk Kudi",artist:"Diljit Dosanjh",vibe:"Searching Soul 🔍",yt:"8P6o8vFSKBQ"},
    {title:"Aaj Din Chadheya",artist:"Rabbi Shergill",vibe:"Clarity Coming 💡",yt:"gXIe2RFBpQk"},
  ],
  tired:[
    {title:"Dil Diyan Gallan",artist:"Atif Aslam",vibe:"Soft & Restful 😌",yt:"Rq_YRvpvCrY"},
    {title:"Tu Jaane Na",artist:"Atif Aslam",vibe:"Peaceful 💤",yt:"2c3UBfBxAGo"},
  ],
  hopeful:[
    {title:"5 Taara",artist:"Diljit Dosanjh",vibe:"New Beginnings 🌅",yt:"yFGqJpnFwEA"},
    {title:"Ikk Kudi",artist:"Diljit Dosanjh",vibe:"Believe in Tomorrow 🌄",yt:"8P6o8vFSKBQ"},
  ],
  proud:[
    {title:"295",artist:"Sidhu Moosewala",vibe:"Stand Tall 🦁",yt:"k2GqGDAvZ0s"},
    {title:"5 Taara",artist:"Diljit Dosanjh",vibe:"Proud & Joyful 🌟",yt:"yFGqJpnFwEA"},
  ],
  spiritual:[
    {title:"Waheguru",artist:"Diljit Dosanjh",vibe:"Divine Connection 🕉️",yt:"jtA9qGJdmx4"},
    {title:"Dhan Dhan Ramdas Guru",artist:"Bhai Harjinder Singh",vibe:"Sacred Devotion 🙏",yt:"rcGXcuWKAtE"},
    {title:"Ranjha Ranjha",artist:"Nooran Sisters",vibe:"Sufi Surrender 🌙",yt:"2wbzuFNHyLo"},
    {title:"Ardas Karo",artist:"Gurdas Maan",vibe:"Prayer 🪔",yt:"bZhp9Xmm24I"},
  ],
};

// ═══════════════════════════════════════════════════════════════════
// MOOD LIFTERS (English — translated per lang via UI_TEXT tone)
// ═══════════════════════════════════════════════════════════════════
const LIFTERS = {
  motivated:["Break your goal into 3 micro-tasks 📋","Set a Pomodoro timer RIGHT NOW ⏱️","Do 10 push-ups to spark energy 💪","Write your WHY in big letters ✍️","Tell one person about your goal today 📣","Visualize success for 2 minutes 🎯"],
  happy:["Share your joy — call a friend 🎁","Write 5 things making you happy 📔","Do something kind for a stranger 🤝","Dance to your favourite song 💃","Plan a celebration, big or small 🎉","Capture this moment in a photo 📸"],
  love:["Write a love letter (send or not) 💌","Plan a surprise for your special one 🌹","Cook their favourite food today 🍲","Say 'I love you' out loud 💕","Create a memory jar together 🫙","Watch your favourite movie together 🎬"],
  calm:["5-min body scan meditation 🧘","Make chamomile tea and sip slowly 🍵","Read 10 pages of a good book 📖","Water your plants with love 🌿","Digital detox for next 2 hours 📵","Draw or doodle freely ✏️"],
  sad:["Drink water — dehydration worsens sadness 💧","Step outside for 5 minutes 🌿","Text someone you trust 💌","Watch a funny video 😂","Cry if you need to — it cleanses 🌊","Hug a pillow or pet 🐾"],
  anxious:["Box breathing: 4-4-4-4 🌊","Name 5 things you can SEE right now 👁️","Splash cold water on your face 💦","Ground yourself: feet flat on floor 🌍","Call a trusted friend for 5 minutes 📞","Write your worry, then tear the paper ✂️"],
  angry:["10 deep breaths FIRST 🌬️","Go for a brisk walk outside 🚶","Write what upset you, then tear it ✂️","Do 20 jumping jacks to release tension 🏃","Drink cold water slowly 💦","Count to 100 slowly 🔢"],
  lonely:["Join an online community 🌐","Volunteer at a local temple/gurudwara 🙌","Write a letter to your future self 📝","Adopt a plant and name it 🌱","Smile at one stranger today 😊","Cook a meal and share 🍛"],
  grateful:["Write 10 gratitudes — push past 3 📝","Call someone and ONLY thank them 📞","Donate something you no longer need 🎁","Look in mirror and appreciate yourself 🪞","Cook a meal and share with family 🍛","Say thank you to 3 people today 🙏"],
  broken:["Journal every feeling — uncensored 📔","Watch your favourite childhood movie 🎬","Cook your comfort food 🍲","Unfollow on all social media 🔕","Plan one thing to look forward to 🌅","Talk to an elder for wisdom 👴"],
  excited:["Channel energy into a written plan 📝","Start that project within 10 minutes 🚀","Create a vision board 🎨","Set a DEADLINE — excitement needs direction 📅","Share excitement with someone 🗣️","Celebrate with a small dance 💃"],
  confused:["Write ALL thoughts on paper 📝","Talk to someone older and wiser 🧓","Sleep on it — clarity comes with rest 😴","Make a pros/cons list 📊","Meditate for 10 minutes 🧘","Flip a coin — notice your gut reaction 🪙"],
  tired:["20-min power nap NOW 😴","Drink water + stretch for 5 minutes 🤸","Step into sunlight for Vitamin D ☀️","Eat something nourishing, not junk 🍎","Say NO to one obligation today 🙅","Gentle yoga for 10 minutes 🧘"],
  hopeful:["Write your vision for 1 year from now 🌅","Take one small step toward your dream TODAY 👣","Make a mood board of ideal life 🎨","Share your hope with someone 🌟","Read one inspiring story 📖","Plant a seed — literally or metaphorically 🌱"],
  proud:["Celebrate yourself — YOU deserve it 🏆","Write all you've achieved this year 📋","Share your win with family 📣","Treat yourself to something special 🎁","Set your next bigger goal 🎯","Tell your story to inspire someone 🌟"],
  spiritual:["Pray or do Ardas for 5 minutes 🙏","Read from Gurbani / Gita / Quran 📖","Light a diya and sit in silence 🪔","Chant your mantra 🕉️","Visit a gurudwara / temple / masjid 🏛️","Donate to someone in need today 💝"],
};

// ═══════════════════════════════════════════════════════════════════
// WEB AUDIO — Ambient music. NO animations on audio nodes.
// ═══════════════════════════════════════════════════════════════════
function startAmbientMusic(audioCtxRef, gainNodeRef, nodesRef, moodId) {
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    if (nodesRef.current) {
      nodesRef.current.forEach((n) => { try { n.stop(); } catch(e){} });
    }
    nodesRef.current = [];
    if (gainNodeRef.current) gainNodeRef.current.disconnect();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 2.5);
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    const moodFreqs = {
      motivated:[396,528,794], happy:[528,660,792], love:[639,480,360],
      calm:[432,324,216], sad:[174,261,348], anxious:[285,213,142],
      angry:[396,528,264], lonely:[285,360,432], grateful:[639,480,960],
      broken:[174,230,290], excited:[528,660,880], confused:[432,345,276],
      tired:[174,220,264], hopeful:[528,396,660], proud:[741,555,926], spiritual:[963,720,480],
    };
    const freqs = moodFreqs[moodId] || [432,528,639];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const panner = ctx.createStereoPanner();
      const filter = ctx.createBiquadFilter();
      osc.type = i === 2 ? "triangle" : "sine";
      osc.frequency.value = freq;
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.value = 0.08 + i * 0.04;
      lfoGain.gain.value = 0.8;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      nodesRef.current.push(lfo);
      filter.type = "lowpass";
      filter.frequency.value = 900;
      oscGain.gain.value = i === 0 ? 0.18 : i === 1 ? 0.12 : 0.08;
      panner.pan.value = (i - 1) * 0.4;
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(panner);
      panner.connect(masterGain);
      osc.start();
      nodesRef.current.push(osc);
    });

    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = noiseBuffer.getChannelData(ch);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      for (let i = 0; i < bufferSize; i++) {
        const w = Math.random()*2-1;
        b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759;
        b2=0.969*b2+w*0.153852; b3=0.8665*b3+w*0.3104856;
        b4=0.55*b4+w*0.5329522; b5=-0.7616*b5-w*0.016898;
        data[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11;
        b6=w*0.115926;
      }
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer; noise.loop = true;
    const noiseGain = ctx.createGain(); noiseGain.gain.value = 0.025;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass"; noiseFilter.frequency.value = 400;
    noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(masterGain);
    noise.start();
    nodesRef.current.push(noise);
    return true;
  } catch(e) { console.error("Audio error:",e); return false; }
}

function stopAmbientMusic(audioCtxRef, gainNodeRef, nodesRef) {
  try {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.8);
      setTimeout(() => {
        if (nodesRef.current) {
          nodesRef.current.forEach((n) => { try { n.stop(); } catch(e){} });
          nodesRef.current = [];
        }
        if (gainNodeRef.current) { gainNodeRef.current.disconnect(); gainNodeRef.current = null; }
      }, 2000);
    }
  } catch(e) {}
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════
export default function SoulApp() {
  const [screen, setScreen] = useState("home");
  const [mood, setMood] = useState(null);
  const [lang, setLang] = useState("en");
  const [tab, setTab] = useState("thought");
  const [thought, setThought] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [activeSong, setActiveSong] = useState(null);
  const [musicOn, setMusicOn] = useState(true);
  const [breatheActive, setBreatheActive] = useState(false);
  const [breathePhase, setBreathePhase] = useState("inhale");
  const [breatheCount, setBreatheCount] = useState(0);
  const [journalText, setJournalText] = useState("");
  const [checkedLifters, setCheckedLifters] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [challengeDone, setChallengeDone] = useState(false);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [themeKey, setThemeKey] = useState("dark");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [thoughtCallCount, setThoughtCallCount] = useState(0);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const nodesRef = useRef([]);
  const breatheTimerRef = useRef(null);

  // Simple in-memory stores
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [streak] = useState(1);
  const [journals, setJournals] = useState([]);
  const [moodLog, setMoodLog] = useState([]);
  const [xp, setXp] = useState(0);

  // CRITICAL: theme always reads from themeKey state
  const theme = THEMES[themeKey];
  const t = UI_TEXT[lang];
  const moodCfg = MOODS.find((m) => m.id === mood);
  const accent = moodCfg?.accent || "#a78bfa";
  const songs = mood ? SONGS[mood] || [] : [];
  const lifters = mood ? LIFTERS[mood] || [] : [];
  const xpLevel = Math.floor(xp / 100) + 1;
  const xpProgress = xp % 100;

  useEffect(() => {
    const challenges = [
      "Smile at 3 strangers today 😊",
      "Drink 8 glasses of water 💧",
      "Write 10 gratitudes 📝",
      "Call a family member ❤️",
      "15 minutes of stretching 🤸",
      "Cook something from scratch 🍳",
      "Read for 20 minutes 📖",
      "No social media for 3 hours 📵",
      "Meditate for 10 minutes 🧘",
      "Write a letter to your future self ✉️",
    ];
    setDailyChallenge(challenges[new Date().getDate() % challenges.length]);
  }, []);

  const showToast = useCallback((msg, icon = "✨") => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const spawnConfetti = () => {
    const items = Array.from({ length: 35 }, (_, i) => ({
      id: i, x: Math.random() * 100, delay: Math.random() * 0.8,
      color: ["#f59e0b","#f43f5e","#06b6d4","#10b981","#e879f9","#facc15","#a78bfa","#fb923c"][Math.floor(Math.random()*8)],
      size: 6 + Math.random() * 10, shape: Math.random() > 0.5 ? "50%" : "2px",
    }));
    setConfetti(items);
    setTimeout(() => setConfetti([]), 3500);
  };

  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
  };

  const getMoodLabel = (m) => {
    if (!m) return "";
    return lang === "hi" ? m.labelHi : lang === "pa" ? m.labelPa : m.label;
  };

  const pickMood = async (moodId) => {
    ensureAudioContext();
    setMood(moodId);
    setScreen("mood");
    setTab("thought");
    setExpanded(false);
    setActiveSong(null);
    setCheckedLifters([]);
    setShowAffirmation(false);
    setMoodLog((prev) => [{ mood: moodId, date: new Date().toISOString() }, ...prev].slice(0, 200));
    setXp((x) => x + 5);
    if (musicOn) {
      setTimeout(() => { startAmbientMusic(audioCtxRef, gainNodeRef, nodesRef, moodId); }, 400);
    }
    await loadNewThought(moodId, lang, 0);
  };

  const loadNewThought = async (moodId = mood, l = lang, callCountOverride = null) => {
    setLoading(true);
    setExpanded(false);
    setShowAffirmation(false);
    const newCount = callCountOverride !== null ? callCountOverride : thoughtCallCount + 1;
    setThoughtCallCount(newCount);
    const th = await fetchAIThought(moodId, l, newCount);
    if (th) {
      setThought(th);
      setHistory((prev) => [{
        id: Date.now(), quote: th.quote, author: th.author, mood: moodId, lang: l,
        fetchedAt: new Date().toISOString(),
      }, ...prev].slice(0, 100));
      setXp((x) => x + 3);
    }
    setLoading(false);
  };

  const toggleMusic = () => {
    ensureAudioContext();
    if (musicOn) {
      stopAmbientMusic(audioCtxRef, gainNodeRef, nodesRef);
      setMusicOn(false);
    } else {
      setMusicOn(true);
      if (mood) startAmbientMusic(audioCtxRef, gainNodeRef, nodesRef, mood);
    }
  };

  const copyThought = () => {
    if (!thought) return;
    navigator.clipboard?.writeText(`"${thought.quote}"\n— ${thought.author}\n\n🌸 Soul App`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast(t.copied, "✅");
  };

  const speak = () => {
    if (!thought) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`${thought.quote}. ${thought.author}. ${thought.explanation}`);
    u.rate = 0.82; u.pitch = 1.05;
    const voices = speechSynthesis.getVoices();
    const indian = voices.find((v) => v.lang.includes("hi") || v.lang.includes("pa") || v.name.includes("India"));
    if (indian) u.voice = indian;
    speechSynthesis.speak(u);
  };

  const toggleFav = () => {
    if (!thought) return;
    const id = `${mood}-${lang}-${thought.quote.slice(0, 20)}`;
    if (favorites.some((f) => f.id === id)) {
      setFavorites((p) => p.filter((f) => f.id !== id));
      showToast("Removed", "💔");
    } else {
      setFavorites((p) => [{ id, quote: thought.quote, author: thought.author, explanation: thought.explanation, mood, lang, savedAt: new Date().toISOString() }, ...p]);
      showToast(t.saved, "💖");
      spawnConfetti();
      setXp((x) => x + 10);
    }
  };

  const isFav = thought ? favorites.some((f) => f.id === `${mood}-${lang}-${thought.quote.slice(0,20)}`) : false;

  const startBreathe = () => {
    setBreatheActive(true); setBreatheCount(0); setBreathePhase("inhale");
    let count = 0, phaseIdx = 0;
    const phases = ["inhale","hold","exhale","hold2"];
    const durations = [4000,4000,4000,4000];
    const cycle = () => {
      setBreathePhase(phases[phaseIdx]);
      breatheTimerRef.current = setTimeout(() => {
        phaseIdx = (phaseIdx + 1) % 4;
        if (phaseIdx === 0) { count++; setBreatheCount(count); }
        if (count < 4) cycle();
        else { setBreatheActive(false); showToast("Calm achieved! 🌊","✅"); setXp((x)=>x+15); spawnConfetti(); }
      }, durations[phaseIdx]);
    };
    cycle();
  };
  const stopBreathe = () => { clearTimeout(breatheTimerRef.current); setBreatheActive(false); };

  const saveJournal = () => {
    if (!journalText.trim()) return;
    setJournals((prev) => [{ id: Date.now(), text: journalText, mood, date: new Date().toISOString() }, ...prev]);
    setJournalText("");
    showToast("Journal saved! 📔","✅");
    spawnConfetti();
    setXp((x)=>x+20);
  };

  const moodCounts = MOODS.reduce((acc, m) => { acc[m.id] = moodLog.filter((l) => l.mood === m.id).length; return acc; }, {});
  const filteredHistory = history.filter((h) =>
    (!searchQuery || h.quote?.toLowerCase().includes(searchQuery.toLowerCase()) || h.author?.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (moodFilter === "all" || h.mood === moodFilter)
  );
  const filteredFavs = favorites.filter((f) => !searchQuery || f.quote?.toLowerCase().includes(searchQuery.toLowerCase()));

  // ─── CSS ───────────────────────────────────────────────────────────
  // CRITICAL: No animation on any content element. Only orbs animate.
  // All CSS is rebuilt with current theme.bg to prevent stale styles.
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body{background:${theme.bg};};font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:99px;}
    .sb-hide::-webkit-scrollbar{display:none;} .sb-hide{-ms-overflow-style:none;scrollbar-width:none;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:none;}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes orbFloat{0%,100%{transform:translateY(0px);}50%{transform:translateY(-16px);}}
    @keyframes orbFloatSlow{0%,100%{transform:translateY(0px) rotate(0deg);}50%{transform:translateY(-24px) rotate(4deg);}}
    @keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
    @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes ripple{0%{transform:scale(1);opacity:0.8;}100%{transform:scale(4);opacity:0;}}
    @keyframes confettiFall{0%{transform:translateY(-10px) rotate(0deg);opacity:1;}100%{transform:translateY(100vh) rotate(720deg);opacity:0;}}
    @keyframes slideIn{from{transform:translateY(100%);}to{transform:translateY(0);}}
    @keyframes popIn{0%{transform:scale(0.5);opacity:0;}70%{transform:scale(1.1);}100%{transform:scale(1);opacity:1;}}
    @keyframes soundBar{0%,100%{height:4px;}50%{height:18px;}}
    /* Only orbs get floating animation — NO content elements */
    .orb-float{animation:orbFloat 5s ease-in-out infinite;}
    .orb-float-slow{animation:orbFloatSlow 8s ease-in-out infinite;}
    .fade-up{animation:fadeUp .45s cubic-bezier(.16,1,.3,1) both;}
    .fade-in{animation:fadeIn .3s ease both;}
    .pop-in{animation:popIn .4s cubic-bezier(.34,1.56,.64,1) both;}
    .slide-in{animation:slideIn .4s cubic-bezier(.16,1,.3,1) both;}
    .playfair{font-family:'Playfair Display',serif;}
    .btn-hover{transition:all .2s cubic-bezier(.34,1.56,.64,1);cursor:pointer;}
    .btn-hover:hover{transform:translateY(-2px) scale(1.04);}
    .btn-hover:active{transform:scale(.96);}
    .mood-card{transition:all .22s cubic-bezier(.34,1.56,.64,1);border:none;cursor:pointer;background:none;}
    .mood-card:hover{transform:translateY(-6px) scale(1.06);}
    .mood-card:active{transform:scale(.95);}
    .tab-btn{transition:all .2s ease;cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif;}
    input,textarea,select{font-family:'Plus Jakarta Sans',sans-serif;}
    .song-row{transition:all .2s ease;}
    .song-row:hover{transform:translateX(5px);}
    .lifter-row{transition:all .2s ease;}
    .lifter-row:hover{transform:translateX(4px);}
    .xp-bar{transition:width 1s cubic-bezier(.16,1,.3,1);}
    .sound-bar{animation:soundBar 0.6s ease-in-out infinite;}
    .theme-option{transition:all .2s ease;cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif;text-align:left;}
    .theme-option:hover{background:rgba(255,255,255,0.08) !important;}
  `;

  const inputStyle = {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: 14,
    padding: "10px 14px 10px 36px",
    color: theme.text,
    fontSize: 13,
    outline: "none",
    width: "100%",
  };

  // ══════════════════════════════════════════════════════════════════
  // HOME SCREEN
  // ══════════════════════════════════════════════════════════════════
  if (screen === "home") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: theme.bg,
          color: theme.text,
          position: "relative",
          overflow: "hidden",
          transition: "background 0.4s ease, color 0.4s ease",
        }}
      >
        <style>{css}</style>

        {confetti.map((c) => (
          <div
            key={c.id}
            style={{
              position: "fixed",
              top: 0,
              left: `${c.x}%`,
              width: c.size,
              height: c.size,
              borderRadius: c.shape,
              background: c.color,
              zIndex: 999,
              pointerEvents: "none",
              animation: `confettiFall ${1.5 + Math.random()}s ${c.delay}s ease-in forwards`,
            }}
          />
        ))}

        {toast && (
          <div
            className="pop-in"
            style={{
              position: "fixed",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 400,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 16,
              background: "rgba(10,10,20,.97)",
              border: `1px solid rgba(255,255,255,.1)`,
              boxShadow: "0 12px 40px rgba(0,0,0,.6)",
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            <span>{toast.icon}</span>
            <span style={{ color: "rgba(255,255,255,.9)" }}>{toast.msg}</span>
          </div>
        )}

        {/* Orbs — ONLY these animate */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            className="orb-float-slow"
            style={{
              position: "absolute",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background: `radial-gradient(circle,${theme.orb1},transparent 70%)`,
              top: -300,
              left: -200,
              filter: "blur(50px)",
            }}
          />
          <div
            className="orb-float"
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: `radial-gradient(circle,${theme.orb2},transparent 70%)`,
              bottom: -200,
              right: -100,
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `radial-gradient(circle,${theme.orb3},transparent 70%)`,
              top: "40%",
              left: "50%",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 960,
            margin: "0 auto",
            padding: "clamp(24px,5vw,60px) clamp(16px,4vw,32px) 80px",
          }}
        >
          {/* Top Bar */}
          <div
            className="fade-up  "
            style={{
              display: "flex",
              alignItems: "center",
              gap:"12px" ,
              justifyContent: "space-between",
              marginBottom: "clamp(32px,5vw,56px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 13,
                  background: "linear-gradient(135deg,#8b5cf6,#f43f5e)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  boxShadow: "0 8px 24px rgba(139,92,246,.4)",
                }}
              >
                🌸
              </div>
              <span
                className="playfair"
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-.02em",
                  color: theme.text,
                }}
              >
                Soul
              </span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {/* THEME PICKER — fully working */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowThemePicker((prev) => !prev)}
                  className="btn-hover max-sm:hidden"
                  style={{
                    padding: "8px 14px",
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 700,
                    border: `1px solid ${theme.border}`,
                    background: theme.surface,
                    color: theme.textMuted,
                    cursor: "pointer",
                  }}
                >
                  🎨 {theme.name}
                </button>
                {showThemePicker && (
                  <div
                    className="pop-in"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      zIndex: 500,
                      background: "rgba(8,8,18,.98)",
                      border: "1px solid rgba(255,255,255,.14)",
                      borderRadius: 20,
                      padding: 14,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      minWidth: 170,
                      boxShadow: "0 24px 64px rgba(0,0,0,.8)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "rgba(255,255,255,.3)",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        marginBottom: 4,
                        paddingLeft: 8,
                      }}
                    >
                      Color Theme
                    </div>
                    {Object.entries(THEMES).map(([key, th]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setThemeKey(key);
                          setShowThemePicker(false);
                          showToast(`Theme: ${th.name}`, "🎨");
                        }}
                        className="theme-option"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "9px 12px",
                          borderRadius: 12,
                          background:
                            themeKey === key
                              ? "rgba(255,255,255,.12)"
                              : "transparent",
                          border: `1px solid ${themeKey === key ? "rgba(255,255,255,.2)" : "transparent"}`,
                          color:
                            themeKey === key ? "#fff" : "rgba(255,255,255,.55)",
                          fontSize: 13,
                          fontWeight: 700,
                          width: "100%",
                        }}
                      >
                        <span style={{ fontSize: 16 }}>
                          {th.name.split(" ")[0]}
                        </span>
                        <span>{th.name.split(" ").slice(1).join(" ")}</span>
                        {themeKey === key && (
                          <span
                            style={{
                              marginLeft: "auto",
                              fontSize: 12,
                              color: "#a78bfa",
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setScreen("journal")}
                className="btn-hover"
                style={{
                  padding: "8px 14px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.textMuted,
                  border: `1px solid ${theme.border}`,
                  background: theme.surface,
                  cursor: "pointer",
                }}
              >
                {t.journal}
              </button>
              <button
                onClick={() => setScreen("stats")}
                className="btn-hover"
                style={{
                  padding: "8px 14px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.textMuted,
                  border: `1px solid ${theme.border}`,
                  background: theme.surface,
                  cursor: "pointer",
                }}
              >
                {t.stats}
              </button>
            </div>
          </div>

          {/* Hero */}
          <div
            className="fade-up "
            style={{
              textAlign: "center",
              marginBottom: "clamp(32px,5vw,56px)",
              animationDelay: ".05s",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 18px",
                borderRadius: 99,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                marginBottom: 20,
                fontSize: 11,
                fontWeight: 700,
                color: theme.textFaint,
                letterSpacing: ".12em",
                textTransform: "uppercase",
              }}
            >
              ✦ Indian Wisdom · {MOODS.length} Moods ✦
            </div>
            <h1
              className="playfair"
              style={{
                fontSize: "clamp(38px,7vw,80px)",
                fontWeight: 900,
                lineHeight: 1.08,
                marginBottom: 16,
                letterSpacing: "-.03em",
              }}
            >
              <span style={{ display: "block", color: theme.text }}>
                {t.tagline.split(" ").slice(0, 3).join(" ")}
              </span>
              <span
                style={{
                  display: "block",
                  background:
                    "linear-gradient(135deg,#f59e0b,#f43f5e,#8b5cf6,#06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% auto",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                {t.tagline.split(" ").slice(3).join(" ")} 🌸
              </span>
            </h1>
            <p
              style={{
                color: theme.textMuted,
                fontSize: "clamp(13px,2vw,16px)",
                maxWidth: 500,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {t.subtitle}
            </p>
          </div>

          {/* Stats Strip */}
          <div
            className="fade-up"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(8px,2vw,16px)",
              marginBottom: "clamp(20px,4vw,36px)",
              flexWrap: "wrap",
              animationDelay: ".1s",
            }}
          >
            {[
              { icon: "🔥", label: t.dayStreak, val: `${streak}d` },
              { icon: "⚡", label: "XP", val: xp },
              { icon: "🏆", label: t.level, val: xpLevel },
              { icon: "📖", label: t.thoughtsRead, val: history.length },
              { icon: "❤️", label: t.savedQuotes, val: favorites.length },
              { icon: "📔", label: t.journals, val: journals.length },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 14,
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  fontSize: 12,
                }}
              >
                <span>{s.icon}</span>
                <span style={{ color: theme.textMuted }}>{s.label}</span>
                <span style={{ fontWeight: 800, color: theme.text }}>
                  {s.val}
                </span>
              </div>
            ))}
          </div>

          {/* XP Bar */}
          <div
            className="fade-up"
            style={{
              maxWidth: 400,
              margin: "0 auto clamp(20px,4vw,36px)",
              animationDelay: ".12s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: theme.textFaint,
                marginBottom: 6,
              }}
            >
              <span>
                {t.levelLabel} {xpLevel} 🏆
              </span>
              <span>
                {xpProgress}/100 {t.xpNext} {xpLevel + 1}
              </span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 99,
                background: theme.surface,
                overflow: "hidden",
              }}
            >
              <div
                className="xp-bar"
                style={{
                  height: "100%",
                  width: `${xpProgress}%`,
                  background: "linear-gradient(90deg,#8b5cf6,#f43f5e)",
                  borderRadius: 99,
                }}
              />
            </div>
          </div>

          {/* Daily Challenge */}
          {dailyChallenge && (
            <div
              className="fade-up"
              style={{
                maxWidth: 520,
                margin: "0 auto clamp(20px,4vw,36px)",
                padding: "16px 20px",
                borderRadius: 20,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                animationDelay: ".14s",
              }}
            >
              <div style={{ fontSize: 26, flexShrink: 0 }}>🎯</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#f59e0b",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    marginBottom: 4,
                  }}
                >
                  {t.dailyChallenge}
                </div>
                <div
                  style={{ fontSize: 13, color: theme.text, lineHeight: 1.4 }}
                >
                  {dailyChallenge}
                </div>
              </div>
              <button
                onClick={() => {
                  if (!challengeDone) {
                    setChallengeDone(true);
                    showToast("+25 XP! 🎉", "🏆");
                    setXp((x) => x + 25);
                    spawnConfetti();
                  }
                }}
                className="btn-hover"
                style={{
                  flexShrink: 0,
                  padding: "8px 14px",
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 800,
                  border: "none",
                  background: challengeDone
                    ? "rgba(16,185,129,.2)"
                    : "rgba(245,158,11,.2)",
                  color: challengeDone ? "#10b981" : "#f59e0b",
                  cursor: challengeDone ? "default" : "pointer",
                }}
              >
                {challengeDone ? t.done : t.complete}
              </button>
            </div>
          )}

          {/* Language Selector */}
          <div
            className="fade-up"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginBottom: "clamp(24px,4vw,40px)",
              animationDelay: ".15s",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: theme.textFaint,
                alignSelf: "center",
              }}
            >
              {t.bhasha}
            </span>
            {[
              { id: "en", label: "EN 🇬🇧" },
              { id: "hi", label: "हिंदी 🇮🇳" },
              { id: "pa", label: "ਪੰਜਾਬੀ 🟡" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className="btn-hover"
                style={{
                  padding: "6px 14px",
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 700,
                  border: `1px solid ${lang === l.id ? "rgba(255,255,255,.25)" : theme.border}`,
                  background:
                    lang === l.id ? "rgba(255,255,255,.1)" : "transparent",
                  color: lang === l.id ? theme.text : theme.textMuted,
                  cursor: "pointer",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Mood Grid */}
          <div
            className="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(clamp(90px,12vw,120px),1fr))",
              gap: "clamp(8px,1.5vw,12px)",
              animationDelay: ".18s",
            }}
          >
            {MOODS.map((m, i) => (
              <button
                key={m.id}
                className="mood-card"
                onClick={() => pickMood(m.id)}
                style={{
                  padding: "clamp(14px,2.5vw,20px) 10px",
                  borderRadius: 22,
                  background: m.bg,
                  border: `1px solid ${m.accent}20`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                  animationDelay: `${i * 35}ms`,
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(24px,4vw,30px)",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,.3))",
                  }}
                >
                  {m.emoji}
                </span>
                <span
                  style={{
                    fontSize: "clamp(9px,1.2vw,11px)",
                    fontWeight: 800,
                    color: m.accent,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    textAlign: "center",
                  }}
                >
                  {getMoodLabel(m)}
                </span>
              </button>
            ))}
          </div>

          {/* Recent Reads */}
          {history.length > 0 && (
            <div
              className="fade-up"
              style={{
                marginTop: "clamp(32px,5vw,56px)",
                animationDelay: ".3s",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: theme.textFaint,
                  textTransform: "uppercase",
                  letterSpacing: ".12em",
                  marginBottom: 14,
                }}
              >
                {t.recentRead}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {history.slice(0, 3).map((h, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setMood(h.mood);
                      setLang(h.lang || "en");
                      setScreen("mood");
                      setTab("thought");
                    }}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      padding: "14px 16px",
                      borderRadius: 16,
                      background: theme.surface,
                      border: `1px solid ${theme.border}`,
                      cursor: "pointer",
                      transition: "background .2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = theme.surfaceStrong)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = theme.surface)
                    }
                  >
                    <span style={{ fontSize: 20, flexShrink: 0 }}>
                      {MOODS.find((m) => m.id === h.mood)?.emoji}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 12,
                          color: theme.textMuted,
                          lineHeight: 1.5,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        "{h.quote}"
                      </p>
                      <p
                        style={{
                          fontSize: 10,
                          color: theme.textFaint,
                          marginTop: 4,
                        }}
                      >
                        — {h.author} ·{" "}
                        {MOODS.find((m) => m.id === h.mood)?.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: 48,
              fontSize: 11,
              color: theme.textFaint,
            }}
          >
            {t.footer}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // JOURNAL SCREEN
  // ══════════════════════════════════════════════════════════════════
  if (screen === "journal") {
    return (
      <div style={{ minHeight:"100vh", background:theme.bg, color:theme.text }}>
        <style>{css}</style>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"clamp(24px,5vw,48px) clamp(16px,4vw,24px) 80px" }}>
          <div className="fade-up" style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
            <button onClick={() => setScreen("home")} className="btn-hover" style={{ padding:"8px 14px", borderRadius:12, fontSize:12, fontWeight:600, color:theme.textMuted, border:`1px solid ${theme.border}`, background:theme.surface, cursor:"pointer" }}>{t.back}</button>
            <h2 className="playfair" style={{ fontSize:28, fontWeight:700, color:theme.text }}>{t.myJournal}</h2>
          </div>
          <div className="fade-up" style={{ padding:24, borderRadius:24, background:theme.surface, border:`1px solid ${theme.border}`, marginBottom:24, animationDelay:".05s" }}>
            <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
              <div style={{ fontSize:13, fontWeight:700, color:theme.textMuted, alignSelf:"center" }}>{t.mood}</div>
              {MOODS.slice(0,8).map((m) => (
                <button key={m.id} onClick={() => setMood(m.id===mood?null:m.id)} className="btn-hover" style={{ padding:"4px 10px", borderRadius:99, fontSize:11, fontWeight:700, border:`1px solid ${mood===m.id?m.accent+"60":theme.border}`, background:mood===m.id?m.bg:"transparent", color:mood===m.id?m.accent:theme.textMuted, cursor:"pointer" }}>
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
            <textarea
              value={journalText} onChange={(e) => setJournalText(e.target.value)}
              placeholder={lang==="hi"?"आज क्या हुआ? दिल की बात लिखो... यहाँ कोई जज नहीं 🌸":lang==="pa"?"ਅੱਜ ਕੀ ਹੋਇਆ? ਦਿਲ ਦੀ ਗੱਲ ਲਿਖੋ... ਇੱਥੇ ਕੋਈ ਜੱਜ ਨਹੀਂ 🌸":"What happened today? Write your heart out... no judgment here 🌸"}
              style={{ width:"100%", minHeight:160, background:"rgba(255,255,255,.04)", border:`1px solid ${theme.border}`, borderRadius:16, padding:"14px 16px", color:theme.text, fontSize:14, lineHeight:1.7, outline:"none", resize:"vertical" }}
              onFocus={(e) => e.target.style.borderColor="rgba(255,255,255,.25)"}
              onBlur={(e) => e.target.style.borderColor=theme.border}
            />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
              <span style={{ fontSize:11, color:theme.textFaint }}>{journalText.length} {t.characters}</span>
              <button onClick={saveJournal} disabled={!journalText.trim()} className="btn-hover" style={{ padding:"10px 22px", borderRadius:14, fontSize:13, fontWeight:700, border:"none", background:journalText.trim()?"linear-gradient(135deg,#8b5cf6,#f43f5e)":theme.surface, color:journalText.trim()?"#fff":theme.textMuted, cursor:journalText.trim()?"pointer":"default", boxShadow:journalText.trim()?"0 8px 24px rgba(139,92,246,.3)":"none" }}>
                {t.saveJournal}
              </button>
            </div>
          </div>
          {journals.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 20px", color:theme.textFaint }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📔</div>
              <p style={{ fontSize:14, fontWeight:600 }}>{t.noJournal}</p>
              <p style={{ fontSize:12, marginTop:6 }}>{t.noJournalSub}</p>
            </div>
          ) : journals.map((j,i) => (
            <div key={j.id} className="fade-up" style={{ padding:20, borderRadius:20, background:theme.surface, border:`1px solid ${theme.border}`, marginBottom:12, animationDelay:`${i*40}ms` }}>
              <div style={{ display:"flex", gap:10, marginBottom:12, alignItems:"center" }}>
                {j.mood && <span style={{ fontSize:18 }}>{MOODS.find((m)=>m.id===j.mood)?.emoji}</span>}
                {j.mood && <span style={{ fontSize:11, fontWeight:700, color:MOODS.find((m)=>m.id===j.mood)?.accent, textTransform:"uppercase" }}>{j.mood}</span>}
                <span style={{ marginLeft:"auto", fontSize:10, color:theme.textFaint }}>{new Date(j.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</span>
                <button onClick={() => { setJournals((p)=>p.filter((x)=>x.id!==j.id)); showToast("Deleted 🗑️","✅"); }} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(239,68,68,.5)", fontSize:13 }}>✕</button>
              </div>
              <p style={{ fontSize:14, color:theme.textMuted, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{j.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // STATS SCREEN
  // ══════════════════════════════════════════════════════════════════
  if (screen === "stats") {
    const topMoods = Object.entries(moodCounts).sort((a,b)=>b[1]-a[1]).slice(0,5).filter((x)=>x[1]>0);
    const totalCheckins = moodLog.length;
    return (
      <div style={{ minHeight:"100vh", background:theme.bg, color:theme.text }}>
        <style>{css}</style>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"clamp(24px,5vw,48px) clamp(16px,4vw,24px) 80px" }}>
          <div className="fade-up" style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
            <button onClick={() => setScreen("home")} className="btn-hover" style={{ padding:"8px 14px", borderRadius:12, fontSize:12, fontWeight:600, color:theme.textMuted, border:`1px solid ${theme.border}`, background:theme.surface, cursor:"pointer" }}>{t.back}</button>
            <h2 className="playfair" style={{ fontSize:28, fontWeight:700, color:theme.text }}>{t.myStats}</h2>
          </div>
          <div className="fade-up" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24, animationDelay:".05s" }}>
            {[
              {icon:"🔥",label:t.dayStreak,val:streak,color:"#f59e0b"},
              {icon:"⚡",label:t.totalXp,val:xp,color:"#8b5cf6"},
              {icon:"🏆",label:t.level,val:xpLevel,color:"#facc15"},
              {icon:"📖",label:t.thoughtsRead,val:history.length,color:"#06b6d4"},
              {icon:"❤️",label:t.savedQuotes,val:favorites.length,color:"#f43f5e"},
              {icon:"📔",label:t.journals,val:journals.length,color:"#10b981"},
              {icon:"🧘",label:t.moodCheckins,val:totalCheckins,color:"#e879f9"},
            ].map((s) => (
              <div key={s.label} style={{ padding:20, borderRadius:20, background:theme.surface, border:`1px solid ${theme.border}`, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:14, background:`${s.color}18`, border:`1px solid ${s.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize:26, fontWeight:800, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:11, color:theme.textMuted, marginTop:2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          {topMoods.length > 0 && (
            <div className="fade-up" style={{ padding:24, borderRadius:24, background:theme.surface, border:`1px solid ${theme.border}`, marginBottom:24, animationDelay:".1s" }}>
              <div style={{ fontSize:13, fontWeight:800, color:theme.textMuted, textTransform:"uppercase", letterSpacing:".1em", marginBottom:18 }}>{t.topMoods}</div>
              {topMoods.map(([id,count]) => {
                const m = MOODS.find((x)=>x.id===id);
                const pct = Math.round((count/totalCheckins)*100);
                return (
                  <div key={id} style={{ marginBottom:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:13, color:theme.text }}>{m?.emoji} {m?.label}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:m?.accent }}>{count}x · {pct}%</span>
                    </div>
                    <div style={{ height:6, borderRadius:99, background:"rgba(255,255,255,.06)", overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${m?.grad?.[0]},${m?.grad?.[1]})`, borderRadius:99, transition:"width 1s ease" }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="fade-up" style={{ padding:24, borderRadius:24, background:theme.surface, border:`1px solid ${theme.border}`, animationDelay:".15s" }}>
            <div style={{ fontSize:13, fontWeight:800, color:theme.textMuted, textTransform:"uppercase", letterSpacing:".1em", marginBottom:16 }}>{t.recentLog}</div>
            {moodLog.length === 0 ? (
              <p style={{ fontSize:13, color:theme.textFaint }}>{t.noLog}</p>
            ) : (
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {moodLog.slice(0,30).map((l,i) => {
                  const m = MOODS.find((x)=>x.id===l.mood);
                  return (
                    <div key={i} title={`${m?.label} · ${new Date(l.date).toLocaleDateString()}`} style={{ width:36, height:36, borderRadius:10, background:m?.bg, border:`1px solid ${m?.accent}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                      {m?.emoji}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // MOOD DETAIL SCREEN
  // ══════════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight:"100vh", background:theme.bg, color:theme.text, position:"relative", overflow:"hidden" }}>
      <style>{css}</style>

      {confetti.map((c) => (
        <div key={c.id} style={{ position:"fixed", top:0, left:`${c.x}%`, width:c.size, height:c.size, borderRadius:c.shape, background:c.color, zIndex:999, animation:`confettiFall ${1.5+Math.random()}s ${c.delay}s ease-in forwards`, pointerEvents:"none" }}/>
      ))}

      {toast && (
        <div className="pop-in" style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", zIndex:300, display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:16, background:"rgba(10,10,20,.97)", border:`1px solid ${accent}40`, boxShadow:"0 12px 40px rgba(0,0,0,.6)", fontSize:13, fontWeight:700, whiteSpace:"nowrap" }}>
          <span>{toast.icon}</span>
          <span style={{ color:"rgba(255,255,255,.9)" }}>{toast.msg}</span>
        </div>
      )}

      {/* Share Modal */}
      {shareOpen && thought && (
        <div className="fade-in" style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center", padding:16, background:"rgba(0,0,0,.85)" }} onClick={() => setShareOpen(false)}>
          <div className="slide-in" style={{ background:"#111122", border:`1px solid ${accent}25`, borderRadius:28, padding:24, width:"100%", maxWidth:420 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <span style={{ fontWeight:800, fontSize:16 }}>{t.share} 🌸</span>
              <button onClick={() => setShareOpen(false)} style={{ width:32, height:32, borderRadius:10, background:"rgba(255,255,255,.06)", border:"none", cursor:"pointer", color:"rgba(255,255,255,.5)", fontSize:16 }}>✕</button>
            </div>
            <div style={{ borderLeft:`3px solid ${accent}`, paddingLeft:14, marginBottom:20, fontSize:13, color:"rgba(255,255,255,.6)", fontStyle:"italic", lineHeight:1.7 }}>
              "{thought.quote.slice(0,100)}..."<br/>
              <span style={{ fontSize:11, color:accent }}>— {thought.author}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { label:"🐦 Twitter/X", color:"#1d9bf0", fn:()=>window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${thought.quote}" — ${thought.author} 🌸`)}`) },
                { label:"💬 WhatsApp", color:"#25d366", fn:()=>window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`"${thought.quote}"\n— ${thought.author}\n\n🌸 Soul App`)}`) },
                { label:copied?"✅ Copied!":"📋 Copy", color:accent, fn:copyThought },
                { label:"🔊 Listen", color:"#10b981", fn:()=>{ speak(); setShareOpen(false); } },
              ].map((b) => (
                <button key={b.label} onClick={b.fn} className="btn-hover" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:12, borderRadius:16, background:`${b.color}12`, border:`1px solid ${b.color}25`, fontSize:12, fontWeight:700, cursor:"pointer", color:b.color }}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ambient orbs ONLY */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        <div className="orb-float" style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:`radial-gradient(circle,${accent}14,transparent 70%)`, top:-300, left:-200, filter:"blur(40px)" }}/>
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,${accent}07,transparent 70%)`, bottom:-100, right:-100, filter:"blur(30px)" }}/>
      </div>

      <div style={{ position:"relative", zIndex:10, maxWidth:720, margin:"0 auto", padding:"clamp(16px,3vw,28px) clamp(14px,3vw,24px) 80px" }}>

        {/* Top Bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <button onClick={() => { setScreen("home"); setMood(null); stopAmbientMusic(audioCtxRef,gainNodeRef,nodesRef); setActiveSong(null); }} className="btn-hover" style={{ padding:"8px 14px", borderRadius:12, fontSize:12, fontWeight:700, color:theme.textMuted, border:`1px solid ${theme.border}`, background:theme.surface, cursor:"pointer" }}>← Moods</button>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            {[{id:"en",label:"EN"},{id:"hi",label:"हिं"},{id:"pa",label:"ਪੰਜ"}].map((l) => (
              <button key={l.id} onClick={() => { setLang(l.id); loadNewThought(mood,l.id); }} className="btn-hover" style={{ padding:"5px 10px", borderRadius:99, fontSize:11, fontWeight:800, border:`1px solid ${lang===l.id?accent+"50":theme.border}`, background:lang===l.id?`${accent}18`:"transparent", color:lang===l.id?accent:theme.textMuted, cursor:"pointer" }}>
                {l.label}
              </button>
            ))}
            <button onClick={toggleMusic} className="btn-hover" style={{ width:34, height:34, borderRadius:11, background:theme.surface, border:`1px solid ${musicOn?accent+"40":theme.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:musicOn?accent:theme.textMuted }}>
              {musicOn?"🎵":"🔇"}
            </button>
          </div>
        </div>

        {/* Mood Badge — NO animation class */}
        <div className="fade-in" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
          <div style={{ width:52, height:52, borderRadius:16, background:`linear-gradient(135deg,${moodCfg.grad[0]},${moodCfg.grad[1]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0, boxShadow:`0 12px 32px ${accent}35` }}>
            {moodCfg.emoji}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:22, fontWeight:800, lineHeight:1.1, color:theme.text }}>{getMoodLabel(moodCfg)}</div>
          </div>
          <div style={{ fontSize:11, color:theme.textFaint, display:"flex", gap:10 }}>
            <span>🔥{streak}d</span><span>⚡{xp}xp</span>
          </div>
        </div>

        {/* Music indicator — static, no vibration */}
        {musicOn && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, padding:"8px 14px", borderRadius:12, background:`${accent}10`, border:`1px solid ${accent}20`, width:"fit-content" }}>
            <div style={{ display:"flex", gap:2, alignItems:"center" }}>
              {[1,2,3,4].map((b) => (
                <div key={b} className="sound-bar" style={{ width:3, borderRadius:99, background:accent, animationDelay:`${b*0.15}s`, height:4 }}/>
              ))}
            </div>
            <span style={{ fontSize:11, fontWeight:700, color:accent }}>{t.musicOn}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="sb-hide" style={{ display:"flex", gap:4, padding:4, borderRadius:18, background:theme.surface, border:`1px solid ${theme.border}`, marginBottom:20, overflowX:"auto" }}>
          {Object.entries(t.tabs).map(([id,label]) => (
            <button key={id} className="tab-btn" onClick={() => setTab(id)} style={{ padding:"9px 14px", borderRadius:14, fontSize:12, fontWeight:800, whiteSpace:"nowrap", flexShrink:0, background:tab===id?`linear-gradient(135deg,${accent}28,${accent}12)`:"transparent", border:`1px solid ${tab===id?accent+"40":"transparent"}`, color:tab===id?accent:theme.textMuted }}>
              {label}
            </button>
          ))}
        </div>

        {/* ═══ THOUGHT TAB ══════════════════════════════════════════ */}
        {tab === "thought" && (
          <div>
            {loading ? (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, gap:16 }}>
                <div style={{ width:50, height:50, borderRadius:"50%", border:`3px solid ${accent}30`, borderTopColor:accent, animation:"spin 1s linear infinite" }}/>
                <p style={{ color:theme.textMuted, fontSize:14 }}>{t.aiThinking}</p>
              </div>
            ) : thought ? (
              <div className="fade-up">
                <div style={{ borderRadius:28, overflow:"hidden", border:`1px solid ${accent}18`, boxShadow:`0 0 80px ${accent}08,0 30px 80px rgba(0,0,0,.5)`, marginBottom:16 }}>
                  <div style={{ height:4, background:`linear-gradient(90deg,${moodCfg.grad[0]},${moodCfg.grad[1]})` }}/>
                  <div style={{ padding:"clamp(20px,4vw,34px)", background:"linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.02))" }}>
                    <div className="playfair" style={{ fontSize:100, lineHeight:0.5, color:accent, opacity:0.1, userSelect:"none", marginBottom:10 }}>"</div>
                    <p className="playfair" style={{ fontSize:"clamp(18px,3.5vw,26px)", fontStyle:"italic", lineHeight:1.6, color:theme.text, marginBottom:22, letterSpacing:".01em" }}>{thought.quote}</p>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                      <div>
                        <p style={{ fontSize:15, fontWeight:800, color:accent }}>— {thought.author}</p>
                        <p style={{ fontSize:10, color:theme.textFaint, marginTop:3 }}>{moodCfg.emoji} {lang.toUpperCase()} · {thought.quote.length} chars</p>
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <button onClick={() => setShowAffirmation((x)=>!x)} className="btn-hover" style={{ padding:"6px 12px", borderRadius:99, fontSize:11, fontWeight:700, border:`1px solid ${accent}35`, background:`${accent}15`, color:accent, cursor:"pointer" }}>{t.affirmation}</button>
                        <button onClick={() => setExpanded((e)=>!e)} className="btn-hover" style={{ padding:"6px 12px", borderRadius:99, fontSize:11, fontWeight:700, border:`1px solid ${accent}35`, background:`${accent}15`, color:accent, cursor:"pointer" }}>📖 {expanded?t.hide:t.explain}</button>
                      </div>
                    </div>
                    {showAffirmation && thought.affirmation && (
                      <div className="pop-in" style={{ marginTop:18, padding:18, borderRadius:20, background:`${accent}12`, border:`1px solid ${accent}25`, textAlign:"center" }}>
                        <p style={{ fontSize:11, fontWeight:800, color:accent, textTransform:"uppercase", letterSpacing:".1em", marginBottom:8 }}>{t.todayAffirmation}</p>
                        <p className="playfair" style={{ fontSize:"clamp(16px,3vw,22px)", fontStyle:"italic", color:theme.text, lineHeight:1.5 }}>"{thought.affirmation}"</p>
                      </div>
                    )}
                    {expanded && (
                      <div className="fade-up" style={{ marginTop:18, padding:18, borderRadius:20, background:`${accent}10`, border:`1px solid ${accent}18` }}>
                        <p style={{ fontSize:11, fontWeight:800, color:accent, textTransform:"uppercase", letterSpacing:".1em", marginBottom:10 }}>{t.explanation}</p>
                        <p style={{ fontSize:14, color:theme.textMuted, lineHeight:1.8 }}>{thought.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                  <button onClick={() => loadNewThought()} className="btn-hover" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"clamp(12px,2vw,16px)", borderRadius:18, fontSize:13, fontWeight:800, border:"none", background:`linear-gradient(135deg,${accent},${accent}bb)`, color:"#fff", boxShadow:`0 10px 30px ${accent}30`, cursor:"pointer" }}>
                    {t.newThought}
                  </button>
                  <button onClick={toggleFav} className="btn-hover" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"clamp(12px,2vw,16px)", borderRadius:18, fontSize:13, fontWeight:800, border:`1px solid ${isFav?"#fb7185":"rgba(255,255,255,.12)"}`, background:isFav?"rgba(251,113,133,.18)":theme.surface, color:isFav?"#fb7185":theme.textMuted, cursor:"pointer" }}>
                    {isFav?t.saved:t.save}
                  </button>
                  <button onClick={copyThought} className="btn-hover" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"clamp(12px,2vw,16px)", borderRadius:18, fontSize:13, fontWeight:800, border:`1px solid ${theme.border}`, background:theme.surface, color:theme.textMuted, cursor:"pointer" }}>
                    {copied?t.copied:t.copy}
                  </button>
                  <button onClick={() => setShareOpen(true)} className="btn-hover" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"clamp(12px,2vw,16px)", borderRadius:18, fontSize:13, fontWeight:800, border:`1px solid ${theme.border}`, background:theme.surface, color:theme.textMuted, cursor:"pointer" }}>
                    {t.share}
                  </button>
                  <button onClick={speak} className="btn-hover" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"clamp(12px,2vw,16px)", borderRadius:18, fontSize:13, fontWeight:800, border:`1px solid ${theme.border}`, background:theme.surface, color:theme.textMuted, gridColumn:"span 2", cursor:"pointer" }}>
                    {t.listen}
                  </button>
                </div>
                <div style={{ padding:18, borderRadius:20, background:`${accent}08`, border:`1px solid ${accent}15`, display:"flex", alignItems:"center", gap:14 }}>
                  <span style={{ fontSize:24 }}>📔</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:theme.textMuted, marginBottom:3 }}>{t.journalPrompt}</p>
                    <p style={{ fontSize:11, color:theme.textFaint }}>{t.journalSub}</p>
                  </div>
                  <button onClick={() => setScreen("journal")} className="btn-hover" style={{ padding:"8px 14px", borderRadius:12, fontSize:12, fontWeight:700, border:`1px solid ${accent}30`, background:`${accent}15`, color:accent, cursor:"pointer" }}>{t.writeBtn}</button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ═══ SONGS TAB — YouTube embeds working ════════════════════ */}
        {tab === "songs" && (
          <div className="fade-up">
            <div style={{ padding:16, borderRadius:20, background:`${accent}0c`, border:`1px solid ${accent}18`, marginBottom:16 }}>
              <p style={{ fontSize:12, fontWeight:800, color:accent, marginBottom:4 }}>{t.songIntro} — {getMoodLabel(moodCfg)} Mood</p>
              <p style={{ fontSize:12, color:theme.textMuted, lineHeight:1.5 }}>{t.songSub}</p>
            </div>

            {/* YouTube embed — plays in same page */}
            {activeSong && (
              <div className="fade-up" style={{ borderRadius:24, overflow:"hidden", marginBottom:16, border:`1px solid ${accent}30`, boxShadow:`0 0 40px ${accent}15` }}>
                <iframe
                  key={activeSong.yt}
                  src={`https://www.youtube-nocookie.com/embed/${activeSong.yt}?autoplay=1&rel=0&modestbranding=1&color=white&iv_load_policy=3`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  style={{ width:"100%", height:"clamp(200px,40vw,280px)", border:"none", display:"block" }}
                  title={activeSong.title}
                />
                <div style={{ padding:"14px 18px", background:"rgba(255,255,255,.04)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <p style={{ fontSize:14, fontWeight:800, color:theme.text }}>{activeSong.title}</p>
                    <p style={{ fontSize:12, color:accent }}>♪ {activeSong.artist}</p>
                    <p style={{ fontSize:11, color:theme.textFaint, fontStyle:"italic", marginTop:2 }}>{activeSong.vibe}</p>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ display:"flex", gap:3, alignItems:"flex-end" }}>
                      {[1,2,3,4].map((b) => (
                        <div key={b} className="sound-bar" style={{ width:3, borderRadius:99, background:accent, animationDelay:`${b*0.12}s`, minHeight:4, height:4 }}/>
                      ))}
                    </div>
                    <button onClick={() => setActiveSong(null)} style={{ padding:"6px 12px", borderRadius:10, fontSize:11, fontWeight:700, background:"rgba(239,68,68,.12)", border:"1px solid rgba(239,68,68,.2)", color:"#f87171", cursor:"pointer" }}>
                      {t.stopSong}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {songs.map((s,i) => (
                <button key={i} onClick={() => { setActiveSong(activeSong?.yt===s.yt?null:s); if(activeSong?.yt!==s.yt) showToast(`${t.nowPlaying}: ${s.title} 🎵`,"🎶"); }} className="song-row btn-hover" style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px", borderRadius:20, background:activeSong?.yt===s.yt?`${accent}14`:theme.surface, border:`1px solid ${activeSong?.yt===s.yt?accent+"45":theme.border}`, cursor:"pointer", textAlign:"left", animationDelay:`${i*50}ms` }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:`linear-gradient(135deg,${accent}40,${accent}20)`, border:`1px solid ${accent}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
                    {activeSong?.yt===s.yt?"▶":"▷"}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontWeight:800, fontSize:14, color:theme.text, marginBottom:2 }}>{s.title}</p>
                    <p style={{ fontSize:12, color:accent, marginBottom:3 }}>{s.artist}</p>
                    <p style={{ fontSize:11, color:theme.textFaint, fontStyle:"italic" }}>{s.vibe}</p>
                  </div>
                  {activeSong?.yt===s.yt && (
                    <div style={{ display:"flex", gap:3, alignItems:"flex-end" }}>
                      {[1,2,3,4].map((b) => (
                        <div key={b} className="sound-bar" style={{ width:3, borderRadius:99, background:accent, animationDelay:`${b*0.12}s`, minHeight:4, height:4 }}/>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ LIFT TAB ══════════════════════════════════════════════ */}
        {tab === "lifter" && (
          <div className="fade-up">
            <div style={{ padding:16, borderRadius:20, background:`${accent}0c`, border:`1px solid ${accent}18`, marginBottom:16 }}>
              <p style={{ fontSize:12, fontWeight:800, color:accent, marginBottom:4 }}>{t.moodLifters} — {getMoodLabel(moodCfg)}</p>
              <p style={{ fontSize:12, color:theme.textMuted, lineHeight:1.5 }}>{t.checkOff}</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {lifters.map((l,i) => {
                const done = checkedLifters.includes(i);
                return (
                  <button key={i} onClick={() => { setCheckedLifters((prev)=>done?prev.filter((x)=>x!==i):[...prev,i]); if(!done){showToast("+2 XP! ✅","⚡"); setXp((x)=>x+2); if(checkedLifters.length+1===lifters.length)spawnConfetti();} }} className="lifter-row btn-hover" style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px", borderRadius:18, background:done?`${accent}12`:theme.surface, border:`1px solid ${done?accent+"40":theme.border}`, cursor:"pointer", textAlign:"left" }}>
                    <div style={{ width:30, height:30, borderRadius:10, background:done?`${accent}30`:"rgba(255,255,255,.06)", border:`1px solid ${done?accent+"50":"rgba(255,255,255,.12)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:done?accent:"rgba(255,255,255,.3)", flexShrink:0, transition:"all .3s" }}>
                      {done?"✓":i+1}
                    </div>
                    <span style={{ fontSize:14, color:done?"rgba(255,255,255,.5)":theme.textMuted, lineHeight:1.4, textDecoration:done?"line-through":"none", flex:1 }}>{l}</span>
                  </button>
                );
              })}
            </div>
            {checkedLifters.length===lifters.length && lifters.length>0 && (
              <div className="pop-in" style={{ padding:24, borderRadius:24, background:`${accent}15`, border:`1px solid ${accent}35`, textAlign:"center" }}>
                <div style={{ fontSize:48, marginBottom:8 }}>🎉</div>
                <p className="playfair" style={{ fontSize:22, fontWeight:700, color:accent, marginBottom:6 }}>{t.allDone}</p>
                <p style={{ fontSize:13, color:theme.textMuted }}>{t.allDoneSub}</p>
              </div>
            )}
          </div>
        )}

        {/* ═══ BREATHING TAB ═════════════════════════════════════════ */}
        {tab === "breathe" && (
          <div className="fade-up" style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ padding:16, borderRadius:20, background:`${accent}0c`, border:`1px solid ${accent}18`, marginBottom:28, width:"100%" }}>
              <p style={{ fontSize:12, fontWeight:800, color:accent, marginBottom:4 }}>{t.boxBreathing}</p>
              <p style={{ fontSize:12, color:theme.textMuted, lineHeight:1.5 }}>{t.boxSub}</p>
            </div>
            <div style={{ position:"relative", width:220, height:220, marginBottom:28 }}>
              {breatheActive && (
                <>
                  <div style={{ position:"absolute", inset:-20, borderRadius:"50%", border:`2px solid ${accent}`, animation:"ripple 2s ease-out infinite", opacity:0 }}/>
                  <div style={{ position:"absolute", inset:-40, borderRadius:"50%", border:`2px solid ${accent}`, animation:"ripple 2s 0.6s ease-out infinite", opacity:0 }}/>
                </>
              )}
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:`radial-gradient(circle,${accent}30,${accent}10)`, border:`3px solid ${accent}50`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", transition:"transform 4s ease-in-out, box-shadow 4s ease-in-out", transform:breatheActive&&(breathePhase==="inhale"||breathePhase==="hold")?"scale(1.45)":"scale(1)", boxShadow:breatheActive?`0 0 60px ${accent}50,0 0 120px ${accent}25`:`0 0 20px ${accent}25`, fontSize:40 }}>
                🌬️
                {breatheActive && (
                  <div style={{ position:"absolute", bottom:28, fontSize:11, fontWeight:800, color:accent, textAlign:"center", lineHeight:1.4 }}>
                    {breathePhase==="inhale"?t.inhale:breathePhase==="hold"?t.hold:breathePhase==="exhale"?t.exhale:t.wait}
                  </div>
                )}
              </div>
            </div>
            {breatheActive && (
              <div style={{ marginBottom:20, display:"flex", gap:8 }}>
                {[0,1,2,3].map((i) => (
                  <div key={i} style={{ width:36, height:36, borderRadius:"50%", background:i<breatheCount?`${accent}40`:"rgba(255,255,255,.06)", border:`2px solid ${i<breatheCount?accent:"rgba(255,255,255,.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:i<breatheCount?accent:"rgba(255,255,255,.3)" }}>
                    {i<breatheCount?"✓":i+1}
                  </div>
                ))}
              </div>
            )}
            <button onClick={breatheActive?stopBreathe:startBreathe} className="btn-hover" style={{ padding:"14px 36px", borderRadius:99, fontSize:15, fontWeight:800, border:"none", background:breatheActive?"rgba(239,68,68,.2)":`linear-gradient(135deg,${accent},${accent}bb)`, color:breatheActive?"#f87171":"#fff", cursor:"pointer", boxShadow:breatheActive?"none":`0 12px 36px ${accent}30`, marginBottom:24 }}>
              {breatheActive?t.stopBreathe:t.startBreathe}
            </button>
          </div>
        )}

        {/* ═══ FAVORITES TAB ═════════════════════════════════════════ */}
        {tab === "fav" && (
          <div className="fade-up">
            <div style={{ display:"flex", gap:10, marginBottom:16 }}>
              <div style={{ position:"relative", flex:1 }}>
                <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:13, color:theme.textFaint }}>🔍</span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchSaved} style={{ ...inputStyle }} />
              </div>
              {favorites.length>0 && (
                <button onClick={() => { setFavorites([]); showToast(t.clearAll,"🗑️"); }} style={{ padding:"8px 14px", borderRadius:14, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", color:"#f87171", fontSize:11, fontWeight:800, cursor:"pointer" }}>
                  {t.clearAll}
                </button>
              )}
            </div>
            {filteredFavs.length===0 ? (
              <div style={{ textAlign:"center", padding:"60px 20px", color:theme.textFaint }}>
                <div style={{ fontSize:48, marginBottom:12 }}>❤️</div>
                <p style={{ fontWeight:700, fontSize:14, marginBottom:6 }}>{t.noSaved}</p>
                <p style={{ fontSize:12 }}>{t.noSavedSub}</p>
              </div>
            ) : filteredFavs.map((f,i) => {
              const m = MOODS.find((x)=>x.id===f.mood);
              return (
                <div key={i} className="fade-up" style={{ padding:20, borderRadius:22, background:theme.surface, border:`1px solid ${theme.border}`, marginBottom:12, animationDelay:`${i*40}ms` }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
                    <span style={{ fontSize:18 }}>{m?.emoji}</span>
                    <span style={{ fontSize:11, fontWeight:800, color:m?.accent, textTransform:"uppercase" }}>{f.mood}</span>
                    <span style={{ marginLeft:"auto", fontSize:10, color:theme.textFaint }}>{f.lang?.toUpperCase()} · {new Date(f.savedAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  <p className="playfair" style={{ fontSize:16, fontStyle:"italic", color:theme.text, lineHeight:1.7, marginBottom:10 }}>"{f.quote}"</p>
                  <p style={{ fontSize:13, fontWeight:700, color:m?.accent, marginBottom:8 }}>— {f.author}</p>
                  {f.explanation && <p style={{ fontSize:12, color:theme.textFaint, lineHeight:1.7, borderLeft:`2px solid ${m?.accent}40`, paddingLeft:10, marginBottom:12 }}>{f.explanation}</p>}
                  <button onClick={() => { setFavorites((p)=>p.filter((_,j)=>j!==i)); showToast("Removed","💔"); }} style={{ fontSize:11, color:"rgba(239,68,68,.6)", background:"none", border:"none", cursor:"pointer" }}>💔 Remove</button>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ HISTORY TAB ════════════════════════════════════════════ */}
        {tab === "history" && (
          <div className="fade-up">
            <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
              <div style={{ position:"relative", flex:1, minWidth:160 }}>
                <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:13, color:theme.textFaint }}>🔍</span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchHistory} style={{ ...inputStyle }}/>
              </div>
              <select value={moodFilter} onChange={(e) => setMoodFilter(e.target.value)} style={{ padding:"10px 14px", borderRadius:14, background:theme.surface, border:`1px solid ${theme.border}`, color:theme.text, fontSize:12, outline:"none" }}>
                <option value="all">{t.allMoods}</option>
                {MOODS.map((m) => <option key={m.id} value={m.id}>{m.emoji} {m.label}</option>)}
              </select>
              {history.length>0 && (
                <button onClick={() => { setHistory([]); showToast(t.clearAll,"🗑️"); }} style={{ padding:"8px 14px", borderRadius:14, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", color:"#f87171", fontSize:11, fontWeight:800, cursor:"pointer" }}>
                  {t.clearAll}
                </button>
              )}
            </div>
            {filteredHistory.length===0 ? (
              <div style={{ textAlign:"center", padding:"60px 20px", color:theme.textFaint }}>
                <div style={{ fontSize:48, marginBottom:12 }}>📖</div>
                <p style={{ fontWeight:700, fontSize:14 }}>{t.noHistory}</p>
              </div>
            ) : filteredHistory.map((h,i) => {
              const m = MOODS.find((x)=>x.id===h.mood);
              return (
                <div key={i} className="fade-up" style={{ display:"flex", gap:12, padding:"14px 16px", borderRadius:18, background:theme.surface, border:`1px solid ${theme.border}`, marginBottom:8, animationDelay:`${i*30}ms` }}>
                  <span style={{ fontSize:18, flexShrink:0, marginTop:2 }}>{m?.emoji}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, color:theme.textMuted, lineHeight:1.6, marginBottom:4 }}>"{h.quote}"</p>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, color:m?.accent, fontWeight:700 }}>— {h.author}</span>
                      <span style={{ fontSize:10, color:theme.textFaint }}>{m?.label} · {h.lang?.toUpperCase()}</span>
                      <span style={{ fontSize:10, color:theme.textFaint }}>{new Date(h.fetchedAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign:"center", marginTop:40, fontSize:11, color:theme.textFaint }}>{t.footer}</div>
      </div>
    </div>
  );
}