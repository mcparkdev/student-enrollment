import React, {useState} from 'react'
import "./database.scss"

import { Redirect, Route, Switch } from 'react-router-dom'

import Courses from './courses/Courses'
import Sider from "../../generic/layout/sider/Sider"
import AutoComplete from "../../generic/input/autoComplete/AutoComplete"
import Tabs from '../../generic/navigation/tabs/Tabs'

const searchOptions = [
  { label: "초급 1-1", name: "beginner 1-1"},
  { label: "초급 1-2", name: "beginner 1-2"},
  { label: "초급 1-3", name: "beginner 1-3"},
  { label: "초급 2-1", name: "beginner 2-1"},
  { label: "초급 2-2", name: "beginner 2-2"},
  { label: "초급 2-3", name: "beginner 2-3"},
  { label: "중급 1-1", name: "intermediate 1-1"},
  { label: "중급 1-2", name: "intermediate 1-2"},
  { label: "중급 1-3", name: "intermediate 1-3"},
  { label: "중급 2-1", name: "intermediate 2-1"},
  { label: "중급 2-2", name: "intermediate 2-2"},
  { label: "중급 2-3", name: "intermediate 2-3"},
  { label: "고급 1-1", name: "advanced 1-1"},
  { label: "고급 1-2", name: "advanced 1-2"},
  { label: "고급 1-3", name: "advanced 1-3"},
  { label: "고급 2-1", name: "advanced 2-1"},
  { label: "고급 2-2", name: "advanced 2-2"},
  { label: "고급 2-3", name: "advanced 2-3"},
  { label: "박민창", name: "박민창"},
  { label: "이재석", name: "이재석"},
  { label: "Min Chang Park", name: "Min Chang Park"},
  { label: "Jae Suk Lee", name: "Jae Suk Lee"},
]

const Database = (props) => {
  const [searchKey, setSearchKey] = useState("")
  const handleSearchKey = (value) => {
    setSearchKey(value)
  }
  const periodItems = [
    {value: "2021-1", label: "2021년 1학기",},
    {value: "2020-4", label: "2020년 4학기",},
    {value: "2020-3", label: "2020년 3학기",},
    {value: "2020-2", label: "2020년 2학기",},
    {value: "2020-1", label: "2020년 1학기",},
  ]
  const scheduleItems = [
    {value: 1, label: "1부"},
    {value: 2, label: "2부"},
  ]
  const [period, setPeriod] = useState("2021-1")
  const [schedule, setSchedule] = useState(1)
  const handlePeriod = (event) => {
    setPeriod(event.target.value)
  }
  const handleSchedule = (event) => {
    setSchedule(event.target.value)
  }

  const filters = {searchKey, period, schedule}
  console.log(filters)

  const databaseTabNames = ["courses", "students", "staffs"]
  const databaseTabLabels = ["수업", "학생", "교사"]
  const databaseTabItems = databaseTabNames.map((name,index)=>{
    const label = databaseTabLabels[index]
    return({label, name, link:`/database/${name}` , key:index})
  })
  const [databaseTabKey, setDatabaseTabKey] = useState(0)
  const databaseTabProps = {
    items: databaseTabItems,
    itemKey: databaseTabKey,
    setItemKey: setDatabaseTabKey,
  }

  const basicProps = {searchKey, setSearchKey, period, setPeriod, schedule, setSchedule, handlePeriod, handleSchedule, scheduleItems, periodItems ,databaseTabItems, databaseTabKey, setDatabaseTabKey}
  const currentPath = props.router.location.pathname
  return (
    <Sider className="database">
      <div className="header">
        <div className="last-update">
          마지막 접속 : 2021년 1월 10일 오후 3:20
        </div>
        <AutoComplete searchOptions={searchOptions} onSearch={handleSearchKey} />
      </div>
      <div className="content">
        <Tabs {...databaseTabProps} />
        <Switch>
          <Route
            path={`/database/courses`}
            render={({ match, history, location }) => {
              const allProps = {...props, ...basicProps, match, history, location}
              return (<Courses {...allProps}/>)
            }}
          />
        </Switch>
      </div>
      <div className="footer"></div>
      {(currentPath === "/database" || currentPath === "/database/courses") &&
        <Redirect to="/database/courses/all"/>
      }
    </Sider>
  )
}

export default Database
