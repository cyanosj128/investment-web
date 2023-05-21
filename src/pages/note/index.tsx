import { useEffect, useState, SetStateAction } from 'react';
import {
  Card,
  Table,
  Modal,
  Button,
  Row,
  Col,
  Input,
  message,
  DatePicker,
} from 'antd';
import { ColumnType } from 'antd/lib/table';
import { PlusOutlined } from '@ant-design/icons';
import { NewNote, Note } from '@/models/Note';
import { NoteService } from '@/services/noteService';
import { DateUtil } from '@/util/commonUtil';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const initialNewNote: NewNote = {
  description: '',
  startAt: 0,
  endAt: 0,
  title: '',
};

function NotePage() {
  const [isAddNewItemModalVisible, setIsAddNewItemModalVisible] =
    useState(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<NewNote>(initialNewNote);

  useEffect(() => {
    NoteService.getAllNotes().then((e) => {
      if (e) {
        setNotes(e);
      }
    });
  }, []);

  const handleSubmitNewNote = () => {
    NoteService.postNewNote(newNote).then((e) => {
      message.success('새로운 노트가 등록되었습니다');
      setNewNote(initialNewNote);
      setIsAddNewItemModalVisible(false);
    });
  };

  return (
    <>
      <Modal
        width={'50%'}
        open={isAddNewItemModalVisible}
        closable={false}
        onCancel={() => setIsAddNewItemModalVisible(false)}
        onOk={handleSubmitNewNote}
      >
        <AddNoteModal newNote={newNote} setNewNote={setNewNote} />
      </Modal>
      <Card
        title='Note List'
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
        <NoteTable notes={notes} />
      </Card>
    </>
  );
}

export default NotePage;

interface AddNoteModalProps {
  newNote: NewNote;
  setNewNote: React.Dispatch<SetStateAction<NewNote>>;
}

function AddNoteModal(props: AddNoteModalProps) {
  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <Input
          placeholder='제목을 입력해주세요'
          onChange={(e) =>
            props.setNewNote({
              ...props.newNote,
              title: e.target.value,
            })
          }
        />
      </Col>
      <Col span={24}>
        <RangePicker
          style={{ width: '100%' }}
          onChange={(e) => {
            if (e && e[0] && e[1]) {
              const fromTime = e[0].unix();
              const toTime = e[1].unix();
              props.setNewNote({
                ...props.newNote,
                startAt: fromTime,
                endAt: toTime,
              });
            }
          }}
        />
      </Col>
      <Col span={24}>
        <TextArea
          style={{ height: '100px' }}
          placeholder='설명을 입력해주세요'
          onChange={(e) =>
            props.setNewNote({
              ...props.newNote,
              description: e.target.value,
            })
          }
        />
      </Col>
    </Row>
  );
}

interface NoteTable {
  notes: Note[];
}

function NoteTable(props: NoteTable) {
  const columns: ColumnType<Note>[] = [
    {
      key: 'title',
      title: '제목',
      align: 'center',
      render: (v, r) => r.title,
    },
    {
      key: 'description',
      title: '설명',
      align: 'center',
      render: (v, r) => r.description,
    },
    {
      key: 'from',
      title: '시작일',
      align: 'center',
      render: (v, r) =>
        `${DateUtil.formatDate(r.startAt)} - ${DateUtil.formatDate(r.endAt)}`,
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.notes.map((c, i) => ({
        key: 'note-' + i,
        ...c,
      }))}
      pagination={false}
      bordered={true}
    />
  );
}
