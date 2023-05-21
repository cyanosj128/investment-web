import React, { useEffect, useState } from 'react';
import { FullItemTransaction } from '@/models/Item';
import { ReportService } from '@/services/reportService';
import { TransactionUtil } from '@/util/transactionUtil';
import {
  Descriptions,
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Badge,
  Tabs,
  Timeline,
  Tag,
  Statistic,
} from 'antd';
import { useParams } from 'react-router-dom';
import { DateUtil, ItemUtil, NumberUtil } from '@/util/commonUtil';
import { FullTransaction } from '@/models/Transaction';
import { ColorConstant } from '@/constants';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Big from 'big.js';

const { Text } = Typography;

function ItemReportPage() {
  const { itemId } = useParams();

  const [itemReport, setItemReport] = useState<null | FullItemTransaction>(
    null
  );

  useEffect(() => {
    if (itemId) {
      ReportService.getItemReport(itemId).then((e) => {
        if (e) {
          setItemReport(e);
        }
      });
    }
  }, [itemId]);

  if (!itemReport) {
    return null;
  }

  const buySellQuantities = itemReport.transactions.map((t) => {
    const parsedQuantity = parseFloat(t.quantity);
    if (t.method === 'SEL') {
      return parsedQuantity * -1;
    }
    return parsedQuantity;
  });

  const holdingHistories = TransactionUtil.getHoldingHistories(
    itemReport.transactions
  );

  return (
    <Row gutter={[4, 8]}>
      <Col span={24}>
        <Card
          title={
            <>
              <Text style={{ fontSize: '16px' }}>
                {itemReport.nameKor + ' '}
              </Text>
              <Text style={{ fontSize: '14px' }} type='secondary'>
                {itemReport.nameEng}
              </Text>
            </>
          }
        >
          <Descriptions className='item-report-description' bordered>
            <Descriptions.Item label='로고'>
              <Avatar src={ItemUtil.getImageURL(itemReport.imageUrl)} />
            </Descriptions.Item>
            <Descriptions.Item label='보유여부'>
              {TransactionUtil.getIsHolding(buySellQuantities) ? (
                <Badge status='processing' text='보유 중' />
              ) : (
                <Badge status='error' text='미보유' />
              )}
            </Descriptions.Item>
            <Descriptions.Item label='보유량'>
              {TransactionUtil.getHoldingQuantity(buySellQuantities) +
                itemReport.unit}
            </Descriptions.Item>
            <Descriptions.Item label='보유횟수'>
              {TransactionUtil.getRetentionCount(buySellQuantities) + '회'}
            </Descriptions.Item>
            <Descriptions.Item label='평단가(현)'>
              {NumberUtil.toDisplayNumber(
                TransactionUtil.getAverageAmount(
                  holdingHistories[holdingHistories.length - 1]
                )
              )}
            </Descriptions.Item>
            <Descriptions.Item label='평단가(누적)'>
              {NumberUtil.toDisplayNumber(
                TransactionUtil.getAverageAmount(itemReport.transactions)
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col span={24}>
        <HoldingHistory
          holdingHistories={holdingHistories}
          itemUnit={itemReport.unit}
        />
      </Col>
    </Row>
  );
}

export default ItemReportPage;

interface HoldingHistoryProps {
  holdingHistories: Omit<FullTransaction, 'item'>[][];
  itemUnit: string;
}

function HoldingHistory(props: HoldingHistoryProps) {
  return (
    <Tabs
      defaultActiveKey='1'
      centered
      items={props.holdingHistories.map((hh, i) => {
        const id = 'holding-history-' + i;
        return {
          label: `Holding History ${i + 1}`,
          key: id,
          children: (
            <div style={{ padding: '16px' }}>
              <HoldingTimeline transactions={hh} unit={props.itemUnit} />
              <HoldingHistorySummary transactions={hh} unit={props.itemUnit} />
            </div>
          ),
        };
      })}
    />
  );
}

interface HoldingTimelineProps {
  transactions: Omit<FullTransaction, 'item'>[];
  unit: string;
}

function HoldingHistorySummary(props: HoldingTimelineProps) {
  const average = TransactionUtil.getAverageAmount(props.transactions);
  const txUnit = props.transactions.length
    ? props.transactions[0].payment.code
    : '';

  let buyAmount = new Big(0);
  let sellAmount = new Big(0);

  for (const tx of props.transactions) {
    if (tx.method === 'BUY') {
      buyAmount = buyAmount.add(new Big(tx.amount));
    } else {
      sellAmount = sellAmount.add(new Big(tx.amount));
    }
  }

  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <Row gutter={[4, 4]}>
          <Col span={8}>
            <Card>
              <Statistic
                title='총 매수액'
                value={NumberUtil.toDisplayNumber(buyAmount.toString())}
                precision={2}
                valueStyle={{ color: ColorConstant.BUY }}
                suffix={txUnit}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title='총 매도액'
                value={NumberUtil.toDisplayNumber(sellAmount.toString())}
                precision={2}
                valueStyle={{ color: ColorConstant.SELL }}
                suffix={txUnit}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title='평단가'
                value={average}
                precision={2}
                valueStyle={{ color: ColorConstant.AVERAGE }}
                suffix={txUnit}
              />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[4, 4]}>
          <Col span={12}>
            <Card>
              <Statistic
                title='수익'
                value={NumberUtil.toDisplayNumber(
                  sellAmount.minus(buyAmount).toString()
                )}
                precision={2}
                valueStyle={{
                  color:
                    sellAmount.minus(buyAmount).toNumber() > 0
                      ? ColorConstant.PLUS_YEILD
                      : ColorConstant.MINUS_YEILD,
                }}
                prefix={
                  sellAmount.minus(buyAmount).toNumber() > 0 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
                suffix={txUnit}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title='수익율'
                value={sellAmount
                  .minus(buyAmount)
                  .div(buyAmount)
                  .mul(100)
                  .toNumber()}
                precision={2}
                valueStyle={{ color: ColorConstant.AVERAGE }}
                suffix={'%'}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

function HoldingTimeline(props: HoldingTimelineProps) {
  const timelineItems = props.transactions.map((tx, idx) => {
    const content = (
      <>
        {TransactionUtil.getTransactionMethodTag(tx.method)}
        <Text style={{ fontSize: '14px' }}>
          {NumberUtil.toDisplayNumber(tx.amount)}
        </Text>
        <Text type='secondary' style={{ fontSize: '12px' }}>
          ({NumberUtil.toDisplayNumber(tx.quantity)}
          {props.unit})
        </Text>
      </>
    );

    return (
      <Timeline.Item
        key={tx.id.toString() + idx}
        label={<Tag>{DateUtil.formatDate(tx.transactionAt)}</Tag>}
        color={tx.method === 'BUY' ? ColorConstant.BUY : ColorConstant.SELL}
      >
        {content}
      </Timeline.Item>
    );
  });

  return <Timeline mode='left'>{timelineItems}</Timeline>;
}
