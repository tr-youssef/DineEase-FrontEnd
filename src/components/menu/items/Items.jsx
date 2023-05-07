import React, { useState, useEffect } from "react";
import { Input, Button, Form, Upload } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.js";
import "./Items.css";

function Items() {
  const navigate = useNavigate();
  const id = useParams();
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: "",
    },
    {
      name: ["price"],
      value: 0,
    },
    {
      name: ["description"],
      value: "",
    },
    {
      name: ["picture"],
      value: "",
    },
    {
      name: ["categoryId"],
      value: "",
    },
  ]);
  const [fileList, setFileList] = useState([]);
  const { TextArea } = Input;
  const handleClick = () => {
    navigate("/manager/menu");
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  useEffect(() => {
    if (location.pathname.split("/")[3] === "edititem") {
      let fetchData = async () => {
        await callAPI(`${import.meta.env.VITE__API_URL}/items/${id.id}`, "GET", "", token).then((res) => {
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
            {
              name: ["picture"],
              value: res.picture,
            },
            {
              name: ["categoryId"],
              value: res.categoryId,
            },
          ]);
        });
      };
      fetchData();
    }
  }, []);
  useEffect(() => {
    fields[3].value &&
      setFileList([
        {
          uid: "-1",
          name: fields[3].value,
          status: "done",
          url: `${import.meta.env.VITE__API_URL}/assets/${fields[3].value}`,
        },
      ]);
  }, [fields]);
  const onFinish = (values) => {
    if (location.pathname.split("/")[3] === "additem") {
      const data = { name: values.name, price: values.price, description: values.description, categoryId: id.id, picture: values.upload[0].name };
      callAPI(`${import.meta.env.VITE__API_URL}/items`, "POST", data, token).then(() => {
        navigate("/manager/menu");
      });
    } else {
      const data = { name: values.name, price: values.price, description: values.description, categoryId: fields[4].value, picture: fileList[0].name };
      callAPI(`${import.meta.env.VITE__API_URL}/items/${id.id}`, "PATCH", data, token).then(() => {
        navigate("/manager/menu");
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const deleteItem = () => {
    callAPI(`${import.meta.env.VITE__API_URL}/items/${id.id}`, "DELETE", {}, token).then(() => {
      navigate("/manager/menu");
    });
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
            <div className="ItemsInputLine">
              <Form.Item name="upload" label="Upload" getValueFromEvent={normFile}>
                <Upload action={`${import.meta.env.VITE__API_URL}/upload/item`} listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange} maxCount={1}>
                  {fileList.length >= 1 ? null : "Upload"}
                </Upload>
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
