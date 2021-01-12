import React from 'react'
import "./avatar.scss"

const Avatar = (props) => {
  const type = props.type === "image" ? "image" : (props.type === "icon" ? "icon" : "text")
  const {badge, status} = props
  return (
    <div className="avatar">
      <div className={`avatar-status ${status}`}>
        <div className={`avatar-content ${type}`}>
          {props.children}
        </div>
      </div>
      {badge
      &&
      <div className="avatar-badge">
        {badge}
      </div>
      }
    </div>
  )
}

export default Avatar
