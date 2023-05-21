import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import IndicatorTab from '@/components/page/IndicatorTab';
import IndicatorHistoryTab from '@/components/page/IndicatorHistoryTab';

function IndicatorPage() {
  return (
    <Tabs
      defaultActiveKey='1'
      centered
      items={[
        {
          label: 'Indicator',
          key: '1',
          children: <IndicatorTab />,
        },
        {
          label: 'Indicator History',
          key: '2',
          children: <IndicatorHistoryTab />,
        },
      ]}
    />
  );
}

export default IndicatorPage;
