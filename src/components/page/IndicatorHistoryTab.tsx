import React, { useEffect, useState } from 'react';
import { IndicatorHistoryService } from '@/services/indicatorHistoryService';
import { Row, Col, Card } from 'antd';
import { FullIndicatorHistory } from '@/models/Indicator';
import LineSlider from '../graph/LineSlider';
import { DateUtil } from '@/util/commonUtil';
import { TimeValueGraph } from '@/models/Graph';

function IndicatorHistoryTab() {
  const [indicatorHistories, setIndicatorHistories] = useState<
    FullIndicatorHistory[]
  >([]);

  useEffect(() => {
    IndicatorHistoryService.getAllIndicatorHistories().then((e) => {
      if (e) {
        setIndicatorHistories(e);
        // console.log(e);
      }
    });
  }, []);

  const indicatorByCodes: any[] = [];
  const indicatorCodeMap = new Map();

  for (const ih of indicatorHistories) {
    if (!indicatorCodeMap.has(ih.indicator.code)) {
      indicatorCodeMap.set(ih.indicator.code, ih.indicator.name);
    }
  }

  Array.from(indicatorCodeMap).forEach(([code, name]) => {
    indicatorByCodes.push({
      name,
      data: indicatorHistories
        .filter((ih) => ih.indicator.code === code)
        .map((ih) => {
          return {
            time: DateUtil.formatDate(ih.historyAt),
            value: parseFloat(ih.value),
          };
        }),
    });
  });

  const indicatorGraphs = indicatorByCodes.map((ibc, idx) => {
    return (
      <Col span={24} key={'indicator-graph-' + idx}>
        <Card title={ibc.name}>
          <LineSlider xField={'time'} yField={'value'} data={ibc.data} />
        </Card>
      </Col>
    );
  });

  return <Row gutter={[4, 4]}>{indicatorGraphs}</Row>;
}

export default IndicatorHistoryTab;
