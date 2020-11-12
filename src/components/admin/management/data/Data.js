import React, {useState, useEffect} from 'react'
import { db } from "../../../../firebase"

import "./data.scss"

import SubContent from '../../../generic/subcontent/SubContent'
import TableManager from "../../../generic/tableManager/TableManager"
import NewPeriod from './newPeriod/NewPeriod';

import AddIcon from '@material-ui/icons/Add';

// import Sider from './sider/Sider'


const newStudent = (props) => {
  console.log(props)
}

const giveBreadcrumbLinks = (currentPath) => {
  const splits = currentPath.split("/").filter((item, index) => index > 1)
  const links = splits.map((item, i) => {
    let path = "/management"
    splits.forEach((split, splitIndex)=>{
      // console.log(i,splitIndex)
      // console.log(item, split)
      if (i >= splitIndex) {
        path = `${path}/${split}`
      }
      // console.log(path)
    })
    const label = item === "data" ? "재콜롬비아한국학교" : item
    return {
      name: path,
      label: label,
      path,
    }
  })

  return links
}

const Data = (props) => {
  const [loading, setLoading] = useState(true)
  const [dataCollection, setDataCollection] = useState(db.collection("periods").orderBy("name", "desc"))
  const [dataDocuments, setDataDocuments] = useState([])
  const [breadcrumbLinks, setBreadcrumbLinks] = useState([{
    name: "제콜롬비아한국학교",
    label: "제콜롬비아한국학교",
    path: "/management/data",
  },])

  const currentPath = props.router.location.pathname

  useEffect(()=>{
    const links = giveBreadcrumbLinks(currentPath)
    setBreadcrumbLinks(links)
    // setBreadcrumbLinks(giveBreadcrumbLinks(currentPath))
    console.log(links)
    const collection = () => {
      switch (links.length){
        case 2: return db.collection("courses").where("period.name", "==", links[1].label).orderBy("filter", "desc");
        case 3: return db.collection("courses").where("period.name", "==", links[2].label).orderBy("filter", "desc");
        default: return db.collection("periods").orderBy("name", "desc");
      }
    }
    collection().get()
      .then(data=> console.log(data))
      .catch(err => console.log(err))
    setLoading(true)
  },[currentPath])

  useEffect(()=>{
    if (loading){
      dataCollection.get()
        .then(data => {
          // data.docs.forEach(doc=>console.log(doc.data()))
          if (!!data && !!data.docs){
            setDataDocuments(data.docs.map(doc=>doc.data()))
            setLoading(false)
          }
        })
        .catch(err => console.log(err))
    }
  }, [loading, dataCollection])

  const siderActions = [
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
    {
      name: "newCourse",
      label: "새 수업",
      buttonProps: {
        color:"primary",
        startIcon: <AddIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => newStudent("새 수업")
      }
    },
    {
      name: "newStaff",
      label: "새 교사",
      buttonProps: {
        color:"primary",
        startIcon: <AddIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => newStudent("새 교사")
      }
    },
    {
      name: "newStudent",
      label: "새 학생",
      buttonProps: {
        color:"primary",
        startIcon: <AddIcon />,
        fullWidth: props.viewport.xs ? true : false,
        onClick: () => newStudent("새 학생")
      }
    },
  ]

  const bodyProps = dataDocuments.map((period, index) => {
    const {favorite, name, updatedAt} = period
    const modified = new Date(updatedAt.seconds * 1000)
    let completed = 0
    let progress = 0
    let courseAssigned = 0
    const students = Object.entries(period.students).map(([k,v],i) => {
      if (v.paymentStatus === "completed") {completed++}
      else if (v.paymentStatus === "progress") {progress++}
      if (v.courseName !== "none") {courseAssigned++}
      return {[k]:v}
    })
    const courses = Object.entries(period.courses).map(([k,v],i) => {return {[k]:v}})
    const staffs = Object.entries(period.staffs).map(([k,v],i) => {return {[k]:v}})
    const total = students.length
    return {
      favorite,
      name,
      label: name,
      checked: false,
      students: {
        name: "paymentProgress",
        label: "학생",
        total, completed, progress
      },
      courses,
      staffs,
      courseAssigned: {
        name: "courseAssigned",
        label: "수업 배정 현황",
        total,
        completed: courseAssigned,
        progress: 0,
      },
      cells:[
        {
          name: "name",
          label: name,
        },
        {
          name: "modified",
          label: modified.toLocaleString("ko-KR",{weekday:"narrow", day:"2-digit", month:"long", year:"numeric"}),
        },
        {
          name: "paymentProgress",
          total, completed, progress,
        },
      ]
    }
  })

  const tableProps = {
    header: [
      {
        id: 0,
        name: "name",
        label: "이름",
      },
      {
        id: 1,
        name: "modified",
        label: "수정됨",
      },
      {
        id: 2,
        name: "current-status",
        label: "현황",
      },
    ],
    body: bodyProps,
    breadcrumbLinks,
    loading,
  }

  const [openNewPeriodForm, setOpenNewPeriodForm] = useState(false);

  const siderProps = {body: bodyProps,}
  const tableManagerProps ={...props,tableProps, siderProps, siderActions, breadcrumbLinks, loading, setLoading,}
  const newPeriodProps = {...props, openNewPeriodForm, setOpenNewPeriodForm, setLoading}
  return (
    <SubContent>
      <NewPeriod {...newPeriodProps}/>
      <TableManager {...tableManagerProps}/>
    </SubContent>
  )
}

export default Data
