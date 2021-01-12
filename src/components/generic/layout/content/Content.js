import React from 'react'
// import React, {useState} from 'react'

import "./content.scss"

const Content = (props) => {
  const {className, show} = props
  return (
    <>
      {show !== false &&
      <div className={`content ${className ? className : ""}`}>
        {props.children}
        <div className="content-bg"/>
      </div>
      }
    </>
  )
}

export default Content
