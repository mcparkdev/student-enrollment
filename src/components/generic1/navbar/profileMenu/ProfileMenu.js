import React, { useEffect, useRef } from "react";
import "./profileMenu.scss"
import { auth } from "../../../../firebase";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  siderItem: {
    textAlign: "left",
    padding: "12px 24px",
    '& .MuiButton-label': {
      justifyContent: "flex-start",
    }
  },
}));


export default function ProfileMenu(props) {
  const classes = useStyles();

  const {items, menuDivision, handleItemKey, showMenu, setShowMenu, handleShowMenu, fullName} = props
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
        <IconButton>
          <AccountCircleIcon/>
        </IconButton>
      </div>
      <div className="profile-menu" style={{display:showMenu ? "flex" : "none"}}>
        <ul className="profile-menu-main-item-container">
          <NavLink to="/profile" onClick={() => handleItemKey(3)} >
            <li className="profile-menu-item full-name">
              {fullName}
            </li>
          </NavLink>
          <li className="profile-menu-item email">
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
        {menuDivision.map((itemContainer, index) => {
          return(
            <ul className="profile-menu-item-container" key={index}>
              {itemContainer.map(key=>{
                const currentItem = items[key]
                const {label, name, icon} = currentItem
                return(
                  <NavLink to={`/${name}`} key={label} >
                    <li className="profile-menu-item">
                      <Button 
                        startIcon={icon} 
                        onClick={()=>handleItemKey(key)} 
                        fullWidth 
                        size="large" 
                        // color={selected ? "primary" : "default"}
                        className={classes.siderItem} 
                        >
                        {label}
                      </Button>
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
