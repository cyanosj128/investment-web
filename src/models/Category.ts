import { Item } from './Item';

export interface Category {
  id: number;
  nameEng: string;
  nameKor: string;
  color: string;
}

export interface CategoryWithItems extends Category {
  items: Item[];
}
