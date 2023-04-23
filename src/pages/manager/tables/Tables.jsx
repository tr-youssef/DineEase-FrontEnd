import { useEffect, useState } from 'react';
import { callAPI } from "../../../utils/FetchData.js"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AntTable from '../../../components/AntTable/AntTable.jsx';
import "./Tables.css";

function Tables() {
  const navigate = useNavigate();
  const { id } = useParams();
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
      value: "",
    },
    {
        name: ["restaurantId"],
        value: "",
    },
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
      await callAPI(`http://localhost:5001/tables`, "GET", "", token).then((res) => {
        const result=[]
        res.map((x)=>{
          x.active?result.push({...x,status:'active',key:x._id}):result.push({...x,status:'inactive',key:x._id})
        })
        setDataSource(result);
        console.log(result)
      });
    };
    fetchData();
  }, [dataSource]);
  
  

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
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key:"action",
      width: "30%", 
      render: (text, record) => (
        <div className='Icons'>
          <div>
            <Link to={`editEmployee/${record._id}`}>
              <EditFilled
                className="editIcon"
                onClick={() => editEmployee(record._id)}
              />
            </Link>
          </div>
          <div>
            <Popover title={"You sure you want to delete this table?"}>
              <div onClick={() => DeleteTable(record._id, token, record.active)}>
                { <DeleteFilled />}
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
              New Table
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