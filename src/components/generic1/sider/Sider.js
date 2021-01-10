import React from 'react'

import "./sider.scss"
import Button from "@material-ui/core/Button"
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  siderItem: {
    textAlign: "left",
    padding: "12px 24px",
    '& .MuiButton-label': {
      justifyContent: "flex-start",
    }
  },
}));


const Sider = (props) => {
  // console.log(props)
  const classes = useStyles();
  const {sider, items, itemKey, handleItemKey} = props
  return (
    <div className="sider">
      <div className="sider-start">
        <ul className="sider-start-item-container">
          {sider.map(key => {
            const item = items[key]
            const {label, icon, name} = item
            const selected = itemKey === key
            return (
              <li key={`sider-item ${label}`} className="sider-start-item">
                <NavLink to={`/${name}`}>
                  <Button 
                    startIcon={icon} 
                    onClick={()=>handleItemKey(key)} 
                    fullWidth 
                    size="large" 
                    color={selected ? "primary" : "default"}
                    className={classes.siderItem} 
                    >
                    {label}
                  </Button>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="sider-end">
        <div className="sider-footer">
          <div className="sider-footer-title">
            재콜롬비아한국학교
          </div>
          <div className="divider" style={{marginBottom: 8}}/>
          <div className="sider-footer-label">
            @2016-2020 Colegio Colombo Coreano. Todos los derechos reservados
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sider
