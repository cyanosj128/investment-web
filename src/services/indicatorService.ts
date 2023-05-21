import { API } from '.';
import { Item } from '@/models/Item';

export const IndicatorService = {
  async getAllIndicators() {
    try {
      return (await API.get<Item[]>('/indicator')).data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
};
