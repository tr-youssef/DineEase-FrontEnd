
import billiconimage from "../../../assets/BillIcon.png";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import { Link } from "react-router-dom";
import "./alreadyOrderedData.css";
import { callAPI } from "../../../utils/FetchData.jsx";
import { useEffect, useState } from "react";

const AlreadyOrderedData = () => {
  const [alreadyOrderedData, setAlreadyOrderedData] = useState([]);
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
      dataIndex: "bookingId",
      key: "bookingId",
      render: (bookingId) => (
        <Link to={"/server/takeOrder/" + bookingId}>
          <img src={billiconimage} alt="Bill" />
        </Link>
      ),
    },
  ];
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
     
      callAPI(`http://localhost:5001/orders/orderServed`, "GET", "", user.token).then((res) => {
        const result = res.map((table) => ({
          ...table,
          key: table._id,
        }));
        setAlreadyOrderedData(result);
      });
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "-50px" }}>
      <AntTable dataSource={alreadyOrderedData} Columns={Columns} />
    </div>
  );
};

export default AlreadyOrderedData;
