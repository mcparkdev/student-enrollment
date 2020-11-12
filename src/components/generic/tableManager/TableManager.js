import React, {useState} from 'react'

import SubContent from "../subcontent/SubContent"
import TableSider from "./TableSider"
import Table from "../table/Table"

const TableManager = (props) => {
  const {viewport, breadcrumbLinks, siderActions, loading, setLoading} = props
  const [selectedRow, setSelectedRow] = useState(null)
  const [isSiderOpen, setIsSiderOpen] = useState(viewport.xs ? false : true)
  const handleIsSiderOpen = () => {
    setIsSiderOpen(prevIsSiderOpen => !prevIsSiderOpen)
  }
  const tableProps = {...props.tableProps, selectedRow, setSelectedRow, breadcrumbLinks, handleIsSiderOpen, loading, setLoading}
  const siderProps = {viewport:props.viewport, ...props.siderProps, isSiderOpen, handleIsSiderOpen, selectedRow, body:tableProps.body, siderActions, loading, setLoading}
  // const newPeriodProps = {...props, setLoading}
  return (
    <SubContent>
      <Table {...tableProps} {...props} />
      {isSiderOpen && <TableSider {...siderProps}/>}
      {props.children}
    </SubContent>
  )
}

export default TableManager
