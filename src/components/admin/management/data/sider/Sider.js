import React from 'react'
import "./sider.scss"

import Button from '@material-ui/core/Button'


import LinearProgressWithLabel from "../../../../generic/linearProgress/LinearProgressWithLabel"
import SubContentSider from '../../../../generic/subcontent/sider/Sider';


const Sider = (props) => {
  const {selectedRow, body, siderActions} = props
  return (
    <>
      <SubContentSider {...props} header={selectedRow !== null ? body[selectedRow].cells[0].label : "세부정보를 확인할 항목을 선택해주세요"}>
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
          {siderActions.map((action, index)=>{
            const {name, label, buttonProps} = action
            return (
              <Button key={`sider-actions-${label}`} className={`${name}`}{...buttonProps} >
                {label}
              </Button>
            )
          })}
        </div>
      </SubContentSider>
    </>
  )
}

export default Sider
