import React from "react";
import { Table } from "antd";
import "./AntTable.css";

function AntTable({ dataSource, Columns }) {
  return (
    <div className="antTable">
      <Table dataSource={dataSource} columns={Columns} />
    </div>
  );
}

export default AntTable;
