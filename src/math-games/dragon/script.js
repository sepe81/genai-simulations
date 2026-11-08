'use strict';

// =====================================================================
// Configuration: shared game rules
// =====================================================================

const STORAGE_KEY = 'einmaleins-abenteuer-v2';
const LEGACY_KEY = 'drachen-einmaleins-v1';
const ROUND_LENGTH = 10;
const BOSS_LENGTH = 15;
const FAST_MS = 4000;
const TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RECOMMENDED_ORDER = [1, 2, 10, 5, 4, 3, 6, 9, 8, 7];
const GEM_STEPS = [0, 40, 120, 260, 450];
const STICKER_IDS = ['hatched', 'firstWin', 'perfect', 'combo5', 'combo10', 'flash', 'practice', 'boss', 'grow', 'hundred', 'explorer', 'allStars', 'legend'];
const DEFAULT_LOOKS = { dragon: 'green', magic: 'midnight' };

// =====================================================================
// Skin: dragon adventure (younger kids)
// =====================================================================

const DRAGON_WORLDS = [
    { name: 'Blumenwiese', sky: ['#60a5fa', '#bfdbfe'], hills: ['#a7f3d0', '#6ee7b7', '#34d399'], deco: 'flower', ambient: 'petal', ambientColor: '#fbcfe8',
        monster: { name: 'Blubbo', color: '#f472b6', eyes: 2, antenna: true } },
    { name: 'Pilzwald', sky: ['#38bdf8', '#d9f99d'], hills: ['#86efac', '#22c55e', '#15803d'], deco: 'mushroom', ambient: 'leaf', ambientColor: '#facc15',
        monster: { name: 'Krümel', color: '#fb923c', eyes: 1, horns: true } },
    { name: 'Sonnenstrand', sky: ['#0ea5e9', '#fef3c7'], hills: ['#67e8f9', '#22d3ee', '#fcd34d'], deco: 'palm', ambient: 'bubble', ambientColor: '#e0f2fe',
        monster: { name: 'Glibber', color: '#14b8a6', eyes: 3, teeth: true } },
    { name: 'Wüstenoase', sky: ['#f59e0b', '#fef3c7'], hills: ['#fde68a', '#fbbf24', '#d97706'], deco: 'cactus', ambient: 'sand', ambientColor: '#fef3c7',
        monster: { name: 'Zottel', color: '#8b5cf6', eyes: 2, horns: true, teeth: true } },
    { name: 'Zuckerberge', sky: ['#f9a8d4', '#fdf2f8'], hills: ['#fbcfe8', '#f9a8d4', '#ec4899'], deco: 'lolly', ambient: 'sparkle', ambientColor: '#ffffff',
        monster: { name: 'Schlecki', color: '#06b6d4', eyes: 2, antenna: true, spikes: true } },
    { name: 'Gletscher', sky: ['#7dd3fc', '#f0f9ff'], hills: ['#e0f2fe', '#bae6fd', '#f8fafc'], deco: 'crystal', ambient: 'snow', ambientColor: '#ffffff',
        monster: { name: 'Brrrumm', color: '#6366f1', eyes: 1, spikes: true, teeth: true } },
    { name: 'Vulkaninsel', sky: ['#7c2d12', '#fb923c'], hills: ['#78716c', '#57534e', '#292524'], deco: 'rock', ambient: 'ember', ambientColor: '#fb923c',
        monster: { name: 'Magmo', color: '#facc15', eyes: 3, horns: true, spikes: true } },
    { name: 'Nebelsumpf', sky: ['#134e4a', '#5eead4'], hills: ['#115e59', '#0f766e', '#064e3b'], deco: 'tree', ambient: 'firefly', ambientColor: '#fef08a', night: true,
        monster: { name: 'Quaxi', color: '#a3e635', eyes: 2, teeth: true, antenna: true } },
    { name: 'Kristallhöhle', sky: ['#312e81', '#7c3aed'], hills: ['#4c1d95', '#5b21b6', '#3b0764'], deco: 'crystal', ambient: 'sparkle', ambientColor: '#f0abfc', night: true,
        monster: { name: 'Glitzer', color: '#38bdf8', eyes: 3, spikes: true, horns: true } },
    { name: 'Sternenhimmel', sky: ['#020617', '#312e81'], hills: ['#334155', '#1e293b', '#475569'], deco: 'rock', ambient: 'star', ambientColor: '#ffffff', night: true,
        monster: { name: 'Zorg', color: '#fb7185', eyes: 1, antenna: true, teeth: true, horns: true } },
];

const DRAGON_LOOKS = [
    { id: 'green', name: 'Wiesengrün', minStars: 0, body: '#4ade80', dark: '#166534', belly: '#fef08a', wing: '#22c55e' },
    { id: 'blue', name: 'Ozeanblau', minStars: 3, body: '#60a5fa', dark: '#1e3a8a', belly: '#bae6fd', wing: '#3b82f6' },
    { id: 'purple', name: 'Zauberlila', minStars: 6, body: '#c084fc', dark: '#581c87', belly: '#fbcfe8', wing: '#a855f7' },
    { id: 'red', name: 'Feuerrot', minStars: 10, body: '#f87171', dark: '#7f1d1d', belly: '#fde68a', wing: '#ef4444' },
    { id: 'gold', name: 'Sonnengold', minStars: 16, body: '#fbbf24', dark: '#78350f', belly: '#fef3c7', wing: '#f59e0b' },
    { id: 'night', name: 'Nachtschwarz', minStars: 21, body: '#475569', dark: '#0f172a', belly: '#a5f3fc', wing: '#1e293b' },
    { id: 'rainbow', name: 'Regenbogen', minStars: 26, animated: true, body: '#f472b6' },
];

// =====================================================================
// Skin: magic academy (older kids)
// =====================================================================

const MAGIC_WORLDS = [
    { name: 'Torhof', sky: ['#1e1b4b', '#6d28d9'], hills: ['#2a2342', '#1c1730', '#2b2540'], deco: 'lantern', ambient: 'candle', ambientColor: '#fde68a', night: true, castle: '#0d0a1c', fog: '#a78bfa',
        monster: { kind: 'specter', name: 'Schattenwisp', color: '#4b5563', glow: '#a5f3fc' } },
    { name: 'Gewächshäuser', sky: ['#052e2b', '#2f855a'], hills: ['#14352a', '#0f2a20', '#173a2c'], deco: 'glowshroom', ambient: 'firefly', ambientColor: '#bef264', night: true, castle: '#04140f', fog: '#86efac',
        monster: { kind: 'specter', name: 'Rankenmahr', color: '#14532d', glow: '#bef264', horns: true } },
    { name: 'Geistersee', sky: ['#0c1a3a', '#1e40af'], hills: ['#14213d', '#0f1a33', '#1b2945'], deco: 'rock', ambient: 'mote', ambientColor: '#93c5fd', night: true, castle: '#060c1e', fog: '#bfdbfe',
        monster: { kind: 'specter', name: 'Nebelgeist', color: '#64748b', glow: '#7dd3fc' } },
    { name: 'Kerker der Tränke', sky: ['#0a0a0a', '#3f1d38'], hills: ['#2a2422', '#1f1a19', '#2e2826'], deco: 'cauldron', ambient: 'bubble', ambientColor: '#86efac', night: true, castle: '#080506', fog: '#4ade80',
        monster: { kind: 'specter', name: 'Kerkerwächter', color: '#3f3f46', glow: '#4ade80', mask: true } },
    { name: 'Sternwarte', sky: ['#020617', '#1e1b4b'], hills: ['#1a1838', '#141230', '#1e1b3d'], deco: 'rock', ambient: 'star', ambientColor: '#ffffff', night: true, castle: '#05040f', fog: '#c4b5fd',
        monster: { kind: 'specter', name: 'Sternenschatten', color: '#1e1b4b', glow: '#fde047', runes: true } },
    { name: 'Frostturm', sky: ['#0c4a6e', '#7dd3fc'], hills: ['#1e3a5f', '#173152', '#c7dbe8'], deco: 'crystal', ambient: 'snow', ambientColor: '#ffffff', night: true, castle: '#082136', fog: '#e0f2fe',
        monster: { kind: 'specter', name: 'Frostgeist', color: '#64748b', glow: '#e0f2fe', horns: true } },
    { name: 'Aschekluft', sky: ['#1c0a00', '#9a3412'], hills: ['#2b1a12', '#21140e', '#1a0f0a'], deco: 'rock', ambient: 'ember', ambientColor: '#fb923c', night: true, castle: '#120600', fog: '#fdba74',
        monster: { kind: 'specter', name: 'Aschefürst', color: '#44403c', glow: '#fb923c', horns: true, runes: true } },
    { name: 'Nebelwald', sky: ['#052e16', '#365314'], hills: ['#14261a', '#0e1d13', '#17291b'], deco: 'deadtree', ambient: 'firefly', ambientColor: '#facc15', night: true, castle: '#03110a', fog: '#d9f99d',
        monster: { kind: 'specter', name: 'Sumpfschreck', color: '#3f6212', glow: '#facc15', mask: true } },
    { name: 'Kristallgrotte', sky: ['#2e1065', '#7e22ce'], hills: ['#2a1450', '#200f40', '#2f1658'], deco: 'crystal', ambient: 'sparkle', ambientColor: '#f0abfc', night: true, castle: '#12052b', fog: '#f0abfc',
        monster: { kind: 'specter', name: 'Kristallmahr', color: '#581c87', glow: '#f0abfc', mask: true, runes: true } },
    { name: 'Turmspitze', sky: ['#0f172a', '#be123c'], hills: ['#2a1a2e', '#1f1424', '#2b1d30'], deco: 'lantern', ambient: 'mote', ambientColor: '#fda4af', night: true, castle: '#0a050d', fog: '#fecdd3',
        monster: { kind: 'specter', name: 'Turmwächter', color: '#334155', glow: '#f43f5e', horns: true, mask: true } },
];

const MAGIC_LOOKS = [
    { id: 'midnight', name: 'Mitternacht', minStars: 0, robe: '#1e3a8a', trim: '#d4af37', glow: '#fde68a' },
    { id: 'emerald', name: 'Smaragd', minStars: 3, robe: '#065f46', trim: '#e2e8f0', glow: '#a7f3d0' },
    { id: 'crimson', name: 'Karmesin', minStars: 6, robe: '#7f1d1d', trim: '#fbbf24', glow: '#fecaca' },
    { id: 'raven', name: 'Rabenschwarz', minStars: 10, robe: '#18181b', trim: '#60a5fa', glow: '#bfdbfe' },
    { id: 'amethyst', name: 'Amethyst', minStars: 16, robe: '#4c1d95', trim: '#e9d5ff', glow: '#f5d0fe' },
    { id: 'silver', name: 'Mondsilber', minStars: 21, robe: '#475569', trim: '#f8fafc', glow: '#ffffff' },
    { id: 'stardust', name: 'Sternenstaub', minStars: 26, animated: true, robe: '#312e81' },
];

const SKINS = {
    dragon: {
        id: 'dragon',
        label: 'Drachen-Abenteuer',
        pitch: 'Brüte einen Drachen aus und besiege bunte Rechenmonster.',
        title: 'Drachen-Einmaleins',
        subtitle: 'Rechne richtig, lass deinen Drachen Feuer speien und besiege die Rechenmonster!',
        lairLabel: '🏰 Drachenhöhle',
        mapLabel: '🗺️ Sternenkarte',
        worldsTitle: 'Wähle deine Welt',
        specialTitle: 'Spezial-Abenteuer',
        colorsTitle: '🎨 Drachenfarben',
        stickersTitle: '🏅 Stickeralbum',
        stickerLabel: 'Neuer Sticker!',
        fireLabel: 'FEUER!',
        comboWord: 'Kette',
        comboIcons: ['🔥', '💙', '🌈'],
        canvasFont: "Fredoka, 'Arial Rounded MT Bold', sans-serif",
        worlds: DRAGON_WORLDS,
        boss: {
            name: 'Drachenburg', sky: ['#1e1b4b', '#f43f5e'], hills: ['#581c87', '#3b0764', '#1e1b4b'], deco: 'rock', ambient: 'ember', ambientColor: '#fda4af', night: true,
            monster: { name: 'König Rechenfresser', color: '#7c3aed', eyes: 3, horns: true, spikes: true, teeth: true, crown: true, size: 1.3 },
        },
        practice: {
            name: 'Übungswiese', sky: ['#93c5fd', '#fef9c3'], hills: ['#bbf7d0', '#86efac', '#4ade80'], deco: 'flower', ambient: 'petal', ambientColor: '#fde68a',
            monster: { name: 'Puffi', color: '#94a3b8', eyes: 2, antenna: true },
        },
        stages: [
            { name: 'Baby-Drache', as: 'ein Baby-Drache', scale: 0.78 },
            { name: 'Kleiner Drache', as: 'ein Kleiner Drache', scale: 0.9 },
            { name: 'Junger Drache', as: 'ein Junger Drache', scale: 1 },
            { name: 'Großer Drache', as: 'ein Großer Drache', scale: 1.1 },
            { name: 'Legendärer Drache', as: 'ein Legendärer Drache', scale: 1.2 },
        ],
        looks: DRAGON_LOOKS,
        praise: ['Super!', 'Klasse!', 'Stark!', 'Genau!', 'Toll!', 'Spitze!', 'Bravo!', 'Wow!', 'Prima!'],
        taunts: ['Hihi, daneben!', 'Knapp vorbei!', 'Versuch\'s nochmal!', 'Ätsch – fast!', 'Huch!'],
        intro: (world, table) => `Ich bin ${world.monster.name}! Schaffst du die ${table}er-Reihe?`,
        bossIntro: 'Ich bin König Rechenfresser! Mich besiegt keiner!',
        practiceIntro: 'Ich bin Puffi! Lass uns die kniffligen Aufgaben üben.',
        correction: 'Richtig! Kommt gleich nochmal …',
        results: { 3: 'Fantastisch!', 2: 'Super gemacht!', 1: 'Geschafft!', boss: 'Der König ist besiegt!', practice: 'Fleißig geübt!', perfect: 'Keine Fehler – du bist ein Rechenprofi! 💪' },
        bossCard: { title: '👑 Boss-Kampf', open: `${BOSS_LENGTH} gemischte Aufgaben gegen König Rechenfresser!`, locked: 'Schaffe zuerst 3 Welten, dann wartet der König!' },
        practiceCard: { title: '📚 Fehler-Training', open: (n) => `${n} knifflige Aufgaben üben – so werden sie leicht!`, none: 'Noch keine Fehler zum Üben – super!' },
        stickers: {
            hatched: ['🥚', 'Geschlüpft!', 'Dein Drache ist da'],
            firstWin: ['🏆', 'Erster Sieg', 'Ein Monster besiegt'],
            perfect: ['💎', 'Fehlerfrei', 'Runde ohne Fehler'],
            combo5: ['🔥', 'Feuerkette', '5 richtig hintereinander'],
            combo10: ['☄️', 'Feuersturm', '10 richtig hintereinander'],
            flash: ['⚡', 'Blitzrechner', 'Antwort unter 2 Sekunden'],
            practice: ['📚', 'Fleißig', 'Fehler-Training gemacht'],
            boss: ['👑', 'Königsbezwinger', 'Den Boss besiegt'],
            grow: ['🐉', 'Gewachsen', 'Drache ist gewachsen'],
            hundred: ['💯', 'Hundert!', '100 richtige Antworten'],
            explorer: ['🌍', 'Weltenbummler', 'Jede Welt geschafft'],
            allStars: ['🌟', 'Sternenfänger', 'Überall 3 Sterne'],
            legend: ['🏰', 'Legende', 'Legendärer Drache'],
        },
        fireColors: [
            ['#ffffff', '#fde047', '#f97316', '#dc2626'],
            ['#ffffff', '#a5f3fc', '#22d3ee', '#2563eb'],
            ['#ffffff', '#f0abfc', '#c084fc', '#7c3aed'],
        ],
        fizzle: '#9ca3af',
        lairWorld: 8,
        mapWorld: 9,
    },
    magic: {
        id: 'magic',
        label: 'Zauber-Akademie',
        pitch: 'Werde vom Lehrling zum Erzmagier und bezwinge die Schattenwesen der Akademie.',
        title: 'Einmaleins-Akademie',
        subtitle: 'Meistere die Zahlenzauber, bezwinge die Schattenwesen und steige zum Erzmagier auf.',
        lairLabel: '📜 Zauberkammer',
        mapLabel: '🗺️ Sternenkarte',
        worldsTitle: 'Prüfungen der Akademie',
        specialTitle: 'Besondere Prüfungen',
        colorsTitle: '🧥 Robenfarben',
        stickersTitle: '🏅 Abzeichen',
        stickerLabel: 'Neues Abzeichen!',
        fireLabel: 'ZAUBER',
        comboWord: 'Serie',
        comboIcons: ['✨', '⚡', '🌟'],
        canvasFont: "Cinzel, Georgia, serif",
        worlds: MAGIC_WORLDS,
        boss: {
            name: 'Thronsaal der Schatten', sky: ['#000000', '#4c0519'], hills: ['#1f0a12', '#17060c', '#200a12'], deco: 'lantern', ambient: 'ember', ambientColor: '#f87171', night: true, castle: '#070205', fog: '#fca5a5',
            monster: { kind: 'specter', name: 'Der Zahlenfresser', color: '#18181b', glow: '#ef4444', horns: true, crown: true, runes: true, size: 1.3 },
        },
        practice: {
            name: 'Übungsraum', sky: ['#1e1b4b', '#4338ca'], hills: ['#262046', '#1d1838', '#2a2450'], deco: 'lantern', ambient: 'candle', ambientColor: '#fde68a', night: true, castle: '#0a0820', fog: '#c7d2fe',
            monster: { kind: 'specter', name: 'Übungsgeist', color: '#94a3b8', glow: '#e2e8f0', mask: true },
        },
        stages: [
            { name: 'Lehrling', as: 'Lehrling', scale: 1.22 },
            { name: 'Novize', as: 'Novize', scale: 1.25 },
            { name: 'Adept', as: 'Adept', scale: 1.28 },
            { name: 'Magier', as: 'Magier', scale: 1.31 },
            { name: 'Erzmagier', as: 'Erzmagier', scale: 1.34 },
        ],
        looks: MAGIC_LOOKS,
        praise: ['Ignis!', 'Fulgur!', 'Glacies!', 'Stella!', 'Treffer!', 'Volltreffer!', 'Meisterhaft!', 'Präzise!'],
        taunts: ['Daneben, Lehrling!', 'Ha! Verfehlt!', 'Konzentrier dich!', 'Ist das alles?', 'Zu ungenau!'],
        intro: (world, table) => `Ich bin ${world.monster.name}. Die ${table}er-Reihe? Daran scheitern alle Lehrlinge!`,
        bossIntro: 'Ich bin der Zahlenfresser. Noch nie hat jemand meine Endprüfung bestanden!',
        practiceIntro: 'Übungsgeist bereit. Wir trainieren deine schwierigsten Zauber.',
        correction: 'Richtig! Diese Aufgabe kommt gleich wieder …',
        results: { 3: 'Meisterhaft!', 2: 'Gut gezaubert!', 1: 'Bestanden!', boss: 'Der Zahlenfresser ist besiegt!', perfect: 'Kein einziger Fehler – meisterhaft! ⚡', practice: 'Übung macht den Meister!' },
        bossCard: { title: '👑 Endprüfung', open: `${BOSS_LENGTH} gemischte Aufgaben gegen den Zahlenfresser!`, locked: 'Bestehe zuerst 3 Prüfungen, dann öffnet sich der Thronsaal.' },
        practiceCard: { title: '📖 Übungsraum', open: (n) => `${n} schwierige Zauber gezielt trainieren.`, none: 'Keine Fehler zum Üben – stark!' },
        stickers: {
            hatched: ['🎓', 'Eingeschrieben', 'Willkommen an der Akademie'],
            firstWin: ['⚔️', 'Erster Sieg', 'Ein Schattenwesen bezwungen'],
            perfect: ['💎', 'Fehlerfrei', 'Prüfung ohne Fehler'],
            combo5: ['⚡', 'Zauberserie', '5 richtig hintereinander'],
            combo10: ['🌩️', 'Zaubersturm', '10 richtig hintereinander'],
            flash: ['✨', 'Blitzrechner', 'Antwort unter 2 Sekunden'],
            practice: ['📖', 'Fleißig', 'Im Übungsraum trainiert'],
            boss: ['👑', 'Endprüfung', 'Den Zahlenfresser besiegt'],
            grow: ['🪄', 'Aufgestiegen', 'Neuen Rang erreicht'],
            hundred: ['💯', 'Hundert!', '100 richtige Antworten'],
            explorer: ['🗺️', 'Alle Orte', 'Jede Prüfung bestanden'],
            allStars: ['🌟', 'Sternenmeister', 'Überall 3 Sterne'],
            legend: ['🔮', 'Erzmagier', 'Höchster Rang'],
        },
        fireColors: [
            ['#ffffff', '#e0f2fe', '#7dd3fc', '#2563eb'],
            ['#ffffff', '#fef3c7', '#fbbf24', '#b45309'],
            ['#ffffff', '#f5d0fe', '#d946ef', '#6b21a8'],
        ],
        fizzle: '#a78bfa',
        lairWorld: 4,
        mapWorld: 4,
    },
};

