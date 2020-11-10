import React from 'react'

import Breadcrumbs from "../../generic/breadcrumbs/Breadcrumbs"
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const TableToolbar = (props) => {
  const {isNoneChecked, breadcrumbLinks,viewport, router, handleIsSiderOpen, checkedItems, handleClickMore} = props
  return (
    <div className="table-toolbar" style={{background: !isNoneChecked ? "#dbecff" : ""}}>
    {isNoneChecked
      ?
      <>
        <div className="table-breadcrumbs">
          <Breadcrumbs links={breadcrumbLinks} viewport={viewport} router={router}/>
        </div>
        <div className="table-actions">
          <IconButton onClick={()=>console.log("search")}>
            <SearchIcon/>
          </IconButton>
          <IconButton onClick={handleIsSiderOpen} aria-label="more">
            <MenuIcon/>
          </IconButton>
        </div>
      </>
      :
      <>
        <div className="table-title">
          {checkedItems.filter((item)=> item === true).length} 선택됨
        </div>
        <div className="table-actions">
          <IconButton onClick={()=>console.log("delete")}>
            <DeleteIcon color="primary"/>
          </IconButton>
          <IconButton onClick={handleClickMore}>
            <MoreHorizIcon color="primary"/>
          </IconButton>
        </div>
      </>
    }
    </div>
  )
}

export default TableToolbar
