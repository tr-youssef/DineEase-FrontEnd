import React from "react";
import { Button, message, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../utils/FetchData.jsx";
import loginImage from "../../assets/WebsiteImage.png";
import logoImage from "../../assets/Logo1.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const user = await callAPI(`${import.meta.env.VITE__API_URL}/users/signin`, "POST", values);
    if (user.userId) {
      window.localStorage.setItem("user", JSON.stringify(user));
      navigate(`/${user.role}`);
    } else {
      messageApi.open({
        type: "error",
        content: user.message,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ display: "flex" }}>
      {contextHolder}
      <div style={{ flex: 1, overflow: "hidden", width: "100%", height: "99vh" }}>
        <img src={loginImage} style={{}}></img>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "right", position: "relative", marginBottom: "200px" }}>
          <img src={logoImage} style={{ objectFit: "contain", width: "20%", height: "20%%", top: 0, right: 50, position: "absolute" }}></img>
        </div>
        <div style={{ flex: 3 }}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Enter your Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button style={{ backgroundColor: "#F36805", width: "100%" }} type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
