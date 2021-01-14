import React from 'react'
import "./paper.scss"

export const PaperTitle = (props) => {
  const className = props.className ? `paper-title ${props.className}` : 'paper-title'
  return (
  <div className={className}>{props.children}</div>
  )
}

export const PaperSubTitle = (props) => {
  const className = props.className ? `paper-subtitle ${props.className}` : 'paper-subtitle'
  return (
  <div className={className}>{props.children}</div>
  )
}

const Paper = (props) => {
  const {flex, row, col, center, width, background, opacity, marginRight, marginTop, marginLeft, marginBottom} = props;
  const style = {
    display: flex ? "flex" : "",
    flexDirection: row ? "row" : (col ? "column" : ""),
    alignItems: center ? "center" : (props.alignItems ? props.alignItems : ""),
    justifyContent: center ? "center" : (props.justifyContent ? props.justifyContent : ""),
    background: background ? background : "",
    opacity: opacity ? opacity : "",
    width: width ? width : "",
    marginTop: marginTop ? marginTop : "",
    marginRight: marginRight ? marginRight : "",
    marginBottom: marginBottom ? marginBottom : "",
    marginLeft: marginLeft ? marginLeft : "",
  }
  console.log(style)
  return (
    <div className="paper" style={style}>
      {props.children}
    </div>
  )
}

export default Paper
