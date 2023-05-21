import { Currency } from './Currency';
import { FullTransaction } from './Transaction';

export interface Item {
  id: number;
  nameEng: string;
  nameKor: string;
  imageUrl: string;
  unit: string;
}

export interface FullItemTransaction extends Item {
  transactions: Omit<FullTransaction, 'item'>[];
}

export type NewItem = Omit<Item, 'id'>;

export interface ItemWithCurrencies extends Item {
  currencies: Currency[];
}
