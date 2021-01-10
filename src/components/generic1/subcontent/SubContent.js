import React from 'react'
import "./subContent.scss"
const SubContent = (props) => {
  return (
    <div className="body-subcontent">
      {props.children}
    </div>
  )
}

export default SubContent
