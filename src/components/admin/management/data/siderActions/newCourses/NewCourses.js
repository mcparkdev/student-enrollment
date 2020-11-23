import React, { useState, useEffect } from 'react'

import { db } from "../../../../../../firebase"
import LinearProgressWithLabel from "../../../../../generic/linearProgress/LinearProgressWithLabel"
import "./newCourses.scss"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText'
// import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

const names = [
  {
    label: "초급-1",
    value: 1,
  },
  {
    label: "초급-2",
    value: 2,
  },
  {
    label: "중급-1",
    value: 3,
  },
  {
    label: "중급-2",
    value: 4,
  },
  {
    label: "고급-1",
    value: 5,
  },
  {
    label: "고급-2",
    value: 6,
  },
]

const levels = [{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }]
const types = [{ value: 1, label: "1부" }, { value: 2, label: "2부" }]

const nodes = names.map((name,nameIndex)=>{
  const {value, label} = name
  return {
    value, label,
    children: levels.map(level=>{
      const levelValue = level.value
      const levelLabel = level.label
      return {
        value: `${value}-${levelValue}`, 
        label: levelLabel,
        children: types.map(type=>{
          const typeValue = type.value
          const typeLabel = type.label
          return {
            value: `${value}-${levelValue}-${typeValue}`,
            label: typeLabel,
          }
        })
      }
    })
  }
})

const icons = {
  check: <CheckBoxIcon />,
  uncheck: <CheckBoxOutlineBlankIcon />,
  halfCheck: <IndeterminateCheckBoxIcon />,
  expandClose: <ExpandMoreIcon />,
  expandOpen: <ExpandLessIcon />,
  expandAll: <AddBoxIcon />,
  collapseAll: <IndeterminateCheckBoxIcon />,
  parentClose: <FolderIcon />,
  parentOpen: <FolderOpenIcon />,
  leaf: <CollectionsBookmarkIcon />
};

function giveName(id) {
  switch (id) {
    case 1: return "beginner-1";
    case 2: return "beginner-2";
    case 3: return "intermediate-1";
    case 4: return "intermediate-2";
    case 5: return "advanced-1";
    case 6: return "advanced-2";
    default: return "beginner-1";
  }
}

const defaultValues = [
  {
    name: "fee",
    label: "학비",
    value: 200000,
    error: false,
    helperText: "학비를 입력해주세요",
  },
]

const NewCourses = (props) => {
  // console.log(nodes)
  const theme = useTheme();
  const {openNewCoursesForm, setOpenNewCoursesForm} = props
  const [creating, setCreating] = useState({
    state: false,
    total: 0,
    completed: 0,
    progress: 0,
  })
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [fee, setFee] = useState(defaultValues[0])
  const [errors, setErrors] = useState({
    fee: false,
    checked: true,
  })
  const handleFee = (event) => {
    setFee({...fee, value: event.target.value})
  }

  const feeProps = () => {
    const {name, label, value, helperText} = fee
    const hasError = (value === null || value === undefined || value === ""  || value === 0)
    // setErrors({errors, fee: hasError})
    return {
    id: name,
    label,
    name,
    margin: "normal",
    required: true,
    fullWidth: true,
    value: value !== undefined ? value : "",
    onChange: handleFee,
    error: hasError,
    helperText: hasError ? helperText : "",
    type: "number"
  }}

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentPath } = props
  const splitCurrentPath = currentPath.split("/")
  const period = splitCurrentPath[splitCurrentPath.length-1]

  useEffect(() => {
    const {value} = fee
    const hasError = (value === null || value === undefined || value === ""  || value === 0)
    setErrors({
      fee: hasError, checked: !checked.length
    })
  }, [fee, checked])

  useEffect(() => {
    setSubmitDisabled(Object.entries(errors).map(([k,v],i) => v).includes(true))
  }, [errors])

  const onReset = () => {
    setOpenNewCoursesForm(false)
  }
  const onSubmit = () => {
    if (!!checked.length){
      setCreating({...creating, state: true})
      // alert(period)
      db.collection("periods").doc(period).get()
        .then(doc => {
          const {name, bimester, year} = doc.data()
          const periodProps = {period:{name, bimester, year}}
          setCreating({...creating, total: checked.length})
          checked.forEach((course,index)=>{
            setCreating({...creating, progress: index + 1})
            const split = course.split("-")
            const id = parseInt(split[0])
            const courseName = giveName(id)
            const level = parseInt(split[1])
            const type = parseInt(split[2])
            const newCourse = {
              id, name: courseName, level, type, ...periodProps, students:{}, staff: {}, fee: fee.value
            }
            const document = `${id}${level}${type}`
            // console.log(newCourse)
            db.collection("periods").doc(period).collection(document).set(newCourse)
              .then(()=>{
                setCreating({...creating, completed: index + 1, progress: 0})
              })
              .catch(err=>console.log(`${document}-${err}`))
          })
        })
        .then(()=>{
          setCreating({total:0, completed:0, progress: 0, state: false})
          setOpenNewCoursesForm(false)
        })
        .catch(err => console.log(err))
      // setOpenNewCoursesForm(false)
    }
    else{
      alert("수업을 선택해주세요")
    }
  }
  console.log(errors, submitDisabled)
  return (
    <Dialog fullScreen={fullScreen} open={openNewCoursesForm} onClose={()=>setOpenNewCoursesForm(false)} aria-labelledby="form-dialog-title" max-width="md" fullWidth>
      <div className="dialog-title" style={{fontSize: 24, fontWeight: 700, flex: "0 0 auto", margin: 0, padding: "16px 24px"}}>새 수업</div>
      <DialogContent>
        <DialogContentText>
          학비를 입력해주세요
        </DialogContentText>
        <div className="dialog-form-input">
          <TextField {...feeProps()}/>
        </div>
        <DialogContentText>
          {period}에 만들 수업들을 선책해주세요.
        </DialogContentText>
        {creating.state &&

          <LinearProgressWithLabel {...creating} />
        }
        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={checked => setChecked( checked )}
          onExpand={expanded => setExpanded( expanded )}
          icons={icons}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onReset} color="primary">
          취소
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained" disabled={submitDisabled}>
          만들기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewCourses
