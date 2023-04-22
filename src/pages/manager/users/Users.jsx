import { useEffect, useState } from 'react';
import { callAPI } from "../../../utils/FetchData.js"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { EditFilled, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
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
      name: ["active"],
      Value: ""
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

  const [dataSource, setDataSource] = useState([]);

  const employeeStatus = (id, token, status) => {
    console.log('status', status)
    if (id) {
      callAPI(`http://localhost:5001/users/status/${id}`, "PATCH", { active: status }, token)
        .then(data => {
          console.log('data', data)
          console.log("Employee status updated:", data);
          const updatedDataSource = dataSource.map(employee => {
            if (employee._id === id) {
              return { ...employee, active: status };
            } else {
              return employee;
            }
          });
          setDataSource(updatedDataSource);
        })
        .catch(error => {
          console.error("Failed to update employee status:", error);
        });
    }
  };
  

  
  useEffect(() => {
    let fetchData = async () => {
      await callAPI(`http://localhost:5001/users`, "GET", "", token).then((res) => {
        const result=[]
        res.map((x)=>{
          x.active?result.push({...x,status:'active',key:x._id}):result.push({...x,status:'inactive',key:x._id})
        })
        setDataSource(result);
        console.log(result)
      });
    };
    fetchData();
  }, [dataSource]);
  
  

  const Columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key:"firstName",
      width: '15%',
    }, {
      title: 'Last Name',
      dataIndex: 'lastName',
      key:"lastName",
      width: '15%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key:"role",
      width: '15%',
    },
    {
      title: 'Active',
      dataIndex: 'status',
      key:"status",
      width: '15%',
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
      width: "25%", 
      render: (text, record) => (
        <div className='Icons'>
          <div>
            <Link to={`editEmployee/${record._id}`}>
              <EditFilled
                className="editIcon"
                onClick={() => editEmployee(record._id)}
              />
            </Link>
          </div>
          <div>
            <Popover title={record.active ? "Change employee to inactive " : "Change employee to active"}>
              <div onClick={() => employeeStatus(record._id, token, record.active)}>
                {record.active ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              </div>
            </Popover>
          </div>
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