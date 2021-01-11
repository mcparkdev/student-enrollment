import React from 'react'
import "./sider.scss"

const Sider = (props) => {
  const {className} = props
  return (
    <div className={`sider ${className ? className : ""}`}>
      {props.children}
      <div className="sider-bg"/>
    </div>
  )
}

export default Sider