// =====================================================================
// Persistence: several player profiles, each with its own progress
// =====================================================================

function createProfile(name, style) {
    return {
        id: `p${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`,
        name, style, petName: 'Funki', hatched: false,
        gems: 0, looks: { ...DEFAULT_LOOKS }, stars: {}, facts: {}, stickers: {}, totalCorrect: 0, bestCombo: 0,
    };
}

function loadRoot() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.profiles)) {
                return { muted: false, active: null, ...parsed };
            }
        }
        // Migrate progress from the single-player version.
        const legacy = localStorage.getItem(LEGACY_KEY);
        if (legacy) {
            const old = JSON.parse(legacy);
            const profile = {
                ...createProfile('Spieler 1', 'dragon'),
                petName: old.name || 'Funki', hatched: Boolean(old.hatched), gems: old.gems || 0,
                looks: { ...DEFAULT_LOOKS, dragon: old.palette || 'green' },
                stars: old.stars || {}, facts: old.facts || {}, stickers: old.stickers || {},
                totalCorrect: old.totalCorrect || 0, bestCombo: old.bestCombo || 0,
            };
            return { muted: Boolean(old.muted), active: profile.id, profiles: [profile] };
        }
    } catch {
        // Storage unavailable or corrupt: start fresh.
    }
    return { muted: false, active: null, profiles: [] };
}

const root = loadRoot();
let save = root.profiles.find((p) => p.id === root.active) || null;

function persist() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(root));
    } catch {
        // Storage unavailable (private mode): progress lives for this session only.
    }
}

const skin = () => SKINS[save?.style || 'dragon'];
const isMagic = () => save?.style === 'magic';
const heroName = (p = save) => (p.style === 'magic' ? p.name : p.petName);
const factKey = (a, b) => (a <= b ? `${a}x${b}` : `${b}x${a}`);

function getFact(a, b) {
    const key = factKey(a, b);
    if (!save.facts[key]) {
        save.facts[key] = { box: 0, seen: 0, wrong: 0 };
    }
    return save.facts[key];
}

function peekFact(a, b) {
    return save.facts[factKey(a, b)];
}

const totalStars = (p = save) => Object.values(p.stars).reduce((sum, s) => sum + s, 0);

function stageIndex(gems) {
    let index = 0;
    for (const [i, step] of GEM_STEPS.entries()) {
        if (gems >= step) {
            index = i;
        }
    }
    return index;
}

// =====================================================================
// Helpers
// =====================================================================

const $ = (id) => document.getElementById(id);
const rand = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp = (a, b, k) => a + (b - a) * k;
const easeOutCubic = (k) => 1 - (1 - k) ** 3;

