import { useEffect, useState } from 'react';
import { callAPI } from "../../../utils/FetchData.js"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Button, Input, Form } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AntTable from '../../../components/AntTable/AntTable.jsx';
import "./Users.css";

function Users() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [fields, setFields] = useState([
    {
      name: ["firstName"],
      value: "",
    },
    {
      name: ["lastName"],
      value: "",
    },
    {
      name: ["email"],
      value: "",
    },
    {
      name: ["role"],
      value: "",
    },
    {
      name: ["password"],
      value: "",
    },
    {
      name: ["restaurantId"],
      value: "",
    },
  ]);

  function editEmployee(id) {
    navigate(`manager/users/editEmployee/${id}`);
    callAPI(`http://localhost:5001/users/${id}`, "GET", {}, token)
      .then(response => {
        setFields([
          {
            name: ["firstName"],
            value: response.data.firstName,
          },
          {
            name: ["lastName"],
            value: response.data.lastName,
          },
          {
            name: ["email"],
            value: response.data.email,
          },
          {
            name: ["role"],
            value: response.data.role,
          },
          {
            name: ["password"],
            value: response.data.role,
          },
          {
            name: ["restaurantId"],
            value: response.data.restaurantId,
          },
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  
  

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
      let fetchData = async () => {
        await callAPI(`http://localhost:5001/users`, "GET", "", token).then((res) => {

          setDataSource(res);
        });
      };
      fetchData();
  }, []);

  const Columns = [
    {
      title: 'First Name',
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
    {
      title: 'Action',
      dataIndex: 'action',
      key:"action",
      width: "20%", 
      render: (text, record) => (
        <div className='Icons'>
          <Link to={`editEmployee/${record._id}`}>
            <EditFilled
              className="editIcon"
              onClick={() => editEmployee(record._id)}
            />
          </Link>
          <DeleteFilled 
            className='deleteIcon'
            onClick={(event) => DeleteEmployee(event, record._id)}
          />
        </div>
      ),
    },
  
  ];
  
  return (
    <div className="employees">
      <div className="employeeButton">
        <Link to={"addEmployee"}>
            <Button className='employee-button' icon={<PlusCircleOutlined />} size={"large"}> 
              Add Employee
            </Button>
        </Link>
      </div>
      <div className="employeeTable">
        <AntTable dataSource={dataSource} Columns={Columns}/>
      </div>
    </div>


  );

};

export default Users;
