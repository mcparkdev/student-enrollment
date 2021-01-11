import React from 'react'
import "./avatar.scss"

const Avatar = (props) => {
  const type = props.type === "image" ? "image" : (props.type === "icon" ? "icon" : "text")
  const {badge, status} = props
  return (
    <div className="avatar">
      <div className={`status ${status}`}>
        <div className={`content ${type}`}>
          {props.children}
        </div>
      </div>
      {badge
      &&
      <div className="badge">
        {badge}
      </div>
      }
    </div>
  )
}

export default Avatar
