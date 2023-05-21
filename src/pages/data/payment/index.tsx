import React, { useState, useEffect } from 'react';
import { PaymentService } from '@/services/paymentService';
import { Payment } from '@/models/Payment';

function PaymentPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    PaymentService.getAllPayments().then((e) => {
      if (e) {
        setPayments(e);
      }
    });
  }, []);
  return <div>hi</div>;
}

export default PaymentPage;
