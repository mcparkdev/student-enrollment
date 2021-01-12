import React, {useState} from 'react'
import "./database.scss"

import Avatar from '../../generic/dataDisplay/avatar/Avatar'
import IconBox from "../../generic/iconBox/IconBox"
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DatabaseContent from './DatabaseContent'
import DatabaseSider from './DatabaseSider'


//Autcomplete Search options
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

// Course categories and lists
const addTotalList = (list) => [[].concat(...list), ...list]
const addLevels = (nameList) => (
  addTotalList(nameList.map(name=>{
    return ["1-1","1-2","1-3","2-1","2-2","2-3"].map(level=> `${name} ${level}`)
  }))
)

const courseStatus = addTotalList([["new", "new", "", "", "", "new", ], ["new", "new", "new", "new", "", "",], ["new", "new", "", "", "", "new", ]])
const courseNames = addLevels(["beginner","intermediate","advanced"])
const courseLabels = addLevels(["초급","중급","고급"])

// Temporary student names. Got to change to firebase stored data

const studentNames = ["Min Chang Park", "Min Chang Park", "Min Chang Park", "Min Seo Park", "Min Seo Park", "Min Seo Park","Min Gyu Park", "Min Gyu Park", "Min Gyu Park"]
const studentIDs = ["201631807", "201631807", "201631807", "202149352", "202149352", "202149352", "201439402", "201439402", "201439402"]
const studentCourses = [0, 0, 1, 1, 2, 2, 0, 1, 2]
const studentPayed = [true, true, true, false, false, true, true, true, true]
const studentStatus = ["new", "new", "", "new", "new", "", "new", "new", "new", ]


// Student data organized for tabling

const studentTable = ["total","beginner", "intermediate","advanced","unmatched"].map((tabName,index)=>{
  if (index === 0) {
    return studentNames.map((name,index)=>{
      const studentID = studentIDs[index]
      const payed = studentPayed[index]
      const status = studentStatus[index]
      return [
        <Avatar status={status}>{name[0]}</Avatar>,
        [name, studentID],
        <IconBox icon={payed ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}/>,
        <IconBox icon={<MoreHorizIcon/>} />
      ]
  })
  }
  else {
    return studentCourses.map((studentCourse,studentIndex)=>{
      if (index === 4) return !studentPayed[studentIndex] ? studentIndex : null
      else return index - 1 === studentCourse ? studentIndex : null
    }).filter((item)=> {
      // console.log(index, studentNames[item], item)
      return item !== null
    }).map(filteredStudent => {
      const name = studentNames[filteredStudent]
      const ID = studentIDs[filteredStudent]
      const payed = studentPayed[filteredStudent]
      const status = studentStatus[filteredStudent]      
      return [
        <Avatar status={status}>{name[0]}</Avatar>,
        [name, ID],
        <IconBox icon={payed ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}/>,
        <IconBox icon={<MoreHorizIcon/>} />
      ]
    })
  }
})

// SIDER
// Sider Tabs

const siderTabNames = ["courses", "students", "staffs"]
const siderTabLabels = ["수업", "학생", "교사"]
const siderTabItems = siderTabNames.map((name,index)=>{
  const label = siderTabLabels[index]
  return({label, name, link:`/database/${name}` , key:index})
})

const siderTableTabNames = [
  ["all", "beginner", "intermediate", "advanced"],
  ["all", "beginner", "intermediate", "advanced", "unmatched"],
  ["all", "beginner", "intermediate", "advanced", "unmatched"]
]
const siderTableTabLabels = [
  ["전체", "초급", "중급", "고급"],
  ["전체", "초급", "중급", "고급", "미배정"],
  ["전체", "초급", "중급", "고급", "미배정"],
]
const siderTableTabItems = (siderTabKey) =>{
  return siderTableTabNames[siderTabKey].map((name,index)=>{
    const label = siderTableTabLabels[siderTabKey][index]
    return({label, name, link:`/database/${siderTabNames[siderTabKey]}/${name}`, key:index})
  })
} 

// Sider Paper Props
const siderPaperTitle = ["수업", "학생", "교사"]
const siderPaperSubtitle = [
  "수업별로 원하는 정렬에 따라 볼 수 있습니다.",
  "수업별로 원하는 정렬에 따라 볼 수 있습니다. 새로운 교사는 설정에서 추가하세요.",
  "수업별로 원하는 정렬에 따라 볼 수 있습니다."
]

