import { useEffect, useState } from 'react';
import { Badge, Calendar, Card, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EventService } from '@/services/eventService';
import dayjs from 'dayjs';

function EventPage() {
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(0);

  useEffect(() => {
    const [year, month] = new Date().toISOString().split('T')[0].split('-');
    const from = `${year}-${month}-01`;
    const lastDay = dayjs(from).daysInMonth();
  }, []);

  return (
    <>
      <Modal
        open={isAddEventModalVisible}
        onCancel={() => setIsAddEventModalVisible(false)}
      >
        hi
      </Modal>
      <Card
        title={'이벤트'}
        extra={[<Button key={'event-add-button'} icon={<PlusOutlined />} />]}
      >
        <Calendar
          onSelect={(v) => {
            setSelectedDate(Math.floor(v.valueOf() / 1000));
          }}
          onChange={(e) => console.log(e)}
          // dateCellRender={(v) => {
          //   console.log(v);
          // }}
          // monthCellRender={(v) => {
          //   console.log(v);
          //   return <span>22</span>;
          // }}
        />
      </Card>
    </>
  );
}

export default EventPage;
