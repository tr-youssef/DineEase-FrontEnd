import React, { useState, useEffect } from "react";
import { Input, Button, Form, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.js";
import "./EditTable.css";

export function EditTable () {
    
const token = JSON.parse(localStorage.getItem("user")).token;
const [fields, setFields] = useState([]);
const navigate = useNavigate();
const { id } = useParams();

  useEffect(() => {
    if (id) {
      callAPI(`http://localhost:5001/Tables/${id}`, "GET", {}, token)
        .then((response) => {
          setFields([
            {
              name: ["nameOfTable"],
              value: response.nameOfTable,
            },
            {
              name: ["capacity"],
              value: response.capacity,
            },
            {
              name: ["server"],
              value: response.server,
            },
          ]);
        })
        .catch((error) => console.log(error));
    } else {
      setFields([
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
      ]);
    }
  }, [id]);

  const onFinish = (values) => {
    if (id) {
      callAPI(`http://localhost:5001/users/${id}`, "PATCH", values, token)
        .then((response) => {
          navigate("/manager/users");
        })
        .catch((error) => console.log(error))
    }
  }; 

  const handleClick = () => {
    navigate("/manager/users");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (

    <div className="AddTable">
      <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "left", width: "100px" }} size={"large"} />
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
          name="selectedServerId"
          rules={[
              {
              required: true,
              message: "Please select a server",
              },
          ]}
          >
          <Select onChange={handleServerSelect} value={selectedServerId} key={selectedServerId}>
            <Option value="">Select a server</Option>
            {servers &&
              servers.map((server) => (
                <Option key={server._id} value={server._id}>
                  {server.firstName}
                </Option>
              ))}
          </Select>
          </Form.Item>
        <Form.Item>
        <Button style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right", marginTop: "35px" }} size={"large"} htmlType="submit">
          Add Table
        </Button>
        </Form.Item>
      </Form>
    </div>
);
}
export default EditTable;