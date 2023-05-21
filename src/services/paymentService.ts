import { API } from '.';
import { Payment } from '@/models/Payment';

export const PaymentService = {
  async getAllPayments() {
    try {
      return (await API.get<Payment[]>('/payment')).data;
    } catch (err) {
      return undefined;
    }
  },
};
