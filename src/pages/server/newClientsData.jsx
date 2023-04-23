import React from 'react'; 
import { Space, Table, Tag } from 'antd';
import ordericonimage from '../../assets/OrderIcon.png';
import AntTable from "../../components/AntTable/AntTable.jsx";


const Columns = [
  
  {
    title: 'Table Number',
    dataIndex: 'name',
    key: 'name',
    
  },
  {
    title: 'Seats',
    dataIndex: 'seats',
    key: 'seats',
  },
   
  {
    title: 'Order',
    dataIndex: 'action',
    key: 'action',
    render: () => <img src={ordericonimage} alt="Order" />
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
const NewClientData = () => {

  return (
    // <AntTable Columns={Columns} />
    <AntTable dataSource={data} Columns={Columns}/>
  )
}
export default NewClientData;
