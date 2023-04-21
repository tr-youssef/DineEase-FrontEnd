import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.js";
import "./AddForm.css";

export function AddForm () {
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
    {
      name: ["password"],
      value: "",
    },
    {
      name: ["confirmPassword"],
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
      password: values.role,
      confirmPassword: values.role,
    };

    if (Object.keys(id).length === 0) {
      callAPI("http://localhost:5001/users/signup", "POST", data, token).then(() => {
        navigate("/manager/users");
      });
    } else {
      callAPI(`http://localhost:5001/users/${id}`, "PATCH", data, token).then(() => {
        navigate("/manager/users");
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="Employee">
      <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "Right", width: "100px" }} size={"large"} />
      <div className="EmployeeForm">
        <Form name="addEmployee"  fields={fields} style={{ maxWidth: 600, marginTop: "40px" }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
              <Input className="EmployeeInput" placeholder="Enter the first name of the employee" />
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
              <Input className="EmployeeInput" placeholder="Enter the last name of the employee" />
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
              <Input className="EmployeeInput" placeholder="Enter the email of the employee" />
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
              <Input className="EmployeeInput" placeholder="Enter the role of the employee" />
            </Form.Item>
            <Form.Item
              label="Password of the employee"
              name="password"
              style={{ fontSize: "24px" }}
              rules={[
                {
                  required: true,
                  message: "The password of the employee is required",
                },
              ]}
            >
              <Input className="EmployeeInput" placeholder="Enter the password of the employee" />
            </Form.Item>
            <Form.Item
              label="Confirm the password of the employee"
              name="confirmPassword"
              style={{ fontSize: "24px" }}
              rules={[
                {
                  required: true,
                  message: "Please confirm the password of the employee",
                },
              ]}
            >
              <Input className="EmployeeInput" placeholder="Re-enter the password of the employee" />
            </Form.Item>
            
          </div>
          <Button style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right", marginTop: "35px" }} size={"large"} htmlType="submit">
            {Object.keys(id).length === 0 ? "Create Employee" : "Save change"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddForm;