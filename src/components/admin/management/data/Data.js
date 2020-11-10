import React, {useState, useEffect} from 'react'

import "./data.scss"

import SubContent from '../../../generic/subcontent/SubContent'
import Table from "../../../generic/table/Table"

import AddIcon from '@material-ui/icons/Add';

import Sider from './sider/Sider'
import NewPeriod from './newPeriod/NewPeriod';

const Data = (props) => {
  const {viewport, db} = props
  const [selectedRow, setSelectedRow] = useState(null)
  const [isSiderOpen, setIsSiderOpen] = useState(viewport.xs ? false : true)
  const handleIsSiderOpen = () => {
    setIsSiderOpen(prevIsSiderOpen => !prevIsSiderOpen)
  }

  const [loading, setLoading] = useState(true)
  const [periodDocuments, setPeriodDocuments] = useState([])

  useEffect(()=>{
    db.collection('periods').orderBy("id", "desc").get()
      .then(data => {
        data.docs.forEach(doc=>console.log(doc.data()))
        if (!!data && !!data.docs){
          setPeriodDocuments(data.docs.map(doc=>doc.data()))
          setLoading(false)
        }
      })
      .catch(err => console.log(err))
  }, [db])
  // console.log(periodDocuments, loading)

  const breadcrumbLinks = [
    {
      name: "제콜롬비아한국학교",
      label: "제콜롬비아한국학교",
      path: "/management/data",
    }
  ]
  console.log(selectedRow)
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
    body: [
      {
        id: 0,
        favorite: true,
        name: "2020-4",
        label: "2020-4",
        checked: false,
        cells: [
          {
            name:"name",
            label: "2020-4",
          },
          {
            name: "modified",
            label: "2020.11.02 오후 2:24",
          },
          {
            name: "paymentProgress",
            total: 60,
            completed: 40,
            progress: 15,
          },
        ],
        childrenPaymentProgress: [
          {
            name: "beginner-1",
            label: "초급1",
            total: 10,
            completed: 7,
            progress: 3,
          },
          {
            name: "beginner-2",
            label: "초급2",
            total: 10,
            completed: 9,
            progress: 0,
          },
          {
            name: "intermediate-1",
            label: "중급1",
            total: 10,
            completed: 5,
            progress: 4,
          },
          {
            name: "intermediate-2",
            label: "중급2",
            total: 10,
            completed: 6,
            progress: 2,
          },
          {
            name: "advanced-1",
            label: "고급1",
            total: 10,
            completed: 7,
            progress: 2,
          },
          {
            name: "advanced-2",
            label: "고급2",
            total: 10,
            completed: 6,
            progress: 4,
          },
        ],
      },
      {
        id: 0,
        favorite: false,
        name: "2020-3",
        label: "2020-3",
        checked: false,
        cells: [
          {
            name:"name",
            label: "2020-3",
          },
          {
            name: "modified",
            label: "2020.01.02 오후 2:24",
          },
          {
            name: "paymentProgress",
            total: 60,
            completed: 60,
            progress: 0,
          },
        ],
        childrenPaymentProgress: [
          {
            name: "beginner-1",
            label: "초급1",
            total: 10,
            completed: 10,
            progress: 0,
          },
          {
            name: "beginner-2",
            label: "초급2",
            total: 10,
            completed: 10,
            progress: 0,
          },
          {
            name: "intermediate-1",
            label: "중급1",
            total: 10,
            completed: 10,
            progress: 0,
          },
          {
            name: "intermediate-2",
            label: "중급2",
            total: 10,
            completed: 10,
            progress: 0,
          },
          {
            name: "advanced-1",
            label: "고급1",
            total: 10,
            completed: 10,
            progress: 0,
          },
          {
            name: "advanced-2",
            label: "고급2",
            total: 10,
            completed: 10,
            progress: 0,
          },
        ],
      },
    ],
    selectedRow,
    setSelectedRow,
    breadcrumbLinks,
    handleIsSiderOpen,
    loading,
  }
  const {body} = tableProps
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

  const newStudent = (props) => {
    console.log(props)
  }
  // console.log(tableProps)
  const [openNewPeriodForm, setOpenNewPeriodForm] = useState(false);

  const siderProps = {...props, isSiderOpen, handleIsSiderOpen, selectedRow, body, siderActions}
  const newPeriodProps = {...props, openNewPeriodForm, setOpenNewPeriodForm}
  return (
    <SubContent>
      <NewPeriod {...newPeriodProps}/>
      <Table {...tableProps} {...props} />
      {isSiderOpen && <Sider {...siderProps} />}
    </SubContent>
  )
}

export default Data
