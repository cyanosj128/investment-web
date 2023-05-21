import { API } from '.';
import { Item } from '@/models/Item';

export const ItemService = {
  async getAllItems() {
    try {
      return (await API.get<Item[]>('/item')).data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
  async postNewItem(newItem: Omit<Item, 'id'>) {
    try {
      const resp = await API.post('/item', newItem);
      return resp;
    } catch (err) {
      console.log(err);
    }
  },
};
