import React from 'react'; 
import { Space, Table, Tag } from 'antd';
import ordericonimage from '../../assets/OrderIcon.png';


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
   
  },
  {
    key: '2',
    name: 'Table 2',
    seats: 6,
    
  },
  {
    key: '3',
    name: 'Table 3',
    seats: 10,
  },
];
const NewClientData = () => <Table columns={columns} dataSource={data} />;
export default NewClientData;