import React from 'react'
import { NavLink } from 'react-router-dom'
import "./tabs.scss"
import Button from '@material-ui/core/Button'

const Tabs = (props) => {
  const className = props.className ? props.className : ""
  const variant = props.variant ? props.variant : "default"
  const {items, itemKey, setItemKey, ghost} = props
  return (
    <div className={`tab-container ${className} ${variant}`}>
      {items.map((item,index)=>{
        const {name, label, link} = item
        const selected = itemKey === index ? "selected" : ""
        return(
          <NavLink to={link}>
            <Button 
            key={`tab-${name}-${label}-${index}`}
            onClick={()=>setItemKey(index)}
            className={`tab ${selected}`}
            color="primary"
            >
              {label}
            </Button>
          </NavLink>
        )
      })}
      {ghost &&
        <div className="tab ghost"/>
      }
    </div>
  )
}

export default Tabs
