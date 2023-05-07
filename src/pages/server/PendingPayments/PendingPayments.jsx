import billiconimage from "../../../assets/BillIcon.png";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import { Link } from "react-router-dom";
import "./PendingPayments.css";
import { callAPI } from "../../../utils/FetchData.jsx";
import { useEffect, useState } from "react";

const AlreadyOrderedData = () => {
  const [alreadyOrderedData, setAlreadyOrderedData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const Columns = [
    {
      title: "Table Number",
      dataIndex: "nameOfTable",
      key: "nameOfTable",
    },
    {
      title: "Seats",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Bill",
      dataIndex: "_id",
      key: "_id",
      render: (_id, record) => {
        return (
          <Link to={"/receiptPDF/" + _id} target="_blank">
            <img src={billiconimage} alt="Bill!" onClick={() => changeBookedStatus(record.bookedId, record.tableId, record._id)} />
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    callAPI(`${import.meta.env.VITE__API_URL}/orders/alreadyServed`, "GET", "", user.token).then((res) => {
      const result = res.map((table) => ({
        ...table,
        key: table._id,
      }));
      setAlreadyOrderedData(result);
    });
  }, []);

  function changeBookedStatus(bookedId, tableId, _id) {
    const statusBooked = {
      status: "Payed",
    };
    callAPI(`${import.meta.env.VITE__API_URL}/booked/status/${bookedId}`, "PATCH", statusBooked, user.token).then(() => {
      const statusTable = {
        status: "available",
      };
      callAPI(`${import.meta.env.VITE__API_URL}/tables/status/${tableId}`, "PATCH", statusTable, user.token);
    });

    setAlreadyOrderedData(alreadyOrderedData.filter((data) => data.tableId !== tableId));
  }

  return (
    <div className="ClientsTable">
      <AntTable dataSource={alreadyOrderedData} Columns={Columns} />
    </div>
  );
};

export default AlreadyOrderedData;
