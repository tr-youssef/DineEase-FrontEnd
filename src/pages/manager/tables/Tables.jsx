import { useEffect, useState } from 'react';
import { callAPI } from "../../../utils/FetchData.js"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AntTable from '../../../components/AntTable/AntTable.jsx';
import "./Tables.css";
import { EditTable } from './EditTable/EditTable.jsx';

function Tables() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [servers, setServers] = useState([]);
  const token = JSON.parse(localStorage.getItem("user")).token;

  const [fields, setFields] = useState([
    {
      name: ["nameOfTable"],
      value: "",
    },
    {
      name: ["capacity"],
      value: "",
    },
    {
      name: ["userId"],
      value: ""
    }
  ]);

  const [dataSource, setDataSource] = useState([]);

  function DeleteTable(event, id) {
    event.stopPropagation();
    callAPI(`http://localhost:5001/tables/${id}`, "DELETE", {}, token).then((res) => {
      if (res === "Table deleted") setTables(tables.filter((table) => table._id !== id));
    });
  }
  
  
    useEffect(() => {
    let fetchData = async () => {
      try {
        const  serverRes = await callAPI("http://localhost:5001/users?role=server", "GET", null, token)
        setServers(serverRes);
        const res = await callAPI("http://localhost:5001/tables", "GET", "", token);
        
        const result = res.map(table => ({
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
      title: 'Table No.',
      dataIndex: 'nameOfTable',
      key:"nameOfTable",
      width: '30%',
    }, {
      title: 'Seats',
      dataIndex: 'capacity',
      key:"capacity",
      width: '30%',
    },
    {
      title: 'Server',
      dataIndex: 'userId',
      key:"role",
      width: '30%',
      render: (serverId) => {
        const server = servers.find((s) => s._id === serverId);
        return server ? `${server.firstName} ${server.lastName}` : "";
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key:"action",
      width: "25%", 
      render: (text, record) => (
        <div className='Icons'>
          <div>
            <Link to={`editTable/${record._id}`}>
              <EditFilled
                className="editIcon"
                onClick={() => EditTable(record._id)}
              />
            </Link>
          </div>
          <div>
            <Popover title={"You sure you want to delete this table?"}>
              <div onClick={() => DeleteTable(record._id, token, record.active)}>
                { <DeleteFilled className='deleteIcon'/>}
              </div>
            </Popover>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="tables">
      <div className="tableButton">
        <Link to={"addTable"}>
            <Button className='table-button' icon={<PlusCircleOutlined />} size={"large"}> 
              Save Table
            </Button>
        </Link>
      </div>
      <div className="serverTable">
        <AntTable dataSource={dataSource} Columns={Columns}/>
      </div>
    </div>


  );

};

export default Tables;