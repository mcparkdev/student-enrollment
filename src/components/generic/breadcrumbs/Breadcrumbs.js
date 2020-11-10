import React from 'react'

import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom'

const genericBreadcrumbs = (props) => {
  const {links, viewport, router} = props
  const lastLink = links.length > 0 ? links[links.length - 1] : {label: "제콜롬비아 한국학교", path: "/management/data"}
  const {xs} = viewport
  return (
    <>
      {xs ? 
      <>
        {router.location.pathname !== "/management/data" && 
          <IconButton aria-label="back" onClick={()=>router.history.goBack()}>
            <ArrowBackIcon/>
          </IconButton>
        }
        <Breadcrumbs>
          <NavLink to={lastLink.path}>
            {lastLink.label}
          </NavLink>
        </Breadcrumbs>
      </>
      :
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((link,index) => {
          const {label, path} = link
          return(
            <NavLink to ={path} key={path}>
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
