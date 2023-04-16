import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.js";
import { token } from "../../../../utils/token.js";
import "./Category.css";

function Category() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/manager/menu");
  };
  const onFinish = (values) => {
    const data = { name: values.name };
    callAPI("http://localhost:5001/categories", "POST", data, token).then((res) => {
      navigate("/manager/menu");
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="Category">
      <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "Right", width: "100px" }} size={"large"} />
      <div className="CategoryForm">
        <Form name="addCategory" style={{ maxWidth: 600, marginTop: "40px" }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <div>
            <Form.Item
              label="Name of the category"
              className="categoryLabelInput"
              name="name"
              style={{ fontSize: "24px" }}
              rules={[
                {
                  required: true,
                  message: "The name of the category is required!",
                },
              ]}
            >
              <Input className="categoryInput" placeholder="Enter the name of the category" />
            </Form.Item>
          </div>
          <Button style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right", marginTop: "35px" }} size={"large"} htmlType="submit">
            Create category
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Category;
