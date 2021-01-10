import React, { useState } from 'react'

import SubContent from "../subcontent/SubContent"
import TableSider from "./TableSider"
import Table from "../table/Table"

const TableManager = (props) => {
  const {breadcrumbLinks, siderActions, loading, setLoading, isSiderOpen, handleIsSiderOpen} = props
  const [selectedRow, setSelectedRow] = useState(null)
  console.log(selectedRow)
  const tableProps = {...props.tableProps, selectedRow, setSelectedRow, breadcrumbLinks, handleIsSiderOpen, loading, setLoading, checkedItems: Array(props.tableProps.body.length).fill(false)}
  const siderProps = {viewport:props.viewport, ...props.siderProps, isSiderOpen, handleIsSiderOpen, selectedRow, body:tableProps.body, siderActions, loading, setLoading}
  // const newPeriodProps = {...props, setLoading}
  return (
    <SubContent>
      <Table {...tableProps} {...props} />
      {isSiderOpen && 
        <TableSider {...siderProps}>
          {props.children}
        </TableSider>}
    </SubContent>
  )
}

export default TableManager
