import React, { useState, useEffect } from "react";
import { Input, Button, Form, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.jsx";
import "./AddForm.css";

export function AddForm() {
  const navigate = useNavigate();
  const id = useParams();
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
  ]);

  const handleClick = () => {
    navigate("/manager/users");
  };

  const onFinish = (values) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
      password: values.role.toLowerCase(),
      confirmPassword: values.confirmPassword,
    };

    if (Object.keys(id).length === 0) {
      callAPI(`${import.meta.env.VITE__API_URL}/users/signup`, "POST", data, token).then(() => {
        navigate("/manager/users");
      });
    } else {
      callAPI(`${import.meta.env.VITE__API_URL}/users/${id}`, "PATCH", data, token).then(() => {
        navigate("/manager/users");
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Option } = Select;

  return (
    <div className="Employee">
      <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "Right", width: "100px" }} size={"large"} />
      <div className="EmployeeForm">
        <Form name="addEmployee" fields={fields} style={{ maxWidth: 600, marginTop: "40px" }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <div className="EmployeeInputLine">
            <Form.Item
              label="First name of the employee"
              name="firstName"
              style={{ fontSize: "24px" }}
              rules={[
                {
                  required: true,
                  message: "The first name of the employee is required",
                },
              ]}
            >
              <Input className="EmployeeInput" placeholder="Enter the first name of the employee" size="middle" />
            </Form.Item>
            <Form.Item
              label="Last name of the employee"
              name="lastName"
              style={{ fontSize: "24px" }}
              rules={[
                {
                  required: true,
                  message: "The last name of the employee is required",
                },
              ]}
            >
              <Input className="EmployeeInput" placeholder="Enter the last name of the employee" size="middle" />
            </Form.Item>
            <Form.Item
              label="Email of the employee"
              name="email"
              style={{ fontSize: "24px" }}
              rules={[
                {
                  required: true,
                  message: "The email of the employee is required",
                },
              ]}
            >
              <Input className="EmployeeInput" placeholder="Enter the email of the employee" size="middle" />
            </Form.Item>
            <Form.Item
              label="Role of the employee"
              name="role"
              style={{ fontSize: "24px" }}
              rules={[
                {
                  required: true,
                  message: "The role of the employee is required",
                },
              ]}
            >
              <Select className="EmployeeInput" placeholder="Select the role of the employee" size="middle">
                <Option value="chef">Chef</Option>
                <Option value="server">Server</Option>
                <Option value="receptionist">Receptionist</Option>
              </Select>
            </Form.Item>
          </div>
          <Button style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right", marginTop: "35px" }} size={"large"} htmlType="submit">
            Add Employee
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddForm;
