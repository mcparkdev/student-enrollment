import React from 'react'
import ItemContainer from '../../../generic/dataDisplay/item/ItemContainer'
import Paper, {PaperTitle, PaperSubTitle} from "../../../generic/paper/Paper"

const CoursesInformation = (props) => {
  const coursesGeneralInformationItemProps = [
    {items:[
      {name: "시간표", label: "토요일 오후 1:00 ~ 오후 3:30"},
      {name: "수업 등록비", label: "$200,000"},
    ]},
    {items:[
      {name: "시간표", label: "토요일 오후 4:00 ~ 오후 6:30"},
      {name: "수업 등록비", label: "$200,000"},
    ]},
  ]
  return (
    <>
    <Paper opacity={0.95} marginBottom={20}>
      <PaperTitle>1부</PaperTitle>
      <PaperSubTitle>1부 수업 기본정를 확인 및 수정 할 수 있습니다.</PaperSubTitle>
      <ItemContainer {...coursesGeneralInformationItemProps[0]}/>
    </Paper>
    <Paper opacity={0.95}>
      <PaperTitle>2부</PaperTitle>
      <PaperSubTitle>2부 수업 기본정를 확인 및 수정 할 수 있습니다.</PaperSubTitle>
      <ItemContainer {...coursesGeneralInformationItemProps[1]}/>
    </Paper>
    </>
  )
}

export default CoursesInformation
