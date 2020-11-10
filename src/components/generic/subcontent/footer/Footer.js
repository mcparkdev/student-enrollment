import React from 'react'

const Footer = (props) => {
  const {title, subtitle} = props
  return (
    <div className="body-subcontent-footer">
      {!!title &&
        <div className="body-subcontent-title">
          {title}
        </div>
      }
      {!!subtitle &&
        <div className="body-subcontent-subtitle">
          {subtitle}
        </div>
      }
      {props.children}
    </div>
  )
}

export default Footer
