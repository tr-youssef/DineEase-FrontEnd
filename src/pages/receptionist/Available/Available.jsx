import React from 'react'
import { useEffect, useState } from "react";
import { callAPI } from "../../../utils/FetchData.jsx"
import AntTable from "../../../components/AntTable/AntTable.jsx"
import { FormOutlined } from "@ant-design/icons";

function AvailableData() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        let fetchData = async () => {
          try {
            const res = await callAPI(`http://localhost:5001/tables/?status=available`, "GET", "", user.token);
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
      }, []);

      function bookCustomer() {
        const data = {
          bookedId: booked,
          tableId: restaurantId.id,
          status: "New",
        };
        callAPI("http://localhost:5001/orders", "POST", data, user?.token).then(() => {
          navigate("/server");
        });
      }
      

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
                <FormOutlined  onClick={bookCustomer} />
              </div>
            </div>
          ),
        },
      ];
      
  return (
    <div>
        <AntTable Columns={Columns} dataSource={dataSource}/>
    </div>
  )
}

export default AvailableData;