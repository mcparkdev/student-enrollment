import React, {useState, useEffect} from "react";
import { auth, db, storage } from "../../firebase"

import "./admin.scss";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from "@material-ui/icons/Home"
import StorageIcon from "@material-ui/icons/Storage"
import InsertChartIcon from "@material-ui/icons/InsertChart"
import CodeIcon from '@material-ui/icons/Code';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/Help';

import Navbar from "../generic/navbar/Navbar";
import SubNavbar from "../generic/subNavbar/SubNavbar"
import Body from "../generic/body/Body";
import Home from "./home/Home"
import {Switch, Route} from "react-router-dom"
import { Redirect } from "react-router-dom";
import { Search } from "@material-ui/icons";
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

  const labels = ["홈", "검색", "대시보드", "관리", "계정", "로그아웃", "설정", "도움", "피드백", "개발자"]
  const names = ["home", "search", "report", "management", "profile", "signOut", "settings", "help", "feedback", "developer"]
  const icons = [<HomeIcon/>, <Search/>, <InsertChartIcon/>, <StorageIcon/> ,<AccountCircleIcon/>, <ExitToAppIcon/>, <SettingsIcon/>, <HelpIcon/>, <FeedbackIcon/>, <CodeIcon/> ]
  const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const profileMenu = [[4, 5], [0, 1, 2, 3], [6, 7, 8, 9]]
  const subNavbar = [0,1,2,3]
  const subLabels = [
    ["타임라인","공지사항"],
    ["학생", "교수", "수업",],
    ["현황", "기록", ],
    ["홈", "데이터", "재무", "공지사항"],
    ["일반정보",],
    ["로그아웃",],
    ["암호 재설정","언어",],
    ["홈, 검색, 대시보드, 관리"],
    ["포럼",],
    ["지원", "연락처"]
  ]
  const subNames = [
    ["timeline","announcements"],
    ["students", "staffs", "courses"],
    ["currentSituation", "history",],
    ["home", "data", "finance", "announcements"],
    ["generalInformation"],
    ["signOut",],
    ["resetPassword", "language",],
    ["home", "search", "dashboard", "announcements"],
    ["forum",],
    ["support", "contact"],
  ]
  const subKeys = [
    [0, 1],
    [0, 1, 2,],
    [0, 1],
    [0, 1, 2, 3],
    [0,],
    [0,],
    [0, 1,],
    [0, 1, 2, 3],
    [0,],
    [0, 1],
  ]
  const subTabNames = [
    [[], []],
    [[], [], []],
    [[], []],
    [[], [], [], []],
    [[],],
    [[],],
    [[], []],
    [[], [], [], []],
    [[],],
    [[], []],
  ]
  const subTabLabels = [
    [[], []],
    [[], [], []],
    [[], []],
    [[], [], [], []],
    [[],],
    [[],],
    [[], []],
    [[], [], [], []],
    [[],],
    [[], []],
  ]
  const items = names.map((name,index)=>{
    const label = labels[index]
    const icon = icons[index]
    const subItems = subLabels[index].map((subLabel,subIndex)=>{
      // console.log(index, subIndex, subTabLabels[index][subIndex])
      const subTabs = subTabLabels[index][subIndex].map((subTabLabel, subTabIndex)=>{
        // console.log(index, subIndex, subTabIndex)
        const subTabName = subTabNames[index][subIndex][subTabIndex]
        return { name: subTabName, label: subTabLabel, key: subTabIndex }
      })
      const subName = subNames[index][subIndex];
      return{ name: subName, label: subLabel, key: subIndex, tabs: subTabs}
    })
    
    return({ label, name, icon, key: index, subItems})
  })
  const [itemKey, setItemKey] = useState(0)
  const [subItemKey, setSubItemKey] = useState(0)
  const handleItemKey = (itemKey) => {
    setItemKey(itemKey);
    setSubItemKey(0)
    setShowMenu(false)
  }
  const handleSubItemKey = (subItemKey) => {
    setSubItemKey(subItemKey)
    setShowMenu(false)
  }
  const basicProps = {...props, db, storage, currentUser, studentsDocument, historiesCollection}
  const itemProps = {items, itemKey, setItemKey, subItemKey, setSubItemKey, handleItemKey, handleSubItemKey}
  const menuProps = {keys, subKeys, profileMenu, subNavbar, showMenu, setShowMenu, handleShowMenu}
  const totalProps = {...basicProps, ...itemProps, ...menuProps}
  return (
    <div className="admin">
      <Navbar {...totalProps} fullName="관리자" />
      <SubNavbar {...totalProps} />
      {props.router.location.pathname ==="/home" && 
        <Redirect to="/home/timeline" />
      }
      {props.router.location.pathname ==="/management" && 
        <Redirect to="/management/home" />
      }
      <Body {...totalProps} >
        <Switch>
          <Route
            path="/home"
            render={({ match, history, location }) => {
              const allProps = {...totalProps, match, history, location }
              return (<Home {...allProps}/>)
            }}
          />
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
