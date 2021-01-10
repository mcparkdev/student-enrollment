import React from 'react'

import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom'

const genericBreadcrumbs = (props) => {
  const {links, viewport, router} = props
  const lastLink = links.length > 0 ? links[links.length - 1] : {label: "재콜롬비아한국학교", path: "/management"}
  const {xs} = viewport
  return (
    <>
      {router.location.pathname !== "/management" && 
          <IconButton aria-label="back" onClick={()=>router.history.goBack()}>
            <ArrowBackIcon/>
          </IconButton>
        }
      {xs ? 
      <>
        <Breadcrumbs>
          <NavLink to={lastLink.path} style={{fontWeight: 700}}>
            {lastLink.label}
          </NavLink>
        </Breadcrumbs>
      </>
      :
        <Breadcrumbs aria-label="breadcrumb">
          {links.map((link,index) => {
            const {label, path} = link
            return(
              <NavLink to ={path} key={path} style={{fontWeight: 700}}>
                {label}
              </NavLink>
            )
          })}
        </Breadcrumbs>
      }
    </>
  )
}

export default genericBreadcrumbs
