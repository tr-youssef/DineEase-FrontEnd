import React from 'react'; 
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Table Number',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Seats',
    dataIndex: 'seats',
    key: 'seats',
  },
   
  {
    title: 'Order',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'Table 1',
    seats: 2,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Table 2',
    seats: 6,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Table 3',
    seats: 10,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const NewClientData = () => <Table columns={columns} dataSource={data} />;
export default NewClientData;