// Sider Table - Dependent on the current siderTabKey and the siderTableTabKey
const siderTable = (siderTabKey, siderTableTabKey) => (
  siderTabKey === 0 
  ? {
    className:["center fixed-80", "flex start", "center fixed-60-120", "center fixed-60-120"],
    header:["등급", "이름","납부율","학생 수"],
    body: courseNames[siderTableTabKey].map((name,index)=>{
      const label = courseLabels[siderTableTabKey][index]
      const status = courseStatus[siderTableTabKey][index]
      return [<Avatar status={status}>{label[0]}</Avatar>, label, "90%", "10명"]
    }),
    links: courseNames[siderTableTabKey].map(name=>{
      return `/database/courses/${name}`
    })
  }
  : ( siderTabKey === 1 
    ? {
      className:["center fixed-80", "flex start double", "center fixed-60", "center fixed-60"],
      header:["프사", "이름/번호","납부","자세히"],
      body: studentTable[siderTableTabKey],
      links: studentTable[siderTableTabKey].map((student)=>{
        const name = student[1][0]
        return `/database/students/${name}`
      })
    }
    : {
      className:["center fixed-80", "flex start", "center fixed-60", "center fixed-60"],
      header:["프사", "이름"," 수업 배정","자세히"],
      body:[
        [<Avatar status="new">초</Avatar>, "박민창", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
        [<Avatar status="new">초</Avatar>, "이재석", <IconBox icon={<RadioButtonUncheckedIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
        [<Avatar status="new">중</Avatar>, "박민창", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
        [<Avatar status="new">중</Avatar>, "이재석", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
        [<Avatar status="new">고</Avatar>, "박민창", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
        [<Avatar status="new">고</Avatar>, "이재석", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      ],
    }
    )
)


// CONTENT

// Content Tabs

const contentTabNames = ["students", "generalInformation", "staffs"]
const contentTabLabels = ["학생", "기본 정보", "교사"]
const contentTabItems = contentTabNames.map((name,index)=>{
  const label = contentTabLabels[index]
  return({label, name, key:index})
})


// Content Paper Props
const contentPaperTitle = [
  ["학생", "기본 정보", "설정"],
  ["현황", "기본 정보", "기록"],
  ["현황", "기본 정보", "기록"],
]
const contentPaperSubtitle = [
  [
  "수업 시간별로 관련 확생명단을 원하는 정렬에 따라 볼 수 있습니다.",
  "수업 기본정보",
  "학생 및 교사 배정하기",
  ],
  [
    "현재 등록된 수업을 확인 및 수정을 할 수 있습니다.",
    "학생의 기본정보를 확인 할 수 있습니다.",
    "학생의 수업기록을 확인 할 수 있습니다."
  ],
  [
    "현재 맡은 수업들을 확인 및 수정을 할 수 있습니다.",
    "교사의 기본정보를 확인 할 수 있습니다.",
    "교사의 수업기록을 확인 할 수 있습니다."
  ]
]

// Content Table Tabs
const contentTableTabNames = [
  ["all", "schedule-1", "schedule-2"],
  ["all", "schedule-1", "schedule-2"],
  ["all", "schedule-1", "schedule-2"],
]
const contentTableTabLabels = [
  ["전체", "1부", "2부"],
  ["전체", "1부", "2부"],
  ["전체", "1부", "2부"],
]
const contentTableTabItems = (contentTabKey) =>{
  return contentTableTabNames[contentTabKey].map((name,index)=>{
    const label = contentTableTabLabels[contentTabKey][index]
    return({label, name, key:index})
  })
} 
// Content Table Props
const contentTable = [
  {
    className:["center fixed-80", "flex start double", "end fixed-80", "end fixed-80"],
    header:["등급", "이름/담임","납부율","학생 수"],
    body:[
      [<Avatar status="new">초</Avatar>, ["초급 1-1", "박민창"], "88.89%", "9 명"],
      [<Avatar status="new">초</Avatar>, ["초급 1-2", "박민창"], "80.00%", "8 명"],
      [<Avatar>초</Avatar>, ["초급 1-1", "이재석"], "75.00%", "6 명"],
      [<Avatar>초</Avatar>, ["초급 1-2", "이재석"], "71.43%", "7 명"],
      [<Avatar status="new">중</Avatar>, ["중급 1-1", "박민창"], "88.89%", "9 명"],
      [<Avatar>중</Avatar>, ["중급 1-2", "박민창"], "80.00%", "8 명"],
      [<Avatar status="new">중</Avatar>, ["중급 1-1", "이재석"], "75.00%", "6 명"],
      [<Avatar status="new">중</Avatar>, ["중급 1-2", "이재석"], "71.43%", "7 명"],
      [<Avatar status="new">고</Avatar>, ["고급 1-1", "박민창"], "88.89%", "9 명"],
      [<Avatar>고</Avatar>, ["고급 1-2", "박민창"], "80.00%", "8 명"],
      [<Avatar status="new">고</Avatar>, ["고급 1-1", "이재석"], "75.00%", "6 명"],
      [<Avatar status="new">고</Avatar>, ["고급 1-2", "이재석"], "71.43%", "7 명"],
    ],
  },
  {
    className:["center fixed-80", "flex start double", "center fixed-50", "center fixed-50"],
    header:["프사", "이름/번호","납부","자세히"],
    body:[
      [<Avatar status="new">초</Avatar>, ["Juan Camilo Montegro Real", "20197513"], <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">초</Avatar>, ["Valentina Dueñas Cascabel", "20197513"], <IconBox icon={<RadioButtonUncheckedIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="">초</Avatar>, ["María Alejandra Yepes", "20197513"], <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="">초</Avatar>, ["Clemente Chavarria", "20197513"], <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="">초</Avatar>, ["Clemente Chavarria", "20197513"], <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">초</Avatar>, ["Clemente Chavarria", "20197513"], <IconBox icon={<RadioButtonUncheckedIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="">초</Avatar>, ["Clemente Chavarria", "20197513"], <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">초</Avatar>, ["Clemente Chavarria", "20197513"], <IconBox icon={<RadioButtonUncheckedIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">초</Avatar>, ["Clemente Chavarria", "20197513"], <IconBox icon={<RadioButtonUncheckedIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
    ],
  },
  {
    className:["center fixed-80", "flex start", "center fixed-80", "center fixed-50"],
    header:["프사", "이름"," 수업 배정","자세히"],
    body:[
      [<Avatar status="new">초</Avatar>, "박민창", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">초</Avatar>, "이재석", <IconBox icon={<RadioButtonUncheckedIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">중</Avatar>, "박민창", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">중</Avatar>, "이재석", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">고</Avatar>, "박민창", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
      [<Avatar status="new">고</Avatar>, "이재석", <IconBox icon={<CheckCircleOutlineIcon/>} />, <IconBox icon={<MoreHorizIcon/>} />],
    ],
  }
] 

// Content Banner Props
const bannerTabNames = ["2021-6","2021-5", "more"]
const bannerTabLabels = ["2021-6","2021-5","더 보기"]
const bannerTabItems = bannerTabNames.map((name,index)=>{
    const label = bannerTabLabels[index]
      return({label, name, key:index})
  })
const names = ["담임","학생","납부현황"]

// Content Banner Course Data
const bannerCourseData = {
  title: "초급 1-1",
  main:{
    start:{
      names: ["학생","납부현황"],
      labels: ["38명","71%"],
      progress: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]
      // progress: [1,1,1,0,0]
    },
    end: "CHART"
  },
  more:{
    start: [
      {names, labels: ["박민창","9명","56%"], progress: [1,1,1,1,1,0,0,0,0]},
      {names, labels: ["박민창","10명","90%"], progress: [1,1,1,1,1,1,1,1,1,0]},
      {names, labels: ["이재석","9명","78%"], progress: [1,1,1,1,1,1,1,0,0]},
      {names, labels: ["이재석","10명","80%"], progress: [1,1,1,1,1,1,1,1,0,0]},
    ],
    end: "CHART",
  }
}

const Database = (props) => {
  // GLOBAL - Show - hide CONTENT for mobile
  const [showContent, setShowContent] = useState(false)
  const toggleShowContent = () =>{
    setShowContent(!showContent)
  }
  
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
    (!!rowKey || rowKey === 0) && handleContentTabKey(0)
    setShowContent(true)
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
  const searchProps = {searchOptions, searchKey, onSearch:handleSearchKey}
  const siderTabProps = {
    items: siderTabItems,
    itemKey: siderTabKey,
    setItemKey: handleSiderTabKey,
  }
  const selectProps = [
    { value: period, onChange: handlePeriod, items: periodItems},
    { value: schedule, onChange: handleSchedule, items: scheduleItems},
  ]
  const siderTableTabProps = {
    items: siderTableTabItems(siderTabKey),
    itemKey: siderTableTabKey,
    setItemKey: handleSiderTableTabKey,
    ghost: true,
    variant: "outlined",
  }
  const siderTableProps = {...props, tabProps: siderTableTabProps, table: siderTable(siderTabKey,siderTableTabKey), tableRowKey:siderTableRowKey, setTableRowKey:handleSiderTableRowKey}
  const siderPaperTableProps = {
    title: siderPaperTitle[siderTabKey],
    subtitle: siderPaperSubtitle[siderTabKey],
    selectProps,
    tableProps: siderTableProps,
  }

  // CONTENT
  const showContentProps = {showContent, setShowContent, toggleShowContent}
  const bannerTabProps = {
    items: bannerTabItems,
    itemKey: bannerTabKey,
    setItemKey: handleBannerTabKey,
    ghost: true,
    variant: "contained",
  }
  const bannerProps = {tabProps: bannerTabProps, ...bannerCourseData}
  const contentTabProps = {
    items: contentTabItems,
    itemKey: contentTabKey,
    setItemKey: handleContentTabKey,
  }
  const contentTableTabProps = {
    items: contentTableTabItems(contentTabKey),
    itemKey: contentTableTabKey,
    setItemKey: handleContentTableTabKey,
    ghost: true,
    variant: "outlined"
  }
  const contentTableProps = {...props, tabProps: contentTableTabProps, table: contentTable[contentTabKey], tableRowKey:contentTableRowKey, setTableRowKey:handleContentTableRowKey}
  const contentPaperTableProps={
    title: contentPaperTitle[contentTabKey],
    subtitle: contentPaperSubtitle[contentTabKey],
    selectProps,
    tableProps: contentTableProps,
  }
  
  // TOTAL PROPS
  const databaseSiderProps = {...props, searchProps, siderTabProps, siderPaperTableProps}
  const databaseContentProps = {...props, bannerProps, contentTabProps, showContentProps, contentPaperTableProps}
  return (
    <>
    <DatabaseSider {...databaseSiderProps} />
    <DatabaseContent {...databaseContentProps} />
    </>
  )
}

export default Database
