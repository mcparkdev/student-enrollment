import React from 'react'

const SubContentEnd = (props) => {
  const sider = props.sider !== true ? "" : "sider"
  return (
    <div className={`body-subcontent-end ${sider}`}>
        {props.children}
    </div>
  )
}

export default SubContentEnd
