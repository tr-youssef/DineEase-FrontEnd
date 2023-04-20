import React from 'react'
import {  Table } from 'antd';
import "./AntTable.css";


function AntTable({dataSource,Columns}) {
    console.log('dataSource', dataSource)
    console.log('Columns', Columns)
  return (
    <div className='antTable'><Table dataSource={dataSource} columns={Columns} /></div>
  )
}

export default AntTable;