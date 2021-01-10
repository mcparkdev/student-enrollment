import React, {useState, useEffect} from "react";
import { auth, db, storage } from "../../firebase"

import "./admin.scss";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import HomeIcon from "@material-ui/icons/Home"
import StorageIcon from "@material-ui/icons/Storage"
import InsertChartIcon from "@material-ui/icons/InsertChart"
import CodeIcon from '@material-ui/icons/Code';
// import FeedbackIcon from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/Help';

import Navbar from "../generic/navbar/Navbar";
import Sider from "../generic/sider/Sider";
import Body from "../generic/body/Body";

// import SubNavbar from "../generic/subNavbar/SubNavbar"
// import Home from "./home/Home"
// import { Redirect } from "react-router-dom";
// import { Search } from "@material-ui/icons";
import { Switch, Route } from "react-router-dom"
import Management from "./management/Management";

export default function Enrollment(props) {
  const path = props.router.location.pathname
  useEffect(()=>{
    if (path==="/signOut"){
      auth.signOut()
    }
  },[path])
  const currentUser = auth.currentUser
  const studentsDocument = db.collection('students').doc(currentUser.uid)
  const historiesCollection = db.collection('histories').orderBy("updatedAt","desc")
  const [showMenu, setShowMenu] = useState(false)
  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const labels = ["관리", "대시보드", "계정", "로그아웃", "도움", "개발자"]
  const names = ["management", "dashboard", "account", "signOut", "help", "developer"]
  const icons = [<StorageIcon/>, <InsertChartIcon/>, <AccountCircleIcon/>, <ExitToAppIcon/>, <HelpIcon/>, <CodeIcon/>]
  const keys = [0, 1, 2, 3, 4, 5]
  const menuDivision = [[2,3],[0,1],[4,5]]
  const sider = [0,1,4]  
  const items = names.map((name,index)=>{
    const label = labels[index]
    const icon = icons[index]
    return ({label, name, icon, key:index})
  })
  // console.log(items)
  const [itemKey, setItemKey] = useState(0)
  const handleItemKey = (itemKey) => {
    setItemKey(itemKey);
    setShowMenu(false)
  }
  const basicProps = {...props, db, storage, currentUser, studentsDocument, historiesCollection}
  const itemProps = {items, itemKey, setItemKey, handleItemKey}
  const menuProps = {keys, menuDivision, sider, showMenu, setShowMenu, handleShowMenu}
  const totalProps = {...basicProps, ...itemProps, ...menuProps}
  return (
    <div className="admin">
      <Navbar {...totalProps} fullName="관리자" />
      {!props.viewport.xs && <Sider {...totalProps}/>}
      {/* <SubNavbar {...totalProps} />
      {props.router.location.pathname ==="/home" && 
        <Redirect to="/home/timeline" />
      }
      {props.router.location.pathname ==="/management" && 
        <Redirect to="/management/home" />
      } */}
      <Body {...totalProps} >
        <Switch>
          {/* <Route
            path="/home"
            render={({ match, history, location }) => {
              const allProps = {...totalProps, match, history, location }
              return (<Home {...allProps}/>)
            }}
          /> */}
          <Route
            path="/management"
            render={({ match, history, location }) => {
              const allProps = {...totalProps, match, history, location }
              return (<Management {...allProps}/>)
            }}
          />
        </Switch>
      </Body>
    </div>
  );
}
