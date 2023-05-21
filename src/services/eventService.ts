import { API } from '.';
import { Item } from '@/models/Item';

export const EventService = {
  async getMonthlyEvents(from: number, to: number) {
    try {
      return (await API.get<Item[]>('/item')).data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
};
