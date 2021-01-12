import React from 'react'

const PaperTitle = (props) => {
  const className = props.className ? `paper-title ${props.className}` : 'paper-title'
  return (
  <div className={className}>{props.children}</div>
  )
}

export default PaperTitle
