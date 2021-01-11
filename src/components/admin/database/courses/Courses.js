import React, {useState} from 'react'
import "./courses.scss"
import Paper from "../../../generic/paper/Paper"
import Select from "../../../generic/input/select/Select"
import Table from "../../../generic/dataDisplay/table/Table"
import Avatar from '../../../generic/dataDisplay/avatar/Avatar'

const Courses = (props) => {
  const {period, handlePeriod, periodItems, schedule, handleSchedule, scheduleItems}= props

  const tableTabNames = ["all", "beginner", "intermediate", "advanced"]
  const tableTabLabels = ["전체", "초급", "중급", "고급"]
  const tableTabItems = tableTabNames.map((name,index)=>{
    const label = tableTabLabels[index]
    return({label, name, link:`/database/courses/${name}`, key:index})
  })
  const [tableTabKey, setTableTabKey] = useState(0)
  const tableTabProps = {
    items: tableTabItems,
    itemKey: tableTabKey,
    setItemKey: setTableTabKey,
    ghost:true,
    variant:"outlined"
  }
  const [tableRowKey, setTableRowKey] = useState(null)
  const table = {
    className:["center fixed", "flex start double", "end", "end"],
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
  }
  console.log(tableRowKey)
  const tableProps = {...props, tabProps:tableTabProps, table, tableRowKey, setTableRowKey}
  return (
    <Paper>
      <div className="paper-title">수업</div>
      <div className="paper-subtitle">수업별로 원하는 정렬에 따라 볼 수 있습니다.</div>
      <div className="filters">
        <Select value={period} onChange={handlePeriod} items={periodItems} />
        <Select value={schedule} onChange={handleSchedule} items={scheduleItems}/>
      </div>
      <Table {...tableProps} />
    </Paper>
  )
}

export default Courses
