import { Language, Era, EraInfo, I18nContent } from './types';

// Japanese era definitions
export const ERAS: EraInfo[] = [
  { id: 'meiji',  name: 'Meiji',  kanji: '明治', startYear: 1868, endYear: 1912 },
  { id: 'taisho', name: 'Taisho', kanji: '大正', startYear: 1912, endYear: 1926 },
  { id: 'showa',  name: 'Showa',  kanji: '昭和', startYear: 1926, endYear: 1989 },
  { id: 'heisei', name: 'Heisei', kanji: '平成', startYear: 1989, endYear: 2019 },
  { id: 'reiwa',  name: 'Reiwa',  kanji: '令和', startYear: 2019, endYear: 2100 },
];

export function getEraByYear(year: number): EraInfo | null {
  return ERAS.find(e => year >= e.startYear && year <= e.endYear) || null;
}

export function toWesternYear(era: Era, eraYear: number): number {
  const info = ERAS.find(e => e.id === era);
  if (!info) return NaN;
  return info.startYear + eraYear - 1;
}

export function toEraYear(westerYear: number): { era: EraInfo; eraYear: number } | null {
  const era = getEraByYear(westerYear);
  if (!era) return null;
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
    placeholderYear: '西暦（例: 2026）',
    placeholderEraYear: '和暦（例: 令和8）',
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
    placeholderYear: 'Western year (e.g., 2026)',
    placeholderEraYear: 'Era year (e.g., Reiwa 8)',
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
    placeholderYear: '西历（例: 2026）',
    placeholderEraYear: '和历（例: 令和8）',
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
    meiji: '明治',
    taisho: '大正',
    showa: '昭和',
    heisei: '平成',
    reiwa: '令和',
  },
  en: {
    meiji: 'Meiji',
    taisho: 'Taisho',
    showa: 'Showa',
    heisei: 'Heisei',
    reiwa: 'Reiwa',
  },
  zh: {
    meiji: '明治',
    taisho: '大正',
    showa: '昭和',
    heisei: '平成',
    reiwa: '令和',
  },
};
