import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.js";
import { token } from "../../../../utils/token.js";
import UploadImg from "../../../../components/UploadImg/UploadImg.jsx";
import "./Items.css";

function Items() {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const id = useParams();
  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: "",
    },
  ]);
  useEffect(() => {
    if (Object.keys(id).length !== 0) {
      let fetchData = async () => {
        await callAPI(`http://localhost:5001/items/${id.id}`, "GET", "", token).then((res) => {
          setFields([
            {
              name: ["name"],
              value: res.name,
            },
            {
              name: ["price"],
              value: res.price,
            },
            {
              name: ["description"],
              value: res.description,
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
  const deleteItem = () => {
    callAPI(`http://localhost:5001/items/${id}`, "DELETE", {}, token).then(() => {
      navigate("/manager/menu");
    });
  };
  const onFinish = (values) => {
    if (Object.keys(id).length === 0) {
      const data = { name: values.name, price: values.price, description: values.description };
      callAPI("http://localhost:5001/items", "POST", data, token).then(() => {
        navigate("/manager/menu");
      });
    } else {
      const data = { name: values.name, price: values.price, description: values.description };
      callAPI(`http://localhost:5001/items/${id.id}`, "PATCH", data, token).then(() => {
        navigate("/manager/menu");
      });
    }
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="Items">
      <Button icon={<ArrowLeftOutlined />} onClick={handleClick} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "Right", width: "100px" }} size={"large"} />
      <div className="ItemsForm">
        <Form name="addItem" fields={fields} style={{ maxWidth: 800, marginTop: "40px" }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <div className="ItemsInput">
            <div className="ItemsInputLine">
              <Form.Item
                label="Name of the item"
                name="name"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The name of the item is required!",
                  },
                ]}
              >
                <Input className="ItemInput" placeholder="Enter the name of the item" />
              </Form.Item>
              <Form.Item
                label="Price of the item"
                name="price"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The price of the item is required!",
                  },
                ]}
              >
                <Input className="ItemInput" placeholder="Enter the name of the item" />
              </Form.Item>
            </div>
            <div className="ItemsInputLine">
              <Form.Item
                label="Description of the item"
                name="description"
                style={{ fontSize: "24px", width: "800px" }}
                rules={[
                  {
                    required: true,
                    message: "The description of the item is required!",
                  },
                ]}
              >
                <TextArea className="ItemTextArea" placeholder="Enter the description of the item" />
              </Form.Item>
            </div>
          </div>
          <Button style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right", marginTop: "35px" }} size={"large"} htmlType="submit">
            {Object.keys(id).length === 0 ? "Create item" : "Save change"}
          </Button>
          {Object.keys(id).length !== 0 ? (
            <Button style={{ background: "#FFFFFF", color: "#f36805", marginRight: "20px", borderColor: "#f36805", fontSize: "16px", float: "right", marginTop: "35px" }} size={"large"} onClick={deleteItem}>
              Delete item
            </Button>
          ) : (
            <></>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Items;
