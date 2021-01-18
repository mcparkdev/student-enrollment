import React from 'react'
import ItemContainer from '../../../generic/dataDisplay/item/ItemContainer'
import Paper, {PaperTitle, PaperSubTitle} from "../../../generic/paper/Paper"

const CoursesSettings = (props) => {
  const courseGeneralInformationItemProps = [
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
      <PaperTitle>기본정보</PaperTitle>
      <PaperSubTitle>기본정를 수정 할 수 있습니다.</PaperSubTitle>
      <ItemContainer {...courseGeneralInformationItemProps[0]}/>
    </Paper>
    <Paper opacity={0.95}>
      <PaperTitle>교사</PaperTitle>
      <PaperSubTitle>교사 배치를 수정 할 수 있습니다.</PaperSubTitle>
      <ItemContainer {...courseGeneralInformationItemProps[1]}/>
    </Paper>
    </>
  )
}

export default CoursesSettings
