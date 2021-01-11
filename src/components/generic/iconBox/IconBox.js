import React from 'react'

import "./iconBox.scss"


const IconBox = (props) => {
  const {icon, boxSize, style} = props
  const styleProps = style ? { ...style, } : {}
  const defaultBoxSize = 40
  // const defaultIconSize = 32
  return (
    <div className="iconBox" style={{...styleProps, width: boxSize ? boxSize : defaultBoxSize, display: "flex", justifyContent: "center", alignItems:"center", height: boxSize ? boxSize : defaultBoxSize}} >
      {icon}
    </div>
  )
}

export default IconBox
