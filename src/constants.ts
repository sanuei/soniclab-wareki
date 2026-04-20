import { Language, Era, EraInfo, I18nContent } from './types';

// All Japanese eras chronologically
export const ERAS: EraInfo[] = [
  { id: 'reiwa',          name: 'Reiwa',          kanji: '令和', startYear: 2019, endYear: 2100 },
  { id: 'heisei',         name: 'Heisei',         kanji: '平成', startYear: 1989, endYear: 2019 },
  { id: 'showa',          name: 'Showa',          kanji: '昭和', startYear: 1926, endYear: 1989 },
  { id: 'taisho',         name: 'Taisho',         kanji: '大正', startYear: 1912, endYear: 1926 },
  { id: 'meiji',          name: 'Meiji',          kanji: '明治', startYear: 1868, endYear: 1912 },
  // Historical eras
  { id: 'taika',          name: 'Taika',          kanji: '大化',  startYear: 645,  endYear: 650  },
  { id: 'kenshin',        name: 'Kōken',          kanji: '白雉',  startYear: 650,  endYear: 654  },
  { id: 'whei',           name: 'Shuchō',         kanji: '朱鳥',  startYear: 654,  endYear: 686  },
  { id: 'shuchō',         name: 'Taika',          kanji: '大宝',  startYear: 701,  endYear: 704  },
  { id: 'taihō',          name: 'Daijō',          kanji: '元和',  startYear: 806,  endYear: 810  },
  { id: 'yōrō',           name: 'Enryaku',        kanji: '永延',  startYear: 987,  endYear: 989  },
  { id: 'jingo-okeisei',  name: 'Jingo-okeisei', kanji: '神護寺',startYear: 869,  endYear: 885  },
  { id: 'jingo-kegong',   name: 'Jingo-kegong',   kanji: '貞観',  startYear: 859,  endYear: 877  },
  { id: 'tenpyō-kampō',   name: 'Tenpyō-kampō',   kanji: '天喜',  startYear: 1053, endYear: 1058 },
  { id: 'tenpyō-shōhō',   name: 'Tenpyō-shōhō',   kanji: '康平',  startYear: 1058, endYear: 1065 },
  { id: 'tenpyō-hōji',    name: 'Tenpyō-hōji',    kanji: '治四年',startYear: 1065, endYear: 1069 },
  { id: 'kon-tōkyō',      name: 'Kōtoku',         kanji: '天正',  startYear: 1573, endYear: 1592 },
  { id: 'tenpyō-kōninn',  name: 'Tenpyō-kōninn',  kanji: '文禄',  startYear: 1592, endYear: 1596 },
  { id: 'tenpyō-jingo',   name: 'Tenpyō-jingo',   kanji: '慶長',  startYear: 1596, endYear: 1615 },
  { id: 'engen',          name: 'Genna',          kanji: '元和',  startYear: 1615, endYear: 1624 },
];

// ERAs displayed on the UI (modern eras only)
export const ERAS_UI: EraInfo[] = ERAS.filter(e =>
  ['reiwa', 'heisei', 'showa', 'taisho', 'meiji'].includes(e.id)
);

// Get ALL eras for a given year (overlap years have two)
export function getErasByYear(year: number): EraInfo[] {
  return ERAS.filter(e => year >= e.startYear && year <= e.endYear);
}

// Primary era (for single-era years)
export function getEraByYear(year: number): EraInfo | null {
  return getErasByYear(year)[0] ?? null;
}

export function toWesternYear(era: Era, eraYear: number): number {
  const info = ERAS.find(e => e.id === era);
  if (!info) return NaN;
  return info.startYear + eraYear - 1;
}

export function toEraYear(westerYear: number): { era: EraInfo; eraYear: number } | null {
  const eras = getErasByYear(westerYear);
  if (!eras.length) return null;
  // Use the most recent era (latest start year) as primary
  const era = eras.reduce((prev, curr) => curr.startYear > prev.startYear ? curr : prev);
  return { era, eraYear: westerYear - era.startYear + 1 };
}

export interface ExtendedI18n extends I18nContent {
  toolWareki: string;
  toolWarekiShort: string;
  toolWarekiSub: string;
  eraMeiji: string;
  eraTaisho: string;
  eraShowa: string;
  eraHeisei: string;
  eraReiwa: string;
  placeholderYear: string;
  placeholderEraYear: string;
  btnConvert: string;
  btnSwap: string;
  btnCopy: string;
  btnCopied: string;
  resultLabel: string;
  eraYearLabel: string;
  westernLabel: string;
  todayLabel: string;
  ageLabel: string;
  guideTitle: string;
  guideStep1: string;
  guideStep2: string;
  guideStep3: string;
  footerCredit: string;
  loadingDict: string;
  errorInvalidYear: string;
  errorInvalidEraYear: string;
  errorOutOfRange: string;
  // SEO
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
  author: string;
  robots: string;
  siteName: string;
  seoKeywords: string;
}

