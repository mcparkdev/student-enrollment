import React from 'react'
import "./body.scss";

// import {NavLink} from "react-router-dom"
// import Profile from './profile/Profile';
// import Enrollment from './enrollment/Enrollment';

export default function Body(props) {
  const {items, itemKey} = props
  const item = items[itemKey]
  const {label, name} = item
  return (
    <div className="body">
      {/* {banner !== false &&
        <div className="body-banner">
          {label}
        </div>
      } */}
      <div className="body-content">        
        {props.children}
      </div>
    </div>
  )
}
