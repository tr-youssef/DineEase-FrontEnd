import React, { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Input, Button, Form, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../../../utils/FetchData.js";
import "./AddTable.css";

const { Option } = Select;
export function TableForm () {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [servers, setServers] = useState([]);
  
  useEffect(() => {
    callAPI("http://localhost:5001/users?role=server", "GET", null, token)
      .then((data) => {
        setServers(data);
        console.log('data', data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const handleClick = () => {
    navigate("/manager/tables");
  };

  const fields = [
    {
      name: "nameOfTable",
      value: "",
    },
    {
      name: "capacity",
      value: "",
    },
    {
      name: "status",
      value: "",
    },
  ];

const onFinish = (values) => {
  const data = {
    nameOfTable: values.nameOfTable,
    capacity: values.capacity,
    userId: values.user,
    status: "available",
  };  
    callAPI("http://localhost:5001/tables/", "POST", data, token).then(() => {
      navigate("/manager/tables");
    });
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  

  return (

      <div className="AddTable">
        <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "Right", width: "100px" }} size={"large"} />
        <Form name="addEmployee"  fields={fields} style={{ maxWidth: 600, marginTop: "40px" }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            
          <Form.Item
            label="Name of table"
            name="nameOfTable"
            rules={[
              {
                required: true,
                message: "Please input the name of the table",
              },
            ]}
          >
            <Input placeholder="Enter the name of the table" />
          </Form.Item>
          <Form.Item
            label="No. of seats"
            name="capacity"
            rules={[
              {
                required: true,
                message: "Please input the number of seats",
              },
            ]}
          >
            <Input placeholder="Enter the number of seats" />
          </Form.Item>
            <Form.Item
            label="Server"
            name="server"
            rules={[
                {
                required: true,
                message: "Please select a server",
                },
            ]}
            >
            <Select>
            <Option value="">Select a server</Option>
            {servers && servers.map((server) => (
                <Option key={server._id} value={server._id}>
                {server.firstName}
                </Option>
            ))}
            </Select>
            </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Table
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
}

export default TableForm;
