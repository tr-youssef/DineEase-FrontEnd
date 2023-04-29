import billiconimage from "../../../assets/BillIcon.png";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import { Link } from "react-router-dom";
import "./alreadyOrderedData.css";
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
          <Link to={"/receiptPDF/" + _id}>
            <img
              src={billiconimage}
              alt="Bill!"
              onClick={() => changeBookedStatus(record.bookedId, record.tableId)}
            />
          </Link>
        );
      },
}];
 
  
  useEffect(() => { 
      callAPI(`http://localhost:5001/orders/alreadyOrdered`, "GET", "", user.token).then((res) => {
        const result = res.map((table) => ({
          ...table,
          key: table._id,
        }));
        setAlreadyOrderedData(result);
        console.log('result', result)
      });
  }, []);


function changeBookedStatus(bookedId, tableId) {
  const statusBooked = {
    status: "Payed",
  };
  callAPI(`http://localhost:5001/booked/status/${bookedId}`, "PATCH", statusBooked, user.token).then(() => {
    const statusTable = {
      status: "available",
    };
    callAPI(`http://localhost:5001/tables/status/${tableId}`, "PATCH", statusTable, user.token);
  });
}


  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "-50px" }}>
      <AntTable dataSource={alreadyOrderedData} Columns={Columns} />
    </div>
  );
};

export default AlreadyOrderedData;
