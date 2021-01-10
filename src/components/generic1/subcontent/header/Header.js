import React from 'react'

const Header = (props) => {
  const {info, title, subtitle, annecdote} = props
  return (
    <div className="body-subcontent-header">
      {!!info &&
        <div className="body-subcontent-info">
          {info}
        </div>
      }
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
      {!!annecdote &&
        <div className="body-subcontent-annecdote">
          {annecdote}
        </div>
      }
      {props.children}
    </div>
  )
}

export default Header
