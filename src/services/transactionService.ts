import { API } from '.';
import { FullTransaction, NewTransaction } from '@/models/Transaction';

export const TransactionService = {
  async getAllFullTransactions() {
    try {
      return (await API.get<FullTransaction[]>('/transaction')).data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
  async postNewTransaction(newTransaction: NewTransaction) {
    console.log(newTransaction);
    try {
      return await API.post('/transaction', newTransaction);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
};
