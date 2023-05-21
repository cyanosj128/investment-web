import { useEffect, useState, CSSProperties } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  Input,
  Row,
  Col,
  message,
  Radio,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Currency } from '@/models/Currency';
import { postNewCurrency, getAllCurrencies } from '@/services/currencyService';
import { ColumnType } from 'antd/lib/table';

type NewCurrency = Omit<Currency, 'id'>;

const initialNewCurrency: Omit<Currency, 'id'> = {
  nameEng: '',
  nameKor: '',
  symbol: '',
  place: 'PFX',
};

function CurrencyPage() {
  const [isAddCurrencyModalVisible, setIsAddCurrencyModalVisible] =
    useState(false);

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [newCurrency, setNewCurrency] =
    useState<NewCurrency>(initialNewCurrency);

  useEffect(() => {
    getAllCurrencies().then((e) => {
      if (e) {
        setCurrencies(e);
      }
    });
  }, []);

  const handleSubmitNewCurrency = () => {
    postNewCurrency(newCurrency).then((e) => {
      if (e.affectedRows === 1) {
        message.success('새로운 통화가 등록되었습니다');
        setIsAddCurrencyModalVisible(false);
        setNewCurrency(initialNewCurrency);
      } else {
        message.error('실패하였습니다. 나중에 다시 시도해주세요');
      }
    });
  };

  return (
    <>
      <Modal
        open={isAddCurrencyModalVisible}
        closable={false}
        onCancel={() => setIsAddCurrencyModalVisible(false)}
        onOk={handleSubmitNewCurrency}
      >
        <AddCurrencyModal
          newCurrency={newCurrency}
          setNewCurrency={setNewCurrency}
        />
      </Modal>
      <Card
        title={'Currency List'}
        extra={[
          <Button
            key={'currency-add-button'}
            icon={<PlusOutlined />}
            onClick={() => setIsAddCurrencyModalVisible(true)}
          />,
        ]}
      >
        <CurrencyTable currencies={currencies} />
      </Card>
    </>
  );
}

export default CurrencyPage;

interface CurrencyTable {
  currencies: Currency[];
}

function CurrencyTable(props: CurrencyTable) {
  const columns: ColumnType<Currency>[] = [
    {
      key: 'symbol',
      title: 'Symbol',
      align: 'center',
      render: (v, r) => r.symbol,
    },
    {
      key: 'nameEng',
      title: '영문',
      align: 'center',
      render: (v, r) => r.nameEng,
    },
    {
      key: 'nameKor',
      title: '한글',
      align: 'center',
      render: (v, r) => r.nameKor,
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.currencies.map((c, i) => ({
        key: 'currency-' + i,
        ...c,
      }))}
      pagination={false}
      bordered={true}
    />
  );
}

interface AddCurrencyModalProps {
  newCurrency: NewCurrency;
  setNewCurrency: React.Dispatch<React.SetStateAction<NewCurrency>>;
}

function AddCurrencyModal(props: AddCurrencyModalProps) {
  const radioStyle: CSSProperties = {
    width: '50%',
    textAlign: 'center',
  };
  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <Input
          value={props.newCurrency.nameEng}
          placeholder={'영어명을 입력해주세요'}
          onChange={(e) =>
            props.setNewCurrency({
              ...props.newCurrency,
              nameEng: e.target.value,
            })
          }
        />
      </Col>
      <Col span={24}>
        <Input
          value={props.newCurrency.nameKor}
          placeholder={'국어명을 입력해주세요'}
          onChange={(e) =>
            props.setNewCurrency({
              ...props.newCurrency,
              nameKor: e.target.value,
            })
          }
        />
      </Col>
      <Col span={24}>
        <Input
          value={props.newCurrency.symbol}
          placeholder={'기호를 입력해주세요'}
          onChange={(e) =>
            props.setNewCurrency({
              ...props.newCurrency,
              symbol: e.target.value,
            })
          }
        />
      </Col>
      <Col span={24}>
        <Radio.Group
          value={props.newCurrency.place}
          onChange={(e) =>
            props.setNewCurrency({
              ...props.newCurrency,
              place: e.target.value,
            })
          }
          style={{ width: '100%' }}
        >
          <Radio.Button style={radioStyle} value={'PFX'}>
            Prefix
          </Radio.Button>
          <Radio.Button style={radioStyle} value={'SFX'}>
            Suffix
          </Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  );
}
