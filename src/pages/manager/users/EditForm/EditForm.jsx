import { useState, useEffect } from "react";
import { Input, Button, Form, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.jsx";
import "./EditForm.css";

export function EditForm() {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      callAPI(`${import.meta.env.VITE__API_URL}/users/${id}`, "GET", {}, token)
        .then((response) => {
          setFields([
            {
              name: ["firstName"],
              value: response.firstName,
            },
            {
              name: ["lastName"],
              value: response.lastName,
            },
            {
              name: ["email"],
              value: response.email,
            },
            {
              name: ["role"],
              value: response.role,
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
      callAPI(`${import.meta.env.VITE__API_URL}/users/${id}`, "PATCH", values, token)
        .then((response) => {
          navigate("/manager/users");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleClick = () => {
    navigate("/manager/users");
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
            Save Changes
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditForm;
