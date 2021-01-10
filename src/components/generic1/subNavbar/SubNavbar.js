import React from 'react'
import "./subNavbar.scss"
import { NavLink } from "react-router-dom";

export default function SubNavbar(props) {
  const {itemKey, items, handleItemKey, subNavbar} = props
  // console.log(items, handleItem)
  return (
    <div className="enrollment-subNavbar">
      <ul className="enrollment-subNavbar-left">
        {subNavbar.map(key => {
          const item = items[key];
          const {label, name, icon} = item
          const selected = key === itemKey ? "selected" : ""
          // console.log(key, item, selected)
          return (
            <li className={`enrollment-subNavbar-item ${selected}`} key={label}>
              <NavLink to={`/${name}`} onClick={() => handleItemKey(key)}>
                {/* {props.viewport.xs && icon} */}
                {icon}
                <span className="enrollment-subNavbar-item-label">
                  {label}
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
      <ul className="enrollment-subNavbar-center" style={props.nonMobile}>
      </ul>
      <ul className="enrollment-subNavbar-right" style={props.nonMobile}>
      </ul>
    </div>
  )
}