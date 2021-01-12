import React from 'react'

const PaperSubTitle = (props) => {
  const className = props.className ? `paper-subtitle ${props.className}` : 'paper-subtitle'
  return (
  <div className={className}>{props.children}</div>
  )
}

export default PaperSubTitle
