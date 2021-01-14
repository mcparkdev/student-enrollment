import React,{useState} from 'react'
import PaperTable from "../../../generic/dataDisplay/table/PaperTable"
import Avatar from '../../../generic/dataDisplay/avatar/Avatar'
import IconBox from "../../../generic/iconBox/IconBox"
import ItemContainer from "../../../generic/dataDisplay/item/ItemContainer"
import Dialog, {DialogContent, DialogTitle} from '../../../generic/feedback/dialog/Dialog'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from "@material-ui/core/Button"
import { NavLink } from 'react-router-dom'

// Content Table Tabs
const studentTableTabNames = ["all", "schedule-1", "schedule-2", "unpayed"]
const studentTableTabLabels = ["전체", "1부", "2부", "미납"]
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


const CourseStudents = (props) => {
  const {contentTableRowKey, handleContentTableRowKey, contentTableTabKey, handleContentTableTabKey} = props
  const [studentOpenPaymentDialog, setStudentOpenPaymentDialog] = useState(false)
  const handleCloseStudentOpenPaymentDialog = () => {
    setStudentOpenPaymentDialog(false)
  }
  console.log(props)
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
      <Button size="small" color="primary" onClick={()=>setStudentOpenPaymentDialog(true)}>{payment}</Button>,
      <IconBox icon={payed ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}/>,
      <IconBox icon={<MoreHorizIcon/>} />
    ]
  }
  const studentTableBody = ["total","schedule-1", "schedule-2", "unpayed"].map((tabName,index)=>{
    if (index === 0) {
      return studentNames.map((name,index)=>studentTableRow(index))}
    else {
      return studentSchedules.map((studentSchedule,studentIndex)=>{
        if (tabName === "unpayed") return !studentPayed[studentIndex] ? studentIndex : null
        else return index === studentSchedule ? studentIndex : null
      }).filter((item)=> {
        return item !== null
      }).map(filteredStudent => studentTableRow(filteredStudent)) 
    }
  })
    // Student data organized for tabling
  const studentTable = (studentTableTabKey) => ({
    className:["center fixed-80", "flex start double", "center fixed-60-120 md", "center fixed-60-120 md", "center fixed-60-90", "center fixed-60-90"],
    header: ["프사","이름/번호","시간","닙부 인증샷","납부","더 보기"],
    body: studentTableBody[studentTableTabKey],
    // links: studentIDs.map(id=>`database/students/${id}`)
  })
  const studentTableTabProps = {
    items: studentTableTabItems,
    itemKey: contentTableTabKey,
    setItemKey: handleContentTableTabKey,
    ghost: true,
    variant: "outlined",
  }
  const studentTableProps = {tabProps: studentTableTabProps, table: studentTable(contentTableTabKey), tableRowKey:contentTableRowKey, handleTableRowKey:handleContentTableRowKey}
  const studentPaperTableProps = {
    title: "학생", 
    subtitle: "수업 시간별로 관련 확생명단을 원하는 정렬에 따라 볼 수 있습니다.",
    tableProps: studentTableProps
  }
  const studentPaymentDialogItems = {items:[
    {name: "인증샷", label: "납부 인증샷 칸"},
    {name: "이체정보", label: "Bancolombia"},
    {name: "송급유형", label: "Transferencia"},
    {name: "송금자 이름", label: "Min Chang Park"},
  ]}
  return (
    <>
      <PaperTable {...props} {...studentPaperTableProps} />
      <Dialog
        open={studentOpenPaymentDialog}
        onClose={handleCloseStudentOpenPaymentDialog}
        aria-labelledby="student-payment-dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle onClose={handleCloseStudentOpenPaymentDialog} subtitle="해당 학생의 납부 관련 정보를 확인 할 수 있습니다.">
          납부 상세정보
        </DialogTitle>
        <DialogContent>
          <ItemContainer {...studentPaymentDialogItems}/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CourseStudents
