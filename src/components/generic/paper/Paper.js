import React from 'react'
import "./paper.scss"

const Paper = (props) => {
  const {flex, row, col, center, width} = props;
  const style = {
    display: flex ? "flex" : "",
    flexDirection: row ? "row" : (col ? "column" : ""),
    alignItems: center ? "center" : (props.alignItems ? props.alignItems : ""),
    justifyContent: center ? "center" : (props.justifyContent ? props.justifyContent : ""),
    width: width ? width : "",
  }
  
  return (
    <div className="paper" style={style}>
      {props.children}
    </div>
  )
}

export default Paper
