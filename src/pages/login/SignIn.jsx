import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom"
import { callAPI } from '../../utils/FetchData';

const SignIn = () => {
  const navigate = useNavigate()
  const onFinish =async (values) => {
    const user = await callAPI("http://localhost:5001/users/signin", "POST", values)
    console.log(user)
  if (user) {
    window.localStorage.setItem("token", user.token)
    navigate(`/${user.existingUser.role}`)
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
  return (
      <div>
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
          message: 'Please input your username!',
        },
      ]}
    >
      <Input  placeholder="Enter your Email"/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password  placeholder="Enter your password" />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
</div>
  )
}


export default SignIn