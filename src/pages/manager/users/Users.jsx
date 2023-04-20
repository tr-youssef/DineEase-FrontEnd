import {  useEffect,  useState } from 'react';
import { useParams } from "react-router-dom";
import { token } from "../../../utils/token.js";
import { callAPI } from "../../../utils/FetchData.js"
import {Table } from 'antd';
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
      title: 'Fristname',
      dataIndex: 'firstName',
      key:"firstName",
      width: '30%',
      editable: true,
    }, {
      title: 'Lastname',
      dataIndex: 'lastName',
      key:"lastName",
      width: '30%',
      editable: true,
    },
    {
      title: 'role',
      dataIndex: 'role',
      key:"role",
    },
    {
      title: 'email',
      dataIndex: 'email',
      key:"email",
    },
  ];
  
  return (
    <Table dataSource={dataSource} columns={Columns} />
  );

};

export default Users;