function shuffle(list) {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

function hexToRgb(hex) {
    const n = Number.parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Mixes a hex colour towards white (amt > 0) or black (amt < 0).
function shade(hex, amt) {
    if (!hex.startsWith('#')) {
        return hex;
    }
    const [r, g, b] = hexToRgb(hex);
    const target = amt < 0 ? 0 : 255;
    const k = Math.abs(amt);
    return `rgb(${Math.round(r + (target - r) * k)},${Math.round(g + (target - g) * k)},${Math.round(b + (target - b) * k)})`;
}

function rgba(hex, alpha) {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r},${g},${b},${alpha})`;
}

function escapeHtml(text) {
    return String(text).replaceAll(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' })[ch]);
}

function dragonPalette(id, t) {
    const def = DRAGON_LOOKS.find((p) => p.id === id) || DRAGON_LOOKS[0];
    if (def.animated) {
        const h = (t * 50) % 360;
        return {
            body: `hsl(${h},85%,65%)`, dark: `hsl(${h},60%,25%)`, belly: '#fef9c3', wing: `hsl(${(h + 60) % 360},85%,62%)`,
            light: `hsl(${h},90%,82%)`, shadow: `hsl(${h},70%,52%)`, wingBack: `hsl(${(h + 60) % 360},70%,42%)`, bellyLine: '#e7c97a',
        };
    }
    return {
        body: def.body, dark: def.dark, belly: def.belly, wing: def.wing,
        light: shade(def.body, 0.4), shadow: shade(def.body, -0.18),
        wingBack: shade(def.wing, -0.3), bellyLine: shade(def.belly, -0.22),
    };
}

function robePalette(id, t) {
    const def = MAGIC_LOOKS.find((p) => p.id === id) || MAGIC_LOOKS[0];
    if (def.animated) {
        const h = 230 + Math.sin(t * 0.8) * 40;
        return {
            robe: `hsl(${h},60%,28%)`, robeDark: `hsl(${h},60%,12%)`, robeLight: `hsl(${h},55%,40%)`,
            trim: `hsl(${(t * 60) % 360},90%,75%)`, glow: `hsl(${(t * 60 + 40) % 360},100%,85%)`, stars: true,
        };
    }
    return { robe: def.robe, robeDark: shade(def.robe, -0.55), robeLight: shade(def.robe, 0.22), trim: def.trim, glow: def.glow };
}

function heroLook(profile, t) {
    return profile.style === 'magic' ? robePalette(profile.looks.magic, t) : dragonPalette(profile.looks.dragon, t);
}

// =====================================================================
// Sound (Web Audio synthesis, no assets)
// =====================================================================

const Sound = {
    ctx: null,
    noiseBuffer: null,
    lastGem: 0,

    ensure() {
        if (!this.ctx) {
            const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext;
            if (!AudioCtx) {
                return null;
            }
            this.ctx = new AudioCtx();
            const length = this.ctx.sampleRate * 2;
            this.noiseBuffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
            const data = this.noiseBuffer.getChannelData(0);
            for (let i = 0; i < length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            // Master bus: a compressor keeps layered spells loud but clean,
            // a convolution reverb gives the magic sounds a sense of space.
            this.master = this.ctx.createDynamicsCompressor();
            this.master.threshold.value = -16;
            this.master.ratio.value = 4;
            this.master.connect(this.ctx.destination);
            this.reverb = this.ctx.createConvolver();
            this.reverb.buffer = this.impulse(2.6);
            const wetOut = this.ctx.createGain();
            wetOut.gain.value = 0.7;
            this.reverb.connect(wetOut).connect(this.master);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    },

    // Decaying stereo noise used as a reverb impulse response.
    impulse(seconds) {
        const rate = this.ctx.sampleRate;
        const length = Math.floor(rate * seconds);
        const buffer = this.ctx.createBuffer(2, length, rate);
        for (let ch = 0; ch < 2; ch++) {
            const data = buffer.getChannelData(ch);
            for (let i = 0; i < length; i++) {
                data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
            }
        }
        return buffer;
    },

    route(node, wet) {
        node.connect(this.master);
        if (wet > 0) {
            const send = this.ctx.createGain();
            send.gain.value = wet;
            node.connect(send).connect(this.reverb);
        }
    },

    tone(freq, dur, { type = 'sine', vol = 0.15, slide = null, delay = 0, wet = 0, attack = 0.012 } = {}) {
        if (root.muted) {
            return;
        }
        const c = this.ensure();
        if (!c) {
            return;
        }
        const t0 = c.currentTime + delay;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t0);
        if (slide) {
            osc.frequency.exponentialRampToValueAtTime(slide, t0 + dur);
        }
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(vol, t0 + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        osc.connect(gain);
        this.route(gain, wet);
        osc.start(t0);
        osc.stop(t0 + dur + 0.05);
    },

    noise(dur, { vol = 0.2, from = 2000, to = 200, delay = 0, filter = 'lowpass', wet = 0, attack = 0.02, q = 1 } = {}) {
        if (root.muted) {
            return;
        }
        const c = this.ensure();
        if (!c) {
            return;
        }
        const t0 = c.currentTime + delay;
        const src = c.createBufferSource();
        src.buffer = this.noiseBuffer;
        const biquad = c.createBiquadFilter();
        biquad.type = filter;
        biquad.Q.value = q;
        biquad.frequency.setValueAtTime(from, t0);
        biquad.frequency.exponentialRampToValueAtTime(to, t0 + dur);
        const gain = c.createGain();
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(vol, t0 + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        src.connect(biquad).connect(gain);
        this.route(gain, wet);
        src.start(t0, Math.random() * 0.5);
        src.stop(t0 + dur + 0.05);
    },

    click() {
        this.tone(660, 0.06, { type: 'triangle', vol: 0.08 });
    },
    fire(power, combo = 0) {
        if (isMagic()) {
            this.spell(power, combo);
            return;
        }
        this.noise(0.5, { vol: 0.22 * power, from: 400, to: 3500, filter: 'bandpass' });
        this.tone(160, 0.4, { type: 'sawtooth', vol: 0.05, slide: 70 });
    },
    // Layered wand spell: charge, lightning crack with crackle, sub punch, shimmering chord.
    spell(power, combo) {
        const p = Math.min(power, 1.6);
        // Charge-up whoosh
        this.noise(0.24, { vol: 0.16, from: 400, to: 7000, filter: 'bandpass', q: 2, wet: 0.35, attack: 0.18 });
        this.tone(220, 0.24, { type: 'sawtooth', vol: 0.025, slide: 880, attack: 0.18 });
        const release = 0.2;
        // Lightning crack and rumble
        this.noise(0.14, { vol: 0.45 * p, from: 9000, to: 2500, filter: 'highpass', delay: release, wet: 0.45, attack: 0.003 });
        this.noise(0.7, { vol: 0.22 * p, from: 1400, to: 90, delay: release + 0.02, wet: 0.5, attack: 0.01 });
        for (let i = 0; i < 9; i++) {
            this.noise(0.025, { vol: rand(0.08, 0.22), from: 7000, to: 3500, filter: 'highpass', delay: release + 0.04 + rand(0, 0.45), wet: 0.3, attack: 0.002 });
        }
        // Sub punch
        this.tone(120, 0.4, { vol: 0.35 * p, slide: 36, delay: release, attack: 0.004 });
        // Zap sweep
        this.tone(2600, 0.18, { type: 'sawtooth', vol: 0.03, slide: 260, delay: release, wet: 0.3, attack: 0.003 });
        // Shimmering chord, rising with the combo
        const base = 659.25 * 2 ** (Math.min(combo, 12) / 12);
        for (const [i, ratio] of [1, 1.26, 1.5, 2, 2.52].entries()) {
            const at = release + 0.03 + i * 0.035;
            this.tone(base * ratio, 1.3, { vol: 0.045, delay: at, wet: 0.8, attack: 0.01 });
            this.tone(base * ratio * 1.004, 1.1, { type: 'triangle', vol: 0.02, delay: at + 0.01, wet: 0.8 });
        }
    },
    spellHit(power) {
        const p = Math.min(power, 1.6);
        this.tone(80, 0.7, { vol: 0.45 * p, slide: 28, attack: 0.004 });
        this.noise(0.7, { vol: 0.32 * p, from: 2400, to: 60, wet: 0.5, attack: 0.004 });
        this.noise(0.35, { vol: 0.14, from: 9000, to: 4000, filter: 'highpass', delay: 0.02, wet: 0.7 });
        for (const [i, f] of [1760, 2637, 3520].entries()) {
            this.tone(f, 0.9, { vol: 0.03, delay: 0.03 + i * 0.04, wet: 0.9 });
        }
    },
    hit() {
        if (isMagic()) {
            this.spellHit(1);
            return;
        }
        this.noise(0.35, { vol: 0.35, from: 1800, to: 60 });
        this.tone(140, 0.3, { vol: 0.3, slide: 40 });
    },
    correct(combo) {
        const base = 523.25 * 2 ** (Math.min(combo, 12) / 12);
        for (const [i, ratio] of [1, 1.26, 1.5].entries()) {
            this.tone(base * ratio, 0.22, { type: 'triangle', vol: 0.12, delay: i * 0.07 });
        }
    },
    soft() {
        this.tone(523, 0.15, { type: 'triangle', vol: 0.1 });
        this.tone(659, 0.2, { type: 'triangle', vol: 0.1, delay: 0.08 });
    },
    wrong() {
        this.tone(330, 0.18, { type: 'square', vol: 0.05, slide: 260 });
        this.tone(262, 0.3, { type: 'square', vol: 0.05, slide: 196, delay: 0.15 });
        this.noise(0.4, { vol: 0.08, from: 900, to: 300, delay: 0.05 });
    },
    gem() {
        const now = performance.now();
        if (now - this.lastGem < 45) {
            return;
        }
        this.lastGem = now;
        this.tone(rand(1500, 2100), 0.12, { vol: 0.06, slide: 2600 });
    },
    crack() {
        this.noise(0.15, { vol: 0.3, from: 5000, to: 1200, filter: 'highpass' });
        this.tone(240, 0.12, { type: 'triangle', vol: 0.15, slide: 120 });
    },
    win() {
        const notes = [523, 659, 784, 1047, 784, 1047];
        const times = [0, 0.12, 0.24, 0.36, 0.52, 0.62];
        for (const [i, f] of notes.entries()) {
            this.tone(f, i === notes.length - 1 ? 0.6 : 0.16, { type: 'triangle', vol: 0.14, delay: times[i] });
        }
        this.noise(0.8, { vol: 0.12, from: 6000, to: 800, filter: 'highpass', delay: 0.6 });
    },
    sparkle() {
        for (let i = 0; i < 6; i++) {
            this.tone(1200 + i * 220, 0.15, { vol: 0.06, delay: i * 0.05 });
        }
    },
};

// =====================================================================
// Canvas setup and layout
// =====================================================================

const scene = $('scene');
const ctx = scene.getContext('2d');
let W = 0;
let H = 0;
let DPR = 1;
let groundY = 0;
let unit = 1;
const heroPos = { x: 0, y: 0 };
const monsterPos = { x: 0, y: 0 };

function resize() {
    DPR = Math.min(2, globalThis.devicePixelRatio || 1);
    W = globalThis.innerWidth;
    H = globalThis.innerHeight;
    scene.width = Math.round(W * DPR);
    scene.height = Math.round(H * DPR);
    layoutScene();
}

function layoutScene() {
    const portrait = H > W * 1.05;
    const keypad = $('keypad').getBoundingClientRect();
    if (portrait && keypad.height > 0) {
        groundY = clamp(keypad.top - 14, H * 0.42, H * 0.8);
    } else {
        groundY = H * 0.8;
    }
    unit = clamp(Math.min(W, H) / 640, 0.5, 1.5);
    heroPos.x = portrait ? W * 0.27 : W * 0.17;
    heroPos.y = groundY - 40 * unit;
    monsterPos.x = portrait ? W * 0.76 : W * 0.83;
    monsterPos.y = groundY - 62 * unit;
}

// =====================================================================
// Themed background
// =====================================================================

let theme = DRAGON_WORLDS[0];
let prevTheme = DRAGON_WORLDS[0];
let themeFade = 1;
const bgStars = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random() * 0.7, r: rand(0.6, 2), p: rand(0, 6) }));
const clouds = Array.from({ length: 6 }, (_, i) => ({ seed: i * 0.19 + Math.random() * 0.1, y: rand(0.06, 0.32), s: rand(0.7, 1.3), speed: rand(8, 20) }));

function setTheme(next) {
    if (next === theme) {
        return;
    }
    prevTheme = theme;
    theme = next;
    themeFade = 0;
    resetAmbient();
}

function hillY(x, base, amp, freq, seed) {
    return base - amp * (Math.sin(x * freq + seed) * 0.55 + Math.sin(x * freq * 2.3 + seed * 1.7) * 0.3 + Math.sin(x * freq * 5.1 + seed * 0.3) * 0.15);
}

function drawHill(c, color, base, amp, freq, seed, offset) {
    const grad = c.createLinearGradient(0, base - amp, 0, H);
    grad.addColorStop(0, color);
    grad.addColorStop(1, shade(color, -0.25));
    c.fillStyle = grad;
    c.beginPath();
    c.moveTo(0, H);
    for (let x = 0; x <= W + 8; x += 8) {
        c.lineTo(x, hillY(x + offset, base, amp, freq, seed));
    }
    c.lineTo(W, H);
    c.closePath();
    c.fill();
}

function drawCloud(c, x, y, s, alpha) {
    c.fillStyle = `rgba(255,255,255,${alpha})`;
    c.beginPath();
    c.arc(x, y, 26 * s, 0, Math.PI * 2);
    c.arc(x + 30 * s, y - 14 * s, 32 * s, 0, Math.PI * 2);
    c.arc(x + 64 * s, y, 26 * s, 0, Math.PI * 2);
    c.arc(x + 32 * s, y + 8 * s, 28 * s, 0, Math.PI * 2);
    c.fill();
}

// Distant academy silhouette with flickering windows.
const CASTLE = [
    [-300, 34, 150, 55], [-250, 70, 95, 0], [-185, 44, 230, 85], [-120, 90, 130, 0], [-40, 56, 300, 110],
    [30, 110, 160, 0], [110, 40, 210, 75], [165, 70, 110, 0], [230, 46, 260, 95], [290, 80, 90, 0], [345, 30, 160, 60],
];

function drawCastle(c, th, t) {
    const sc = clamp(H / 820, 0.55, 1.3);
    const cx = W * 0.56;
    const base = groundY - H * 0.16;
    c.fillStyle = th.castle;
    for (const [dx, w, h, roof] of CASTLE) {
        const x = cx + dx * sc - (w * sc) / 2;
        const top = base - h * sc;
        c.fillRect(x, top, w * sc, H - top);
        if (roof) {
            c.beginPath();
            c.moveTo(x - 4 * sc, top);
            c.lineTo(x + (w * sc) / 2, top - roof * sc);
            c.lineTo(x + w * sc + 4 * sc, top);
            c.closePath();
            c.fill();
            c.fillRect(x + (w * sc) / 2 - 1, top - roof * sc - 14 * sc, 2, 14 * sc);
        } else {
            for (let bx = x; bx < x + w * sc - 4; bx += 12 * sc) {
                c.fillRect(bx, top - 8 * sc, 7 * sc, 8 * sc);
            }
        }
    }
    // Windows
    let i = 0;
    for (const [dx, w, h] of CASTLE) {
        const rows = Math.floor(h / 60);
        for (let r = 0; r < rows; r++) {
            i++;
            const flick = 0.55 + 0.45 * Math.sin(t * (1.3 + (i % 5) * 0.4) + i * 7.1) * Math.sin(t * 0.7 + i);
            if (i % 3 === 0) {
                continue;
            }
            const wx = cx + dx * sc - 3 * sc;
            const wy = base - h * sc + (24 + r * 52) * sc;
            c.fillStyle = `rgba(253,216,120,${clamp(flick, 0.25, 1)})`;
            c.beginPath();
            c.roundRect(wx, wy, 6 * sc, 11 * sc, [3 * sc, 3 * sc, 0, 0]);
            c.fill();
            if (w > 60) {
                c.beginPath();
                c.roundRect(wx + 18 * sc, wy, 6 * sc, 11 * sc, [3 * sc, 3 * sc, 0, 0]);
                c.fill();
            }
        }
    }
    c.fillStyle = th.castle;
}

function drawDeco(c, type, x, y, s, t, seed) {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    switch (type) {
        case 'flower': {
            c.strokeStyle = '#15803d';
            c.lineWidth = 3;
            c.beginPath();
            c.moveTo(0, 0);
            c.quadraticCurveTo(4, -14, Math.sin(t * 2 + seed) * 3, -26);
            c.stroke();
            c.fillStyle = ['#f472b6', '#facc15', '#a78bfa', '#fb7185', '#ffffff'][seed % 5];
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI * 2 + t * 0.3;
                c.beginPath();
                c.arc(Math.sin(t * 2 + seed) * 3 + Math.cos(a) * 7, -26 + Math.sin(a) * 7, 5.5, 0, Math.PI * 2);
                c.fill();
            }
            c.fillStyle = '#fde047';
            c.beginPath();
            c.arc(Math.sin(t * 2 + seed) * 3, -26, 4.5, 0, Math.PI * 2);
            c.fill();
            break;
        }
        case 'mushroom': {
            c.fillStyle = '#fef3c7';
            c.fillRect(-6, -22, 12, 22);
            c.fillStyle = seed % 2 ? '#ef4444' : '#f97316';
            c.beginPath();
            c.ellipse(0, -22, 22, 16, 0, Math.PI, 0);
            c.fill();
            c.fillStyle = 'white';
            for (const [dx, dy, r] of [[-9, -28, 4], [6, -32, 3.5], [12, -24, 3]]) {
                c.beginPath();
                c.arc(dx, dy, r, 0, Math.PI * 2);
                c.fill();
            }
            break;
        }
        case 'palm': {
            c.strokeStyle = '#92400e';
            c.lineWidth = 7;
            c.beginPath();
            c.moveTo(0, 0);
            c.quadraticCurveTo(10, -40, 4, -80);
            c.stroke();
            c.fillStyle = '#16a34a';
            for (let i = 0; i < 5; i++) {
                const a = -Math.PI / 2 + (i - 2) * 0.65 + Math.sin(t * 1.5 + i) * 0.05;
                c.save();
                c.translate(4, -80);
                c.rotate(a);
                c.beginPath();
                c.ellipse(24, 0, 26, 7, 0.25, 0, Math.PI * 2);
                c.fill();
                c.restore();
            }
            break;
        }
        case 'cactus': {
            c.fillStyle = '#16a34a';
            c.strokeStyle = '#14532d';
            c.lineWidth = 2;
            const part = (px, py, w, h) => {
                c.beginPath();
                c.roundRect(px, py, w, h, w / 2);
                c.fill();
                c.stroke();
            };
            part(-8, -56, 16, 56);
            part(-24, -40, 12, 22);
            part(12, -46, 12, 24);
            part(-24, -24, 18, 9);
            part(6, -30, 18, 9);
            break;
        }
        case 'lolly': {
            c.fillStyle = 'white';
            c.fillRect(-2, -44, 4, 44);
            const colors = ['#f472b6', '#38bdf8', '#facc15', '#a78bfa'];
            for (let r = 16; r > 0; r -= 4) {
                c.fillStyle = colors[(r / 4 + seed) % colors.length];
                c.beginPath();
                c.arc(0, -52, r, 0, Math.PI * 2);
                c.fill();
            }
            break;
        }
        case 'crystal': {
            const hue = theme.night ? ['#e879f9', '#a78bfa', '#67e8f9'][seed % 3] : ['#e0f2fe', '#bae6fd', '#a5f3fc'][seed % 3];
            for (const [dx, h, w, rot] of [[-10, 34, 9, -0.25], [0, 52, 12, 0], [12, 30, 8, 0.3]]) {
                c.save();
                c.translate(dx, 0);
                c.rotate(rot);
                const g = c.createLinearGradient(-w, 0, w, 0);
                g.addColorStop(0, hue);
                g.addColorStop(1, 'rgba(255,255,255,0.9)');
                c.fillStyle = g;
                c.globalAlpha = 0.85;
                c.beginPath();
                c.moveTo(-w, 0);
                c.lineTo(-w, -h * 0.75);
                c.lineTo(0, -h);
                c.lineTo(w, -h * 0.75);
                c.lineTo(w, 0);
                c.closePath();
                c.fill();
                c.restore();
            }
            c.globalAlpha = 1;
            break;
        }
        case 'tree': {
            c.fillStyle = '#78350f';
            c.fillRect(-5, -26, 10, 26);
            c.fillStyle = theme.night ? '#065f46' : '#15803d';
            for (const [dy, w] of [[-26, 30], [-46, 24], [-64, 16]]) {
                c.beginPath();
                c.moveTo(-w, dy);
                c.lineTo(0, dy - 30);
                c.lineTo(w, dy);
                c.closePath();
                c.fill();
            }
            break;
        }
        case 'lantern': {
            const flick = 0.8 + 0.2 * Math.sin(t * 9 + seed * 3);
            const glow = c.createRadialGradient(12, -52, 2, 12, -52, 34);
            glow.addColorStop(0, `rgba(253,216,120,${0.55 * flick})`);
            glow.addColorStop(1, 'rgba(253,216,120,0)');
            c.fillStyle = glow;
            c.fillRect(-24, -88, 72, 72);
            c.fillStyle = '#16121f';
            c.fillRect(-2.5, -64, 5, 64);
            c.fillRect(-2.5, -64, 16, 3);
            c.fillRect(6, -60, 12, 15);
            c.fillStyle = `rgba(253,224,140,${flick})`;
            c.fillRect(8, -58, 8, 11);
            break;
        }
        case 'deadtree': {
            c.strokeStyle = '#0c0912';
            c.lineCap = 'round';
            c.lineWidth = 8;
            c.beginPath();
            c.moveTo(0, 0);
            c.quadraticCurveTo(-8, -34, 4, -70);
            c.stroke();
            c.lineWidth = 4;
            c.beginPath();
            c.moveTo(1, -42);
            c.quadraticCurveTo(20, -52, 28, -72);
            c.moveTo(-3, -30);
            c.quadraticCurveTo(-20, -40, -28, -58);
            c.moveTo(4, -70);
            c.lineTo(-6, -88);
            c.moveTo(4, -70);
            c.lineTo(14, -86);
            c.stroke();
            c.lineWidth = 2;
            c.beginPath();
            c.moveTo(22, -62);
            c.lineTo(32, -60);
            c.moveTo(-22, -48);
            c.lineTo(-32, -46);
            c.stroke();
            break;
        }
        case 'glowshroom': {
            const cap = ['#22d3ee', '#a3e635', '#e879f9'][seed % 3];
            const glow = c.createRadialGradient(0, -24, 2, 0, -24, 34);
            glow.addColorStop(0, rgba(cap, 0.45 + 0.15 * Math.sin(t * 2 + seed)));
            glow.addColorStop(1, rgba(cap, 0));
            c.fillStyle = glow;
            c.fillRect(-34, -58, 68, 68);
            c.fillStyle = '#d6d3d1';
            c.fillRect(-4, -22, 8, 22);
            c.fillStyle = cap;
            c.beginPath();
            c.ellipse(0, -22, 18, 13, 0, Math.PI, 0);
            c.fill();
            break;
        }
        case 'cauldron': {
            const glow = c.createRadialGradient(0, -34, 2, 0, -34, 40);
            glow.addColorStop(0, 'rgba(74,222,128,0.5)');
            glow.addColorStop(1, 'rgba(74,222,128,0)');
            c.fillStyle = glow;
            c.fillRect(-40, -80, 80, 80);
            c.fillStyle = '#0f0d14';
            c.beginPath();
            c.ellipse(0, -18, 24, 18, 0, 0, Math.PI * 2);
            c.fill();
            c.fillRect(-18, -6, 4, 8);
            c.fillRect(14, -6, 4, 8);
            c.fillStyle = '#4ade80';
            c.beginPath();
            c.ellipse(0, -32, 20, 5, 0, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(187,247,208,0.8)';
            for (let i = 0; i < 3; i++) {
                const k = (t * 0.8 + i / 3 + seed * 0.13) % 1;
                c.beginPath();
                c.arc(-8 + i * 8, -34 - k * 26, 3 * (1 - k) + 1, 0, Math.PI * 2);
                c.fill();
            }
            break;
        }
        default: {
            c.fillStyle = shade(theme.hills[1], -0.2);
            c.beginPath();
            c.ellipse(0, -8, 22, 14, 0, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(255,255,255,0.12)';
            c.beginPath();
            c.ellipse(-6, -14, 8, 4, -0.3, 0, Math.PI * 2);
            c.fill();
        }
    }
    c.restore();
}

function drawBackground(c, th, t) {
    const sky = c.createLinearGradient(0, 0, 0, groundY);
    sky.addColorStop(0, th.sky[0]);
    sky.addColorStop(1, th.sky[1]);
    c.fillStyle = sky;
    c.fillRect(0, 0, W, H);

    if (th.night) {
        for (const s of bgStars) {
            c.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + s.p));
            c.fillStyle = 'white';
            c.beginPath();
            c.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
            c.fill();
        }
        c.globalAlpha = 1;
    }

    // Sun or moon
    const sx = W * 0.86;
    const sy = H * 0.14;
    const sr = Math.min(W, H) * 0.055;
    const glow = c.createRadialGradient(sx, sy, sr * 0.5, sx, sy, sr * 3);
    glow.addColorStop(0, th.night ? 'rgba(254,249,195,0.45)' : 'rgba(253,224,71,0.6)');
    glow.addColorStop(1, 'rgba(253,224,71,0)');
    c.fillStyle = glow;
    c.fillRect(sx - sr * 3, sy - sr * 3, sr * 6, sr * 6);
    if (th.night) {
        c.fillStyle = '#fef9c3';
        c.beginPath();
        c.arc(sx, sy, sr, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(202,138,4,0.25)';
        for (const [dx, dy, r] of [[-0.3, -0.2, 0.22], [0.25, 0.2, 0.18], [0.1, -0.35, 0.1]]) {
            c.beginPath();
            c.arc(sx + dx * sr, sy + dy * sr, r * sr, 0, Math.PI * 2);
            c.fill();
        }
    } else {
        c.save();
        c.translate(sx, sy);
        c.rotate(t * 0.2);
        c.fillStyle = '#fde047';
        for (let i = 0; i < 12; i++) {
            c.rotate(Math.PI / 6);
            c.beginPath();
            c.moveTo(sr * 1.15, -sr * 0.14);
            c.lineTo(sr * 1.6, 0);
            c.lineTo(sr * 1.15, sr * 0.14);
            c.fill();
        }
        c.beginPath();
        c.arc(0, 0, sr, 0, Math.PI * 2);
        c.fill();
        c.restore();
    }

    for (const cl of clouds) {
        const span = W + 260;
        const x = ((cl.seed * span + t * cl.speed) % span) - 160;
        drawCloud(c, x, cl.y * H, cl.s * clamp(W / 1000, 0.6, 1.3), th.night ? 0.1 : 0.85);
    }

    if (th.castle) {
        drawCastle(c, th, t);
    }

    drawHill(c, th.hills[0], groundY - H * 0.24, H * 0.08, 0.004, 1.3, t * 3);
    drawHill(c, th.hills[1], groundY - H * 0.12, H * 0.05, 0.007, 4.1, t * 7);

    const decoCount = Math.max(4, Math.round(W / 170));
    const decoScale = clamp(Math.min(W, H) / 700, 0.6, 1.3);
    for (let i = 0; i < decoCount; i++) {
        const x = ((i + 0.5) / decoCount) * W + Math.sin(i * 12.9898) * 40;
        const y = hillY(x, groundY + 6, 6, 0.02, 2.2) - 2;
        drawDeco(c, th.deco, x, y, decoScale * (0.8 + ((i * 37) % 5) * 0.08), t, i);
    }

    const gGrad = c.createLinearGradient(0, groundY - 10, 0, H);
    gGrad.addColorStop(0, th.hills[2]);
    gGrad.addColorStop(1, shade(th.hills[2], -0.35));
    c.fillStyle = gGrad;
    c.beginPath();
    c.moveTo(0, H);
    for (let x = 0; x <= W + 8; x += 8) {
        c.lineTo(x, hillY(x, groundY + 6, 6, 0.02, 2.2));
    }
    c.lineTo(W, H);
    c.closePath();
    c.fill();

    if (th.fog) {
        const fog = c.createLinearGradient(0, groundY - H * 0.14, 0, groundY + 30);
        fog.addColorStop(0, rgba(th.fog, 0));
        fog.addColorStop(0.6, rgba(th.fog, 0.16));
        fog.addColorStop(1, rgba(th.fog, 0));
        c.fillStyle = fog;
        c.fillRect(0, groundY - H * 0.14, W, H * 0.14 + 30);
        c.fillStyle = rgba(th.fog, 0.07);
        for (let i = 0; i < 5; i++) {
            const fx = ((i * 0.27 * W + t * (12 + i * 4)) % (W + 400)) - 200;
            c.beginPath();
            c.ellipse(fx, groundY - 10 - (i % 2) * 24, 220, 26, 0, 0, Math.PI * 2);
            c.fill();
        }
    }
}

// Ambient particles (petals, snow, embers, floating candles …)
const ambient = [];

function newAmbient(initial) {
    return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : rand(-0.1, 1) * H,
        vx: rand(-15, 15), vy: rand(10, 40), r: rand(2, 5), rot: rand(0, 6), spin: rand(-2, 2), p: rand(0, 6),
    };
}

function resetAmbient() {
    ambient.length = 0;
    const count = theme.ambient === 'candle' ? 16 : 40;
    for (let i = 0; i < count; i++) {
        const a = newAmbient(true);
        if (theme.ambient === 'candle') {
            a.y = rand(0.05, 0.5) * H;
            a.r = rand(3, 6);
        }
        ambient.push(a);
    }
}

function updateAmbient(dt, t) {
    const type = theme.ambient;
    for (const a of ambient) {
        switch (type) {
            case 'snow':
            case 'petal':
            case 'leaf':
                a.x += (a.vx + Math.sin(t + a.p) * 20) * dt;
                a.y += a.vy * dt;
                a.rot += a.spin * dt;
                break;
            case 'ember':
            case 'bubble':
                a.x += Math.sin(t * 2 + a.p) * 20 * dt;
                a.y -= a.vy * 1.4 * dt;
                break;
            case 'mote':
                a.x += Math.sin(t + a.p) * 12 * dt;
                a.y -= a.vy * 0.5 * dt;
                break;
            case 'sand':
                a.x += (60 + a.vx) * dt;
                a.y += Math.sin(t * 3 + a.p) * 10 * dt;
                break;
            case 'firefly':
                a.x += Math.cos(t * 0.7 + a.p) * 25 * dt;
                a.y += Math.sin(t * 0.9 + a.p * 2) * 25 * dt;
                break;
            case 'candle':
                a.y += Math.sin(t * 1.1 + a.p) * 6 * dt;
                break;
            default:
                break;
        }
        if (a.y > H + 20 || a.y < -20 || a.x > W + 20 || a.x < -20) {
            Object.assign(a, newAmbient(false));
            if (type === 'ember' || type === 'bubble' || type === 'mote') {
                a.y = H + 10;
            } else if (type === 'sand') {
                a.x = -10;
                a.y = rand(0.3, 1) * H;
            } else {
                a.y = -10;
            }
        }
    }
}

function drawAmbient(c, t) {
    const color = theme.ambientColor;
    const type = theme.ambient;
    for (const a of ambient) {
        c.save();
        c.translate(a.x, a.y);
        switch (type) {
            case 'petal':
            case 'leaf':
                c.rotate(a.rot);
                c.fillStyle = color;
                c.globalAlpha = 0.85;
                c.beginPath();
                c.ellipse(0, 0, a.r * 1.6, a.r * 0.8, 0, 0, Math.PI * 2);
                c.fill();
                break;
            case 'bubble':
                c.strokeStyle = rgba(color, 0.8);
                c.lineWidth = 1.5;
                c.beginPath();
                c.arc(0, 0, a.r * 1.4, 0, Math.PI * 2);
                c.stroke();
                break;
            case 'ember':
            case 'mote':
            case 'firefly': {
                const glow = c.createRadialGradient(0, 0, 0, 0, 0, a.r * 3);
                const alpha = type === 'ember' ? 0.9 : 0.5 + 0.5 * Math.sin(t * 3 + a.p);
                glow.addColorStop(0, rgba(color, alpha));
                glow.addColorStop(1, rgba(color, 0));
                c.fillStyle = glow;
                c.beginPath();
                c.arc(0, 0, a.r * 3, 0, Math.PI * 2);
                c.fill();
                break;
            }
            case 'candle': {
                const flick = 0.8 + 0.2 * Math.sin(t * 11 + a.p * 5);
                const glow = c.createRadialGradient(0, -a.r * 2.6, 0, 0, -a.r * 2.6, a.r * 6);
                glow.addColorStop(0, `rgba(253,224,140,${0.5 * flick})`);
                glow.addColorStop(1, 'rgba(253,224,140,0)');
                c.fillStyle = glow;
                c.beginPath();
                c.arc(0, -a.r * 2.6, a.r * 6, 0, Math.PI * 2);
                c.fill();
                c.fillStyle = '#f3ead6';
                c.fillRect(-a.r * 0.6, -a.r * 2, a.r * 1.2, a.r * 4.5);
                c.fillStyle = '#fde68a';
                c.beginPath();
                c.ellipse(0, -a.r * 2.7, a.r * 0.45, a.r * 0.9 * flick, 0, 0, Math.PI * 2);
                c.fill();
                break;
            }
            case 'sparkle':
            case 'star': {
                const k = Math.abs(Math.sin(t * 2 + a.p));
                c.fillStyle = rgba(color, k);
                c.rotate(t * 0.5 + a.p);
                const s = a.r * (type === 'star' ? 0.9 : 1.3) * (0.5 + k);
                c.beginPath();
                c.moveTo(0, -s * 2);
                c.quadraticCurveTo(0, 0, s * 2, 0);
                c.quadraticCurveTo(0, 0, 0, s * 2);
                c.quadraticCurveTo(0, 0, -s * 2, 0);
                c.quadraticCurveTo(0, 0, 0, -s * 2);
                c.fill();
                break;
            }
            default:
                c.fillStyle = rgba(color, 0.7);
                c.beginPath();
                c.arc(0, 0, a.r * (type === 'sand' ? 0.6 : 1), 0, Math.PI * 2);
                c.fill();
        }
        c.restore();
    }
}

// =====================================================================
// Characters: dragon (younger skin)
// =====================================================================

function drawWing(c, x, y, angle, color, outline, size) {
    c.save();
    c.translate(x, y);
    c.rotate(angle);
    c.scale(size, size);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(-16, -64);
    c.quadraticCurveTo(-30, -46, -48, -50);
    c.quadraticCurveTo(-46, -30, -66, -24);
    c.quadraticCurveTo(-34, -8, 0, 0);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = outline;
    c.stroke();
    c.lineWidth = 2;
    c.globalAlpha = 0.5;
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(-48, -50);
    c.moveTo(0, 0);
    c.lineTo(-66, -24);
    c.stroke();
    c.globalAlpha = 1;
    c.restore();
}

// Draws the dragon facing right; (x, y) is roughly the body centre.
function drawDragon(c, x, y, s, o) {
    const { t, stage, pal } = o;
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.translate(0, Math.sin(t * 2.4) * 4);
    c.lineJoin = 'round';
    c.lineCap = 'round';
    const outline = pal.dark;

    if (stage >= 4) {
        const aura = c.createRadialGradient(0, -20, 10, 0, -20, 130);
        aura.addColorStop(0, `rgba(253,224,71,${0.35 + 0.15 * Math.sin(t * 3)})`);
        aura.addColorStop(1, 'rgba(253,224,71,0)');
        c.fillStyle = aura;
        c.beginPath();
        c.arc(0, -20, 130, 0, Math.PI * 2);
        c.fill();
    }

    const flap = Math.sin(t * (o.flapSpeed || 6)) * 0.35;
    const wingSize = 0.85 + stage * 0.09;
    drawWing(c, -6, -24, flap + 0.2, pal.wingBack, outline, wingSize * 0.9);

    const tw = Math.sin(t * 3) * 8;
    c.lineWidth = 3;
    c.strokeStyle = outline;
    c.fillStyle = pal.body;
    c.beginPath();
    c.moveTo(-28, -8);
    c.bezierCurveTo(-60, -4, -76, 18 + tw * 0.3, -98, 6 + tw);
    c.bezierCurveTo(-80, 30, -56, 30, -28, 22);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = pal.wing;
    c.beginPath();
    c.moveTo(-94, 7 + tw);
    c.lineTo(-108, -8 + tw);
    c.lineTo(-122, 8 + tw);
    c.lineTo(-108, 20 + tw);
    c.closePath();
    c.fill();
    c.stroke();

    c.fillStyle = pal.shadow;
    c.beginPath();
    c.ellipse(-16, 30, 13, 10, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    c.fillStyle = pal.body;
    c.beginPath();
    c.moveTo(14, -22);
    c.quadraticCurveTo(26, -44, 34, -54);
    c.lineTo(56, -40);
    c.quadraticCurveTo(44, -18, 34, -2);
    c.closePath();
    c.fill();
    c.stroke();

    if (stage >= 2) {
        c.fillStyle = pal.wing;
        for (let i = 0; i < 5; i++) {
            const a = -2.75 + i * 0.26;
            const bx = Math.cos(a) * 44;
            const by = Math.sin(a) * 34;
            const nx = Math.cos(a);
            const ny = Math.sin(a);
            const len = 12 + stage * 2;
            c.beginPath();
            c.moveTo(bx - ny * 6, by + nx * 6);
            c.lineTo(bx + nx * len, by + ny * len);
            c.lineTo(bx + ny * 6, by - nx * 6);
            c.closePath();
            c.fill();
            c.stroke();
        }
    }

    const bodyGrad = c.createRadialGradient(-10, -16, 6, 0, 0, 52);
    bodyGrad.addColorStop(0, pal.light);
    bodyGrad.addColorStop(1, pal.body);
    c.fillStyle = bodyGrad;
    c.beginPath();
    c.ellipse(0, 0, 46, 36, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    c.fillStyle = pal.belly;
    c.beginPath();
    c.ellipse(12, 9, 26, 23, -0.2, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = pal.bellyLine;
    c.lineWidth = 2;
    for (let k = -1; k <= 1; k++) {
        c.beginPath();
        c.moveTo(-6, 9 + k * 9);
        c.quadraticCurveTo(12, 14 + k * 9, 30, 5 + k * 9);
        c.stroke();
    }
    c.strokeStyle = outline;
    c.lineWidth = 3;

    c.fillStyle = pal.body;
    c.beginPath();
    c.ellipse(20, 31, 13, 10, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = pal.belly;
    for (const dx of [12, 20, 28]) {
        c.beginPath();
        c.arc(dx, 39, 3, 0, Math.PI * 2);
        c.fill();
    }

    c.save();
    c.translate(44, -54);
    const hs = 1.2 - stage * 0.05;
    c.scale(hs, hs);

    if (stage >= 1) {
        c.fillStyle = '#fef3c7';
        const hornLen = 1 + (stage - 1) * 0.22;
        for (const [hx, tilt] of [[-12, 0], [2, 0.25]]) {
            c.save();
            c.translate(hx, -18);
            c.rotate(-0.5 + tilt);
            c.scale(hornLen, hornLen);
            c.beginPath();
            c.moveTo(-6, 2);
            c.quadraticCurveTo(-8, -16, -16, -26);
            c.quadraticCurveTo(0, -18, 6, 2);
            c.closePath();
            c.fill();
            c.stroke();
            c.restore();
        }
    }

    c.fillStyle = pal.wing;
    c.beginPath();
    c.moveTo(-20, -6);
    c.lineTo(-34, -14);
    c.lineTo(-26, 0);
    c.lineTo(-36, 6);
    c.lineTo(-20, 8);
    c.closePath();
    c.fill();
    c.stroke();

    const headGrad = c.createRadialGradient(-6, -10, 3, 0, 0, 30);
    headGrad.addColorStop(0, pal.light);
    headGrad.addColorStop(1, pal.body);
    c.fillStyle = headGrad;
    c.beginPath();
    c.ellipse(0, 0, 25, 23, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    c.fillStyle = pal.body;
    c.beginPath();
    c.ellipse(20, 8, 19, 14, 0.1, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = outline;
    for (const [nx, ny] of [[29, 2], [34, 5]]) {
        c.beginPath();
        c.ellipse(nx, ny, 2, 2.6, 0.4, 0, Math.PI * 2);
        c.fill();
    }

    const mouth = o.mouth || 0;
    if (mouth > 0.05) {
        c.fillStyle = '#7f1d1d';
        c.beginPath();
        c.ellipse(30, 15, 4 + 8 * mouth, 2 + 6 * mouth, 0.2, 0, Math.PI * 2);
        c.fill();
        c.stroke();
        c.fillStyle = '#fb7185';
        c.beginPath();
        c.ellipse(28, 17 + 2 * mouth, 4 * mouth, 2.5 * mouth, 0, 0, Math.PI * 2);
        c.fill();
    } else {
        c.beginPath();
        if (o.sad > 0) {
            c.moveTo(16, 18);
            c.quadraticCurveTo(25, 12, 34, 17);
        } else {
            c.moveTo(14, 13);
            c.quadraticCurveTo(24, 21, 35, 12);
        }
        c.stroke();
    }

    c.fillStyle = 'rgba(244,114,182,0.45)';
    c.beginPath();
    c.arc(8, 11, 5, 0, Math.PI * 2);
    c.fill();

    const blink = o.blink ?? 1;
    if (o.happy > 0) {
        c.beginPath();
        c.moveTo(-3, -4);
        c.quadraticCurveTo(5, -14, 13, -4);
        c.lineWidth = 3.5;
        c.stroke();
        c.lineWidth = 3;
    } else if (blink < 0.25) {
        c.beginPath();
        c.moveTo(-3, -5);
        c.quadraticCurveTo(5, -1, 13, -5);
        c.stroke();
    } else {
        c.fillStyle = 'white';
        c.beginPath();
        c.ellipse(5, -6, 9.5, 10.5 * blink, 0, 0, Math.PI * 2);
        c.fill();
        c.lineWidth = 2;
        c.stroke();
        c.fillStyle = '#1e1b4b';
        c.beginPath();
        c.arc(8, -5, 5.6, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'white';
        c.beginPath();
        c.arc(10, -8, 2.2, 0, Math.PI * 2);
        c.fill();
        c.lineWidth = 3;
    }
    if (o.sad > 0) {
        c.beginPath();
        c.moveTo(-4, -18);
        c.lineTo(12, -21);
        c.stroke();
    }

    if (stage >= 4) {
        c.fillStyle = '#facc15';
        c.strokeStyle = '#a16207';
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(-16, -20);
        c.lineTo(-18, -38);
        c.lineTo(-10, -28);
        c.lineTo(-4, -42);
        c.lineTo(2, -28);
        c.lineTo(10, -38);
        c.lineTo(8, -20);
        c.closePath();
        c.fill();
        c.stroke();
        c.fillStyle = '#ef4444';
        c.beginPath();
        c.arc(-4, -26, 2.5, 0, Math.PI * 2);
        c.fill();
    }
    c.restore();

    drawWing(c, -2, -26, flap, pal.wing, outline, wingSize);
    c.restore();
}

function dragonMouth(x, y, s, stage, t) {
    const hs = 1.2 - stage * 0.05;
    return {
        x: x + (44 + 34 * hs) * s,
        y: y + (-54 + 14 * hs + Math.sin(t * 2.4) * 4) * s,
    };
}

// =====================================================================
// Characters: wizard apprentice (older skin)
// =====================================================================

const WIZARD_INK = '#0b0712';

function wizardHand(cast) {
    return { x: 30 + cast * 6, y: -40 - cast * 16 };
}

function wizardLift(stage, t) {
    return stage >= 4 ? -8 + Math.sin(t * 2) * 4 : 0;
}

function drawRune(c, x, y, glow, alpha) {
    c.save();
    c.translate(x, y);
    c.globalAlpha = alpha;
    const g = c.createRadialGradient(0, 0, 0, 0, 0, 10);
    g.addColorStop(0, glow);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.beginPath();
    c.arc(0, 0, 10, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = 'white';
    c.lineWidth = 1.4;
    c.beginPath();
    c.moveTo(0, -5);
    c.lineTo(4, 3);
    c.lineTo(-4, 3);
    c.closePath();
    c.moveTo(0, -5);
    c.lineTo(0, 6);
    c.stroke();
    c.restore();
}

function smallStar(c, x, y, r) {
    c.beginPath();
    c.moveTo(x, y - r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.quadraticCurveTo(x, y, x, y + r);
    c.quadraticCurveTo(x, y, x - r, y);
    c.quadraticCurveTo(x, y, x, y - r);
    c.fill();
}

// Draws a robed apprentice facing right; feet at y = +42.
function drawWizard(c, x, y, s, o) {
    const { t, stage, pal } = o;
    const cast = o.mouth || 0;
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.translate(0, wizardLift(stage, t));
    c.lineJoin = 'round';
    c.lineCap = 'round';

    if (stage >= 4) {
        const aura = c.createRadialGradient(0, -24, 10, 0, -24, 120);
        aura.addColorStop(0, rgbaAny(pal.glow, 0.3 + 0.12 * Math.sin(t * 3)));
        aura.addColorStop(1, rgbaAny(pal.glow, 0));
        c.fillStyle = aura;
        c.beginPath();
        c.arc(0, -24, 120, 0, Math.PI * 2);
        c.fill();
    }

    const runeCount = stage >= 3 ? 3 + (stage - 3) * 2 : 0;
    const runes = Array.from({ length: runeCount }, (_, i) => {
        const a = t * 1.2 + (i / runeCount) * Math.PI * 2;
        return { x: Math.cos(a) * 60, y: -24 + Math.sin(a) * 16, front: Math.sin(a) > 0 };
    });
    for (const r of runes) {
        if (!r.front) {
            drawRune(c, r.x, r.y, pal.glow, 0.55);
        }
    }

    // Cape
    if (stage >= 3) {
        c.fillStyle = pal.robeDark;
        c.strokeStyle = WIZARD_INK;
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(-8, -50);
        c.quadraticCurveTo(-38 + Math.sin(t * 2) * 4, -10, -50 + Math.sin(t * 2.3) * 6, 38);
        c.lineTo(-18, 40);
        c.lineTo(-2, -44);
        c.closePath();
        c.fill();
        c.stroke();
    }

    // Boots
    c.fillStyle = '#1c1310';
    c.beginPath();
    c.ellipse(-8, 41, 11, 5, 0, 0, Math.PI * 2);
    c.ellipse(14, 41, 11, 5, 0, 0, Math.PI * 2);
    c.fill();

    // Robe
    const sway = Math.sin(t * 1.8) * 2.5;
    c.beginPath();
    c.moveTo(-12, -50);
    c.quadraticCurveTo(-22, -8, -32 + sway, 38);
    for (let i = 1; i <= 6; i++) {
        c.lineTo(-32 + sway + i * 11, 38 + (i % 2 ? 4 : 0));
    }
    c.quadraticCurveTo(26, -8, 18, -50);
    c.closePath();
    const rg = c.createLinearGradient(-30, 0, 34, 0);
    rg.addColorStop(0, pal.robeDark);
    rg.addColorStop(0.6, pal.robe);
    rg.addColorStop(1, pal.robeLight);
    c.fillStyle = rg;
    c.fill();
    c.strokeStyle = WIZARD_INK;
    c.lineWidth = 2.5;
    c.stroke();

    c.strokeStyle = 'rgba(0,0,0,0.3)';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(-6, -30);
    c.quadraticCurveTo(-12, 4, -14 + sway * 0.5, 36);
    c.moveTo(4, -20);
    c.quadraticCurveTo(6, 10, 6 + sway, 38);
    c.stroke();

    if (stage >= 1) {
        c.strokeStyle = pal.trim;
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(12, -48);
        c.quadraticCurveTo(16, -4, 20 + sway, 40);
        c.stroke();
        c.beginPath();
        c.moveTo(-31 + sway, 35);
        c.lineTo(32 + sway, 35);
        c.stroke();
    }

    c.strokeStyle = stage >= 1 ? pal.trim : '#6b4a2b';
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(-20, -10);
    c.quadraticCurveTo(0, -5, 22, -10);
    c.stroke();

    if (stage >= 3 || pal.stars) {
        c.fillStyle = pal.trim;
        c.globalAlpha = 0.75;
        for (const [sx, sy, r] of [[-14, 8, 3], [2, 20, 2.5], [-8, -26, 2.5], [-20, 26, 2]]) {
            smallStar(c, sx, sy, r);
        }
        c.globalAlpha = 1;
    }

    // Scarf or collar
    if (stage >= 2) {
        const sw = Math.sin(t * 3) * 3;
        c.save();
        c.beginPath();
        c.moveTo(-4, -50);
        c.quadraticCurveTo(-12 + sw, -32, -8 + sw, -12);
        c.lineTo(1 + sw, -12);
        c.quadraticCurveTo(-1, -32, 5, -50);
        c.closePath();
        c.ellipse(3, -50, 15, 5.5, 0, 0, Math.PI * 2);
        c.save();
        c.clip();
        c.fillStyle = pal.robe;
        c.fillRect(-20, -60, 40, 50);
        c.fillStyle = pal.trim;
        for (let yy = -46; yy < -10; yy += 8) {
            c.fillRect(-20, yy, 40, 4);
        }
        for (let xx = -12; xx < 20; xx += 8) {
            c.fillRect(xx, -56, 4, 8);
        }
        c.restore();
        c.strokeStyle = WIZARD_INK;
        c.lineWidth = 1.5;
        c.stroke();
        c.restore();
    } else {
        c.strokeStyle = pal.robeLight;
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(-6, -52);
        c.lineTo(4, -42);
        c.lineTo(14, -52);
        c.stroke();
    }

    // Head
    const hy = -66 + Math.sin(t * 2.2) * 0.8;
    const skinTone = '#f2c9a0';
    c.fillStyle = skinTone;
    c.strokeStyle = WIZARD_INK;
    c.lineWidth = 2;
    c.beginPath();
    c.arc(6, hy, 14, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.lineWidth = 1.5;
    c.beginPath();
    c.ellipse(0, hy + 2, 3, 4.5, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    c.fillStyle = '#3b2416';
    c.beginPath();
    c.moveTo(-8, hy + 5);
    c.quadraticCurveTo(-13, hy - 14, 2, hy - 17);
    c.quadraticCurveTo(17, hy - 19, 22, hy - 6);
    c.lineTo(16, hy - 8);
    c.lineTo(15, hy - 3);
    c.lineTo(10, hy - 9);
    c.lineTo(5, hy - 5);
    c.lineTo(1, hy - 9);
    c.quadraticCurveTo(-4, hy - 2, -3, hy + 7);
    c.closePath();
    c.fill();

    c.fillStyle = WIZARD_INK;
    c.strokeStyle = WIZARD_INK;
    c.lineWidth = 1.8;
    const blink = o.blink ?? 1;
    if (o.happy > 0) {
        c.beginPath();
        c.moveTo(11, hy);
        c.quadraticCurveTo(14, hy - 4, 17, hy);
        c.stroke();
    } else {
        c.beginPath();
        c.ellipse(14, hy - 1, 1.9, 2.4 * Math.max(blink, 0.15), 0, 0, Math.PI * 2);
        c.fill();
    }
    c.beginPath();
    if (o.sad > 0) {
        c.moveTo(10, hy - 5);
        c.lineTo(17, hy - 7);
    } else {
        c.moveTo(10, hy - 7);
        c.lineTo(17, hy - 5);
    }
    c.stroke();
    c.beginPath();
    c.moveTo(19, hy - 1);
    c.quadraticCurveTo(23, hy + 3, 19, hy + 4);
    c.stroke();
    c.beginPath();
    if (cast > 0.3) {
        c.ellipse(16, hy + 8, 1.8, 2.4 * cast, 0, 0, Math.PI * 2);
        c.fill();
    } else if (o.sad > 0) {
        c.moveTo(13, hy + 9);
        c.quadraticCurveTo(15, hy + 7, 18, hy + 9);
        c.stroke();
    } else if (o.happy > 0) {
        c.moveTo(12, hy + 7);
        c.quadraticCurveTo(15, hy + 10, 18, hy + 7);
        c.stroke();
    } else {
        c.moveTo(13, hy + 8);
        c.lineTo(17, hy + 7.5);
        c.stroke();
    }

    // Arm and wand
    const hand = wizardHand(cast);
    c.strokeStyle = WIZARD_INK;
    c.lineWidth = 12;
    c.beginPath();
    c.moveTo(8, -44);
    c.lineTo(hand.x - 3, hand.y + 1);
    c.stroke();
    c.strokeStyle = pal.robe;
    c.lineWidth = 8.5;
    c.stroke();
    c.fillStyle = stage >= 1 ? pal.trim : pal.robeLight;
    c.beginPath();
    c.arc(hand.x - 4, hand.y + 1, 4.5, 0, Math.PI * 2);
    c.fill();

    const angle = -0.5 - cast * 0.35;
    const len = 30 + stage * 2;
    const tipX = hand.x + Math.cos(angle) * len;
    const tipY = hand.y + Math.sin(angle) * len;
    c.strokeStyle = '#3f2a14';
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(hand.x - 2, hand.y + 2);
    c.lineTo(tipX, tipY);
    c.stroke();
    c.strokeStyle = '#8a6a44';
    c.lineWidth = 1.5;
    c.stroke();

    c.fillStyle = skinTone;
    c.strokeStyle = WIZARD_INK;
    c.lineWidth = 1.5;
    c.beginPath();
    c.arc(hand.x, hand.y, 4.5, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    const glowR = 5 + cast * 16 + Math.sin(t * 5) * 1.5 + stage;
    const tipGlow = c.createRadialGradient(tipX, tipY, 0, tipX, tipY, glowR);
    tipGlow.addColorStop(0, 'rgba(255,255,255,0.95)');
    tipGlow.addColorStop(0.35, rgbaAny(pal.glow, 0.6 + 0.4 * cast));
    tipGlow.addColorStop(1, rgbaAny(pal.glow, 0));
    c.fillStyle = tipGlow;
    c.beginPath();
    c.arc(tipX, tipY, glowR, 0, Math.PI * 2);
    c.fill();

    for (const r of runes) {
        if (r.front) {
            drawRune(c, r.x, r.y, pal.glow, 0.9);
        }
    }
    c.restore();
}

function wizardTip(x, y, s, stage, t) {
    const hand = wizardHand(1);
    const angle = -0.85;
    const len = 30 + stage * 2;
    return {
        x: x + (hand.x + Math.cos(angle) * len) * s,
        y: y + (wizardLift(stage, t) + hand.y + Math.sin(angle) * len) * s,
    };
}

// Colour helper that also accepts hsl() strings (animated looks).
function rgbaAny(color, alpha) {
    if (color.startsWith('#')) {
        return rgba(color, alpha);
    }
    if (color.startsWith('hsl(')) {
        return color.replace('hsl(', 'hsla(').replace(')', `,${alpha})`);
    }
    return color;
}

function drawHero(style, c, x, y, s, o) {
    if (style === 'magic') {
        drawWizard(c, x, y, s, o);
    } else {
        drawDragon(c, x, y, s, o);
    }
}

function heroTip(style, x, y, s, stage, t) {
    return style === 'magic' ? wizardTip(x, y, s, stage, t) : dragonMouth(x, y, s, stage, t);
}

function drawEgg(c, x, y, s, t, cracks, wobble) {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.rotate(Math.sin(t * 18) * wobble * 0.18);
    const g = c.createRadialGradient(-12, -62, 6, 0, -44, 56);
    g.addColorStop(0, '#fffbeb');
    g.addColorStop(1, '#fcd34d');
    c.fillStyle = g;
    c.strokeStyle = '#b45309';
    c.lineWidth = 3;
    c.beginPath();
    c.ellipse(0, -44, 36, 46, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = '#4ade80';
    for (const [dx, dy, r] of [[-14, -58, 7], [12, -40, 9], [-8, -24, 6], [16, -70, 5], [-20, -38, 4]]) {
        c.beginPath();
        c.arc(dx, dy, r, 0, Math.PI * 2);
        c.fill();
    }
    c.strokeStyle = '#78350f';
    c.lineWidth = 2.5;
    const crackPaths = [
        [[-30, -50], [-18, -44], [-22, -34], [-8, -30]],
        [[30, -46], [18, -52], [20, -40], [8, -38]],
        [[-6, -88], [-2, -74], [-10, -66], [0, -58]],
        [[-34, -30], [-20, -22], [-26, -12]],
        [[32, -24], [20, -18], [24, -8]],
    ];
    for (let i = 0; i < Math.min(cracks, crackPaths.length); i++) {
        c.beginPath();
        for (const [j, [px, py]] of crackPaths[i].entries()) {
            if (j === 0) {
                c.moveTo(px, py);
            } else {
                c.lineTo(px, py);
            }
        }
        c.stroke();
    }
    c.restore();
}

// =====================================================================
// Enemies: cute blobs (dragon skin) and specters (magic skin)
// =====================================================================

function blobPath(c, r, t) {
    c.beginPath();
    const n = 30;
    for (let i = 0; i <= n; i++) {
        const a = (i / n) * Math.PI * 2;
        const wob = 1 + 0.035 * Math.sin(a * 3 + t * 3) + 0.025 * Math.sin(a * 5 - t * 2);
        const px = Math.cos(a) * r * wob;
        let py = Math.sin(a) * r * wob * 0.92;
        if (py > 0) {
            py *= 0.85;
        }
        if (i === 0) {
            c.moveTo(px, py);
        } else {
            c.lineTo(px, py);
        }
    }
    c.closePath();
}

function drawCrown(c, r, top) {
    c.fillStyle = '#facc15';
    c.strokeStyle = '#a16207';
    c.lineWidth = r * 0.035;
    c.beginPath();
    c.moveTo(-r * 0.4, top);
    c.lineTo(-r * 0.48, top - r * 0.42);
    c.lineTo(-r * 0.22, top - r * 0.2);
    c.lineTo(0, top - r * 0.52);
    c.lineTo(r * 0.22, top - r * 0.2);
    c.lineTo(r * 0.48, top - r * 0.42);
    c.lineTo(r * 0.4, top);
    c.closePath();
    c.fill();
    c.stroke();
    for (const [gx, gc] of [[-r * 0.2, '#ef4444'], [0, '#22d3ee'], [r * 0.2, '#22c55e']]) {
        c.fillStyle = gc;
        c.beginPath();
        c.arc(gx, top - r * 0.1, r * 0.05, 0, Math.PI * 2);
        c.fill();
    }
}

function drawMonster(c, x, y, r, mon, st) {
    const t = st.t;
    const col = mon.color;
    const dark = shade(col, -0.45);
    const light = shade(col, 0.45);
    c.save();
    c.translate(x, y + Math.sin(t * 3) * r * 0.05);
    if (st.rot) {
        c.rotate(st.rot);
    }
    const sq = st.squash || 0;
    c.scale(1 + sq * 0.3, 1 - sq * 0.3);
    if (st.alpha !== undefined) {
        c.globalAlpha = st.alpha;
    }
    c.lineJoin = 'round';
    c.lineCap = 'round';

    c.fillStyle = dark;
    for (const side of [-1, 1]) {
        c.beginPath();
        c.ellipse(side * r * 0.45, r * 0.78 + Math.sin(t * 6 + side) * r * 0.03, r * 0.28, r * 0.15, 0, 0, Math.PI * 2);
        c.fill();
    }

    if (mon.antenna) {
        c.strokeStyle = dark;
        c.lineWidth = r * 0.06;
        for (const side of mon.eyes === 1 ? [0] : [-1, 1]) {
            const tipX = side * r * 0.35 + Math.sin(t * 2 + side) * r * 0.08;
            c.beginPath();
            c.moveTo(side * r * 0.25, -r * 0.8);
            c.quadraticCurveTo(side * r * 0.4, -r * 1.15, tipX, -r * 1.3);
            c.stroke();
            c.fillStyle = light;
            c.beginPath();
            c.arc(tipX, -r * 1.3, r * 0.1, 0, Math.PI * 2);
            c.fill();
        }
    }

    if (mon.horns) {
        c.fillStyle = '#fef3c7';
        c.strokeStyle = dark;
        c.lineWidth = r * 0.04;
        for (const side of [-1, 1]) {
            c.beginPath();
            c.moveTo(side * r * 0.35, -r * 0.72);
            c.quadraticCurveTo(side * r * 0.75, -r * 0.95, side * r * 0.8, -r * 1.3);
            c.quadraticCurveTo(side * r * 0.55, -r * 1, side * r * 0.65, -r * 0.55);
            c.closePath();
            c.fill();
            c.stroke();
        }
    }

    if (mon.spikes) {
        c.fillStyle = dark;
        for (let i = 0; i < 5; i++) {
            const a = -Math.PI * 0.85 + i * (Math.PI * 0.7 / 4);
            const bx = Math.cos(a) * r * 0.92;
            const by = Math.sin(a) * r * 0.85;
            c.beginPath();
            c.moveTo(bx + Math.sin(a) * r * 0.12, by - Math.cos(a) * r * 0.12);
            c.lineTo(bx + Math.cos(a) * r * 0.32, by + Math.sin(a) * r * 0.32);
            c.lineTo(bx - Math.sin(a) * r * 0.12, by + Math.cos(a) * r * 0.12);
            c.closePath();
            c.fill();
        }
    }

    blobPath(c, r, t);
    const g = c.createRadialGradient(-r * 0.35, -r * 0.45, r * 0.1, 0, 0, r * 1.1);
    g.addColorStop(0, light);
    g.addColorStop(0.55, col);
    g.addColorStop(1, shade(col, -0.25));
    c.fillStyle = g;
    c.fill();
    c.lineWidth = r * 0.05;
    c.strokeStyle = dark;
    c.stroke();

    c.fillStyle = 'rgba(255,255,255,0.22)';
    c.beginPath();
    c.ellipse(0, r * 0.38, r * 0.55, r * 0.36, 0, 0, Math.PI * 2);
    c.fill();

    const eyeLayouts = {
        1: [[0, -0.22, 0.34]],
        2: [[-0.32, -0.25, 0.23], [0.32, -0.25, 0.23]],
        3: [[-0.42, -0.18, 0.19], [0, -0.42, 0.2], [0.42, -0.18, 0.19]],
    };
    const blinking = (t + x * 0.01) % 4.2 < 0.13;
    const look = st.look || { x: -1, y: 0 };
    for (const [ex, ey, es] of eyeLayouts[mon.eyes] || eyeLayouts[2]) {
        const cx = ex * r;
        const cy = ey * r;
        const er = es * r;
        if (blinking || st.dead) {
            c.strokeStyle = dark;
            c.lineWidth = r * 0.05;
            c.beginPath();
            if (st.dead) {
                c.moveTo(cx - er * 0.6, cy - er * 0.6);
                c.lineTo(cx + er * 0.6, cy + er * 0.6);
                c.moveTo(cx + er * 0.6, cy - er * 0.6);
                c.lineTo(cx - er * 0.6, cy + er * 0.6);
            } else {
                c.moveTo(cx - er, cy);
                c.quadraticCurveTo(cx, cy + er * 0.5, cx + er, cy);
            }
            c.stroke();
            continue;
        }
        c.fillStyle = 'white';
        c.beginPath();
        c.arc(cx, cy, er, 0, Math.PI * 2);
        c.fill();
        c.lineWidth = r * 0.03;
        c.strokeStyle = dark;
        c.stroke();
        c.fillStyle = '#1e1b4b';
        c.beginPath();
        c.arc(cx + look.x * er * 0.35, cy + look.y * er * 0.35, er * 0.5, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'white';
        c.beginPath();
        c.arc(cx + look.x * er * 0.35 + er * 0.18, cy + look.y * er * 0.35 - er * 0.2, er * 0.17, 0, Math.PI * 2);
        c.fill();
    }

    c.strokeStyle = dark;
    c.lineWidth = r * 0.05;
    if (st.laugh > 0 || st.hurt > 0) {
        const open = st.laugh > 0 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 18)) : 0.7;
        c.fillStyle = '#7f1d1d';
        c.beginPath();
        c.ellipse(0, r * 0.3, r * 0.3, r * 0.2 * open, 0, 0, Math.PI * 2);
        c.fill();
        c.stroke();
        c.fillStyle = '#fb7185';
        c.beginPath();
        c.ellipse(0, r * 0.38, r * 0.15, r * 0.07 * open, 0, 0, Math.PI * 2);
        c.fill();
    } else {
        c.beginPath();
        c.moveTo(-r * 0.3, r * 0.22);
        c.quadraticCurveTo(0, r * 0.45, r * 0.3, r * 0.22);
        c.stroke();
        if (mon.teeth) {
            c.fillStyle = 'white';
            for (const side of [-1, 1]) {
                c.beginPath();
                c.moveTo(side * r * 0.16, r * 0.3);
                c.lineTo(side * r * 0.1, r * 0.42);
                c.lineTo(side * r * 0.04, r * 0.32);
                c.closePath();
                c.fill();
            }
        }
    }

    c.fillStyle = 'rgba(244,63,94,0.3)';
    for (const side of [-1, 1]) {
        c.beginPath();
        c.arc(side * r * 0.55, r * 0.12, r * 0.1, 0, Math.PI * 2);
        c.fill();
    }

    if (mon.crown) {
        drawCrown(c, r, -r * 0.78);
    }

    if (st.flash > 0) {
        blobPath(c, r, t);
        c.fillStyle = `rgba(255,255,255,${st.flash})`;
        c.fill();
    }
    c.restore();
}

function cloakPath(c, r, t) {
    c.beginPath();
    c.moveTo(-r * 0.5, -r * 0.35);
    c.bezierCurveTo(-r * 0.58, -r * 1.08, r * 0.58, -r * 1.08, r * 0.5, -r * 0.35);
    c.bezierCurveTo(r * 0.78, r * 0.1, r * 0.82, r * 0.6, r * 0.72, r * 0.95);
    const n = 8;
    for (let i = 1; i <= n; i++) {
        const px = r * 0.72 - (r * 1.44 * i) / n;
        const py = r * (0.95 + (i % 2 ? -0.24 : 0.04)) + Math.sin(t * 4 + i * 1.7) * r * 0.06;
        c.lineTo(px, py);
    }
    c.bezierCurveTo(-r * 0.82, r * 0.6, -r * 0.78, r * 0.1, -r * 0.5, -r * 0.35);
    c.closePath();
}

function drawSpecter(c, x, y, r, mon, st) {
    const t = st.t;
    const glow = mon.glow;
    c.save();
    c.translate(x, y + Math.sin(t * 2) * r * 0.08 - r * 0.1);
    const sq = st.squash || 0;
    c.scale(1 + sq * 0.3, 1 - sq * 0.3);
    if (st.alpha !== undefined) {
        c.globalAlpha = st.alpha;
    }
    c.lineJoin = 'round';
    c.lineCap = 'round';

    const aura = c.createRadialGradient(0, -r * 0.2, r * 0.2, 0, -r * 0.2, r * 1.7);
    aura.addColorStop(0, rgba(glow, 0.28));
    aura.addColorStop(1, rgba(glow, 0));
    c.fillStyle = aura;
    c.beginPath();
    c.arc(0, -r * 0.2, r * 1.7, 0, Math.PI * 2);
    c.fill();

    if (mon.runes) {
        for (let i = 0; i < 4; i++) {
            const a = -t * 0.9 + (i / 4) * Math.PI * 2;
            drawRune(c, Math.cos(a) * r * 1.15, -r * 0.2 + Math.sin(a) * r * 0.35, glow, 0.8);
        }
    }

    if (mon.horns) {
        c.strokeStyle = '#d6cfc0';
        c.lineWidth = r * 0.09;
        for (const side of [-1, 1]) {
            c.beginPath();
            c.moveTo(side * r * 0.32, -r * 0.82);
            c.bezierCurveTo(side * r * 0.75, -r * 1.2, side * r * 0.95, -r * 0.7, side * r * 0.7, -r * 0.6);
            c.stroke();
        }
    }

    cloakPath(c, r, t);
    const g = c.createLinearGradient(0, -r, 0, r);
    g.addColorStop(0, shade(mon.color, 0.12));
    g.addColorStop(0.55, mon.color);
    g.addColorStop(1, rgba(mon.color, 0.1));
    c.fillStyle = g;
    c.fill();
    c.strokeStyle = 'rgba(0,0,0,0.6)';
    c.lineWidth = r * 0.03;
    c.stroke();

    // Wispy arms reaching toward the hero (to the left)
    const reach = (st.laugh > 0 ? 0.1 : 0) + Math.sin(t * 2.5) * 0.06;
    c.fillStyle = shade(mon.color, -0.15);
    c.strokeStyle = 'rgba(0,0,0,0.5)';
    for (const [ay, dir] of [[-0.05, 1], [0.25, -1]]) {
        c.beginPath();
        c.moveTo(-r * 0.45, r * (ay - 0.12));
        c.quadraticCurveTo(-r * (0.9 + reach), r * (ay - 0.1 * dir), -r * (1.05 + reach), r * (ay + 0.12));
        c.lineTo(-r * 0.5, r * (ay + 0.14));
        c.closePath();
        c.fill();
        c.lineWidth = r * 0.02;
        c.strokeStyle = 'rgba(0,0,0,0.5)';
        c.stroke();
        c.strokeStyle = '#d6cfc0';
        c.lineWidth = r * 0.025;
        for (let f = -1; f <= 1; f++) {
            c.beginPath();
            c.moveTo(-r * (1.02 + reach), r * (ay + 0.12));
            c.lineTo(-r * (1.18 + reach), r * (ay + 0.12 + f * 0.07));
            c.stroke();
        }
    }

    // Hood opening
    c.fillStyle = '#05030a';
    c.beginPath();
    c.ellipse(-r * 0.05, -r * 0.45, r * 0.33, r * 0.37, 0, 0, Math.PI * 2);
    c.fill();

    if (mon.mask) {
        c.fillStyle = '#e7e2d6';
        c.beginPath();
        c.ellipse(-r * 0.05, -r * 0.42, r * 0.24, r * 0.3, 0, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = 'rgba(0,0,0,0.35)';
        c.lineWidth = r * 0.02;
        c.beginPath();
        c.moveTo(-r * 0.05, -r * 0.7);
        c.lineTo(-r * 0.05, -r * 0.55);
        c.stroke();
    }

    // Glowing eyes
    const eyeColor = st.flash > 0.2 || st.hurt > 0 ? '#ffffff' : glow;
    for (const ex of [-0.16, 0.07]) {
        const cx = ex * r;
        const cy = -r * 0.47;
        const halo = c.createRadialGradient(cx, cy, 0, cx, cy, r * 0.16);
        halo.addColorStop(0, rgba(eyeColor === '#ffffff' ? '#ffffff' : glow, 0.9));
        halo.addColorStop(1, rgba(glow, 0));
        c.fillStyle = halo;
        c.beginPath();
        c.arc(cx, cy, r * 0.16, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = mon.mask ? '#05030a' : eyeColor;
        if (st.dead) {
            continue;
        }
        c.save();
        c.translate(cx, cy);
        if (st.laugh > 0) {
            c.translate(0, Math.sin(t * 30) * r * 0.01);
            c.strokeStyle = eyeColor;
            c.lineWidth = r * 0.035;
            c.beginPath();
            c.moveTo(-r * 0.06, r * 0.02);
            c.quadraticCurveTo(0, -r * 0.05, r * 0.06, r * 0.02);
            c.stroke();
        } else {
            c.rotate(ex < 0 ? 0.35 : -0.35);
            c.beginPath();
            c.ellipse(0, 0, r * 0.065, r * 0.03, 0, 0, Math.PI * 2);
            c.fill();
            if (mon.mask) {
                c.fillStyle = eyeColor;
                c.beginPath();
                c.arc(0, 0, r * 0.018, 0, Math.PI * 2);
                c.fill();
            }
        }
        c.restore();
    }

    if (mon.crown) {
        drawCrown(c, r, -r * 0.86);
    }

    if (st.flash > 0) {
        cloakPath(c, r, t);
        c.fillStyle = `rgba(255,255,255,${st.flash * 0.8})`;
        c.fill();
    }
    c.restore();
}

function drawEnemy(c, x, y, r, mon, st) {
    if (mon.kind === 'specter') {
        drawSpecter(c, x, y, r, mon, { ...st, rot: 0 });
    } else {
        drawMonster(c, x, y, r, mon, st);
    }
}

// =====================================================================
// Particles, floating texts, projectiles
// =====================================================================

const particles = [];
const floatTexts = [];
const fireballs = [];
let shake = 0;
let screenFlash = 0;
let screenFlashColor = '#7dd3fc';
let shownGems = 0;

function spawn(p) {
    particles.push({ age: 0, life: 1, g: 0, drag: 0, vx: 0, vy: 0, ...p });
}

function burst(x, y, colors, count, speed, opts = {}) {
    for (let i = 0; i < count; i++) {
        const a = rand(0, Math.PI * 2);
        const v = rand(speed * 0.3, speed);
        spawn({ type: 'spark', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, size: rand(3, 8) * (opts.size || 1), color: pick(colors), life: rand(0.4, 0.9), drag: 2.5, g: opts.g || 0 });
    }
}

function confetti(x, y, count) {
    const colors = isMagic()
        ? ['#fde68a', '#fbbf24', '#f5f5f4', '#c4b5fd', '#93c5fd']
        : ['#f472b6', '#facc15', '#22d3ee', '#4ade80', '#a78bfa', '#fb923c'];
    for (let i = 0; i < count; i++) {
        const a = rand(-Math.PI, 0);
        const v = rand(200, 650);
        spawn({ type: 'confetti', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, size: rand(6, 12), color: pick(colors), life: rand(1.6, 2.6), g: 600, drag: 1.2, rot: rand(0, 6), spin: rand(-10, 10) });
    }
}

function gemBurst(x, y, count) {
    const target = $('gemPill').getBoundingClientRect();
    for (let i = 0; i < count; i++) {
        const a = rand(-Math.PI * 0.9, -Math.PI * 0.1);
        const v = rand(150, 320);
        spawn({ type: 'gem', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, size: rand(9, 13), life: 1.3 + i * 0.06, g: 500, drag: 1.5, tx: target.left + 24, ty: target.top + target.height / 2, delay: 0.45 + i * 0.06 });
    }
}

function floatText(text, x, y, color, size = 34) {
    floatTexts.push({ text, x, y, color, size, age: 0, life: 1.3 });
}

function bumpGems() {
    if (!save) {
        return;
    }
    shownGems = Math.min(save.gems, shownGems + 1);
    $('gemCount').textContent = shownGems;
    const pill = $('gemPill');
    pill.classList.add('bump');
    setTimeout(() => pill.classList.remove('bump'), 120);
    Sound.gem();
}

function updateParticles(dt) {
    let write = 0;
    for (const p of particles) {
        p.age += dt;
        if (p.type === 'gem' && p.age > p.delay) {
            if (!p.homing) {
                p.homing = true;
                p.hx = p.x;
                p.hy = p.y;
                p.ha = p.age;
            }
            const k = clamp((p.age - p.ha) / 0.5, 0, 1);
            const e = k * k;
            p.x = lerp(p.hx, p.tx, e);
            p.y = lerp(p.hy, p.ty, e) - Math.sin(k * Math.PI) * 60;
            if (k >= 1) {
                bumpGems();
                continue;
            }
        } else {
            p.vx *= Math.max(0, 1 - p.drag * dt);
            p.vy *= Math.max(0, 1 - p.drag * dt);
            p.vy += p.g * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            if (p.rot !== undefined) {
                p.rot += p.spin * dt;
            }
            if (p.age >= p.life && p.type !== 'gem') {
                continue;
            }
        }
        particles[write++] = p;
    }
    particles.length = write;

    let fw = 0;
    for (const f of floatTexts) {
        f.age += dt;
        if (f.age < f.life) {
            floatTexts[fw++] = f;
        }
    }
    floatTexts.length = fw;
}

function drawGemShape(c, x, y, s, rot) {
    c.save();
    c.translate(x, y);
    c.rotate(rot);
    c.fillStyle = '#22d3ee';
    c.strokeStyle = '#0e7490';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(0, -s);
    c.lineTo(s * 0.85, -s * 0.25);
    c.lineTo(0, s);
    c.lineTo(-s * 0.85, -s * 0.25);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = '#cffafe';
    c.beginPath();
    c.moveTo(0, -s);
    c.lineTo(s * 0.3, -s * 0.25);
    c.lineTo(0, s * 0.6);
    c.lineTo(-s * 0.3, -s * 0.25);
    c.closePath();
    c.fill();
    c.restore();
}

function drawParticles(c, t) {
    for (const p of particles) {
        const k = clamp(p.age / p.life, 0, 1);
        switch (p.type) {
            case 'spark':
            case 'trail':
                c.globalCompositeOperation = 'lighter';
                c.globalAlpha = 1 - k;
                c.fillStyle = p.color;
                c.beginPath();
                c.arc(p.x, p.y, p.size * (1 - k * 0.7), 0, Math.PI * 2);
                c.fill();
                c.globalCompositeOperation = 'source-over';
                break;
            case 'smoke':
                c.globalAlpha = (1 - k) * 0.6;
                c.fillStyle = p.color || '#9ca3af';
                c.beginPath();
                c.arc(p.x, p.y, p.size * (0.6 + k * 1.4), 0, Math.PI * 2);
                c.fill();
                break;
            case 'ring':
                c.globalAlpha = 1 - k;
                c.strokeStyle = p.color;
                c.lineWidth = 6 * (1 - k) + 1;
                c.beginPath();
                c.arc(p.x, p.y, p.size * easeOutCubic(k), 0, Math.PI * 2);
                c.stroke();
                break;
            case 'confetti':
                c.globalAlpha = k > 0.8 ? (1 - k) * 5 : 1;
                c.save();
                c.translate(p.x, p.y);
                c.rotate(p.rot);
                c.scale(1, Math.abs(Math.sin(p.rot * 0.7)) + 0.2);
                c.fillStyle = p.color;
                c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                c.restore();
                break;
            case 'gem':
                c.globalAlpha = 1;
                drawGemShape(c, p.x, p.y, p.size, Math.sin(t * 6 + p.size) * 0.4);
                break;
            case 'shock': {
                const delay = p.delay || 0;
                if (p.age < delay) {
                    break;
                }
                const q = clamp((p.age - delay) / (p.life - delay), 0, 1);
                const radius = p.size * easeOutCubic(q);
                c.globalCompositeOperation = 'lighter';
                const halo = c.createRadialGradient(p.x, p.y, radius * 0.7, p.x, p.y, radius * 1.08);
                halo.addColorStop(0, rgba(p.color, 0));
                halo.addColorStop(0.8, rgba(p.color, 0.3 * (1 - q)));
                halo.addColorStop(1, rgba(p.color, 0));
                c.fillStyle = halo;
                c.beginPath();
                c.arc(p.x, p.y, radius * 1.08, 0, Math.PI * 2);
                c.fill();
                c.globalAlpha = 1 - q;
                c.strokeStyle = 'white';
                c.lineWidth = p.width * (1 - q) + 1;
                c.beginPath();
                c.ellipse(p.x, p.y, radius, radius * 0.9, 0, 0, Math.PI * 2);
                c.stroke();
                c.globalCompositeOperation = 'source-over';
                break;
            }
            case 'flash': {
                const q = p.grow ? 1 - k : k;
                const radius = p.size * (p.grow ? 0.4 + k * 0.8 : 0.6 + k * 0.6);
                c.globalCompositeOperation = 'lighter';
                c.globalAlpha = p.grow ? 0.4 + k * 0.6 : (1 - q) ** 2;
                const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
                g.addColorStop(0, 'rgba(255,255,255,1)');
                g.addColorStop(0.35, rgba(p.color, 0.8));
                g.addColorStop(1, rgba(p.color, 0));
                c.fillStyle = g;
                c.beginPath();
                c.arc(p.x, p.y, radius, 0, Math.PI * 2);
                c.fill();
                c.globalCompositeOperation = 'source-over';
                break;
            }
            case 'rays': {
                c.globalCompositeOperation = 'lighter';
                c.globalAlpha = 1 - k;
                c.strokeStyle = p.color;
                c.lineCap = 'round';
                const inner = p.size * 0.25 * easeOutCubic(k);
                const outer = p.size * easeOutCubic(k);
                for (let i = 0; i < p.count; i++) {
                    const a = p.rot + (i / p.count) * Math.PI * 2;
                    c.lineWidth = i % 2 ? 1.5 : 3;
                    const len = i % 2 ? 0.7 : 1;
                    c.beginPath();
                    c.moveTo(p.x + Math.cos(a) * inner, p.y + Math.sin(a) * inner);
                    c.lineTo(p.x + Math.cos(a) * outer * len, p.y + Math.sin(a) * outer * len);
                    c.stroke();
                }
                c.globalCompositeOperation = 'source-over';
                break;
            }
            case 'bolt':
                if (Math.random() < 0.8) {
                    drawBolt(c, p.pts, p.color, 1.4, 1 - k);
                }
                break;
            case 'charge': {
                const e = k * k;
                const x = lerp(p.sx, p.tx, e);
                const y = lerp(p.sy, p.ty, e);
                c.globalCompositeOperation = 'lighter';
                c.globalAlpha = 0.4 + 0.6 * k;
                c.fillStyle = p.color;
                c.beginPath();
                c.arc(x, y, p.size, 0, Math.PI * 2);
                c.fill();
                c.globalCompositeOperation = 'source-over';
                break;
            }
            default:
                break;
        }
    }
    c.globalAlpha = 1;
}

function drawFloatTexts(c) {
    const font = skin().canvasFont;
    for (const f of floatTexts) {
        const k = f.age / f.life;
        const pop = k < 0.15 ? easeOutCubic(k / 0.15) * 1.15 : 1.15 - Math.min(0.15, (k - 0.15));
        c.save();
        c.translate(f.x, f.y - k * 60);
        c.scale(pop, pop);
        c.globalAlpha = k > 0.75 ? (1 - k) * 4 : 1;
        c.font = `700 ${f.size}px ${font}`;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.lineWidth = 7;
        c.strokeStyle = isMagic() ? '#0b0712' : '#1e1b4b';
        c.lineJoin = 'round';
        c.strokeText(f.text, 0, 0);
        if (isMagic()) {
            c.shadowColor = f.color;
            c.shadowBlur = 14;
        }
        c.fillStyle = f.color;
        c.fillText(f.text, 0, 0);
        c.restore();
    }
}

function fireColors(combo) {
    const sets = skin().fireColors;
    if (combo >= 10) {
        return sets[2];
    }
    return combo >= 5 ? sets[1] : sets[0];
}

function heroScale() {
    return unit * skin().stages[stageIndex(save.gems)].scale;
}

const SPELL_CHARGE_MS = 180;

function wandTip() {
    return heroTip(save.style, heroPos.x, heroPos.y, heroScale(), stageIndex(save.gems), time);
}

function launchFireball({ power, colors, dodge = false, onHit }) {
    heroAnim.mouth = 1;
    Sound.fire(power, round?.combo || 0);
    if (!isMagic()) {
        releaseProjectile({ power, colors, dodge, onHit });
        return;
    }
    // Magic: the wand charges briefly (sparks are drawn into the tip), then the spell is released.
    const m = wandTip();
    for (let i = 0; i < 18; i++) {
        const a = rand(0, Math.PI * 2);
        const d = rand(40, 90) * unit;
        spawn({ type: 'charge', x: m.x + Math.cos(a) * d, y: m.y + Math.sin(a) * d, sx: m.x + Math.cos(a) * d, sy: m.y + Math.sin(a) * d, tx: m.x, ty: m.y, size: rand(2, 4), color: pick(colors.slice(0, 3)), life: SPELL_CHARGE_MS / 1000 });
    }
    spawn({ type: 'flash', x: m.x, y: m.y, size: 26 * unit, color: colors[1], life: SPELL_CHARGE_MS / 1000 + 0.05, grow: true });
    later(() => {
        heroAnim.mouth = 1;
        releaseProjectile({ power, colors, dodge, onHit });
    }, SPELL_CHARGE_MS);
}

function releaseProjectile({ power, colors, dodge, onHit }) {
    const m = wandTip();
    const magic = isMagic();
    fireballs.push({
        x0: m.x, y0: m.y, x1: monsterPos.x, y1: monsterPos.y,
        x: m.x, y: m.y, age: 0, dur: magic ? 0.42 : 0.55, power, colors, dodge, onHit, hit: false, magic,
    });
    burst(m.x, m.y, colors, 10, 160);
    if (magic) {
        shockBurst(m.x, m.y, colors, power * 0.75, 3);
        shake = Math.max(shake, 4 * power);
    }
}

// Jagged lightning path via midpoint displacement.
function makeBolt(x0, y0, x1, y1, displace) {
    let pts = [[x0, y0], [x1, y1]];
    let disp = displace;
    for (let it = 0; it < 5; it++) {
        const next = [pts[0]];
        for (let i = 1; i < pts.length; i++) {
            const [ax, ay] = pts[i - 1];
            const [bx, by] = pts[i];
            const len = Math.hypot(bx - ax, by - ay) || 1;
            const off = rand(-disp, disp);
            next.push([(ax + bx) / 2 - ((by - ay) / len) * off, (ay + by) / 2 + ((bx - ax) / len) * off], [bx, by]);
        }
        pts = next;
        disp *= 0.55;
    }
    return pts;
}

function drawBolt(c, pts, color, width, alpha) {
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.globalAlpha = alpha;
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.beginPath();
    for (const [i, [x, y]] of pts.entries()) {
        if (i === 0) {
            c.moveTo(x, y);
        } else {
            c.lineTo(x, y);
        }
    }
    c.shadowColor = color;
    c.shadowBlur = 16;
    c.strokeStyle = color;
    c.lineWidth = width * 2.4;
    c.stroke();
    c.shadowBlur = 0;
    c.strokeStyle = 'white';
    c.lineWidth = width * 0.8;
    c.stroke();
    c.restore();
}

// Expanding shockwave rings, a flash and light rays (the spell's signature).
function shockBurst(x, y, colors, power, rings) {
    spawn({ type: 'flash', x, y, size: 70 * unit * power, color: colors[1], life: 0.3 });
    for (let i = 0; i < rings; i++) {
        const delay = i * 0.07;
        spawn({ type: 'shock', x, y, size: (80 + i * 45) * unit * power, width: 7 - i, color: i % 2 ? colors[1] : colors[2], delay, life: delay + 0.55 });
    }
    spawn({ type: 'rays', x, y, size: 90 * unit * power, color: colors[1], count: 12, rot: rand(0, Math.PI), life: 0.4 });
    screenFlash = Math.max(screenFlash, 0.08 + 0.06 * power);
    screenFlashColor = colors[2];
}

function impactBurst(x, y, colors, power) {
    shockBurst(x, y, colors, power * 1.3, 4);
    const branches = 4 + Math.round(power * 2);
    for (let i = 0; i < branches; i++) {
        const a = rand(0, Math.PI * 2);
        const len = rand(60, 130) * unit * power;
        spawn({ type: 'bolt', x, y, pts: makeBolt(x, y, x + Math.cos(a) * len, y + Math.sin(a) * len, len * 0.25), color: colors[2], life: rand(0.18, 0.32) });
    }
    screenFlash = Math.max(screenFlash, 0.18 + 0.06 * power);
}

function updateFireballs(dt) {
    let write = 0;
    for (const f of fireballs) {
        f.age += dt;
        const k = f.age / f.dur;
        const arc = Math.min(H * 0.18, Math.abs(f.x1 - f.x0) * 0.25);
        if (f.dodge) {
            f.x = lerp(f.x0, f.x1 + W * 0.3, k);
            f.y = lerp(f.y0, f.y1, k) - Math.sin(Math.min(k, 1) * Math.PI) * arc;
        } else {
            f.x = lerp(f.x0, f.x1, Math.min(k, 1));
            f.y = lerp(f.y0, f.y1, Math.min(k, 1)) - Math.sin(Math.min(k, 1) * Math.PI) * arc;
        }
        const r = 16 * unit * f.power;
        for (let i = 0; i < 3; i++) {
            spawn({ type: 'trail', x: f.x + rand(-r, r) * 0.4, y: f.y + rand(-r, r) * 0.4, vx: rand(-40, 40), vy: rand(-60, 10), size: r * rand(0.4, 0.8) * (f.magic ? 0.6 : 1), color: pick(f.colors.slice(1)), life: rand(0.25, 0.45) });
        }
        if (!f.dodge && k >= 1 && !f.hit) {
            f.hit = true;
            const big = f.power;
            burst(f.x, f.y, f.colors, Math.round(26 * big), 420 * big);
            spawn({ type: 'ring', x: f.x, y: f.y, size: 90 * unit * big, color: f.colors[2], life: 0.45 });
            if (f.magic) {
                impactBurst(f.x, f.y, f.colors, big);
            }
            for (let i = 0; i < 6; i++) {
                spawn({ type: 'smoke', x: f.x + rand(-20, 20), y: f.y + rand(-20, 20), vx: rand(-50, 50), vy: rand(-80, -20), size: rand(10, 20) * unit, life: rand(0.6, 1), color: f.magic ? '#4c3d6b' : '#6b7280' });
            }
            shake = Math.max(shake, 12 * big);
            Sound.hit();
            f.onHit?.();
            continue;
        }
        if (f.dodge && k >= 1.4) {
            f.onHit?.();
            continue;
        }
        fireballs[write++] = f;
    }
    fireballs.length = write;
}

function drawFireballs(c, t) {
    for (const f of fireballs) {
        const r = 16 * unit * f.power;
        if (f.magic && f.age < f.dur) {
            const k = f.age / f.dur;
            const len = Math.hypot(f.x - f.x0, f.y - f.y0);
            const tip = wandTip();
            drawBolt(c, makeBolt(tip.x, tip.y, f.x, f.y, len * 0.12), f.colors[2], 1.6 + f.power, 1 - k * 0.7);
            if (Math.random() < 0.5) {
                const mx = lerp(tip.x, f.x, rand(0.3, 0.7));
                const my = lerp(tip.y, f.y, rand(0.3, 0.7));
                drawBolt(c, makeBolt(mx, my, mx + rand(-40, 40) * unit, my + rand(-50, 50) * unit, 12 * unit), f.colors[1], 1, 0.7 - k * 0.5);
            }
        }
        c.globalCompositeOperation = 'lighter';
        const g = c.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 2.2);
        g.addColorStop(0, f.colors[0]);
        g.addColorStop(0.3, f.colors[1]);
        g.addColorStop(0.6, rgba(f.colors[2], 0.7));
        g.addColorStop(1, rgba(f.colors[3], 0));
        c.fillStyle = g;
        c.beginPath();
        c.arc(f.x, f.y, r * 2.2, 0, Math.PI * 2);
        c.fill();
        c.globalCompositeOperation = 'source-over';
        if (f.magic) {
            c.save();
            c.translate(f.x, f.y);
            c.rotate(t * 8);
            c.fillStyle = 'white';
            smallStar(c, 0, 0, r * 1.3);
            c.rotate(Math.PI / 4);
            c.globalAlpha = 0.6;
            smallStar(c, 0, 0, r * 0.8);
            c.restore();
        }
    }
}

// =====================================================================
// Game state
// =====================================================================

let screen = 'menu';
let time = 0;
let round = null;
let roundTimers = [];
const heroAnim = { mouth: 0, sad: 0, happy: 0 };
const monsterAnim = { flash: 0, squash: 0, laugh: 0, hurt: 0, enter: 0, jump: 0, dead: false, deadAge: 0 };
let bubble = null;

function later(fn, ms) {
    const id = setTimeout(fn, ms);
    roundTimers.push(id);
}

function clearTimers() {
    for (const id of roundTimers) {
        clearTimeout(id);
    }
    roundTimers = [];
}

function makeQuestion(a, b, missing) {
    const product = a * b;
    let answer = product;
    if (missing === 'a') {
        answer = a;
    } else if (missing === 'b') {
        answer = b;
    }
    return { a, b, product, missing, answer, attempts: 0, retry: false };
}

function orient(table, k, allowMissing) {
    const tableFirst = Math.random() < 0.5;
    const a = tableFirst ? table : k;
    const b = tableFirst ? k : table;
    let missing = null;
    if (allowMissing && Math.random() < 0.3) {
        missing = tableFirst ? 'b' : 'a';
    }
    return makeQuestion(a, b, missing);
}

function buildTableRound(table) {
    const advanced = (save.stars[table] || 0) >= 1;
    const ks = shuffle(TABLES).slice(0, ROUND_LENGTH);
    return ks.map((k) => orient(table, k, advanced && k !== 1));
}

function factWeight(a, b) {
    const f = peekFact(a, b);
    if (!f) {
        return 5;
    }
    return Math.max(1, 6 - f.box) + (f.wrong > 0 ? 2 : 0);
}

function bossTables() {
    const played = TABLES.filter((t) => (save.stars[t] || 0) > 0);
    return played.length >= 3 ? played : TABLES;
}

function buildBossRound() {
    const pool = new Map();
    for (const table of bossTables()) {
        for (let k = 2; k <= 10; k++) {
            pool.set(factKey(table, k), [table, k]);
        }
    }
    const entries = [...pool.values()];
    const chosen = [];
    while (chosen.length < BOSS_LENGTH && entries.length > 0) {
        const weights = entries.map(([a, b]) => factWeight(a, b));
        let roll = Math.random() * weights.reduce((s, w) => s + w, 0);
        let index = 0;
        while (index < weights.length - 1 && roll > weights[index]) {
            roll -= weights[index];
            index++;
        }
        chosen.push(entries.splice(index, 1)[0]);
    }
    return chosen.map(([table, k]) => orient(table, k, true));
}

function practiceFacts() {
    return Object.entries(save.facts)
        .filter(([, f]) => f.seen > 0 && (f.box <= 1 || (f.wrong > 0 && f.box < 3)))
        .sort((x, y) => x[1].box - y[1].box || y[1].wrong - x[1].wrong)
        .slice(0, ROUND_LENGTH)
        .map(([key]) => key.split('x').map(Number));
}

function buildPracticeRound() {
    return shuffle(practiceFacts()).map(([a, b]) => (Math.random() < 0.5 ? makeQuestion(a, b, null) : makeQuestion(b, a, null)));
}

function recommendedTable() {
    return RECOMMENDED_ORDER.find((t) => !save.stars[t]) ?? RECOMMENDED_ORDER.find((t) => (save.stars[t] || 0) < 3) ?? null;
}

function bossUnlocked() {
    return TABLES.filter((t) => (save.stars[t] || 0) > 0).length >= 3;
}

// =====================================================================
// Round flow
// =====================================================================

function startRound(mode, table) {
    Sound.ensure();
    const sk = skin();
    let queue;
    let world;
    if (mode === 'table') {
        queue = buildTableRound(table);
        world = sk.worlds[table - 1];
    } else if (mode === 'boss') {
        queue = buildBossRound();
        world = sk.boss;
    } else {
        queue = buildPracticeRound();
        world = sk.practice;
    }
    if (queue.length === 0) {
        return;
    }
    clearTimers();
    fireballs.length = 0;
    round = {
        mode, table, world, queue, total: queue.length, hp: queue.length,
        mistakes: 0, combo: 0, bestCombo: 0, gemsEarned: 0, fastest: Infinity,
        wrongFacts: new Map(), input: '', locked: true, current: null, finished: false,
        startStage: stageIndex(save.gems),
    };
    Object.assign(monsterAnim, { flash: 0, squash: 0, laugh: 0, hurt: 0, enter: 1, jump: 0, dead: false, deadAge: 0 });
    Object.assign(heroAnim, { mouth: 0, sad: 0, happy: 0 });
    setTheme(world);
    showScreen('play');
    $('questionCard').innerHTML = '<span class="ready">Mach dich bereit …</span>';
    updateCombo();
    hideHint();

    let intro = sk.intro(world, table);
    if (mode === 'boss') {
        intro = sk.bossIntro;
    } else if (mode === 'practice') {
        intro = sk.practiceIntro;
    }
    bubble = { text: intro, age: 0, life: 3 };
    later(nextQuestion, 1300);
}

function nextQuestion() {
    if (!round || round.finished) {
        return;
    }
    if (round.queue.length === 0) {
        finishRound();
        return;
    }
    round.current = round.queue.shift();
    round.current.shownAt = performance.now();
    round.input = '';
    round.locked = false;
    hideHint();
    renderQuestion('pop');
}

function renderQuestion(anim) {
    const card = $('questionCard');
    const q = round?.current;
    if (!q) {
        return;
    }
    const slot = `<span class="slot ${round.input ? 'filled' : ''}">${round.input || '?'}</span>`;
    const num = (n) => `<span class="num">${n}</span>`;
    const op = (s) => `<span class="op">${s}</span>`;
    let parts;
    if (q.missing === 'a') {
        parts = [slot, op('·'), num(q.b), op('='), num(q.product)];
    } else if (q.missing === 'b') {
        parts = [num(q.a), op('·'), slot, op('='), num(q.product)];
    } else {
        parts = [num(q.a), op('·'), num(q.b), op('='), slot];
    }
    card.innerHTML = parts.join('');
    if (anim) {
        card.classList.remove('pop', 'shake', 'right', 'wrong');
        void card.offsetWidth;
        card.classList.add(anim);
        if (anim === 'shake') {
            card.classList.add('wrong');
        }
    }
}

function pressKey(key) {
    if (screen !== 'play' || !round || round.locked) {
        return;
    }
    if (key === 'Backspace') {
        round.input = round.input.slice(0, -1);
        Sound.click();
        renderQuestion();
    } else if (key === 'Enter') {
        submit();
    } else if (/^\d$/.test(key) && round.input.length < 3) {
        round.input = round.input === '0' ? key : round.input + key;
        Sound.click();
        renderQuestion();
        $('questionCard').classList.remove('wrong');
    }
}

function submit() {
    const q = round.current;
    if (!q || !round.input) {
        return;
    }
    const value = Number.parseInt(round.input, 10);
    const ms = performance.now() - q.shownAt;
    if (value === q.answer) {
        onCorrect(q, ms);
    } else {
        onWrong(q, value);
    }
}

function onCorrect(q, ms) {
    const sk = skin();
    round.locked = true;
    const card = $('questionCard');
    card.classList.remove('wrong', 'shake');
    card.classList.add('right');
    const fact = getFact(q.a, q.b);
    fact.seen++;
    save.totalCorrect++;
    const clean = q.attempts === 0;
    const textX = heroPos.x;
    const textY = heroPos.y - 120 * unit;

    if (!clean) {
        // Corrected after a mistake: the enemy dodges; the task returns later.
        floatText(sk.correction, W / 2, groundY - H * 0.28, '#a7f3d0', 26);
        Sound.soft();
        launchFireball({
            power: 0.6, colors: sk.fireColors[0], dodge: true,
            onHit: () => later(nextQuestion, 250),
        });
        monsterAnim.jump = 1;
        persist();
        return;
    }

    round.combo++;
    round.bestCombo = Math.max(round.bestCombo, round.combo);
    save.bestCombo = Math.max(save.bestCombo, round.combo);
    round.fastest = Math.min(round.fastest, ms);
    if (!q.retry) {
        fact.box = Math.min(5, fact.box + 1);
    }
    const fast = ms < FAST_MS;
    if (ms < 2000) {
        unlockSticker('flash');
    }
    if (round.combo >= 5) {
        unlockSticker('combo5');
    }
    if (round.combo >= 10) {
        unlockSticker('combo10');
    }
    if (save.totalCorrect >= 100) {
        unlockSticker('hundred');
    }
    const gems = 1 + (round.combo >= 3 ? 1 : 0) + (round.combo >= 6 ? 1 : 0) + (fast ? 1 : 0);
    let text = pick(sk.praise);
    if (round.combo >= 3) {
        text = `${round.combo}er-${sk.comboWord}!`;
    } else if (fast) {
        text = 'Blitzschnell!';
    }
    floatText(text, textX, textY, round.combo >= 5 ? '#67e8f9' : '#fde047');
    Sound.correct(round.combo);
    updateCombo();
    heroAnim.happy = 0.8;

    const power = Math.min(1.8, 0.9 + round.combo * 0.08);
    const thisRound = round;
    launchFireball({
        power, colors: fireColors(round.combo),
        onHit: () => {
            if (round !== thisRound) {
                return;
            }
            round.hp = Math.max(0, round.hp - 1);
            monsterAnim.flash = 1;
            monsterAnim.squash = 0.6;
            monsterAnim.hurt = 0.5;
            save.gems += gems;
            round.gemsEarned += gems;
            gemBurst(monsterPos.x, monsterPos.y, gems);
            floatText(`+${gems}`, monsterPos.x, monsterPos.y - 80 * unit, '#67e8f9', 30);
            persist();
            later(nextQuestion, 650);
        },
    });
}

function onWrong(q, value) {
    const sk = skin();
    q.attempts++;
    const fact = getFact(q.a, q.b);
    if (q.attempts === 1) {
        round.mistakes++;
        fact.wrong++;
        fact.seen++;
        fact.box = 0;
        round.wrongFacts.set(factKey(q.a, q.b), q);
        const retry = { ...q, attempts: 0, retry: true };
        round.queue.splice(Math.min(2, round.queue.length), 0, retry);
    }
    round.combo = 0;
    updateCombo();
    Sound.wrong();
    heroAnim.sad = 1.4;
    monsterAnim.laugh = 1.2;
    bubble = { text: pick(sk.taunts), age: 0, life: 1.6 };

    // The spell fizzles into a puff of smoke.
    const stage = stageIndex(save.gems);
    const m = heroTip(save.style, heroPos.x, heroPos.y, heroScale(), stage, time);
    for (let i = 0; i < 8; i++) {
        spawn({ type: 'smoke', x: m.x, y: m.y, vx: rand(20, 90), vy: rand(-60, -10), size: rand(6, 12) * unit, life: rand(0.7, 1.1), color: sk.fizzle });
    }

    round.input = '';
    renderQuestion('shake');
    showHint(q, value);
    persist();
}

function finishRound() {
    round.finished = true;
    round.locked = true;
    monsterAnim.dead = true;
    monsterAnim.deadAge = 0;
    confetti(monsterPos.x, monsterPos.y, 90);
    burst(monsterPos.x, monsterPos.y, fireColors(10).concat(['#fde047', '#ffffff']), 50, 600);
    Sound.win();
    shake = 16;

    let stars = 1;
    if (round.mistakes === 0) {
        stars = 3;
    } else if (round.mistakes <= 2) {
        stars = 2;
    }
    round.stars = stars;
    if (round.mode === 'table') {
        save.stars[round.table] = Math.max(save.stars[round.table] || 0, stars);
    }
    unlockSticker('firstWin');
    if (round.mistakes === 0) {
        unlockSticker('perfect');
    }
    if (round.mode === 'boss') {
        unlockSticker('boss');
    }
    if (round.mode === 'practice') {
        unlockSticker('practice');
    }
    if (TABLES.every((t) => (save.stars[t] || 0) > 0)) {
        unlockSticker('explorer');
    }
    if (TABLES.every((t) => save.stars[t] === 3)) {
        unlockSticker('allStars');
    }
    const stage = stageIndex(save.gems);
    if (stage >= 1) {
        unlockSticker('grow');
    }
    if (stage >= 4) {
        unlockSticker('legend');
    }
    persist();
    later(showResult, 1700);
}

function quitRound() {
    clearTimers();
    fireballs.length = 0;
    round = null;
    bubble = null;
    if (save) {
        shownGems = save.gems;
        $('gemCount').textContent = shownGems;
    }
}

// =====================================================================
// Hints
// =====================================================================

const TIP_ORDER = [1, 10, 2, 5, 9, 4, 3, 6, 8, 7];

function strategyTip(a, b) {
    const f = TIP_ORDER.find((x) => x === a || x === b);
    const n = f === a ? b : a;
    switch (f) {
        case 1:
            return 'Mal 1 ist leicht: Die Zahl bleibt, wie sie ist.';
        case 10:
            return `<strong>· 10:</strong> Hänge an die ${n} einfach eine Null an.`;
        case 2:
            return `<strong>· 2</strong> heißt verdoppeln: ${n} + ${n} = ?`;
        case 5:
            return `<strong>· 5</strong> ist die Hälfte von · 10: 10 · ${n} = ${10 * n}. Die Hälfte davon ist …?`;
        case 9:
            return `<strong>· 9</strong> ist eins weniger als · 10: 10 · ${n} = ${10 * n}, dann minus ${n}.`;
        case 4:
            return `<strong>· 4</strong> heißt zweimal verdoppeln: ${n} → ${2 * n} → ?`;
        case 3:
            return `2 · ${n} = ${2 * n}, dazu noch einmal ${n}.`;
        case 6:
            return `5 · ${n} = ${5 * n}, dazu noch einmal ${n}.`;
        case 8:
            return `<strong>· 8</strong> heißt dreimal verdoppeln: ${n} → ${2 * n} → ${4 * n} → ?`;
        default:
            return `5 · ${n} = ${5 * n}, dazu noch 2 · ${n} = ${2 * n}.`;
    }
}

function showHint(q, value) {
    const panel = $('hintPanel');
    let html = '';
    if (q.attempts >= 2) {
        html = `<div>Die richtige Lösung ist:</div><div class="solution">${q.a} · ${q.b} = ${q.product}</div><div>Tippe <strong>${q.answer}</strong> ein!</div>`;
    } else if (q.missing) {
        const known = q.missing === 'a' ? q.b : q.a;
        const steps = [1, 2, 3].map((i) => i * known).join(', ');
        html = `<div>Zähle in <strong>${known}er-Schritten</strong> bis ${q.product}:</div><div>${steps}, … Wie viele Schritte sind das?</div>`;
    } else {
        const diff = Math.abs(value - q.product);
        if (diff > 0 && diff <= 2) {
            html += '<div class="near">Ganz knapp daneben!</div>';
        } else if (diff === q.a || diff === q.b) {
            html += '<div class="near">Ganz nah! Du bist genau eine Reihe daneben.</div>';
        }
        html += `<div>${strategyTip(q.a, q.b)}</div>`;
        html += dotsHtml(q.a, q.b);
    }
    panel.innerHTML = html;
    panel.classList.remove('show');
    void panel.offsetWidth;
    panel.classList.add('show');
}

// a rows of b dots, grouped in fives ("Kraft der Fünf").
function dotsHtml(rows, cols) {
    let html = '<div class="dots">';
    for (let r = 0; r < rows; r++) {
        html += `<div class="dot-row${r === 5 ? ' gap-top' : ''}">`;
        for (let c = 0; c < cols; c++) {
            html += `<span class="dot${c === 5 ? ' gap-left' : ''}" style="animation-delay:${(r * 0.06 + c * 0.015).toFixed(2)}s"></span>`;
        }
        html += '</div>';
    }
    return html + '</div>';
}

function hideHint() {
    $('hintPanel').classList.remove('show');
}

function updateCombo() {
    const badge = $('comboBadge');
    const combo = round?.combo || 0;
    const sk = skin();
    badge.classList.toggle('show', combo >= 2);
    badge.classList.toggle('hot', combo >= 5 && combo < 10);
    badge.classList.toggle('mega', combo >= 10);
    let level = 0;
    if (combo >= 10) {
        level = 2;
    } else if (combo >= 5) {
        level = 1;
    }
    badge.textContent = `${sk.comboIcons[level]} ${combo}er-${sk.comboWord}`;
}

// =====================================================================
// Stickers and toast
// =====================================================================

const toastQueue = [];
let toastBusy = false;

function unlockSticker(id) {
    if (save.stickers[id]) {
        return;
    }
    save.stickers[id] = Date.now();
    persist();
    const sk = skin();
    const [emo, name] = sk.stickers[id];
    toastQueue.push({ emo, name, label: sk.stickerLabel });
    runToasts();
}

function runToasts() {
    if (toastBusy || toastQueue.length === 0) {
        return;
    }
    toastBusy = true;
    const item = toastQueue.shift();
    $('toastEmo').textContent = item.emo;
    $('toastText').textContent = item.name;
    $('toastLabel').textContent = item.label;
    $('toast').classList.add('show');
    Sound.sparkle();
    setTimeout(() => {
        $('toast').classList.remove('show');
        setTimeout(() => {
            toastBusy = false;
            runToasts();
        }, 500);
    }, 2400);
}

// =====================================================================
// Skin application and screens
// =====================================================================

function applySkin() {
    const sk = skin();
    document.body.classList.toggle('magic', isMagic());
    document.title = sk.title;
    $('menuTitle').textContent = sk.title;
    $('menuSubtitle').textContent = sk.subtitle;
    $('lairBtn').textContent = sk.lairLabel;
    $('mapBtn').textContent = sk.mapLabel;
    $('worldsTitle').textContent = sk.worldsTitle;
    $('specialTitle').textContent = sk.specialTitle;
    $('colorsTitle').textContent = sk.colorsTitle;
    $('stickersTitle').textContent = sk.stickersTitle;
    $('fireKey').textContent = sk.fireLabel;
    shownGems = save ? save.gems : 0;
    $('gemCount').textContent = shownGems;
}

const NO_PROFILE_SCREENS = new Set(['profiles', 'newProfile']);

function showScreen(id) {
    screen = id;
    for (const el of document.querySelectorAll('.screen')) {
        el.classList.toggle('active', el.id === id || (id === 'result' && el.id === 'play'));
    }
    if (id === 'result') {
        hideHint();
        $('comboBadge').classList.remove('show');
    }
    if (NO_PROFILE_SCREENS.has(id)) {
        document.body.classList.remove('magic');
    }

    const sk = skin();
    if (id === 'menu') {
        buildMenu();
        setTheme(sk.worlds[0]);
    } else if (id === 'starmap') {
        buildStarMap();
        setTheme(sk.worlds[sk.mapWorld]);
    } else if (id === 'lair') {
        buildLair();
        setTheme(sk.worlds[sk.lairWorld]);
    } else if (id === 'profiles') {
        buildProfiles();
        setTheme(DRAGON_WORLDS[0]);
    } else if (id === 'newProfile') {
        buildNewProfile();
        setTheme(DRAGON_WORLDS[0]);
    } else if (id === 'hatch') {
        setTheme(DRAGON_WORLDS[0]);
    }
    layoutScene();
}

function goHome() {
    Sound.click();
    quitRound();
    showScreen('menu');
}

function starsHtml(n) {
    let html = '';
    for (let i = 0; i < 3; i++) {
        html += `<span class="${i < n ? 'star-on' : 'star-off'}">★</span>`;
    }
    return html;
}

function progressInfo() {
    const sk = skin();
    const stage = stageIndex(save.gems);
    const nextGems = GEM_STEPS[stage + 1];
    if (nextGems === undefined) {
        return { stage, pct: 100, label: isMagic() ? 'Höchster Rang erreicht – du bist Erzmagier!' : 'Höchste Stufe erreicht – dein Drache ist eine Legende!' };
    }
    const from = GEM_STEPS[stage];
    const pct = ((save.gems - from) / (nextGems - from)) * 100;
    return { stage, pct, label: `Noch ${nextGems - save.gems} 💎 bis zur nächsten Stufe: ${sk.stages[stage + 1].name}` };
}

// Mini canvases (cards, lair, hatch) are redrawn in the main loop.
const minis = new Set();

function registerMini(canvas, draw) {
    minis.add({ canvas, draw });
}

function drawMinis(t) {
    for (const m of minis) {
        const cv = m.canvas;
        if (!cv.isConnected) {
            minis.delete(m);
            continue;
        }
        if (cv.offsetParent === null) {
            continue;
        }
        const rect = cv.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > H || rect.width === 0) {
            continue;
        }
        const w = Math.round(rect.width * DPR);
        const h = Math.round(rect.height * DPR);
        if (cv.width !== w || cv.height !== h) {
            cv.width = w;
            cv.height = h;
        }
        const c = cv.getContext('2d');
        c.setTransform(DPR, 0, 0, DPR, 0, 0);
        c.clearRect(0, 0, rect.width, rect.height);
        m.draw(c, rect.width, rect.height, t);
    }
}

function drawHeroFitted(c, w, h, t, profile, size = 1) {
    const sk = SKINS[profile.style];
    const stage = stageIndex(profile.gems);
    const s = Math.min(w / 260, h / 200) * size * sk.stages[stage].scale;
    const blink = (t % 3.7) < 0.12 ? 0.1 : 1;
    c.fillStyle = profile.style === 'magic' ? 'rgba(0,0,0,0.35)' : 'rgba(30,27,75,0.15)';
    c.beginPath();
    c.ellipse(w / 2, h * 0.62 + 44 * s, 70 * s, 9 * s, 0, 0, Math.PI * 2);
    c.fill();
    const x = profile.style === 'magic' ? w / 2 - 6 * s : w / 2 + 6 * s;
    drawHero(profile.style, c, x, h * 0.62, s, { t, stage, pal: heroLook(profile, t), blink });
}

function buildMenu() {
    const sk = skin();
    $('menuHeroName').textContent = heroName();
    const info = progressInfo();
    $('menuHeroStage').textContent = isMagic() ? `Rang: ${sk.stages[info.stage].name}` : sk.stages[info.stage].name;
    $('menuProgress').style.width = `${info.pct}%`;
    $('menuProgressLabel').textContent = info.label;

    const grid = $('worldGrid');
    grid.innerHTML = '';
    const rec = recommendedTable();
    for (const table of TABLES) {
        const w = sk.worlds[table - 1];
        const card = document.createElement('button');
        card.className = 'world-card';
        card.style.setProperty('--sky1', w.sky[0]);
        card.style.setProperty('--sky2', w.sky[1]);
        card.style.setProperty('--ground', w.hills[2]);
        card.innerHTML = `<canvas></canvas><span class="world-table">${table}er-Reihe</span><span class="world-name">${w.name}</span><span class="world-stars">${starsHtml(save.stars[table] || 0)}</span>${table === rec ? '<span class="badge">Tipp!</span>' : ''}`;
        card.addEventListener('click', () => {
            Sound.click();
            startRound('table', table);
        });
        card.addEventListener('pointerenter', () => setTheme(w));
        registerMini(card.querySelector('canvas'), (c, cw, ch, t) => {
            drawEnemy(c, cw / 2, ch * 0.52, Math.min(cw, ch) * 0.3, w.monster, { t: t + table, look: { x: Math.sin(t + table), y: 0.3 } });
        });
        grid.append(card);
    }

    const special = $('specialGrid');
    special.innerHTML = '';
    const bossOpen = bossUnlocked();
    const practiceCount = practiceFacts().length;
    const specials = [
        {
            world: sk.boss, locked: !bossOpen, title: sk.bossCard.title,
            text: bossOpen ? sk.bossCard.open : sk.bossCard.locked,
            action: () => startRound('boss'),
        },
        {
            world: sk.practice, locked: practiceCount === 0, title: sk.practiceCard.title,
            text: practiceCount > 0 ? sk.practiceCard.open(practiceCount) : sk.practiceCard.none,
            action: () => startRound('practice'),
        },
    ];
    for (const sp of specials) {
        const card = document.createElement('button');
        card.className = `world-card${sp.locked ? ' locked' : ''}`;
        card.style.setProperty('--sky1', sp.world.sky[0]);
        card.style.setProperty('--sky2', sp.world.sky[1]);
        card.innerHTML = `<canvas></canvas><div class="special-text"><span class="world-table">${sp.title}</span><span class="world-name">${sp.text}</span></div>`;
        card.addEventListener('click', () => {
            if (sp.locked) {
                Sound.wrong();
                return;
            }
            Sound.click();
            sp.action();
        });
        card.addEventListener('pointerenter', () => setTheme(sp.world));
        registerMini(card.querySelector('canvas'), (c, cw, ch, t) => {
            drawEnemy(c, cw / 2, ch * 0.58, Math.min(cw, ch) * 0.3, sp.world.monster, { t, look: { x: Math.sin(t), y: 0.3 } });
        });
        special.append(card);
    }
}

function showResult() {
    if (!round) {
        return;
    }
    const r = round;
    const sk = skin();
    let title = sk.results[r.stars];
    if (r.mode === 'boss') {
        title = sk.results.boss;
    } else if (r.mode === 'practice') {
        title = sk.results.practice;
    }
    const newStage = stageIndex(save.gems);
    let html = `<div class="result-title">${title}</div>`;
    html += '<div class="big-stars">';
    for (let i = 0; i < 3; i++) {
        html += `<span class="${i < r.stars ? 'star-on' : 'star-off'}" style="animation-delay:${0.25 + i * 0.3}s">★</span>`;
    }
    html += '</div>';
    if (newStage > r.startStage) {
        html += `<div class="stage-up">🎉 ${escapeHtml(heroName())} ist jetzt ${sk.stages[newStage].as}!</div>`;
    }
    const fastest = Number.isFinite(r.fastest) ? `${(r.fastest / 1000).toFixed(1)} s` : '–';
    html += `<div class="stats">
        <div class="stat"><b>${r.total}</b><span>Aufgaben</span></div>
        <div class="stat"><b>${r.mistakes}</b><span>Fehler</span></div>
        <div class="stat"><b>${sk.comboIcons[0]} ${r.bestCombo}</b><span>längste ${sk.comboWord}</span></div>
        <div class="stat"><b>💎 ${r.gemsEarned}</b><span>Edelsteine</span></div>
        <div class="stat wide"><b>⚡ ${fastest}</b><span>schnellste Antwort</span></div>
    </div>`;
    if (r.wrongFacts.size > 0) {
        html += '<div class="review">Diese Aufgaben üben wir noch:<div class="chips">';
        for (const q of r.wrongFacts.values()) {
            html += `<span class="chip">${q.a} · ${q.b} = ${q.product}</span>`;
        }
        html += '</div></div>';
    } else {
        html += `<div class="review">${sk.results.perfect}</div>`;
    }
    html += '<div class="actions">';
    html += '<button class="btn blue" id="againBtn">🔁 Nochmal</button>';
    const next = recommendedTable();
    if (r.mode === 'table' && next && next !== r.table) {
        html += `<button class="btn green" id="nextBtn">➡️ ${next}er-Reihe</button>`;
    }
    html += '<button class="btn" id="mapHomeBtn">🏠 Hauptmenü</button>';
    html += '</div>';
    $('resultCard').innerHTML = html;
    showScreen('result');
    if (newStage > r.startStage) {
        Sound.sparkle();
        confetti(heroPos.x, heroPos.y, 70);
    }

    const mode = r.mode;
    const table = r.table;
    $('againBtn').addEventListener('click', () => {
        Sound.click();
        if (mode === 'practice' && practiceFacts().length === 0) {
            goHome();
            return;
        }
        startRound(mode, table);
    });
    $('nextBtn')?.addEventListener('click', () => {
        Sound.click();
        startRound('table', next);
    });
    $('mapHomeBtn').addEventListener('click', goHome);
}

function buildStarMap() {
    const grid = $('mapGrid');
    grid.innerHTML = '';
    let mastered = 0;
    const cell = (cls, text) => {
        const el = document.createElement('div');
        el.className = `cell ${cls}`;
        el.textContent = text;
        grid.append(el);
    };
    cell('head', '·');
    for (const c of TABLES) {
        cell('head', c);
    }
    for (const r of TABLES) {
        cell('head', r);
        for (const c of TABLES) {
            const f = peekFact(r, c);
            let cls = 'lvl-unseen';
            if (f && f.seen > 0) {
                if (f.box >= 5) {
                    cls = 'lvl-gold';
                } else if (f.box >= 3) {
                    cls = 'lvl-good';
                } else if (f.box >= 1) {
                    cls = 'lvl-learning';
                } else {
                    cls = 'lvl-weak';
                }
                if (f.box >= 3) {
                    mastered++;
                }
            }
            cell(cls, r * c);
        }
    }
    $('mapSummary').innerHTML = `<b>${mastered} von 100</b> Aufgaben sitzen schon. Jede richtige Antwort lässt die Felder grüner werden – bis sie golden leuchten! ✨`;
    const count = practiceFacts().length;
    const btn = $('mapPracticeBtn');
    btn.disabled = count === 0;
    btn.style.opacity = count === 0 ? 0.5 : 1;
    btn.textContent = count === 0 ? '📚 Nichts zu üben' : `📚 ${count} Aufgaben üben`;
}

function renderStyleChoices(container, selected, onPick) {
    container.innerHTML = '';
    for (const id of ['dragon', 'magic']) {
        const sk = SKINS[id];
        const card = document.createElement('button');
        card.className = `style-card ${id}-style${selected === id ? ' selected' : ''}`;
        card.innerHTML = `<canvas></canvas><b>${sk.label}</b><span>${sk.pitch}</span>`;
        card.addEventListener('click', () => {
            Sound.click();
            onPick(id);
        });
        const preview = { style: id, gems: 130, looks: save ? save.looks : DEFAULT_LOOKS };
        registerMini(card.querySelector('canvas'), (c, w, h, t) => drawHeroFitted(c, w, h, t, preview));
        container.append(card);
    }
}

function buildLair() {
    const sk = skin();
    $('lairName').value = save.name;
    $('lairPet').value = save.petName;
    $('petRow').classList.toggle('hidden', isMagic());
    const info = progressInfo();
    $('lairProgress').style.width = `${info.pct}%`;
    $('lairProgressLabel').textContent = info.label;
    $('stageList').innerHTML = sk.stages.map((s, i) => `<span class="stage-pill ${i <= info.stage ? 'done' : ''}">${s.name} · ${GEM_STEPS[i]} 💎</span>`).join('');

    const stars = totalStars();
    $('starTotal').textContent = `(${stars} ★ gesammelt)`;
    const swatches = $('swatches');
    swatches.innerHTML = '';
    for (const p of sk.looks) {
        const unlocked = stars >= p.minStars;
        const btn = document.createElement('button');
        btn.className = `swatch${save.looks[sk.id] === p.id ? ' selected' : ''}${unlocked ? '' : ' locked'}`;
        const base = isMagic() ? p.robe : p.body;
        let bg = `radial-gradient(circle at 35% 35%, ${shade(base, 0.4)}, ${base})`;
        if (p.animated) {
            bg = 'conic-gradient(#f472b6, #facc15, #4ade80, #22d3ee, #a78bfa, #f472b6)';
        } else if (isMagic()) {
            bg = `linear-gradient(135deg, ${shade(base, 0.25)} 0 60%, ${p.trim} 60% 70%, ${base} 70%)`;
        }
        btn.innerHTML = `<div class="ball" style="background:${bg}"></div>${unlocked ? p.name : `🔒 ${p.minStars} ★`}`;
        btn.addEventListener('click', () => {
            if (!unlocked) {
                Sound.wrong();
                return;
            }
            Sound.sparkle();
            save.looks[sk.id] = p.id;
            persist();
            buildLair();
        });
        swatches.append(btn);
    }

    $('stickers').innerHTML = STICKER_IDS.map((id) => {
        const [emo, name, desc] = sk.stickers[id];
        const has = Boolean(save.stickers[id]);
        return `<div class="sticker${has ? '' : ' locked'}"><span class="emo">${emo}</span><b>${has ? name : '???'}</b><br>${desc}</div>`;
    }).join('');

    renderStyleChoices($('lairStyles'), save.style, (style) => {
        if (style === save.style) {
            return;
        }
        save.style = style;
        persist();
        applySkin();
        if (style === 'dragon' && !save.hatched) {
            showHatch();
        } else {
            showScreen('lair');
        }
    });
}

// =====================================================================
// Profiles
// =====================================================================

function selectProfile(profile) {
    root.active = profile.id;
    save = profile;
    persist();
    applySkin();
    if (save.style === 'dragon' && !save.hatched) {
        showHatch();
    } else {
        showScreen('menu');
    }
}

function buildProfiles() {
    const grid = $('profileGrid');
    grid.innerHTML = '';
    for (const p of root.profiles) {
        const card = document.createElement('button');
        card.className = `profile-card ${p.style}-style`;
        const stage = SKINS[p.style].stages[stageIndex(p.gems)].name;
        card.innerHTML = `<canvas></canvas><span class="pname">${escapeHtml(p.name)}</span><span class="pinfo">${SKINS[p.style].label} · ${stage}</span><span class="pinfo">★ ${totalStars(p)} · 💎 ${p.gems}</span>`;
        card.addEventListener('click', () => {
            Sound.click();
            selectProfile(p);
        });
        card.addEventListener('pointerenter', () => setTheme(SKINS[p.style].worlds[0]));
        registerMini(card.querySelector('canvas'), (c, w, h, t) => {
            if (p.style === 'dragon' && !p.hatched) {
                const s = Math.min(w / 260, h / 220);
                drawEgg(c, w / 2, h * 0.92, s * 1.5, t, 0, 0.05);
            } else {
                drawHeroFitted(c, w, h, t, p);
            }
        });
        grid.append(card);
    }
    const add = document.createElement('button');
    add.className = 'profile-card add';
    add.innerHTML = '<span>＋</span>Neuer Spieler';
    add.addEventListener('click', () => {
        Sound.click();
        showScreen('newProfile');
    });
    grid.append(add);
}

let newStyle = 'dragon';

function buildNewProfile() {
    $('newName').value = '';
    $('cancelNewBtn').classList.toggle('hidden', root.profiles.length === 0);
    const render = () => renderStyleChoices($('newStyles'), newStyle, (style) => {
        newStyle = style;
        setTheme(SKINS[style].worlds[0]);
        render();
    });
    render();
}

function createFromForm() {
    const name = $('newName').value.trim() || `Spieler ${root.profiles.length + 1}`;
    const profile = createProfile(name, newStyle);
    root.profiles.push(profile);
    root.active = profile.id;
    save = profile;
    persist();
    applySkin();
    Sound.sparkle();
    if (profile.style === 'dragon') {
        showHatch();
    } else {
        showScreen('menu');
        unlockSticker('hatched');
    }
}

function deleteActiveProfile() {
    const ok = globalThis.confirm(`${save.name} wirklich löschen? Der ganze Fortschritt geht verloren.`);
    if (!ok) {
        return;
    }
    root.profiles = root.profiles.filter((p) => p.id !== save.id);
    root.active = null;
    save = null;
    persist();
    showScreen(root.profiles.length > 0 ? 'profiles' : 'newProfile');
}

// =====================================================================
// Hatching (dragon skin)
// =====================================================================

const hatchState = { cracks: 0, wobble: 0, hatched: false, flash: 0 };

function showHatch() {
    Object.assign(hatchState, { cracks: 0, wobble: 0, hatched: false, flash: 0 });
    $('hatchTitle').textContent = 'Ein geheimnisvolles Ei!';
    $('hatchText').textContent = 'Tippe 5-mal auf das Ei, damit dein Drache schlüpft.';
    $('nameRow').classList.remove('show');
    $('nameInput').value = save.petName || 'Funki';
    showScreen('hatch');
}

function tapEgg() {
    if (hatchState.hatched) {
        return;
    }
    Sound.ensure();
    hatchState.cracks++;
    hatchState.wobble = 1;
    Sound.crack();
    const rect = $('hatchCanvas').getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height * 0.55, ['#fde68a', '#ffffff', '#fbbf24'], 14, 260);
    if (hatchState.cracks >= 5) {
        hatchState.hatched = true;
        hatchState.flash = 1;
        Sound.win();
        confetti(rect.left + rect.width / 2, rect.top + rect.height * 0.5, 120);
        $('hatchTitle').textContent = 'Dein Drache ist geschlüpft!';
        $('hatchText').textContent = 'Er wächst mit jedem Edelstein, den du beim Rechnen sammelst.';
        $('nameRow').classList.add('show');
    }
}

function finishHatch() {
    save.petName = $('nameInput').value.trim() || 'Funki';
    save.hatched = true;
    persist();
    showScreen('menu');
    unlockSticker('hatched');
}

registerMini($('hatchCanvas'), (c, w, h, t) => {
    if (!save) {
        return;
    }
    const s = Math.min(w / 260, h / 220);
    if (hatchState.hatched) {
        if (hatchState.flash > 0) {
            c.fillStyle = `rgba(255,255,255,${hatchState.flash})`;
            c.fillRect(0, 0, w, h);
        }
        drawHeroFitted(c, w, h, t, { ...save, style: 'dragon' }, 1.1);
    } else {
        c.fillStyle = 'rgba(30,27,75,0.15)';
        c.beginPath();
        c.ellipse(w / 2, h * 0.9, 50 * s, 9 * s, 0, 0, Math.PI * 2);
        c.fill();
        drawEgg(c, w / 2, h * 0.9, s * 1.8, t, hatchState.cracks, hatchState.wobble + 0.08);
    }
});

registerMini($('menuHero'), (c, w, h, t) => save && drawHeroFitted(c, w, h, t, save));
registerMini($('lairHero'), (c, w, h, t) => save && drawHeroFitted(c, w, h, t, save, 1.05));

// =====================================================================
// Play scene rendering
// =====================================================================

function updatePlay(dt) {
    heroAnim.mouth = Math.max(0, heroAnim.mouth - dt * 2.5);
    heroAnim.sad = Math.max(0, heroAnim.sad - dt);
    heroAnim.happy = Math.max(0, heroAnim.happy - dt);
    monsterAnim.flash = Math.max(0, monsterAnim.flash - dt * 4);
    monsterAnim.squash *= Math.max(0, 1 - dt * 8);
    monsterAnim.laugh = Math.max(0, monsterAnim.laugh - dt);
    monsterAnim.hurt = Math.max(0, monsterAnim.hurt - dt);
    monsterAnim.enter = Math.max(0, monsterAnim.enter - dt * 1.6);
    monsterAnim.jump = Math.max(0, monsterAnim.jump - dt * 1.8);
    if (monsterAnim.dead) {
        monsterAnim.deadAge += dt;
    }
    if (bubble) {
        bubble.age += dt;
        if (bubble.age > bubble.life) {
            bubble = null;
        }
    }
    updateFireballs(dt);
}

function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.roundRect(x, y, w, h, r);
}

function drawBubble(c, text, x, y, k) {
    const magic = isMagic();
    c.save();
    const fontSize = clamp(16 * unit, 14, 22);
    c.font = `600 ${fontSize}px ${magic ? 'Alegreya, Georgia, serif' : skin().canvasFont}`;
    const maxW = Math.min(W * 0.6, 340);
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (c.measureText(test).width > maxW && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    lines.push(line);
    const lw = Math.max(...lines.map((l) => c.measureText(l).width)) + 28;
    const lh = lines.length * fontSize * 1.25 + 18;
    const bx = clamp(x - lw + 30, 8, W - lw - 8);
    const by = y - lh;
    c.globalAlpha = k;
    c.fillStyle = magic ? 'rgba(14,10,26,0.92)' : 'white';
    c.strokeStyle = magic ? '#b8932f' : '#1e1b4b';
    c.lineWidth = magic ? 2 : 3;
    roundRect(c, bx, by, lw, lh, magic ? 8 : 18);
    c.fill();
    c.stroke();
    c.beginPath();
    c.moveTo(x - 4, by + lh - 2);
    c.lineTo(x + 10, by + lh + 16);
    c.lineTo(x + 14, by + lh - 2);
    c.fill();
    c.fillStyle = magic ? '#f5ecd7' : '#1e1b4b';
    c.textAlign = 'left';
    c.textBaseline = 'top';
    for (const [i, l] of lines.entries()) {
        c.fillText(l, bx + 14, by + 10 + i * fontSize * 1.25);
    }
    c.restore();
}

function drawPlayScene(c, t) {
    if (!round) {
        return;
    }
    const stage = stageIndex(save.gems);
    const hs = heroScale();
    const mon = round.world.monster;
    const mr = 62 * unit * (mon.size || 1);
    const specter = mon.kind === 'specter';

    c.fillStyle = 'rgba(0,0,0,0.2)';
    c.beginPath();
    c.ellipse(heroPos.x, groundY + 4, 66 * hs, 10 * hs, 0, 0, Math.PI * 2);
    c.fill();
    if (!monsterAnim.dead) {
        c.beginPath();
        c.ellipse(monsterPos.x, groundY + 4, mr * (specter ? 0.6 : 0.9), mr * 0.12, 0, 0, Math.PI * 2);
        c.fill();
    }

    const blink = (t % 3.7) < 0.12 ? 0.1 : 1;
    drawHero(save.style, c, heroPos.x, heroPos.y, hs, {
        t, stage, pal: heroLook(save, t), mouth: heroAnim.mouth, blink,
        sad: heroAnim.sad, happy: heroAnim.happy, flapSpeed: heroAnim.mouth > 0 ? 12 : 6,
    });

    const enterOffset = easeOutCubic(monsterAnim.enter) * W * 0.4;
    const jumpOffset = -Math.sin(monsterAnim.jump * Math.PI) * 110 * unit;
    const laughShake = monsterAnim.laugh > 0 ? Math.sin(t * 40) * 3 : 0;
    const mx = monsterPos.x + enterOffset + laughShake;
    const my = monsterPos.y + jumpOffset;
    if (monsterAnim.dead) {
        const k = clamp(monsterAnim.deadAge / 0.9, 0, 1);
        if (specter) {
            drawEnemy(c, mx, my - k * 80, mr * (1 + k * 0.3), mon, { t, dead: true, alpha: 1 - k, flash: 0.6 });
        } else {
            drawEnemy(c, mx, my - k * 40, mr * (1 - k * 0.8), mon, { t, dead: true, alpha: 1 - k, rot: k * 6, flash: 0.4 });
        }
    } else {
        drawEnemy(c, mx, my, mr, mon, {
            t, flash: monsterAnim.flash, squash: monsterAnim.squash, laugh: monsterAnim.laugh, hurt: monsterAnim.hurt,
            look: { x: -1, y: -0.1 },
        });

        const bw = Math.max(110, 150 * unit);
        const bh = 16;
        const bx = mx - bw / 2;
        const tall = mon.crown || mon.horns || mon.antenna;
        const by = my - mr * (tall ? 1.55 : 1.3) - 18;
        const magic = isMagic();
        c.fillStyle = magic ? 'rgba(5,3,12,0.85)' : 'rgba(30,27,75,0.75)';
        roundRect(c, bx - 4, by - 4, bw + 8, bh + 8, magic ? 4 : 12);
        c.fill();
        if (magic) {
            c.strokeStyle = '#b8932f';
            c.lineWidth = 1.5;
            c.stroke();
        }
        const frac = round.hp / round.total;
        const hpGrad = c.createLinearGradient(bx, 0, bx + bw, 0);
        hpGrad.addColorStop(0, magic ? '#7f1d1d' : '#ef4444');
        hpGrad.addColorStop(1, magic ? mon.glow : '#f97316');
        c.fillStyle = hpGrad;
        roundRect(c, bx, by, Math.max(0, bw * frac), bh, magic ? 2 : 8);
        c.fill();
        c.font = `700 ${clamp(15 * unit, 13, 20)}px ${skin().canvasFont}`;
        c.textAlign = 'center';
        c.textBaseline = 'bottom';
        c.lineWidth = 4;
        c.strokeStyle = magic ? '#000' : '#1e1b4b';
        c.strokeText(mon.name, mx, by - 8);
        c.fillStyle = magic ? '#f8e7b0' : 'white';
        c.fillText(mon.name, mx, by - 8);

        if (bubble) {
            const k = Math.min(1, bubble.age * 6, (bubble.life - bubble.age) * 4);
            drawBubble(c, bubble.text, mx - mr * 0.3, by - 40, clamp(k, 0, 1));
        }
    }

    drawFireballs(c, t);
}

// =====================================================================
// Main loop
// =====================================================================

let lastTime = performance.now();

function frame(now) {
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    time += dt;

    themeFade = Math.min(1, themeFade + dt * 2.5);
    hatchState.wobble = Math.max(0, hatchState.wobble - dt * 2);
    hatchState.flash = Math.max(0, hatchState.flash - dt * 1.5);
    updateAmbient(dt, time);
    if (screen === 'play' || screen === 'result') {
        updatePlay(dt);
    }
    updateParticles(dt);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    shake = Math.max(0, shake - dt * 40);
    ctx.save();
    if (shake > 0) {
        ctx.translate(rand(-shake, shake), rand(-shake, shake));
    }
    if (themeFade < 1) {
        drawBackground(ctx, prevTheme, time);
        ctx.globalAlpha = themeFade;
    }
    drawBackground(ctx, theme, time);
    ctx.globalAlpha = 1;
    drawAmbient(ctx, time);
    if (screen === 'play' || screen === 'result') {
        drawPlayScene(ctx, time);
    }
    drawParticles(ctx, time);
    drawFloatTexts(ctx);
    ctx.restore();
    if (screenFlash > 0) {
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = rgba(screenFlashColor, screenFlash);
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'source-over';
        screenFlash = Math.max(0, screenFlash - dt * 1.6);
    }

    drawMinis(time);
    requestAnimationFrame(frame);
}

// =====================================================================
// Input wiring
// =====================================================================

for (const btn of document.querySelectorAll('#keypad .key')) {
    btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        pressKey(btn.dataset.key);
    });
}

document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement) {
        if (e.key === 'Enter' && e.target.id === 'nameInput') {
            finishHatch();
        } else if (e.key === 'Enter' && e.target.id === 'newName') {
            createFromForm();
        }
        return;
    }
    if (screen === 'play') {
        const key = e.key === 'NumpadEnter' ? 'Enter' : e.key;
        if (/^\d$/.test(key) || key === 'Backspace' || key === 'Enter') {
            e.preventDefault();
            pressKey(key);
            const btn = document.querySelector(`#keypad [data-key="${key}"]`);
            if (btn) {
                btn.classList.add('pressed');
                setTimeout(() => btn.classList.remove('pressed'), 90);
            }
        }
    } else if (screen === 'hatch' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        tapEgg();
    }
    if (e.key === 'Escape' && !['menu', 'hatch', 'profiles', 'newProfile'].includes(screen)) {
        goHome();
    }
});

