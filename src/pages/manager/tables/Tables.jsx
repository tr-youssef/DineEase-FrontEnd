import { useEffect, useState } from "react";
import { callAPI } from "../../../utils/FetchData.jsx";
import { Link } from "react-router-dom";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import "./Tables.css";
import { EditTable } from "./EditTable/EditTable.jsx";

function Tables() {
  const [servers, setServers] = useState([]);
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [dataSource, setDataSource] = useState([]);

  function deleteTable(id) {
    const token = JSON.parse(localStorage.getItem("user")).token;
    callAPI(`${import.meta.env.VITE__API_URL}/tables/${id}`, "DELETE", {}, token).then((res) => {
      if (res === "Table deleted") {
        const updatedDataSource = dataSource.filter((table) => table.key !== id);
        setDataSource(updatedDataSource);
      }
    });
  }

  useEffect(() => {
    let fetchData = async () => {
      try {
        const serverRes = await callAPI(`${import.meta.env.VITE__API_URL}/users?role=server`, "GET", "", token);
        setServers(serverRes);
        const res = await callAPI(`${import.meta.env.VITE__API_URL}/tables`, "GET", "", token);

        const result = res.map((table) => ({
          ...table,
          key: table._id,
        }));

        setDataSource(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const Columns = [
    {
      title: "Table No.",
      dataIndex: "nameOfTable",
      key: "nameOfTable",
      width: "30%",
    },
    {
      title: "Seats",
      dataIndex: "capacity",
      key: "capacity",
      width: "30%",
    },
    {
      title: "Server",
      dataIndex: "userId",
      key: "role",
      width: "30%",
      render: (serverId) => {
        const server = servers.find((s) => s._id === serverId);
        return server ? `${server.firstName} ${server.lastName}` : "";
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "25%",
      render: (text, record) => (
        <div className="Icons">
          <div>
            <Link to={`editTable/${record._id}`}>
              <EditFilled className="editIcon" onClick={() => EditTable(record._id)} />
            </Link>
          </div>
          <div>
            <DeleteFilled className="deleteIcon" onClick={() => deleteTable(record._id)} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="tables">
      <div className="tableButton">
        <Link to={"addTable"}>
          <Button className="table-button" icon={<PlusCircleOutlined />} size={"large"}>
            Add Table
          </Button>
        </Link>
      </div>
      <div className="serverTable">
        <AntTable dataSource={dataSource} Columns={Columns} />
      </div>
    </div>
  );
}

export default Tables;
