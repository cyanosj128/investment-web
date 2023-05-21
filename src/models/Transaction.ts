import { Item } from './Item';
import { Payment } from './Payment';

export type TransactionMethod = 'BUY' | 'SEL';

export interface Transaction {
  id: number;
  itemId: number;
  method: TransactionMethod;
  paymentId: number;
  quantity: string;
  amount: string;
  transactionAt: number;
}

export interface FullTransaction {
  id: number;
  item: Item;
  method: TransactionMethod;
  payment: Payment;
  quantity: string;
  amount: string;
  transactionAt: number;
}

export type NewTransaction = Omit<Transaction, 'id'>;
