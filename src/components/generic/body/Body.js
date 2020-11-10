import React from 'react'
import "./body.scss";

import {NavLink} from "react-router-dom"
// import Profile from './profile/Profile';
// import Enrollment from './enrollment/Enrollment';

export default function Body(props) {
  const {items, itemKey, subItemKey, handleSubItemKey, banner} = props
  const item = items[itemKey]
  const {label, name, subItems} = item
  return (
    <div className="body">
      {banner !== false &&
        <div className="body-banner">
          {label}
        </div>
      }
      <div className="body-content">
        <ul className="body-content-tab-container">
          {subItems.map(subItem => {
            const subName = subItem.name;
            const subLabel = subItem.label;
            const subKey = subItem.key;
            const selected = subKey === subItemKey ? "selected" : ""
            return(
              <li className={`body-content-tab ${selected}`} key={subLabel}>
                <NavLink to={`/${name}/${subName}`} onClick={() => handleSubItemKey(subKey)} >
                  <span className="body-content-tab-label">
                    {subLabel}
                  </span>
                </NavLink>
              </li>
            )
            // const selected = subItem
          })}
        </ul>
        {props.children}
      </div>
    </div>
  )
}
