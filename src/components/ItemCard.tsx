import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography } from 'antd';
import { ItemUtil } from '@/util/commonUtil';
import { Report } from '@/models/Report';

interface Props {
  report: Report;
}

const { Meta } = Card;
const { Text } = Typography;

const ItemReportUrl = '/report';

function ItemCard(props: Props) {
  const holdingQuantity =
    parseFloat(props.report.buyQuantity) -
    parseFloat(props.report.sellQuantity);

  const navigate = useNavigate();

  return (
    <Card
      hoverable={true}
      onClick={() => navigate(`${ItemReportUrl}/${props.report.item.id}`)}
    >
      <Meta
        className='report-item-card'
        avatar={
          <Avatar src={ItemUtil.getImageURL(props.report.item.imageUrl)} />
        }
        title={
          <>
            <Text style={{ fontSize: '14px' }}>
              {props.report.item.nameKor + ' '}
            </Text>
            <Text style={{ fontSize: '12px' }} type='secondary'>
              {props.report.item.nameEng}
            </Text>
          </>
        }
        description={
          <>
            <Text
              style={{ fontSize: '12px' }}
            >{`${holdingQuantity}${props.report.item.unit} 보유`}</Text>
          </>
        }
      />
    </Card>
  );
}

export default ItemCard;
