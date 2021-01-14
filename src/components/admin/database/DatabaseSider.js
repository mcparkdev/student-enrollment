import React from 'react'

import Sider from "../../generic/layout/sider/Sider"
import AutoComplete from "../../generic/input/autoComplete/AutoComplete"
import Tabs from '../../generic/navigation/tabs/Tabs'
import PaperTable from '../../generic/dataDisplay/table/PaperTable'

import Avatar from '../../generic/dataDisplay/avatar/Avatar'
import IconBox from "../../generic/iconBox/IconBox"
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
const courseNames = addLevels(["beginner","intermediate","advanced"])
const courseLabels = addLevels(["초급","중급","고급"])
const courseStatus = addTotalList([["new", "new", "", "", "", "new", ], ["new", "new", "new", "new", "", "",], ["new", "new", "", "", "", "new", ]])
const courseIDs = addTotalList([[0,1,2,3,4,5],[6,7,8,9,10,11],[12,13,14,15,16,17]])
// Temporary student names. Got to change to firebase stored data
const studentNames = ["Valentina Sofia Casadiego Reyes", "Min Chang Park", "Min Chang Park", "Min Seo Park", "Min Seo Park", "Min Seo Park","Min Gyu Park", "Min Gyu Park", "Min Gyu Park"]
const studentIDs = ["201631807", "201631807", "201631807", "202149352", "202149352", "202149352", "201439402", "201439402", "201439402"]
const studentCourses = [0, 0, 1, 1, 2, 2, 0, 1, 2]
const studentPayed = [true, true, true, false, false, true, true, true, true]
const studentStatus = ["new", "new", "", "new", "new", "", "new", "new", "new", ]


// Student data organized for tabling
const studentTable = ["total","beginner", "intermediate","advanced","unpayed"].map((tabName,index)=>{
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
      if (tabName === "unpayed") return !studentPayed[studentIndex] ? studentIndex : null
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
  ["전체", "초급", "중급", "고급", "미납"],
  ["전체", "초급", "중급", "고급", "?"],
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
    links: courseIDs[siderTableTabKey].map((name,index)=>{
      return `/database/courses/${name}`
    }),
    params:courseIDs[siderTableTabKey].map(name=>{
      return {courseID:name}
    }),
  }
  : ( siderTabKey === 1 
    ? {
      className:["center fixed-80", "flex start double", "center fixed-60", "center fixed-60"],
      header:["프사", "이름/번호","납부","자세히"],
      body: studentTable[siderTableTabKey],
      links: studentTable[siderTableTabKey].map((student)=>{
        const name = student[1][1]
        return `/database/students/${name}`
      }),
      params:studentTable[siderTableTabKey].map((student)=>{
        const name = student[1][1]
        return {id:name}
      }),
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



const DatabaseSider = (props) => {
  const {searchProps, period, schedule, handlePeriod, handleSchedule, periodItems, scheduleItems, handleSiderTableRowKey, handleSiderTableTabKey, handleSiderTabKey, siderTabKey, siderTableTabKey, siderTableRowKey} = props
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
  const siderTableProps = {...props, tabProps: siderTableTabProps, table: siderTable(siderTabKey,siderTableTabKey), tableRowKey:siderTableRowKey, handleTableRowKey:handleSiderTableRowKey}
  const siderPaperTableProps = {
    title: siderPaperTitle[siderTabKey],
    subtitle: siderPaperSubtitle[siderTabKey],
    selectProps,
    tableProps: siderTableProps,
  }

  return (
    <Sider className="database">
      <div className="sider-header">
        <div className="last-update">
          마지막 접속 : 2021년 1월 10일 오후 3:20
        </div>
        <AutoComplete {...searchProps} searchOptions={searchOptions} />
      </div>
      <div className="sider-content">
        <Tabs {...siderTabProps} />
        <PaperTable {...siderPaperTableProps}/>
      </div>
      <div className="sider-footer">
        <div className="primary">재콜롬비아한국학교</div>
        <div className="secondary">@2016-2021 Colegio Colombo Coreano</div>
      </div>
    </Sider>
  )
}

export default DatabaseSider
