import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callAPI } from "../../../utils/FetchData.jsx"
import AntTable from "../../../components/AntTable/AntTable.jsx"
import { FormOutlined } from "@ant-design/icons";

function FilledData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
      let fetchData = async () => {
        try {
          const res = await callAPI(`http://localhost:5001/tables/filledTables/`, "GET", "", user.token);
          console.log('res', res)
    
          const result = res.map((table) => ({
            ...table,
            key: table._id,
          }));
    
          setDataSource(result);
          console.log('result', result)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [dataSource]);

    const Columns = [
      {
        title: "Table No.",
        dataIndex: "nameOfTable",
        key: "nameOfTable",
      },
      {
        title: "Seats",
        dataIndex: "capacity",
        key: "capacity",
      },
      {
        title: "Waiting Time",
        dataIndex: "waitingTime",
        key: "waitingTime",
      },
      {
        title: "Booked At",
        dataIndex: "bookedAt",
        key: "bookedAt",
      },
    ];
    
return (
  <div className='availableTable'>
      <AntTable Columns={Columns} dataSource={dataSource}/>
  </div>
)
}

export default FilledData;