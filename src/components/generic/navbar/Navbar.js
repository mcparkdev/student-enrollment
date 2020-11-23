import React from 'react'
import "./navbar.scss"
import logo from "../../../media/logo.png";
import { NavLink } from "react-router-dom";
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import ProfileMenu from './profileMenu/ProfileMenu';

export default function Navbar(props) {
  return (
    <div className="navbar">
      <ul className="navbar-left">
        <li className="navbar-item">
          <NavLink to="/home">
            <img src={logo} alt="" />
            <div>
            {/* {isMobile ? "CCC" : "Colegio Colombo Coreano"} */}
            재콜롬비아한국학교
            </div>
          </NavLink>
        </li>
      </ul>
      {/* <ul className="navbar-center" style={props.nonMobile}>
      </ul> */}
      <ul className="navbar-right">
        {/* <li className="navbar-item" ><SearchIcon/></li>
        <li className="navbar-item" ><MenuIcon/></li> */}
        <li className="navbar-item" >
          <ProfileMenu {...props} />
        </li>
      </ul>
    </div>
  )
}
