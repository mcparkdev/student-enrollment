import React from 'react'
import "./navbar.scss"
import logo from "../../../media/logo.png";

import { NavLink } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

export default function Navbar(props) {
    return (
        <div className="navbar">
        <ul className="navbar-left">
          <li>
            <NavLink to="/landing">
              <img src={logo} alt="" />
              <span className="non-mobile">
              Colegio Colombo Coreano
              </span>
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-center non-mobile">
          {/* <li className="navbar-item">Cursos</li>
          <li className="navbar-item">Matrículas</li>
          <li className="navbar-item">Fechas de pago</li> */}
        </ul>
        <ul className="navbar-right">
          <li className="navbar-item non-mobile">Cursos</li>
          <li className="navbar-item non-mobile">Matrículas</li>
          <li className="navbar-item non-mobile">Fechas de pago</li>
          <li className="navbar-item"><MenuIcon/></li>
        </ul>
      </div>
    )
}
