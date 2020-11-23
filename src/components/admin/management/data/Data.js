import React, {useState, useEffect} from 'react'
import { db } from "../../../../firebase"

import "./data.scss"

import SubContent from '../../../generic/subcontent/SubContent'
import TableManager from "../../../generic/tableManager/TableManager"
import SiderActions from './siderActions/SiderActions'

const giveBreadcrumbLinks = (currentPath) => {
  const splits = currentPath.split("/").filter((item, index) => index > 0)
  const links = splits.map((item, i) => {
    let path = ""
    splits.forEach((split, splitIndex)=>{
      // console.log(i,splitIndex)
      // console.log(item, split)
      if (i >= splitIndex) {
        path = `${path}/${split}`
      }
      // console.log(path)
    })
    
    const label = item === "management" ? "재콜롬비아한국학교" : item
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
    name: "재콜롬비아한국학교",
    label: "재콜롬비아한국학교",
    path: "/management",
  },])
  const [currentFolder, setCurrentFolder] = useState("periods")
  const [isSiderOpen, setIsSiderOpen] = useState(props.viewport.xs ? false : true)
  const handleIsSiderOpen = () => {
    setIsSiderOpen(prevIsSiderOpen => !prevIsSiderOpen)
  }
  const currentPath = props.router.location.pathname

  useEffect(()=>{
    // const values
    const links = giveBreadcrumbLinks(currentPath)
    console.log(links)
    setBreadcrumbLinks(links)
    // setBreadcrumbLinks(giveBreadcrumbLinks(currentPath))
    const collection = () => {
      switch (links.length){
        case 2: setCurrentFolder("courses"); return db.collection("courses").where("period.name", "==", links[1].label).orderBy("id", "desc");
        case 3: setCurrentFolder("courseLevels"); return db.collection("courses").where("period.name", "==", links[2].label).orderBy("id", "desc");
        default: setCurrentFolder("periods"); return db.collection("periods").orderBy("name", "desc");
      }
    }
    collection().get()
      .then(data=> console.log(data.docs.map(doc=>doc.data())))
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

  const siderProps = {body: bodyProps}
  // console.log(bodyProps)
  const tableManagerProps ={...props,tableProps, siderProps, currentFolder, currentPath, breadcrumbLinks, loading, setLoading, isSiderOpen, setIsSiderOpen, handleIsSiderOpen}
  return (
    <SubContent>
      <TableManager {...tableManagerProps}>
        <SiderActions {...tableManagerProps}/>
      </TableManager>
    </SubContent>
  )
}

export default Data
