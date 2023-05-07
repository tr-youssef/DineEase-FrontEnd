import { useEffect, useState } from "react";
import { callAPI } from "../../../utils/FetchData.jsx";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import { FormOutlined } from "@ant-design/icons";

function AvailableData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      try {
        const res = await callAPI(`${import.meta.env.VITE__API_URL}/tables/availableTables/`, "GET", "", user.token);
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

  function bookCustomer(tableId) {
    const data = {
      tableId: tableId,
      status: "NewClient",
    };
    callAPI(`${import.meta.env.VITE__API_URL}/booked/`, "POST", data, user.token).then(() => {
      const statusTable = {
        status: "Filled",
      };
      callAPI(`${import.meta.env.VITE__API_URL}/tables/status/${tableId}`, "PATCH", statusTable, user.token);
    });
    setDataSource(dataSource.filter((data) => data._id !== tableId));
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
            <FormOutlined onClick={() => bookCustomer(record._id)} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="availableTable">
      <AntTable Columns={Columns} dataSource={dataSource} />
    </div>
  );
}

export default AvailableData;
