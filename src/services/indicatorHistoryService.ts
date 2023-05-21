import { API } from '.';
import { FullIndicatorHistory } from '@/models/Indicator';

export const IndicatorHistoryService = {
  async getAllIndicatorHistories() {
    try {
      return (await API.get<FullIndicatorHistory[]>('/indicator-history')).data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
};
