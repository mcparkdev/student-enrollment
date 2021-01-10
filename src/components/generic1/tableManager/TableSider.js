import React from 'react'

import "./tableSider.scss"

import LinearProgressWithLabel from "../linearProgress/LinearProgressWithLabel"
import SubContentSider from '../subcontent/sider/Sider';

const Sider = (props) => {
  const {selectedRow, body} = props
  const header = !!body.length ? (selectedRow !== null ? body[selectedRow].cells[0].label : "세부정보를 확인할 항목을 선택해주세요") : "학기를 만들어주세요"
  return (
    <>
      <SubContentSider {...props} header={header}>
        {selectedRow !== null && 
          <>
            <div className="subcontent-sider-label">
              {body[selectedRow].students.label}
            </div>
            <div className="subcontent-sider-progress">
              <LinearProgressWithLabel variant="determinate" {...body[selectedRow].students}/>
            </div>
          </>
        }
        <div className="divider" style={{margin: "8px 0"}}/>
        <div className="management-actions">
          {props.children}
        </div>
      </SubContentSider>
    </>
  )
}

export default Sider
