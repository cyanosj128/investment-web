import { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Modal,
  Row,
  Col,
  Input,
  message,
  Collapse,
  Tag,
  Avatar,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllCategories, postNewCategory } from '@/services/categoryService';
import { Category, CategoryWithItems } from '@/models/Category';

const { Panel } = Collapse;
type NewCategory = Omit<Category, 'id'>;

const initialNewCategory = {
  nameEng: '',
  nameKor: '',
  color: '',
};

function CategoryPage() {
  const [categories, setCategories] = useState<CategoryWithItems[]>([]);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState(false);

  const [newCategory, setNewCategory] =
    useState<NewCategory>(initialNewCategory);

  useEffect(() => {
    getAllCategories().then((e) => {
      if (e) {
        setCategories(e);
      }
    });
  }, []);

  const handleSubmitNewCategory = () => {
    postNewCategory(newCategory).then((e) => {
      if (e.affectedRows === 1) {
        message.success('새로운 카테고리가 등록되었습니다');
      }
      setIsAddCategoryModalVisible(false);
      setNewCategory(initialNewCategory);
    });
  };

  const categoryPanels = categories.map((c, i) => {
    const itemAvatars = c.items.map((item, index) => {
      const { imageUrl } = item;
      if (imageUrl) {
        return (
          <Avatar
            key={item.nameEng + index}
            src={imageUrl}
            size='large'
          ></Avatar>
        );
      } else {
        const itemFirstLetter = item.nameEng.slice(0, 1);
        return (
          <Avatar key={item.nameEng + index} size='large'>
            {itemFirstLetter}
          </Avatar>
        );
      }
    });

    return (
      <Panel
        key={'category-' + i}
        header={
          <Tag color={c.color}>{`${c.nameKor}(${itemAvatars.length}개)`}</Tag>
        }
      >
        <Avatar.Group>{itemAvatars}</Avatar.Group>
      </Panel>
    );
  });

  return (
    <>
      <Modal
        open={isAddCategoryModalVisible}
        closable={false}
        onCancel={() => setIsAddCategoryModalVisible(false)}
        onOk={handleSubmitNewCategory}
      >
        <AddCategoryModal
          newCategory={newCategory}
          setNewCategory={setNewCategory}
        />
      </Modal>
      <Card
        title={'Categories'}
        extra={[
          <Button
            key={'currency-add-button'}
            icon={<PlusOutlined />}
            onClick={() => setIsAddCategoryModalVisible(true)}
          />,
        ]}
      >
        <Collapse
          bordered
          activeKey={categories.map((cp, i) => 'category-' + i)}
        >
          {categoryPanels}
        </Collapse>
      </Card>
    </>
  );
}

export default CategoryPage;

interface AddCategoryModalProps {
  newCategory: NewCategory;
  setNewCategory: React.Dispatch<React.SetStateAction<NewCategory>>;
}

function AddCategoryModal(props: AddCategoryModalProps) {
  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <Input
          value={props.newCategory.nameEng}
          placeholder={'영어명을 입력해주세요'}
          onChange={(e) =>
            props.setNewCategory({
              ...props.newCategory,
              nameEng: e.target.value,
            })
          }
        />
      </Col>
      <Col span={24}>
        <Input
          value={props.newCategory.nameKor}
          placeholder={'국어명을 입력해주세요'}
          onChange={(e) =>
            props.setNewCategory({
              ...props.newCategory,
              nameKor: e.target.value,
            })
          }
        />
      </Col>
      <Col span={24}>
        <Input
          value={props.newCategory.color}
          placeholder={'색을 입력해주세요'}
          onChange={(e) =>
            props.setNewCategory({
              ...props.newCategory,
              color: e.target.value,
            })
          }
        />
      </Col>
    </Row>
  );
}
