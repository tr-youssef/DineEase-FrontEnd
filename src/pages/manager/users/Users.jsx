import { useEffect, useState } from "react";
import { callAPI } from "../../../utils/FetchData.jsx";
import { Link } from "react-router-dom";
import { EditFilled, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import "./Users.css";

function Users() {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const [dataSource, setDataSource] = useState([]);

  const employeeStatus = (id, token, status) => {
    if (id) {
      callAPI(`${import.meta.env.VITE__API_URL}/users/status/${id}`, "PATCH", { active: status }, token)
        .then((data) => {
          const updatedDataSource = dataSource.map((employee) => {
            if (employee._id === id) {
              return { ...employee, active: status };
            } else {
              return employee;
            }
          });
          setDataSource(updatedDataSource);
        })
        .catch((error) => {
          console.error("Failed to update employee status:", error);
        });
    }
  };

  useEffect(() => {
    let fetchData = async () => {
      await callAPI(`${import.meta.env.VITE__API_URL}/users`, "GET", "", token).then((res) => {
        const result = [];
        res.map((x) => {
          x.active ? result.push({ ...x, status: "active", key: x._id }) : result.push({ ...x, status: "inactive", key: x._id });
        });
        setDataSource(result);
      });
    };
    fetchData();
  }, [dataSource]);

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
      title: "Active",
      dataIndex: "status",
      key: "status",
      width: "15%",
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
      width: "25%",
      render: (text, record) => (
        <div className="Icons">
          <div>
            <Link to={`editEmployee/${record._id}`}>
              <EditFilled />
            </Link>
          </div>
          <div>
            <Popover className="ActiveInactive" title={record.active ? "Change employee to inactive " : "Change employee to active"}>
              <div onClick={() => employeeStatus(record._id, token, record.active)}>{record.active ? <CheckCircleOutlined /> : <CloseCircleOutlined />}</div>
            </Popover>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="employees">
      <div className="employeeButton">
        <Link to={"addEmployee"}>
          <Button className="employee-button" icon={<PlusCircleOutlined />} size={"large"}>
            Add Employee
          </Button>
        </Link>
      </div>
      <div className="employeeTable">
        <AntTable dataSource={dataSource} Columns={Columns} />
      </div>
    </div>
  );
}

export default Users;