export const I18N: Record<Language, ExtendedI18n> = {
  ja: {
    title: '和暦 ↔ 西暦 変換ツール',
    subtitle: '明治から令和まで、和暦と西暦をリアルタイムで、双方向に変換。',
    placeholderYear: '2026',
    placeholderEraYear: '8',
    btnConvert: '変換',
    btnSwap: '入替',
    btnCopy: 'コピー',
    btnCopied: 'コピー完了！',
    resultLabel: '変換結果',
    eraYearLabel: '和暦',
    westernLabel: '西暦',
    todayLabel: '今日は',
    ageLabel: '年齢',
    guideTitle: '使いかた',
    guideStep1: '西暦または和暦を入力します。入力を終えると自動的に変換されます。',
    guideStep2: '「入替」ボタンで変換方向を切り替えできます。',
    guideStep3: '結果をワンクリックでクリップボードにコピーできます。',
    footerCredit: 'Developed by @sonic_yann',
    loadingDict: 'データを読み込み中...',
    errorInvalidYear: '無効な西暦年です',
    errorInvalidEraYear: '無効な和暦年です',
    errorOutOfRange: 'この範囲の変換には対応していません',
    toolWareki: '和暦変換',
    toolWarekiShort: '和暦',
    toolWarekiSub: '和暦 ↔ 西暦変換ツール',
    eraMeiji: '明治',
    eraTaisho: '大正',
    eraShowa: '昭和',
    eraHeisei: '平成',
    eraReiwa: '令和',
    seoTitle: '和暦 ↔ 西暦変換 | 明治・大正・昭和・平成・令和対応',
    seoDesc: '明治・大正・昭和・平成・令和と西暦を双方向に変換。和暦と西暦の変換が必要な履历书やOfficial書類にどうぞ。',
    seoKeywords: '和暦 変換, 西暦 変換, 令和 西暦, 平成 西暦, 昭和 西暦, 明治 西暦',
    ogTitle: 'wareki | 和暦 ↔ 西暦 変換ツール',
    ogDescription: '明治から令和まで対応。双方向リアルタイム変換。履历书・公式書類作成に便利。',
    twitterCard: 'summary_large_image',
    author: 'SonicLab',
    robots: 'index, follow',
    siteName: 'SonicLab',
  },
  en: {
    title: 'Japanese Era ↔ Western Year Converter',
    subtitle: 'Convert between Japanese eras (Meiji–Reiwa) and Western years instantly.',
    placeholderYear: '2026',
    placeholderEraYear: '8',
    btnConvert: 'Convert',
    btnSwap: 'Swap',
    btnCopy: 'Copy',
    btnCopied: 'Copied!',
    resultLabel: 'Result',
    eraYearLabel: 'Era Year',
    westernLabel: 'Western',
    todayLabel: 'Today is',
    ageLabel: 'Age',
    guideTitle: 'How to Use',
    guideStep1: 'Enter a Western year or era year. Conversion happens automatically.',
    guideStep2: 'Use the Swap button to change conversion direction.',
    guideStep3: 'Copy the result to your clipboard with one click.',
    footerCredit: 'Developed by @sonic_yann',
    loadingDict: 'Loading data...',
    errorInvalidYear: 'Invalid Western year',
    errorInvalidEraYear: 'Invalid era year',
    errorOutOfRange: 'Year is out of supported range',
    toolWareki: 'Era Converter',
    toolWarekiShort: 'Era',
    toolWarekiSub: 'Japanese Era ↔ Western Year Converter',
    eraMeiji: 'Meiji',
    eraTaisho: 'Taisho',
    eraShowa: 'Showa',
    eraHeisei: 'Heisei',
    eraReiwa: 'Reiwa',
    seoTitle: 'Japanese Era ↔ Western Year Converter | Meiji–Reiwa Support',
    seoDesc: 'Convert between Japanese imperial eras (Meiji, Taisho, Showa, Heisei, Reiwa) and Western years. Perfect for resume and official documents.',
    seoKeywords: 'japanese era converter, heisei to western, reiwa to western year, showa conversion',
    ogTitle: 'wareki | Japanese Era ↔ Western Year Converter',
    ogDescription: 'Real-time bidirectional conversion between Japanese imperial eras and Western years.',
    twitterCard: 'summary_large_image',
    author: 'SonicLab',
    robots: 'index, follow',
    siteName: 'SonicLab',
  },
  zh: {
    title: '和历 ↔ 西历 转换工具',
    subtitle: '从明治到令和，日历实时双向转换。',
    placeholderYear: '2026',
    placeholderEraYear: '8',
    btnConvert: '转换',
    btnSwap: '交换',
    btnCopy: '复制',
    btnCopied: '已复制！',
    resultLabel: '转换结果',
    eraYearLabel: '和历',
    westernLabel: '西历',
    todayLabel: '今天是',
    ageLabel: '年龄',
    guideTitle: '使用方法',
    guideStep1: '输入西历或和历，输入完成后自动转换。',
    guideStep2: '点击"交换"按钮可以切换转换方向。',
    guideStep3: '点击复制按钮，结果可一键复制到剪贴板。',
    footerCredit: 'Developed by @sonic_yann',
    loadingDict: '正在加载数据...',
    errorInvalidYear: '无效的西历年',
    errorInvalidEraYear: '无效的和历年',
    errorOutOfRange: '超出支持的范围',
    toolWareki: '和历转换',
    toolWarekiShort: '和历',
    toolWarekiSub: '和历 ↔ 西历转换工具',
    eraMeiji: '明治',
    eraTaisho: '大正',
    eraShowa: '昭和',
    eraHeisei: '平成',
    eraReiwa: '令和',
    seoTitle: '和历 ↔ 西历转换 | 明治·大正·昭和·平成·令和',
    seoDesc: '明治、大正、昭和、平成、令和与西历双向转换。适合简历及官方文件制作。',
    seoKeywords: '和历转换, 西历转换, 令和西历, 平成西历',
    ogTitle: 'wareki | 和历 ↔ 西历 转换工具',
    ogDescription: '从明治到令和，支持双向实时转换。适合简历及官方文件制作。',
    twitterCard: 'summary_large_image',
    author: 'SonicLab',
    robots: 'index, follow',
    siteName: 'SonicLab',
  },
};

