import React,{useState} from 'react'
import PaperTable from "../../../generic/dataDisplay/table/PaperTable"
import IconBox from "../../../generic/iconBox/IconBox"
import ItemContainer from "../../../generic/dataDisplay/item/ItemContainer"
import ImageIcon from '@material-ui/icons/Image';
import Dialog, {DialogContent, DialogTitle} from '../../../generic/feedback/dialog/Dialog'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from "@material-ui/core/Button"

// Content Table Tabs
const paymentTableTabNames = ["all", "completed", "unpayed"]
const paymentTableTabLabels = ["전체", "완료", "미납"]
const paymentTableTabItems = paymentTableTabNames.map((name,index)=>{
    const label = paymentTableTabLabels[index]
    return {label, name, key:index}
})

const paymentBanks = ["Bancolombia", "Davivienda", "BBVA"]
const paymentTypes = ["이체", "이체", "이체"]
const paymentPeople = ["Min Chang Park", "Min Chang Park", "Min Chang Park"]
const paymentStatus = [0,1,1]

const StudentsPaymentHistory = (props) => {
  const {contentTableRowKey, handleContentTableRowKey, contentTableTabKey, handleContentTableTabKey} = props
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false)
  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false)
  }
  // console.log(props)
  const paymentTableRow = (index) => {
    const bank = paymentBanks[index]
    const type = paymentTypes[index]
    const person = paymentPeople[index]
    const payed = paymentStatus[index]
    return [
      bank,
      type,
      person,
      <Button size="small" color="primary" onClick={()=>setOpenPaymentDialog(true)} startIcon={<ImageIcon color="#20416d" />} >사진 보기</Button>,
      <IconBox icon={payed ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}/>,
      <IconBox icon={<MoreHorizIcon/>} />
    ]
  }
  const paymentTableBody = paymentTableTabNames.map((tabName,index)=>{
    if (index === 0) {
      return paymentBanks.map((bank,index)=>paymentTableRow(index))}
    else {
      return paymentStatus.map((payed,paymentIndex)=>{
        if (tabName === "unpayed") return !payed ? paymentIndex : null
        else return payed ? paymentIndex : null
      }).filter((item)=> {
        return item !== null
      }).map(filteredPayment => paymentTableRow(filteredPayment)) 
    }
  })
    // Student data organized for tabling
  const paymentTable = (paymentTableTabKey) => ({
    className:["flex center ellipsis", "start fixed-60-90 md", "start fixed-120-180 md ellipsis", "start fixed-90", "center fixed-60-90 xs", "center fixed-60-90"],
    header: ["은행","송금유형","송금자","인증샷","납부","더 보기"],
    body: paymentTableBody[paymentTableTabKey],
  })
  const paymentTableTabProps = {
    items: paymentTableTabItems,
    itemKey: contentTableTabKey,
    setItemKey: handleContentTableTabKey,
    ghost: true,
    variant: "outlined",
  }
  const paymentTableProps = {tabProps: paymentTableTabProps, table: paymentTable(contentTableTabKey), tableRowKey:contentTableRowKey, handleTableRowKey:handleContentTableRowKey}
  const paymentPaperTableProps = {
    title: "학생", 
    subtitle: "수업 시간별로 관련 확생명단을 원하는 정렬에 따라 볼 수 있습니다.",
    tableProps: paymentTableProps
  }
  const paymentDialogItems = {items:[
    {name: "인증샷", label: "납부 인증샷 칸"},
    {name: "이체정보", label: "Bancolombia"},
    {name: "송급유형", label: "Transferencia"},
    {name: "송금자 이름", label: "Min Chang Park"},
  ]}
  return (
    <>
      <PaperTable {...props} {...paymentPaperTableProps} />
      <Dialog
        open={openPaymentDialog}
        onClose={handleClosePaymentDialog}
        aria-labelledby="payment-info-dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle onClose={handleClosePaymentDialog} subtitle="해당 학생의 납부 관련 정보를 확인 할 수 있습니다.">
          납부 상세정보
        </DialogTitle>
        <DialogContent>
          <ItemContainer {...paymentDialogItems}/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default StudentsPaymentHistory