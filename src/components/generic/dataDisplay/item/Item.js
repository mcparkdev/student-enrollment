import React from 'react'
import "./item.scss"

const Item = (props) => {
  const {name, label} = props
  return (
    <div className="item">
      <div className="item-name">
        {name}
      </div>
      <div className="item-label">
        {label}
      </div>
    </div>
  )
}

export default Item
