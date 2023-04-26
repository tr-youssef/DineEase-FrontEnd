import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callAPI } from "../../../utils/FetchData.jsx"
import AntTable from "../../../components/AntTable/AntTable.jsx"
import { FormOutlined } from "@ant-design/icons";

function AvailableData() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        let fetchData = async () => {
          try {
            const res = await callAPI(`http://localhost:5001/tables/availableTables/`, "GET", "", user.token);
            console.log('res', res)
      
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
      }, [dataSource]);

      function bookCustomer(tableId) {
        const data = {
          tableId: tableId,
          status: "NewClient",
        };
        callAPI(`http://localhost:5001/booked/`, "POST", data, user.token)
          .then(() => {
              const statusTable = {
                status: "filled",
              };
              console.log('statusTable', statusTable)
              callAPI(`http://localhost:5001/tables/status/${ tableId}`, "PATCH", statusTable, user.token)
            }
          ) 
      };
      
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
          title: "Book",
          dataIndex: "_id",
          key: "_id",
          render: (text, record) => (
            <div className="Icons">
              <div>
                <FormOutlined  onClick={() => bookCustomer(record._id)} />
              </div>
            </div>
          ),
        },
      ];
      
  return (
    <div className='availableTable'>
        <AntTable Columns={Columns} dataSource={dataSource}/>
    </div>
  )
}

export default AvailableData;