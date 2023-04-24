import {  useEffect,  useState } from 'react';
import ordericonimage from '../../assets/OrderIcon.png';
import AntTable from "../../components/AntTable/AntTable.jsx";
import { callAPI } from "../../utils/FetchData";
import { Link } from 'react-router-dom';


const NewClientData = () => {
  const Columns = [
    
    {
      title: 'Table Number',
      dataIndex: 'nameOfTable',
      key: 'nameOfTable',
      
    },
    {
      title: 'Seats',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    
    {
      title: 'Order',
      dataIndex: '_id',
      key: '_id',
      render: (_id) => <Link to={"/server/takeOrder/"+ _id}><img src={ordericonimage}  alt="Take Order" /></Link>
    },
  ];
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [data, setData] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
        // TODO: Update with correct server id
      console.log(token)
        await callAPI(`http://localhost:5001/tables/availableTables/123`, "GET", "", token).then((res) => {
        setData(res);
        });
      };
      fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-50px' }}>
      <AntTable dataSource={data} Columns={Columns}/>
    </div>
  );
};
export default NewClientData;
