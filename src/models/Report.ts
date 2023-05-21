import { Item } from './Item';

export interface Report {
  item: Item;
  buyQuantity: string;
  sellQuantity: string;
  buyAmount: string;
  sellAmount: string;
}
