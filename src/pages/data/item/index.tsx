import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Modal,
  Avatar,
  Button,
  Row,
  Col,
  Input,
  message,
  Radio,
} from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ItemService } from '@/services/itemService';
import { PlusOutlined } from '@ant-design/icons';
import { Item, ItemWithCurrencies, NewItem } from '@/models/Item';
import { ItemUtil } from '@/util/commonUtil';

const initialNewItem = {
  imageUrl: '',
  nameEng: '',
  nameKor: '',
  unit: '',
};

function ItemPage() {
  const [isAddNewItemModalVisible, setIsAddNewItemModalVisible] =
    useState(false);

  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<NewItem>(initialNewItem);

  useEffect(() => {
    getAllItemList();
  }, []);

  const getAllItemList = () => {
    ItemService.getAllItems().then((e) => {
      if (e) {
        setItems(e);
      }
    });
  };

  const handleSubmitNewItem = () => {
    console.log(newItem);
    ItemService.postNewItem(newItem).then((e) => {
      if (e?.status === 200 || e?.status === 201) {
        message.success('새로운 종목이 등록되었습니다');
        setIsAddNewItemModalVisible(false);
        setNewItem(initialNewItem);
        getAllItemList();
      } else {
        message.error('실패하였습니다. 나중에 다시 시도해주세요');
      }
    });
  };

  return (
    <>
      <Modal
        width={'50%'}
        open={isAddNewItemModalVisible}
        closable={false}
        onCancel={() => setIsAddNewItemModalVisible(false)}
        onOk={handleSubmitNewItem}
      >
        <AddItemModal newItem={newItem} setNewItem={setNewItem} />
      </Modal>
      <Card
        title='Item List'
        extra={[
          <Button
            key={'currency-add-button'}
            icon={<PlusOutlined />}
            onClick={() => {
              setIsAddNewItemModalVisible(true);
            }}
          />,
        ]}
      >
        <ItemTable items={items} />
      </Card>
    </>
  );
}

export default ItemPage;

interface ItemTable {
  items: Item[];
}

function ItemTable(props: ItemTable) {
  const columns: ColumnType<Item>[] = [
    {
      key: 'avatar',
      title: '이미지',
      align: 'center',
      render: (v, r) => {
        if (r.imageUrl) {
          const imageUrl = ItemUtil.getImageURL(r.imageUrl);
          return <Avatar src={imageUrl} />;
        } else {
          const itemFirstLetter = r.nameEng.slice(0, 1);
          return <Avatar>{itemFirstLetter}</Avatar>;
        }
      },
    },
    {
      key: 'nameKor',
      title: '한글',
      align: 'center',
      render: (v, r) => r.nameKor,
    },
    {
      key: 'nameEng',
      title: '영문',
      align: 'center',
      render: (v, r) => r.nameEng,
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.items.map((c, i) => ({
        key: 'currency-' + i,
        ...c,
      }))}
      pagination={false}
      bordered={true}
    />
  );
}

interface AddItemModalProps {
  newItem: NewItem;
  setNewItem: React.Dispatch<React.SetStateAction<NewItem>>;
}

function AddItemModal(props: AddItemModalProps) {
  const itemUnits = ['주', '달러', '원', '개'];

  const itemUnitRadioButtons = itemUnits.map((iu, i) => {
    return (
      <Radio.Button
        value={iu}
        key={i + iu}
        style={{ width: '25%', textAlign: 'center' }}
      >
        {iu}
      </Radio.Button>
    );
  });

  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <Input
          value={props.newItem.nameKor}
          placeholder={'국어명을 입력해주세요'}
          onChange={(e) =>
            props.setNewItem({
              ...props.newItem,
              nameKor: e.target.value,
            })
          }
        />
      </Col>
      <Col span={24}>
        <Input
          value={props.newItem.nameEng}
          placeholder={'영어명을 입력해주세요'}
          onChange={(e) =>
            props.setNewItem({
              ...props.newItem,
              nameEng: e.target.value,
            })
          }
        />
      </Col>
      <Col span={24}>
        <Radio.Group
          style={{ width: '100%' }}
          onChange={(e) => {
            props.setNewItem({
              ...props.newItem,
              unit: e.target.value,
            });
          }}
        >
          {itemUnitRadioButtons}
        </Radio.Group>
      </Col>
      <Col span={24}>
        <Input
          addonBefore={'/src/assets/images/item/'}
          addonAfter={'.png'}
          value={props.newItem.imageUrl}
          placeholder={'이미지 주소를 입력해주세요'}
          onChange={(e) =>
            props.setNewItem({
              ...props.newItem,
              imageUrl: e.target.value,
            })
          }
        />
      </Col>
    </Row>
  );
}
