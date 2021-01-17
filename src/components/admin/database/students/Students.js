import React from 'react'
import BannerStudents from "../../../generic//dataDisplay/banner/bannerStudents/BannerStudents"

const bannerTabNames = ["2021-1","2020-4", "more"]
const bannerTabLabels = ["2021-1","2020-4","더 보기"]
const bannerTabItems = bannerTabNames.map((name,index)=>{
    const label = bannerTabLabels[index]
      return({label, name, key:index})
  })

const Students = (props) => {
  const {bannerTabKey, handleBannerTabKey} = props
  const bannerTabProps = {
    items: bannerTabItems,
    itemKey: bannerTabKey,
    setItemKey: handleBannerTabKey,
    ghost: true,
    variant: "contained",
  }
  
  const bannerStudentsData = {
    title: "Clemente J. Chavarría",
    main: {
      start: [
        {name: "납부", label: "인증됨", main: true},
        {name: "시험점수", label: "0/0", main: true}
      ],
      center: {
        progressProps:{
          label: "출석률",
          items: [1,0,1,0,1,1,1,1]
        },  
      },
      end: [
        {name: "수업", label: "초급 1-1"},
        {name: "시간", label: "1부"},
        {name: "담임", label: "박민창"},
      ]
    }
  }
  const bannerProps = {tabProps: bannerTabProps, ...bannerStudentsData}
  return (
    <>
      <BannerStudents {...bannerProps} />
    </>
  )
}

export default Students
