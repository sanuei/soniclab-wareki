export type Language = 'ja' | 'en' | 'zh';

export type Era = 'meiji' | 'taisho' | 'showa' | 'heisei' | 'reiwa';

export interface EraInfo {
  id: Era;
  name: string;
  startYear: number; // Western year when this era started
  endYear: number;  // Last year of this era (inclusive)
  kanji: string;
}

export interface ConversionResult {
  era: Era;
  eraYear: number;
  westernYear: number;
}
