import React, {useState} from 'react'

import "./newPeriod.scss"

import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText'
// import DialogTitle from '@material-ui/core/DialogTitle';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker'

import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
// import moment from 'moment';
import 'moment/locale/ko'

const defaultValues = [
  {
    name: "newPeriodYear",
    label: "연도",
    value: new Date(),
    error: false,
    helperText: "연도를 선택해주세요",
  },
  {
    name: "newPeriodBimester",
    label: "학기",
    value: "1",
    error: false,
    helperText: "학기를 선택해주세요",
  },
  {
    name: "newPeriodDates",
    label: '날짜',
    value: [],
    error: false,
    helperText: "날짜를 선택해주세요",
    open: false
  }
]

const NewPeriod = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [newPeriodYear, setNewPeriodYear] = useState(defaultValues[0])
  const [newPeriodBimester, setNewPeriodBimester] = useState(defaultValues[1])
  const [newPeriodDates, setNewPeriodDates] = useState(defaultValues[2])
  const [checkError, setCheckError] = useState(false)
  const handleNewPeriodYear = (value) => {
    setNewPeriodYear({...newPeriodYear, value})
  }
  const handleNewPeriodBimester = (event) => {
    setNewPeriodBimester({...newPeriodBimester, value: event.target.value})
  }
  const handleNewPeriodDates = (value) => {
    setNewPeriodDates({...newPeriodDates, value, open:false})
  }
  const handleNewPeriodDatesOpen = (open) => {
    setNewPeriodDates({...newPeriodDates, open})
  }
  const onReset = () => {
    setNewPeriodYear(defaultValues[0])
    setNewPeriodBimester(defaultValues[1])
    setNewPeriodDates(defaultValues[2])
    setOpenNewPeriodForm(false)
  }
  const onSubmit = () => {
    setCheckError(true)
    if (newPeriodDates.value[0] === undefined) {
      alert(newPeriodDates.helperText)
    }
    else{
      const bimester = newPeriodBimester.value
      const dates = newPeriodDates.value
      const year = newPeriodYear.value._d === undefined ? newPeriodYear.value.getFullYear() : newPeriodYear.value.year()
      const name = year * 10 + parseInt(bimester)
      const periodProps = {
        name,
        bimester,
        year,
        dates,
        favorite: false,
        updatedAt: new Date(),
        createdAt: new Date(),
        students: {},
        staffs: {},
        courses: {},
      }
      props.db.collection('periods').doc(name.toString()).set(periodProps)
        .then(()=>{alert("학기가 생성 되었습니다."); onReset();})
        .catch(err => {console.log(err);alert("학기를 생성하지 못 했습니다.");})
      console.log(name.toString())
    }
  }
  
  const bimesterProps = () => {
    const {name, label, value, helperText} = newPeriodBimester
    const hasError = checkError && (value === null || value === undefined || value === "")
    return {
    id: name,
    label,
    name,
    margin: "normal",
    required: true,
    fullWidth: true,
    value: value !== undefined ? value : "",
    onChange: handleNewPeriodBimester,
    select: true,
    error: hasError,
    helperText: hasError ? helperText : "",
  }}
  const yearProps = () => {
    const {value, helperText} = newPeriodYear
    const hasError = checkError && (value === null || value === undefined || value === "")
    return {
      openTo: "year",
      clearable: true,
      views: ["year"],
      label: "새 학기 연도",
      value: value,
      onChange: handleNewPeriodYear,
      fullWidth: true,
      required: true,
      error: hasError,
      helperText: hasError ? helperText : ""
    }
  }
  const datesProps = () => {
    const {value, open} = newPeriodDates
    return {
      open,
      selectedDates: value,
      onCancel: () => handleNewPeriodDatesOpen(false),
      onSubmit: handleNewPeriodDates,
    }
  }
  // console.log(bimesterProps())
  const {openNewPeriodForm, setOpenNewPeriodForm} = props
  return (
    <Dialog fullScreen={fullScreen} open={openNewPeriodForm} onClose={()=>setOpenNewPeriodForm(false)} aria-labelledby="form-dialog-title" max-width="sm" fullWidth>
      <div className="dialog-title" style={{fontSize: 24, fontWeight: 700, flex: "0 0 auto", margin: 0, padding: "16px 24px"}}>새 학기</div>
      <DialogContent>
        <DialogContentText>
          연도, 학기 및 날짜를 선정해주세요.
        </DialogContentText>
        <div className="dialog-form-input">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker {...yearProps()} />
          </MuiPickersUtilsProvider>
        </div>
        <div className="dialog-form-input">
          <TextField {...bimesterProps()}>
            {bimesters.map((bimester, index) => (
              <MenuItem key={`bimester-${bimester}`} value={bimester}>
                {bimester}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="dialog-form-input">
          <Button color="primary" onClick={()=>handleNewPeriodDatesOpen(true)} >날짜 선택하기</Button>
          {newPeriodDates.value.map((date, index)=>{
            return(
              <div key={date.toDateString()}>
                {index + 1}. {date.toLocaleString("ko-KR",{weekday:"narrow", day:"2-digit", month:"long", year:"numeric"})}
              </div>
            )
          })}
          <MultipleDatesPicker {...datesProps()}/>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReset} color="primary">
          취소
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained">
          만들기
        </Button>
      </DialogActions>
      
    </Dialog>
  )
}

const bimesters = ['1', '2', '3', '4', '5', '6']

export default NewPeriod
