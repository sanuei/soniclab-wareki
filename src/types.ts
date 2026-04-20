export type Language = 'ja' | 'en' | 'zh';

export type Era =
  | 'reiwa' | 'heisei' | 'showa' | 'taisho' | 'meiji'
  | 'taika' | 'kenshin' | 'whei' | 'shuchō' | 'taihō'
  | 'yōrō' | 'jingo-okeisei' | 'jingo-kegong' | 'tenpyō-kampō' | 'tenpyō-shōhō'
  | 'tenpyō-hōji' | 'kon-tōkyō' | 'tenpyō-kōninn' | 'tenpyō-jingo' | 'engen';

export interface EraInfo {
  id: Era;
  name: string;
  kanji: string;
  startYear: number;  // Western year when this era started (Jan 1)
  endYear: number;   // Last year of this era (Dec 31, inclusive)
}

export interface ConversionResult {
  era: Era;
  eraYear: number;
  westernYear: number;
}
