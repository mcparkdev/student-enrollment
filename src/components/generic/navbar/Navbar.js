import React from 'react'
import "./navbar.scss"
import logo from "../../../media/logo.png";
import { NavLink } from "react-router-dom";
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import ProfileMenu from './profileMenu/ProfileMenu';

export default function Navbar(props) {
  return (
    <div className="enrollment-navbar">
      <ul className="enrollment-navbar-left">
        <li className="enrollment-navbar-item">
          <NavLink to="/home/announcements">
            <img src={logo} alt="" />
            <div>
            {/* {isMobile ? "CCC" : "Colegio Colombo Coreano"} */}
            제콜롬비아한국학교
            </div>
          </NavLink>
        </li>
      </ul>
      {/* <ul className="enrollment-navbar-center" style={props.nonMobile}>
      </ul> */}
      <ul className="enrollment-navbar-right">
        {/* <li className="enrollment-navbar-item" ><SearchIcon/></li>
        <li className="enrollment-navbar-item" ><MenuIcon/></li> */}
        <li className="enrollment-navbar-item" >
          <ProfileMenu {...props} />
        </li>
      </ul>
    </div>
  )
}
