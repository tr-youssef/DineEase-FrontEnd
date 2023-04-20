import {  useEffect,  useState } from 'react';
import { useParams } from "react-router-dom";
import { token } from "../../../utils/token.js";
import { callAPI } from "../../../utils/FetchData.js"
import AntTable from '../../../components/AntTable/AntTable.jsx';
import "./Users.css";

export function Users() {
  const id = useParams();
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
      let fetchData = async () => {
        await callAPI(`http://localhost:5001/users/`, "GET", "", token).then((res) => {

          setDataSource(res);
        });
      };
      fetchData();
  }, []);
  const Columns = [
    {
      title: 'Frist Name',
      dataIndex: 'firstName',
      key:"firstName",
      width: '20%',
    }, {
      title: 'Last Name',
      dataIndex: 'lastName',
      key:"lastName",
      width: '20%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key:"role",
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key:"email",
    },
  ];
  
  return (
    <AntTable dataSource={dataSource} Columns={Columns}/> 
  );

};

export default Users;