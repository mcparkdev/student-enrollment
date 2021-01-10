import React from 'react'

import "./iconBox.scss"


const IconBox = (props) => {
  const {icon, boxSize, iconSize} = props
  const defaultBoxSize = 40
  const defaultIconSize = 32
  return (
    <div className="iconBox" style={{width: boxSize ? boxSize : defaultBoxSize}} >
      <img src={icon} style={{width: boxSize ? (iconSize ? iconSize : boxSize) : defaultIconSize}} alt="logo"/>
    </div>
  )
}

export default IconBox
