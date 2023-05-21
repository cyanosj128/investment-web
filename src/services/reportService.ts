import { API } from '.';
import { Report } from '@/models/Report';
import { FullItemTransaction } from '@/models/Item';

export const ReportService = {
  async getAllReports() {
    try {
      return (await API.get<Report[]>('/report')).data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
  async getItemReport(itemId: string | number) {
    try {
      return (await API.get<FullItemTransaction>(`report/${itemId}`)).data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
};
