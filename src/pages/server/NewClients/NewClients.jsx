import ordericonimage from "../../../assets/OrderIcon.png";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import { Link } from "react-router-dom";
import { callAPI } from "../../../utils/FetchData.jsx";
import "./NewClients.css";
import { useEffect, useState } from "react";

const NewClientData = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [availableData, setAvailableData] = useState([]);
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
      title: "Order",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Link to={"/server/takeOrder/" + _id}>
          <img src={ordericonimage} alt="Take Order" />
        </Link>
      ),
    },
  ];

  useEffect(() => {
    callAPI(`${import.meta.env.VITE__API_URL}/booked/availableTables`, "GET", "", user.token).then((res) => {
      const result = res.map((table) => ({
        ...table,
        key: table._id,
      }));
      setAvailableData(result);
    });
  }, []);
  return (
    <div className="ClientsTable">
      <AntTable dataSource={availableData} Columns={Columns} />
    </div>
  );
};
export default NewClientData;
