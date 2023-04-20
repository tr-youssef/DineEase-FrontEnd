import React from 'react'
import {  Table } from 'antd';
import "./TableForm.css";


function TableForm({dataSource,Columns}) {
    console.log('dataSource', dataSource)
    console.log('Columns', Columns)
  return (
    <div><Table dataSource={dataSource} columns={Columns}/></div>
  )
}

export default TableForm;