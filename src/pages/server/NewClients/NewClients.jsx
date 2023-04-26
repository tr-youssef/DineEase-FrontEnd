import { useEffect, useState } from "react";
import ordericonimage from "../../../assets/OrderIcon.png";
import AntTable from "../../../components/AntTable/AntTable.jsx";
import { callAPI } from "../../../utils/FetchData";
import { Link } from "react-router-dom";

const NewClientData = () => {
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
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      
      await callAPI(`http://localhost:5001/booked/availableTables`, "GET", "", user.token).then((res) => {
        const result = res.map((table) => ({
          ...table,
          key: table._id,
        }));
        setData(result);
      });
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "-50px" }}>
      <AntTable dataSource={data} Columns={Columns} />
    </div>
  );
};
export default NewClientData;
