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
    <div className="AddEmployeeForm">
      <div>
      <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "Right", width: "100px" }} size={"large"} />
        <Form
          name="addEmployee"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="row">
            <div className="column">
              <Form.Item
                label="First name of the employee"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "The first name of the employee is required",
                  },
                ]}
              >
                <Input placeholder="Enter the first name of the employee" />
              </Form.Item>
            </div>
            <div className="column">
              <Form.Item
                label="Last name of the employee"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "The last name of the employee is required",
                  },
                ]}
              >
                <Input placeholder="Enter the last name of the employee" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <Form.Item
                label="Email of the employee"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "The email of the employee is required",
                  },
                ]}
              >
                <Input placeholder="Enter the email of the employee" />
              </Form.Item>
            </div>
            <div className="column">
              <Form.Item
                label="Role of the employee"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "The role of the employee is required",
                  },
                ]}
              >
                <Input placeholder="Enter the role of the employee" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <Form.Item
                label="Password of the employee"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "The password of the employee is required",
                  },
                ]}
              >
                <Input placeholder="Enter the password of the employee" />
              </Form.Item>
            </div>
            <div className="column">
              <Form.Item
                label="Confirm the password of the employee"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm the password of the employee",
                  },
                ]}
              >
                <Input placeholder="Re-enter the password of the employee" />
              </Form.Item>
            </div>
          </div>
          <Button className="formButton" htmlType="submit">
            {Object.keys(id).length === 0 ? "Create Employee" : "Save change"}
          </Button>
        </Form>
      </div>
    </div>
  );
};


export default AddForm;