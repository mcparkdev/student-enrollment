import React from 'react'
import Item from "./Item"


export const BannerItemContainer = (props) => {
  const {items} = props
  return (
    <div className="banner-item-container">
      {items.map((item, index)=>{
        const {name, label, main} = item
        return(
        <div className={`banner-item ${!!main ? "main" : ""}`} key={`banner-item main ${name}-${index}`}>
          <div className="banner-item-name">{name}</div>
          <div className="banner-item-label">{label}</div>
        </div>
        )
      })}
    </div>
  )
}

const ItemContainer = (props) => {
  const {items} = props
  return (
    <div className="item-container">
      {items.map((item,index)=><Item {...item} key={`item-${item.name}-${item.label}`} />)}
    </div>
  )
}

export default ItemContainer
