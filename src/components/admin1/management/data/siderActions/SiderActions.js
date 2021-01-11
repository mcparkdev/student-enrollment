import React, {useState} from 'react'
import NewPeriod from './newPeriod/NewPeriod'
import NewCourses from './newCourses/NewCourses'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';

const SiderActions = (props) => {
  const {currentFolder} = props
  const [openNewPeriodForm, setOpenNewPeriodForm] = useState(false);
  const [openNewCoursesForm, setOpenNewCoursesForm] = useState(false);
  const periodActions = [
    {
      name: "newPeriod",
      label: "새 학기",
      buttonProps: {
        color:"primary",
        startIcon: <AddIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => setOpenNewPeriodForm(true)
      }
    },
  ]
  const courseActions = [
    {
      name: "newCourses",
      label: "새 수업",
      buttonProps: {
        color:"primary",
        startIcon: <AddIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => setOpenNewCoursesForm(true)
      }
    },
    {
      name: "newStaff",
      label: "새 교사",
      buttonProps: {
        color:"primary",
        startIcon: <AddIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => console.log("새 교사")
      }
    },
    {
      name: "newStudent",
      label: "새 학생",
      buttonProps: {
        color:"primary",
        startIcon: <AddIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => console.log("새 학생")
      }
    },
    {
      name: "assignStaffs",
      label: "교사 배정",
      buttonProps: {
        color:"primary",
        startIcon: <AccountTreeOutlinedIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => console.log("교사 배정")
      }
    },
    {
      name: "assignStudents",
      label: "학생 배정",
      buttonProps: {
        color:"primary",
        startIcon: <AccountTreeOutlinedIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => console.log("학생 배정")
      }
    },
  ]

  const newPeriodProps = {...props, openNewPeriodForm, setOpenNewPeriodForm}
  const newCoursesProps = {...props, openNewCoursesForm, setOpenNewCoursesForm}
  // console.log(currentFolder)
  return (
    <>
      {currentFolder === "periods" && <Actions actions={periodActions} />}
      {currentFolder === "courses" && 
        <>
          <Actions actions={[courseActions[0], courseActions[1], courseActions[2],]}/>
          <div className="divider" style={{margin: "8px 0"}}/>
          <Actions actions={[courseActions[3], courseActions[4],]}/>
        </>
      }
      <div className="sider-action-dialogs">
        <NewPeriod {...newPeriodProps} />
        <NewCourses {...newCoursesProps} />
      </div>
    </>
  )
}

const Actions = (props) => {
  const {actions} = props
  return (
    <>
      {actions.map((action, index)=>{
        const {name, label, buttonProps} = action
        return (
          <Button key={`sider-actions-${label}`} className={`${name}`}{...buttonProps} >
            {label}
          </Button>
        )
      })}
    </>
  )
}

export default SiderActions
