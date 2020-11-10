import React, {useState, useEffect} from "react";
import { auth, db, storage } from "../../firebase"

import Home from "./home/Home"
import SubEnrollment from "./enrollment/Enrollment"
import Profile from "./profile/Profile"
import "./enrollment.scss";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from "@material-ui/icons/Home"
import ReceiptIcon from '@material-ui/icons/Receipt';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import CodeIcon from '@material-ui/icons/Code';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/Help';

import Navbar from "../generic/navbar/Navbar";
import SubNavbar from "../generic/subNavbar/SubNavbar"
import Body from "../generic/body/Body";
import { Redirect, Route, Switch } from "react-router-dom";

export default function Enrollment(props) {
  const path = props.router.location.pathname
  useEffect(()=>{
    if (path==="/signOut"){
      auth.signOut()
    }
  },[path])
  const{userName} = props
  const{firstName, lastName} = userName
  const fullName = `${firstName} ${lastName}`
  const currentUser = auth.currentUser
  const studentsDocument = db.collection('students').doc(currentUser.uid)
  const historiesCollection = db.collection('histories').where("uid", "==", currentUser.uid).orderBy("updatedAt","desc")
  const [showMenu, setShowMenu] = useState(false)
  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const labels = ["Principal", "Cursos", "Matrículas", "Perfil", "Cerrar sesión", "Configuración", "Ayuda", "Opiniones", "Desarrollador"]
  const names = ["home", "courses", "enrollment", "profile", "signOut", "settings", "help", "feedback", "developer"]
  const icons = [<HomeIcon/>, <CollectionsBookmarkIcon/>, <ReceiptIcon/>, <AccountCircleIcon/>, <ExitToAppIcon/>, <SettingsIcon/>, <HelpIcon/>, <FeedbackIcon/>, <CodeIcon/> ]
  const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const profileMenu = [[3, 4], [0, 1, 2], [5, 6, 7, 8]]
  const subNavbar = [0,1,2,3]
  const subLabels = [
    ["Anuncios", "Sobre nosotros", "Contacto"],
    ["Niveles","Básico", "Intermedio" , "Avanzado"],
    ["Inscripciones", "Certificados"],
    ["Datos", "Resumen", "Foto de perfil"],
    ["Cerrar sesión",],
    ["Idioma",],
    ["Datos", "Cursos", "Matrículas", "Preguntas frecuentes"],
    ["Foro",],
    ["Aporte", "Contacto"]
  ]
  const subNames = [
    ["announcements", "about-us", "contact"],
    ["levels","beginner", "intermediate", "advanced"],
    ["application", "certificate"],
    ["data", "summary", "profile-picture"],
    ["signOut",],
    ["language",],
    ["data", "coures", "enrollment", "frecuent-questions"],
    ["forum",],
    ["support", "contact"],
  ]
  const subKeys = [
    [0, 1, 2],
    [0, 1, 2, 3],
    [0, 1],
    [0, 1, 2],
    [0],
    [0],
    [0, 1, 2, 3],
    [0],
    [0, 1],
  ]
  const subTabNames = [
    [[], [], []],
    [[], [], [], []],
    [[], []],
    [["personal", "responsible", "residential", "payment", "adeveco"], [], []],
    [[]],
    [[]],
    [[], [], [], []],
    [[]],
    [[], []],
  ]
  const subTabLabels = [
    [[], [], []],
    [[], [], [], []],
    [[], []],
    [["Personal", "Responsable", "Residential", "Pago", "Adeveco"], [], []],
    [[]],
    [[]],
    [[], [], [], []],
    [[]],
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
    <div className="enrollment">
      <Navbar {...totalProps} fullName={fullName} />
      <SubNavbar {...totalProps} />
      {props.router.location.pathname ==="/home" && 
        <Redirect to="/home/announcements" />
      }
      <Body {...totalProps}>
        <Switch>
          <Route
            path="/home"
            render={({ match, history, location }) => {
              const allProps = {...totalProps, match, history, location }
              return (<Home {...allProps}/>)
            }}
          />
          <Route
            path="/enrollment"
            render={({ match, history, location }) => {
              const allProps = {...totalProps, match, history, location }
              return (<SubEnrollment {...allProps}/>)
            }}
          />
          <Route
            path="/profile"
            render={({ match, history, location }) => {
              const allProps = {...totalProps, match, history, location }
              return (<Profile {...allProps}/>)
            }}
          />
        </Switch>
      </Body>
    </div>
  );
}
