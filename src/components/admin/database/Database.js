import React, {useState} from 'react'
import "./database.scss"

import Sider from "../../generic/layout/sider/Sider"
import Content from "../../generic/layout/content/Content"
import AutoComplete from "../../generic/input/autoComplete/AutoComplete"
import Tabs from '../../generic/navigation/tabs/Tabs'
import Avatar from '../../generic/dataDisplay/avatar/Avatar'

import IconBox from "../../generic/iconBox/IconBox"
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Banner from '../../generic/dataDisplay/banner/Banner'
import PaperTable from '../../generic/dataDisplay/table/PaperTable'

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

const databaseTabNames = ["courses", "students", "staffs"]
const databaseTabLabels = ["수업", "학생", "교사"]
const databaseTabItems = databaseTabNames.map((name,index)=>{
  const label = databaseTabLabels[index]
  return({label, name, link:`/database/${name}` , key:index})
})

const contentTabNames = ["students", "generalInformation", "staffs"]
const contentTabLabels = ["학생", "기본 정보", "교사"]
const contentTabItems = contentTabNames.map((name,index)=>{
  const label = contentTabLabels[index]
  return({label, name, key:index})
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
const siderTableTabItems = (databaseTabKey) =>{
  return siderTableTabNames[databaseTabKey].map((name,index)=>{
    const label = siderTableTabLabels[databaseTabKey][index]
    return({label, name, link:`/database/${databaseTabNames[databaseTabKey]}/${name}`, key:index})
  })
} 
const siderPaperTitle = ["수업", "학생", "교사"]
const siderPaperSubtitle = [
  "수업별로 원하는 정렬에 따라 볼 수 있습니다.",
  "수업별로 원하는 정렬에 따라 볼 수 있습니다.",
  "수업별로 원하는 정렬에 따라 볼 수 있습니다."
]
const siderTable = [
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
const contentPaperTitle = ["학생", "기본 정보", "교사"]
const contentPaperSubtitle = [
  "수업 시간별로 관련 확생명단을 원하는 정렬에 따라 볼 수 있습니다.",
  "수업 기본정보",
  "수업 시간별로 관련 교사명단을 원하는 정렬에 따라 볼 수 있습니다.",
]
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

const bannerTabNames = ["2021-6","2021-5", "more"]
const bannerTabLabels = ["2021-6","2021-5","더 보기"]
const bannerTabItems = bannerTabNames.map((name,index)=>{
    const label = bannerTabLabels[index]
      return({label, name, key:index})
  })
const names = ["담임","학생","납부현황"]
const bannerCourseData = {
  title: "초급 1-1",
  main:{
    start:{
      names: ["학생","납부현황"],
      labels: ["납부현황","71%"],
      progress: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]
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
  // const [loading, setLoading] = useState(false)
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

  const [siderTableSelectedItem, setSiderTableSelectedItem] = useState("")
  const [contentTableSelectedItem, setContentTableSelectedItem] = useState("")
  const [databaseTabKey, setDatabaseTabKey] = useState(0)
  const [siderTableRowKey, setSiderTableRowKey] = useState(null)
  const [siderTableTabKey, setSiderTableTabKey] = useState(0)
  const [bannerTabKey, setBannerTabKey] = useState(0)
  const [contentTabKey, setContentTabKey] = useState(0)
  const [contentTableRowKey, setContentTableRowKey] = useState(null)
  const [contentTableTabKey, setContentTableTabKey] = useState(0)
  console.log(siderTableSelectedItem, contentTableSelectedItem)
  const handleContentTableRowKey = (rowKey) => {
    if (!!rowKey){
      const table = siderTable[databaseTabKey]
      const name = table.body[rowKey][2]
      const double = Array.isArray(name)
      setContentTableSelectedItem(double ? name[0] : name)
    }
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
  const handleSiderTableRowKey = (rowKey) => {
    if (!!rowKey){
      const table = siderTable[databaseTabKey]
      const name = table.body[rowKey][2]
      const double = Array.isArray(name)
      setSiderTableSelectedItem(double ? name[0] : name)
      handleContentTabKey(0)
    }
    setSiderTableRowKey(rowKey)
  }
  const handleSiderTableTabKey = (tabKey) =>{
    handleSiderTableRowKey(null)
    setSiderTableTabKey(tabKey)
  }
  const handleDatabaseTabKey = (tabKey) => {
    handleSiderTableTabKey(0)
    setDatabaseTabKey(tabKey)
  }
  const databaseTabProps = {
    items: databaseTabItems,
    itemKey: databaseTabKey,
    setItemKey: handleDatabaseTabKey,
  }
  const contentTabProps = {
    items: contentTabItems,
    itemKey: contentTabKey,
    setItemKey: handleContentTabKey,
  }
  const selectProps = [
    { value: period, onChange: handlePeriod, items: periodItems},
    { value: schedule, onChange: handleSchedule, items: scheduleItems},
  ]
  const siderTableTabProps = {
    items: siderTableTabItems(databaseTabKey),
    itemKey: siderTableTabKey,
    setItemKey: handleSiderTableTabKey,
    ghost: true,
    variant: "outlined",
  }
  const contentTableTabProps = {
    items: contentTableTabItems(contentTabKey),
    itemKey: contentTableTabKey,
    setItemKey: handleContentTabKey,
    ghost: true,
    variant: "outlined"
  }
  const searchProps = {searchOptions, searchKey, onSearch:handleSearchKey}
  const siderTableProps = {...props, tabProps: siderTableTabProps, table: siderTable[databaseTabKey], tableRowKey:siderTableRowKey, setTableRowKey:handleSiderTableRowKey}
  const contentTableProps = {...props, tabProps: contentTableTabProps, table: contentTable[contentTabKey], tableRowKey:contentTableRowKey, setTableRowKey:handleContentTableRowKey}
  const siderPaperTableProps={
    title: siderPaperTitle[databaseTabKey],
    subtitle: siderPaperSubtitle[databaseTabKey],
    selectProps,
    tableProps: siderTableProps,
  }
  const contentPaperTableProps={
    title: contentPaperTitle[contentTabKey],
    subtitle: contentPaperSubtitle[contentTabKey],
    selectProps,
    tableProps: contentTableProps,
  }

  const bannerTabProps = {
    items: bannerTabItems,
    itemKey: bannerTabKey,
    setItemKey: handleBannerTabKey,
    ghost: true,
    variant: "contained",
  }
  const bannerProps = {tabProps: bannerTabProps, ...bannerCourseData}
  // const currentPath = props.router.location.pathname
  return (
    <>
    <Sider className="database">
      <div className="sider-header">
        <div className="last-update">
          마지막 접속 : 2021년 1월 10일 오후 3:20
        </div>
        <AutoComplete {...searchProps} />
      </div>
      <div className="sider-content">
        <Tabs {...databaseTabProps} />
        <PaperTable {...siderPaperTableProps}/>
      </div>
      <div className="sider-footer">
        <div className="primary">재콜롬비아한국학교</div>
        <div className="secondary">@2016-2021 Colegio Colombo Coreano</div>
      </div>
    </Sider>
    <Content className="database">
      <Banner {...bannerProps}/>
      <Tabs {...contentTabProps} />
      <PaperTable {...contentPaperTableProps} />
    </Content>
    </>
  )
}

export default Database