$('hatchCanvas').addEventListener('pointerdown', tapEgg);
$('nameOk').addEventListener('click', finishHatch);
$('homeBtn').addEventListener('click', goHome);
$('playersBtn').addEventListener('click', () => {
    Sound.click();
    showScreen('profiles');
});
$('lairBtn').addEventListener('click', () => {
    Sound.click();
    showScreen('lair');
});
$('mapBtn').addEventListener('click', () => {
    Sound.click();
    showScreen('starmap');
});
$('mapPracticeBtn').addEventListener('click', () => {
    if (practiceFacts().length > 0) {
        startRound('practice');
    }
});
$('createBtn').addEventListener('click', createFromForm);
$('cancelNewBtn').addEventListener('click', () => {
    Sound.click();
    showScreen('profiles');
});
$('deleteProfileBtn').addEventListener('click', deleteActiveProfile);
$('lairName').addEventListener('input', (e) => {
    save.name = e.target.value.trim() || save.name;
    persist();
});
$('lairPet').addEventListener('input', (e) => {
    save.petName = e.target.value.trim() || 'Funki';
    persist();
});

function updateMuteIcon() {
    $('muteBtn').textContent = root.muted ? '🔇' : '🔊';
}

$('muteBtn').addEventListener('click', () => {
    root.muted = !root.muted;
    persist();
    updateMuteIcon();
    Sound.click();
});

globalThis.addEventListener('resize', resize);

// =====================================================================
// Boot
// =====================================================================

resize();
resetAmbient();
updateMuteIcon();
persist();
if (root.profiles.length === 0) {
    showScreen('newProfile');
} else if (save && root.profiles.length === 1) {
    selectProfile(save);
} else {
    showScreen('profiles');
}
requestAnimationFrame(frame);
