import React from 'react'

import "./tableSider.scss"

import Button from '@material-ui/core/Button'

import LinearProgressWithLabel from "../linearProgress/LinearProgressWithLabel"
import SubContentSider from '../subcontent/sider/Sider';

const Sider = (props) => {
  const {selectedRow, body, siderActions} = props
  // console.log(selectedRow, body)
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
            {/* <div className="divider" style={{margin: "8px 0"}}/> */}
            {/* {body[selectedRow].childrenPaymentProgress.map((progress,index)=>{
              const {name, label} = progress
              return (
                <React.Fragment key={name}>
                  <div className="subcontent-sider-label">
                    {label}
                  </div>
                  <div className="subcontent-sider-progress">
                    <LinearProgressWithLabel variant="determinate" {...progress}/>
                  </div>
                </React.Fragment>
              )
            })
            } */}
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
        {props.children}
      </SubContentSider>
    </>
  )
}

export default Sider
