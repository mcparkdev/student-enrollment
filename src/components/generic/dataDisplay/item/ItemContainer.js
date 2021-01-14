import React from 'react'
import Item from "./Item"
const ItemContainer = (props) => {
  const {items} = props
  return (
    <div className="item-container">
      {items.map((item,index)=><Item {...item} key={`item-${item.name}-${item.label}`} />)}
    </div>
  )
}

export default ItemContainer
