import React, {useState} from 'react'
import "./admin.scss"

import Navbar from '../generic/layout/navbar/Navbar'

import StorageIcon from '@material-ui/icons/Storage';
import SettingsIcon from '@material-ui/icons/Settings';
import { Route, Switch } from 'react-router-dom';
import Settings from './settings/Settings';
import Database from "./database/Database"

const Admin = (props) => {
  // Navbar propierties
  const names = ["database", "settings"]
  const labels = ["데이터베이스", "설정"]
  const icons = [<StorageIcon/>, <SettingsIcon/>]
  const items = names.map((name, index)=>{
    const label = labels[index]
    const icon = icons[index]
    return ({label, name, icon, key: index})
  })
  const [itemKey, setItemKey] = useState(0)
  const handleItemKey = (key) => {
    setItemKey(key)
  }
  const itemProps = {...props, items, itemKey, setItemKey, handleItemKey}

  // Sider + Content properites
  const tabNames = ["courses", "students", "staffs"]
  const tabLabels = ["수업", "학생", "교수"]
  const tabItems = tabNames.map((name,index)=>{
    const label = tabLabels[index]
    return({label, name, key:index})
  })
  const [tabKey, setTabKey] = useState(0)
  const handleTabKey = (key) => {
    setTabKey(key)
  }
  const tabItemProps = {tabItems, tabKey, setTabKey, handleTabKey}

  return (
    <>
    <Navbar {...itemProps} />
    <Switch>
      <Route path="/database" render={router => <Database {...itemProps} {...tabItemProps} router={router}/>} />
      <Route path="/settings" render={router => <Settings {...itemProps} router={router}/>} />
    </Switch>
    </>
  )
}

export default Admin
