import React from 'react'
import Banner from "../../../generic/dataDisplay/banner/Banner"
import Tabs from "../../../generic/navigation/tabs/Tabs"
import PaperTable from "../../../generic/dataDisplay/table/PaperTable"
import Avatar from '../../../generic/dataDisplay/avatar/Avatar'
import IconBox from "../../../generic/iconBox/IconBox"

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { NavLink } from 'react-router-dom'
// [
//   "현재 등록된 수업을 확인 및 수정을 할 수 있습니다.",
//   "학생의 기본정보를 확인 할 수 있습니다.",
//   "학생의 수업기록을 확인 할 수 있습니다."
// ],
// Content Paper Props
const coursePaperTitle = ["학생", "기본 정보", "설정"]
const coursePaperSubtitle = ["수업 시간별로 관련 확생명단을 원하는 정렬에 따라 볼 수 있습니다.","수업 기본정보","학생 및 교사 배정하기",]

// Content Table Tabs
const studentTableTabNames = ["all", "schedule-1", "schedule-2"]
const studentTableTabLabels = ["전체", "1부", "2부"]
const studentTableTabItems = studentTableTabNames.map((name,index)=>{
    const label = studentTableTabLabels[index]
    return {label, name, key:index}
})
  

const studentNames = ["Valentina Sofia Casadiego Reyes", "Min Chang Park", "Min Chang Park", "Min Seo Park", "Min Seo Park", "Min Seo Park","Min Gyu Park", "Min Gyu Park", "Min Gyu Park"]
const studentIDs = ["20163267", "205274563", "20623451", "20215235", "202723422", "202149532", "201435302", "201123940", "201428452"]
const studentStatus = ["new", "new", "", "new", "new", "", "new", "new", "new", ]
const studentPayed = [true, true, true, false, false, true, true, true, true]
const studentSchedules = [1, 1, 2, 1, 2, 2, 1, 1, 2]
const studentPayments = ["상세정보 보기", "상세정보 보기", "상세정보 보기", "상세정보 보기", "상세정보 보기", "상세정보 보기", "상세정보 보기", "상세정보 보기", "상세정보 보기"]
// Student data organized for tabling
const studentTableRow = (index) => {
  const name = studentNames[index]
  const studentID = studentIDs[index]
  const payed = studentPayed[index]
  const status = studentStatus[index]
  const schedule = studentSchedules[index]
  const payment = studentPayments[index]
  return [
    <Avatar status={status}>{name[0]}</Avatar>,
    [<NavLink to={`/database/students/${studentID}`}>{name}</NavLink>, studentID],
    `${schedule}부`,
    payment,
    <IconBox icon={payed ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}/>,
    <IconBox icon={<MoreHorizIcon/>} />
  ]
}
const studentTableBody = ["total","schedule-1", "schedule-2"].map((tabName,index)=>{
  if (index === 0) {
    return studentNames.map((name,index)=>studentTableRow(index))}
  else {
    return studentSchedules.map((studentSchedule,studentIndex)=>{
      return index === studentSchedule ? studentIndex : null
    }).filter((item)=> {
      return item !== null
    }).map(filteredStudent => studentTableRow(filteredStudent)) 
  }
})

const studentTable = (studentTableTabKey) => ({
  className:["center fixed-80", "flex start double", "center fixed-60-120 md", "center fixed-60-120 md", "center fixed-60-120", "center fixed-60-120"],
  header: ["프사","이름/번호","시간","닙부 인증샷","납부","더 보기"],
  body: studentTableBody[studentTableTabKey],
  // links: studentIDs.map(id=>`database/students/${id}`)
})
// Content Banner Props
const bannerTabNames = ["2021-6","2021-5", "more"]
const bannerTabLabels = ["2021-6","2021-5","더 보기"]
const bannerTabItems = bannerTabNames.map((name,index)=>{
    const label = bannerTabLabels[index]
      return({label, name, key:index})
  })

const bannerCourseNames = ["담임","학생","납부현황"]
// Content Banner Course Data

const Courses = (props) => {
  const {courseTabProps, bannerTabKey, handleBannerTabKey, contentTableRowKey, handleContentTableRowKey, contentTabKey, contentTableTabKey, handleContentTableTabKey} = props
  const {courseLabels} = props
  // console.log(props)
  const currentPath = props.router.location.pathname
  const currentCourse = courseLabels[currentPath.split("/")[currentPath.split("/").length-1]]
  console.log(currentCourse)
  const bannerCourseData = {
    title: currentCourse,
    main:{
      start:{
        names: ["학생","납부현황"],
        labels: ["38명","71%"],
        progress: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]
        // progress: [1,1,1,0,0]
      },
      end: "CHART"
    },
    more:{
      start: [
        {names:bannerCourseNames, labels: ["박민창","9명","56%"], progress: [1,1,1,1,1,0,0,0,0]},
        {names:bannerCourseNames, labels: ["박민창","10명","90%"], progress: [1,1,1,1,1,1,1,1,1,0]},
        {names:bannerCourseNames, labels: ["이재석","9명","78%"], progress: [1,1,1,1,1,1,1,0,0]},
        {names:bannerCourseNames, labels: ["이재석","10명","80%"], progress: [1,1,1,1,1,1,1,1,0,0]},
      ],
      end: "CHART",
    }
  }

  const bannerTabProps = {
    items: bannerTabItems,
    itemKey: bannerTabKey,
    setItemKey: handleBannerTabKey,
    ghost: true,
    variant: "contained",
  }
  const bannerProps = {tabProps: bannerTabProps, ...bannerCourseData}
  const studentTableTabProps = {
    items: studentTableTabItems,
    itemKey: contentTableTabKey,
    setItemKey: handleContentTableTabKey,
    ghost: true,
    variant: "outlined",
  }
  const studentTableProps = {tabProps: studentTableTabProps, table: studentTable(contentTableTabKey), tableRowKey:contentTableRowKey, handleTableRowKey:handleContentTableRowKey}
  const studentPaperTableProps={
    title: coursePaperTitle[contentTabKey],
    subtitle: coursePaperSubtitle[contentTabKey],
    // selectProps: [],
    tableProps: studentTableProps,
  }
  return (
    <div>
      <Banner {...props} {...bannerProps}/>
        <Tabs {...courseTabProps} />
        <PaperTable {...props} {...studentPaperTableProps} />
    </div>
  )
}

export default Courses
