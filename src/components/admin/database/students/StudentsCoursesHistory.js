import React from 'react'
import PaperTable from "../../../generic/dataDisplay/table/PaperTable"
import IconBox from "../../../generic/iconBox/IconBox"
import Avatar from '../../../generic/dataDisplay/avatar/Avatar'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { NavLink } from 'react-router-dom'

// Content Table Tabs
const courseTableTabNames = ["all", "approved", "failed"]
const courseTableTabLabels = ["전체", "합격", "불합격"]
const courseTableTabItems = courseTableTabNames.map((name,index)=>{
    const label = courseTableTabLabels[index]
    return {label, name, key:index}
})

const courseNames = ["초급 1-3", "초급 1-2", "초급 1-2", "초급 1-1"]
const courseIDs = [2, 1, 0, 0]
const coursePeriods = ["2021-1", "2020-4", "2020-3", "2020-2"]
const courseStaffs = ["박민창", "박민창", "이재석", "이재석"]
const courseScores = ["N/A", 93, 57, 87]
const courseApproved = [0, 1, 0, 1]
const courseAttendanceRatios = ["3/4", "7/8", "5/8", "7/8"]

const StudentsCoursesHistory = (props) => {
  const {contentTableRowKey, handleContentTableRowKey, contentTableTabKey, handleContentTableTabKey} = props
  const courseTableRow = (index) => {
    const name = courseNames[index]
    const id = courseIDs[index]
    const period = coursePeriods[index]
    const staff = courseStaffs[index]
    const score = courseScores[index]
    const approved = courseApproved[index]
    const attendanceRatio = courseAttendanceRatios[index]
    return [
      <Avatar status="new">{name[0]}</Avatar>,
      [<NavLink to={`/database/courses/${id}`}>{name}</NavLink>, period],
      staff,
      attendanceRatio,
      score,
      <IconBox icon={approved ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}/>,
      <IconBox icon={<MoreHorizIcon/>} />
    ]
  }
  const courseTableBody = courseTableTabNames.map((tabName,index)=>{
    if (index === 0) {
      return courseNames.map((name,index)=>courseTableRow(index))}
    else {
      return courseApproved.map((approved,courseIndex)=>{
        if (tabName === "approved") return approved ? courseIndex : null
        else return !approved ? courseIndex : null
      }).filter((item)=> {
        return item !== null
      }).map(filteredCourse => courseTableRow(filteredCourse)) 
    }
  })
    // Student data organized for tabling
  const courseTable = (courseTableTabKey) => ({
    className:["center fixed-80", "flex start double", "center fixed-60-120 md", "center fixed-120 md", "center fixed-60-90 xs", "center fixed-60-90", "center fixed-60-90"],
    header: ["프사","이름/학기","담임","축석률","시험점수", "합격", "더 보기"],
    body: courseTableBody[courseTableTabKey],
  })
  const courseTableTabProps = {
    items: courseTableTabItems,
    itemKey: contentTableTabKey,
    setItemKey: handleContentTableTabKey,
    ghost: true,
    variant: "outlined",
  }
  const courseTableProps = {tabProps: courseTableTabProps, table: courseTable(contentTableTabKey), tableRowKey:contentTableRowKey, handleTableRowKey:handleContentTableRowKey}
  const coursePaperTableProps = {
    title: "학생", 
    subtitle: "수업 시간별로 관련 확생명단을 원하는 정렬에 따라 볼 수 있습니다.",
    tableProps: courseTableProps
  }
  return (
    <>
      <PaperTable {...props} {...coursePaperTableProps} />
      {/* <Dialog
        open={openPaymentDialog}
        onClose={handleClosePaymentDialog}
        aria-labelledby="course-info-dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle onClose={handleClosePaymentDialog} subtitle="해당 학생의 납부 관련 정보를 확인 할 수 있습니다.">
          납부 상세정보
        </DialogTitle>
        <DialogContent>
          <ItemContainer {...courseDialogItems}/>
        </DialogContent>
      </Dialog> */}
    </>
  )
}

export default StudentsCoursesHistory
