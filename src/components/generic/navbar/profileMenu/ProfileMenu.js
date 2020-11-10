import React, { useEffect, useRef } from "react";
import "./profileMenu.scss"
import { auth } from "../../../../firebase";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink } from "react-router-dom";

export default function ProfileMenu(props) {
  const {items, profileMenu, handleItemKey, showMenu, setShowMenu, handleShowMenu, fullName} = props
  const node = useRef();

  useEffect(() => {
    const handleClickOutside = e => {
      // console.log("clicking anywhere");
      if (node.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      setShowMenu(false)
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);
  // console.log(props)
  return (
    <div ref={node} className="profile-button-menu">
      <div className="profile-button" onClick={() => handleShowMenu()}>
        <AccountCircleIcon/>
      </div>
      <div className="profile-menu" style={{display:showMenu ? "flex" : "none"}}>
        <ul className="profile-menu-main-item-container">
          <NavLink to="/profile" onClick={() => handleItemKey(3)} >
            <li className="profile-menu-item full-name">
              {fullName}
            </li>
          </NavLink>
          <li className="profile-menu-item">
            {auth.currentUser.email}
          </li>
          {/* <li id="account-status" className="profile-menu-item">
            <div className="account-status-item-container">
              <div className="account-status-item">
                <NavLink to="/enrollment" onClick={() => props.handleItemKey(2)} >
                  <span className="account-status-text">Pendiente</span>
                  <span className="account-status-label">Matrícula</span>
                </NavLink>
              </div>
              <div className="account-status-item">
                <span className="account-status-text">{auth.currentUser.emailVerified ? "Verificado" : "Por verificar"}</span>
                <span className="account-status-label">Correo</span>
              </div>
            </div>
          </li> */}
        </ul>
        {profileMenu.map((itemContainer, index) => {
          return(
            <ul className="profile-menu-item-container" key={index}>
              {itemContainer.map(key=>{
                const currentItem = items[key]
                const {label, name, icon} = currentItem
                return(
                  <NavLink to={`/${name}`} key={label} >
                    <li className="profile-menu-item" onClick={() => handleItemKey(key)}>
                      {icon}
                      {label}
                    </li>
                  </NavLink>
                )
              })}
            </ul>    
          )
        })}
      </div>
    </div>
  )
}
