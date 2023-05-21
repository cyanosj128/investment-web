import { Suspense, useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { FullTransaction } from '@/models/Transaction';
import { TransactionService } from '@/services/transactionService';

export default function Index() {
  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = () => {
    TransactionService.getAllFullTransactions().then((e) => {
      if (e) {
        setTransactions(e.sort((a, b) => b.transactionAt - a.transactionAt));
      }
    });
  };

  const [transactions, setTransactions] = useState<FullTransaction[]>([]);

  const totalBuyUsdAmount = transactions
    .filter((t) => t.method === 'BUY' && t.payment.code === 'USD')
    .reduce((a, b) => a + parseFloat(b.amount), 0);
  const totalSellUsdAmount = transactions
    .filter((t) => t.method === 'SEL' && t.payment.code === 'USD')
    .reduce((a, b) => a + parseFloat(b.amount), 0);

  const totalBuyKrwAmount = transactions
    .filter((t) => t.method === 'BUY' && t.payment.code === 'KRW')
    .reduce((a, b) => a + parseFloat(b.amount), 0);
  const totalSellKrwAmount = transactions
    .filter((t) => t.method === 'SEL' && t.payment.code === 'KRW')
    .reduce((a, b) => a + parseFloat(b.amount), 0);

  console.log(totalBuyUsdAmount, totalSellUsdAmount);
  console.log(totalBuyKrwAmount, totalSellKrwAmount);

  return (
    <Row gutter={[4, 8]}>
      <Col span={24}>
        <ErrorBoundary fallback={<Card>Error</Card>}>
          <Suspense fallback={<Card>Loading...</Card>}>
            <div>Home Component</div>
          </Suspense>
        </ErrorBoundary>
      </Col>
    </Row>
  );
}
