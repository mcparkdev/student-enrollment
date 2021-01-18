import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import React from 'react'
import BannerStudents from "../../../generic//dataDisplay/banner/bannerStudents/BannerStudents"
import Button from '@material-ui/core/Button'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Tabs from '../../../generic/navigation/tabs/Tabs';
import { Redirect, Route, Switch } from 'react-router-dom';
import StudentsInformation from "./StudentsInformation"

const bannerTabNames = ["2021-1", "more"]
const bannerTabLabels = ["2021-1","더 보기"]
const bannerTabItems = bannerTabNames.map((name,index)=>{
    const label = bannerTabLabels[index]
      return({label, name, key:index})
  })

// Student tabs
const studentsTabNames = ["generalInformation", "responsibleInformation", "bankInformation", "adevecoInformation","history"]
const studentsTabLabels = ["기본 정보", "보호자", "송금 정보", "참전용사 후손", "기록"]


const Students = (props) => {
  const {bannerTabKey, handleBannerTabKey, contentTabKey, handleContentTabKey} = props
  const currentStudentID = props.studentsRouter.match.params.studentID
  // console.log(props)
  const bannerTabProps = {
    items: bannerTabItems,
    itemKey: bannerTabKey,
    setItemKey: handleBannerTabKey,
    ghost: true,
    variant: "contained-secondary",
  }
  
  const bannerStudentsProps = {
    sider:{
      profile:{
      items: [
        {name: "학생ID", label:"20197513"},
        {name: "나이", label: "19세"}
      ]},
      contact: <Button color="secondary" variant="outlined" startIcon={<WhatsAppIcon/>}>연락하기</Button>
    },
    content:{
      header:{
        title: currentStudentID,
        tabs: bannerTabProps,
      },
      body: {
        main: {
          courseName: "초급 1-1",
          items:[
            {name: "시간", label: "1부"},
            {name: "담임", label: "박민창"},
            {name: "출석률", label: "7/8"},
            {name: "납부", label: "납부함"},
          ]
        },
        actions: [
          <Button size="large" fullWidth variant="contained" color="primary" >납부 상세정보 보기</Button>,
          <Button size="large" fullWidth color="primary" endIcon={<ArrowRightAltIcon/>} >반 배정하기</Button>
        ]
      }
    },
  }
  const studentsTabItems = studentsTabNames.map((name,index)=>{
    const label = studentsTabLabels[index]
    return({label, name, link: `/database/students/${currentStudentID}/${name}` , key:index})
  })
  const studentsTabProps = {
    items: studentsTabItems,
    itemKey: contentTabKey,
    setItemKey: handleContentTabKey,
    link:true,
  }
  // const bannerProps = {tabProps: bannerTabProps, ...bannerStudentsData}
  return (
    <>
      <div className="content-actions">
        
      </div>
      <BannerStudents {...props} {...bannerStudentsProps} />
      <Tabs {...studentsTabProps} />
      <Switch>
        <Route path={`/database/students/:studentID/${studentsTabNames[0]}`} render={router => <StudentsInformation {...props} router={router}/>} />
        <Redirect to={`/database/students/:studentID/${studentsTabNames[0]}`}/>
      </Switch>
    </>
  )
}

export default Students
