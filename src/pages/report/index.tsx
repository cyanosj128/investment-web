import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import ItemCard from '@/components/ItemCard';
import { ReportService } from '@/services/reportService';
import { Report } from '@/models/Report';
import Big from 'big.js';

function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    ReportService.getAllReports().then((e) => {
      if (e) {
        setReports(e);
      }
    });
  }, []);

  const finishedItemCards = reports
    .filter(
      (report) =>
        Big(report.buyQuantity).minus(Big(report.sellQuantity)).toNumber() <= 0
    )
    .map((report, index) => {
      return (
        <Col span={8} key={report.item.nameEng + index}>
          <ItemCard report={report} />
        </Col>
      );
    });

  const onGoingItemCards = reports
    .filter(
      (report) =>
        Big(report.buyQuantity).minus(Big(report.sellQuantity)).toNumber() > 0
    )
    .map((report, index) => {
      return (
        <Col span={8} key={report.item.nameEng + index}>
          <ItemCard report={report} />
        </Col>
      );
    });

  return (
    <>
      <Row gutter={[4, 4]}>
        <Col span={24}>
          <Card title={`Holding Items (${onGoingItemCards.length})`}>
            <Row gutter={[4, 4]}>{onGoingItemCards}</Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card title={`Finished Items (${finishedItemCards.length})`}>
            <Row gutter={[4, 4]}>{finishedItemCards}</Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ReportPage;
