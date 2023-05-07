import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.js";
import "./Category.css";

function Category() {
  const navigate = useNavigate();
  const id = useParams();
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: "",
    },
  ]);
  useEffect(() => {
    if (Object.keys(id).length !== 0) {
      let fetchData = async () => {
        await callAPI(`${import.meta.env.VITE__API_URL}/categories/${id.id}`, "GET", "", token).then((res) => {
          setFields([
            {
              name: ["name"],
              value: res.name,
            },
          ]);
        });
      };
      fetchData();
    }
  }, []);
  const handleClick = () => {
    navigate("/manager/menu");
  };
  const onFinish = (values) => {
    if (Object.keys(id).length === 0) {
      const data = { name: values.name };
      callAPI(`${import.meta.env.VITE__API_URL}/categories`, "POST", data, token).then(() => {
        navigate("/manager/menu");
      });
    } else {
      const data = { name: values.name };
      callAPI(`${import.meta.env.VITE__API_URL}/categories/${id.id}`, "PATCH", data, token).then(() => {
        navigate("/manager/menu");
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="Category">
      <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "Right", width: "100px" }} size={"large"} />
      <div className="CategoryForm">
        <Form name="addCategory" fields={fields} style={{ maxWidth: 600, marginTop: "40px" }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <div>
            <Form.Item
              label="Name of the category"
              name="name"
              style={{ fontSize: "24px" }}
              rules={[
                {
                  required: true,
                  message: "The name of the category is required!",
                },
              ]}
            >
              <Input className="CategoryInput" placeholder="Enter the name of the category" />
            </Form.Item>
          </div>
          <Button style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right", marginTop: "35px" }} size={"large"} htmlType="submit">
            {Object.keys(id).length === 0 ? "Create category" : "Save change"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Category;
