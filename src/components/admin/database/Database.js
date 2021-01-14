import React, {useState, useEffect} from 'react'
import "./database.scss"

import DatabaseContent from './DatabaseContent'
import DatabaseSider from './DatabaseSider'

const addLevels = (nameList) => nameList.map(name=>{
  return ["1-1","1-2","1-3","2-1","2-2","2-3"].map(level=> `${name} ${level}`)
})
const courseNames = [].concat(...addLevels(["beginner","intermediate","advanced"]))
const courseLabels = [].concat(...addLevels(["초급","중급","고급"]))

// THIS IS REPEATED IN DatabaseSider.js
const siderTabNames = ["courses", "students", "staffs"]

const Database = (props) => {
  // GLOBAL - Show - hide CONTENT for mobile
  const [showContent, setShowContent] = useState(false)
  const toggleShowContent = () =>{
    setShowContent(!showContent)
  }
  const currentPathNameLength = props.router.location.pathname.split("/").length
  useEffect(()=>{
    if (currentPathNameLength <= 2) setShowContent(false)
  },[currentPathNameLength])

  // SIDER - Search state
  const [searchKey, setSearchKey] = useState("")
  const handleSearchKey = (value) => {
    setSearchKey(value)
  }
  // GLOBAL - Period
  const [period, setPeriod] = useState("2021-1")
  const handlePeriod = (event) => {
    setPeriod(event.target.value)
  }
  const periodItems = [
    {value: "2021-1", label: "2021년 1학기",},
    {value: "2020-4", label: "2020년 4학기",},
    {value: "2020-3", label: "2020년 3학기",},
    {value: "2020-2", label: "2020년 2학기",},
    {value: "2020-1", label: "2020년 1학기",},
  ]
  // GLOBAL - Schedule
  const [schedule, setSchedule] = useState(1)
  const handleSchedule = (event) => {
    setSchedule(event.target.value)
  }
  const scheduleItems = [
    {value: 1, label: "1부"},
    {value: 2, label: "2부"},
  ]

  // SIDER - STATES
  const [siderTabKey, setSiderTabKey] = useState(0)
  const [siderTableTabKey, setSiderTableTabKey] = useState(0)
  const [siderTableRowKey, setSiderTableRowKey] = useState(null)
  const [siderTableLastSelectedRow, setSiderTableLastSelecetedRow] = useState({siderTabKey: 0, siderTableRowKey:0, siderTabName:siderTabNames[0]})
  
  // CONTENT -STATES
  const [bannerTabKey, setBannerTabKey] = useState(0)
  const [contentTabKey, setContentTabKey] = useState(0)
  const [contentTableTabKey, setContentTableTabKey] = useState(0)
  const [contentTableRowKey, setContentTableRowKey] = useState(null)

  // CONTENT HANDLE STATE FUNCTIONS
  const handleContentTableRowKey = (rowKey) => {
    setContentTableRowKey(rowKey)
  }
  const handleContentTableTabKey = (tabKey) => {
    handleContentTableRowKey(null)
    setContentTableTabKey(tabKey)
  }
  const handleContentTabKey = (tabKey) =>{
    handleContentTableTabKey(0)
    setContentTabKey(tabKey)
  }
  const handleBannerTabKey = (tabKey) => {
    handleContentTabKey(0)
    setBannerTabKey(tabKey)
  }

  // SIDER HANDLE STATE FUNCTIONS
  const handleSiderTableRowKey = (rowKey) => {
    if (!!rowKey || rowKey === 0) {
      handleContentTabKey(0)
      setShowContent(true)
      setSiderTableLastSelecetedRow({siderTabKey, siderTableRowKey:rowKey, siderTabName: siderTabNames[siderTabKey]})
    }
    setSiderTableRowKey(rowKey)
  }
  const handleSiderTableTabKey = (tabKey) =>{
    handleSiderTableRowKey(null)
    setSiderTableTabKey(tabKey)
  }
  const handleSiderTabKey = (tabKey) => {
    handleSiderTableTabKey(0)
    setSiderTabKey(tabKey)
  }

  // SIDER
  const searchProps = {searchKey, onSearch:handleSearchKey}

  // CONTENT
  const showContentProps = {showContent, setShowContent, toggleShowContent}
  
  // TOTAL PROPS
  const databaseSiderProps = {...props, courseNames, courseLabels, searchProps, period, schedule, handlePeriod, handleSchedule, periodItems, scheduleItems, handleSiderTableRowKey, handleSiderTableTabKey, handleSiderTabKey, siderTabKey, siderTableTabKey, siderTableRowKey}
  const databaseContentProps = {...props, siderTabNames, courseNames, courseLabels, siderTableLastSelectedRow, showContentProps, handleContentTableRowKey, handleContentTableTabKey, handleContentTabKey, contentTabKey, contentTableTabKey, contentTableRowKey, bannerTabKey, handleBannerTabKey}
  const showSider = !(props.isMobile && showContent )
  return (
    <>
    {showSider && <DatabaseSider {...databaseSiderProps} /> }
    <DatabaseContent {...databaseContentProps} />
    </>
  )
}

export default Database
