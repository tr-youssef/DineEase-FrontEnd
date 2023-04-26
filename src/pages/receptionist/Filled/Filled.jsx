import React from 'react'
import AntTable from "../../../components/AntTable/AntTable.jsx"

function FilledData() {

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
      
  return (
    <div>
        <AntTable Columns={Columns} />
    </div>
  )
}

export default FilledData;