import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callAPI } from "../../../utils/FetchData.jsx";
import { Link } from "react-router-dom";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import "./Users.css";

export function Users() {
  const id = useParams();
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [fields, setFields] = useState([
    {
      name: ["firstName"],
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
      name: ["restaurantId"],
      value: "",
    },
  ]);
  const { TextArea } = Input;
  const handleClick = () => {
    navigate("/manager/users");
  };
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      await callAPI(`http://localhost:5001/users`, "GET", "", token).then((res) => {
        setDataSource(res);
      });
    };
    fetchData();
  }, []);
  const Columns = [
    {
      title: "Frist Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "20%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "20%",
      render: (text, record) => (
        <div className="Icons">
          <EditFilled className="editIcon" onClick={(event) => EditEmployee(event, Users._id)} />
          <DeleteFilled className="deleteIcon" onClick={(event) => DeleteEmployee(event, Users._id)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <AntTable dataSource={dataSource} Columns={Columns} />
      <Link to={"addEmployee"} />
      <Button className="employee-button" icon={<PlusCircleOutlined />} size={"large"}>
        Add Employee
      </Button>
      <Link />
      {/* <Form name="addEmployee" fields={fields} style={{ maxWidth: 400, marginTop: "40px" }} initialValues={{ remember: true }}>
          <div className="EmployeeInput">
            <div className="EmployeesInputLine">
              <Form.Item
                label="First name of employee"
                name="firstName"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The first name of the employee is required!",
                  },
                ]}
              >
                <Input className="EmployeeInput" placeholder="Enter the first name of the employee" />
              </Form.Item>
              <Form.Item
                label="Last name of employee"
                name="lastName"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The last name of the employee is required!",
                  },
                ]}
              >
                <Input className="EmployeeInput" placeholder="Enter the last name of the employee" />
              </Form.Item>
            </div>
            <div className="EmployeeInputLine">
              <Form.Item
                label="Email of employee"
                name="email"
                style={{ fontSize: "24px", width: "800px" }}
                rules={[
                  {
                    required: true,
                    message: "The email of the employee is required!",
                  },
                ]}
              >
                <TextArea className="EmployeeTextArea" placeholder="Enter the email of the employee" />
              </Form.Item>
              <Form.Item
                label="Role of employee"
                name="role"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The role of the employee is required!",
                  },
                ]}
              >
                <Input className="EmployeeInput" placeholder="Enter the role of the employee" />
              </Form.Item>
              <Form.Item
                label="Temporary password of employee"
                name="password"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The password of the employee is required!",
                  },
                ]}
              >
                <Input className="EmployeeInput" placeholder="Enter the password of the employee" />
              </Form.Item>
              <Form.Item
                label="RestaurantId of employee"
                name="restaurantId"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The restaurantId of the employee is required!",
                  },
                ]}
              >
                <Input className="EmployeeInput" placeholder="Enter the restaurantId of the employee" />
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
        </Form> */}
    </>
  );
}

export default Users;