export const ERA_NAMES: Record<Language, Record<string, string>> = {
  ja: {
    meiji: '明治', taisho: '大正', showa: '昭和', heisei: '平成', reiwa: '令和',
    taika: '大化', kenshin: '白雉', whei: '朱鳥', shuchō: '大宝', taihō: '大宝',
    yōrō: '永延', 'jingo-okeisei': '神護寺', 'jingo-kegong': '貞観',
    'tenpyō-kampō': '天喜', 'tenpyō-shōhō': '康平', 'tenpyō-hōji': '治四年',
    'kon-tōkyō': '天正', 'tenpyō-kōninn': '文禄', 'tenpyō-jingo': '慶長', engen: '元和',
  },
  en: {
    meiji: 'Meiji', taisho: 'Taisho', showa: 'Showa', heisei: 'Heisei', reiwa: 'Reiwa',
    taika: 'Taika', kenshin: 'Kōken', whei: 'Shuchō', shuchō: 'Taika', taihō: 'Daijō',
    yōrō: 'Enryaku', 'jingo-okeisei': 'Jingo-okeisei', 'jingo-kegong': 'Jingo-kegong',
    'tenpyō-kampō': 'Tenpyō-kampō', 'tenpyō-shōhō': 'Tenpyō-shōhō', 'tenpyō-hōji': 'Tenpyō-hōji',
    'kon-tōkyō': 'Kōtoku', 'tenpyō-kōninn': 'Tenpyō-kōninn', 'tenpyō-jingo': 'Tenpyō-jingo', engen: 'Genna',
  },
  zh: {
    meiji: '明治', taisho: '大正', showa: '昭和', heisei: '平成', reiwa: '令和',
    taika: '大化', kenshin: '白雉', whei: '朱鳥', shuchō: '大宝', taihō: '大宝',
    yōrō: '永延', 'jingo-okeisei': '神護寺', 'jingo-kegong': '貞観',
    'tenpyō-kampō': '天喜', 'tenpyō-shōhō': '康平', 'tenpyō-hōji': '治四年',
    'kon-tōkyō': '天正', 'tenpyō-kōninn': '文禄', 'tenpyō-jingo': '慶長', engen: '元和',
  },
};
