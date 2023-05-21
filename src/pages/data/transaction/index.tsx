import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Modal,
  Avatar,
  Button,
  Row,
  Col,
  InputNumber,
  message,
  Select,
  Radio,
  DatePicker,
} from 'antd';
import { ColumnType } from 'antd/lib/table';
import { PlusOutlined } from '@ant-design/icons';
import { NewTransaction, FullTransaction } from '@/models/Transaction';
import { TransactionService } from '@/services/transactionService';
import { ItemService } from '@/services/itemService';
import { PaymentService } from '@/services/paymentService';
import { Payment } from '@/models/Payment';
import { Item } from '@/models/Item';
import { DateUtil, NumberUtil } from '@/util/commonUtil';
import { TransactionUtil } from '@/util/transactionUtil';
import { ItemUtil } from '@/util/commonUtil';

const initialNewTransaction: NewTransaction = {
  amount: '0',
  itemId: 0,
  method: 'BUY',
  paymentId: 0,
  quantity: '0',
  transactionAt: 0,
};

function TransactionPage() {
  const [isAddNewTransactionModalVisible, setIsAddNewTransactionModalVisible] =
    useState(false);

  const [transactions, setTransactions] = useState<FullTransaction[]>([]);
  const [newTransaction, setNewTransaction] = useState<NewTransaction>(
    initialNewTransaction
  );
  const [selectedItemId, setSelectedItemId] = useState(0);

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

  const handleSubmitNewTransaction = () => {
    TransactionService.postNewTransaction(newTransaction).then((e) => {
      if (e?.status === 200 || e?.status === 201) {
        message.success('새로운 거래가 등록되었습니다');
        setIsAddNewTransactionModalVisible(false);
        setNewTransaction(initialNewTransaction);
        getAllTransactions();
      } else {
        message.error('실패하였습니다. 나중에 다시 시도해주세요');
      }
    });
  };

  const itemMap = new Map();
  for (const tx of transactions) {
    if (!itemMap.has(tx.item.id)) {
      itemMap.set(tx.item.id, tx.item.imageUrl);
    }
  }

  const itemAvatars = Array.from(itemMap).map((e, i) => {
    return (
      <Col span={2} key={e[0].toString() + i}>
        <Avatar
          onClick={() => {
            if (e[0] === selectedItemId) {
              setSelectedItemId(0);
            } else {
              setSelectedItemId(e[0]);
            }
          }}
          src={ItemUtil.getImageURL(e[1])}
          size={'large'}
        />
      </Col>
    );
  });

  return (
    <>
      <Modal
        width={'50%'}
        open={isAddNewTransactionModalVisible}
        closable={false}
        onCancel={() => setIsAddNewTransactionModalVisible(false)}
        onOk={handleSubmitNewTransaction}
      >
        <AddTransactionModal
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
        />
      </Modal>
      <Card
        title={`Transaction List (${transactions.length})`}
        extra={[
          <Button
            key={'currency-add-button'}
            icon={<PlusOutlined />}
            onClick={() => {
              setIsAddNewTransactionModalVisible(true);
            }}
          />,
        ]}
      >
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <Card>
              <Row gutter={[2, 12]}>{itemAvatars}</Row>
            </Card>
          </Col>
          <Col span={24}>
            <TransactionTable
              transactions={
                selectedItemId === 0
                  ? transactions
                  : transactions.filter((t) => t.item.id === selectedItemId)
              }
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default TransactionPage;

interface TransactionTableProps {
  transactions: FullTransaction[];
}

function TransactionTable(props: TransactionTableProps) {
  const columns: ColumnType<FullTransaction>[] = [
    {
      key: 'avatar',
      title: '이미지',
      align: 'center',
      render: (v, r) => <Avatar src={ItemUtil.getImageURL(r.item.imageUrl)} />,
    },
    {
      key: 'itemKorName',
      title: '이름',
      align: 'center',
      render: (v, r) => r.item.nameKor,
    },
    {
      key: 'quantity',
      title: '수량',
      align: 'right',
      render: (v, r) => NumberUtil.toDisplayNumber(r.quantity) + r.item.unit,
    },
    {
      key: 'amount',
      title: '금액',
      align: 'right',
      render: (v, r) => {
        const amountPerQuantity = (
          parseFloat(r.amount) / parseFloat(r.quantity)
        ).toFixed(2);
        return (
          <p style={{ margin: 0 }}>
            {`${NumberUtil.toDisplayNumber(r.amount)} ${r.payment.code}`}
            <br />
            {`${NumberUtil.toDisplayNumber(amountPerQuantity)} ${
              r.payment.code
            }`}
          </p>
        );
      },
    },
    {
      key: 'method',
      title: '거래',
      align: 'center',
      render: (v, r) => TransactionUtil.getTransactionMethodTag(r.method),
    },
    {
      key: 'transactionAt',
      title: '날짜',
      align: 'center',
      render: (v, r) => DateUtil.formatDate(r.transactionAt),
    },
  ];
  return (
    <Table
      className='transaction-table'
      columns={columns}
      size={'small'}
      dataSource={props.transactions.map((c, i) => ({
        key: 'transaction-' + i,
        ...c,
      }))}
      pagination={false}
      bordered={true}
    />
  );
}

interface AddTransactionModalProps {
  newTransaction: NewTransaction;
  setNewTransaction: React.Dispatch<React.SetStateAction<NewTransaction>>;
}

function AddTransactionModal(props: AddTransactionModalProps) {
  const [options, setOptions] = useState<{
    items: Item[];
    payments: Payment[];
  }>({
    items: [],
    payments: [],
  });

  useEffect(() => {
    Promise.all([
      ItemService.getAllItems(),
      PaymentService.getAllPayments(),
    ]).then(([items, payments]) => {
      if (items && payments) {
        setOptions({
          items,
          payments,
        });
      }
    });
  }, []);

  const itemOptions = options.items.map((item) => ({
    label: item.nameKor,
    value: item.id,
  }));

  const paymentOptions = options.payments.map((payment, idx) => {
    const width = `${100 / options.payments.length}%`;
    return (
      <Radio.Button
        key={payment.code + idx}
        value={payment.id}
        style={{ width: width, textAlign: 'center' }}
      >
        {payment.code}
      </Radio.Button>
    );
  });

  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <Select
          style={{ width: '100%' }}
          placeholder='종목을 선택해주세요'
          onChange={(e) =>
            props.setNewTransaction({
              ...props.newTransaction,
              itemId: e,
            })
          }
          options={itemOptions}
        />
      </Col>
      <Col span={24}>
        <InputNumber
          style={{ width: '100%' }}
          value={props.newTransaction.quantity}
          placeholder={'수량을 입력해주세요'}
          onChange={(e) => {
            if (e) {
              props.setNewTransaction({
                ...props.newTransaction,
                quantity: e,
              });
            }
          }}
        />
      </Col>
      <Col span={24}>
        <InputNumber
          style={{ width: '100%' }}
          value={props.newTransaction.amount}
          placeholder={'금액을 입력해주세요'}
          onChange={(e) => {
            if (e) {
              props.setNewTransaction({
                ...props.newTransaction,
                amount: e,
              });
            }
          }}
        />
      </Col>
      <Col span={24}>
        <Radio.Group
          style={{ width: '100%' }}
          onChange={(e) =>
            props.setNewTransaction({
              ...props.newTransaction,
              paymentId: e.target.value,
            })
          }
        >
          {paymentOptions}
        </Radio.Group>
      </Col>
      <Col span={24}>
        <Radio.Group
          style={{ width: '100%' }}
          onChange={(e) =>
            props.setNewTransaction({
              ...props.newTransaction,
              method: e.target.value,
            })
          }
        >
          <Radio.Button
            value='BUY'
            style={{ width: '50%', textAlign: 'center' }}
          >
            매수
          </Radio.Button>
          <Radio.Button
            value='SEL'
            style={{ width: '50%', textAlign: 'center' }}
          >
            매도
          </Radio.Button>
        </Radio.Group>
      </Col>
      <Col span={24}>
        <DatePicker
          style={{ width: '100%' }}
          onChange={(e) => {
            const formattedDate = e!.format('YYYY-MM-DD');
            const seconds = new Date(formattedDate).getTime();
            props.setNewTransaction({
              ...props.newTransaction,
              transactionAt: seconds / 1000,
            });
          }}
        />
      </Col>
    </Row>
  );
}
