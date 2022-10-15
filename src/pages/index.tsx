import { Suspense } from 'react';
import { Row, Col, Card, Breadcrumb } from 'antd';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function Index() {
  return (
    <Row gutter={[ 4, 8 ]}>
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
