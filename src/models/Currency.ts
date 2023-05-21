export type CurrencyPlace = 'PFX' | 'SFX';

export interface Currency {
  id: number;
  symbol: string;
  nameEng: string;
  nameKor: string;
  place: CurrencyPlace;
}
