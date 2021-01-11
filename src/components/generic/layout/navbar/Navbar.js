import React from 'react'
import "./navbar.scss"

import logo from "../../../../media/logo.png"
import ImageBox from '../../imageBox/ImageBox'
import IconBox from '../../iconBox/IconBox'
import { NavLink } from 'react-router-dom'
import Button from "@material-ui/core/Button"

const Navbar = (props) => {
  const {items, itemKey, setItemKey} = props
  // console.log(items)
  return (
    <div className="navbar">
      <div className="start">
        <ImageBox image={logo} size={48} iconSize={40} style={props.nonMobile}/>
        <div className="item-container">
          {items.map((item, index)=>{
            const {icon, name, label} = item
            const selected = index === itemKey
            return (
              <Button key={`navbar-${name}`} className="item" style={{padding:0, opacity: selected ? 1 : 0.5}} color="primary" onClick={()=>setItemKey(index)}>
                <NavLink to={`/${name}`}>
                  <div className="item-bg">
                    <IconBox icon={icon}/>
                    <div className="label">
                      {label}
                    </div>
                  </div>
                </NavLink>
              </Button>
            )
          })}
        </div>
      </div>
      <div className="end">
        Footer
      </div>
    </div>
  )
}

export default Navbar
