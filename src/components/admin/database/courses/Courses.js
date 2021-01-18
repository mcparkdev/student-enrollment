import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BannerCourses from "../../../generic/dataDisplay/banner/bannerCourses/BannerCourses"
import Tabs from "../../../generic/navigation/tabs/Tabs"
import CoursesStudents from './CoursesStudents'
import CoursesInformation from './CoursesInformation'
import CoursesSettings from './CoursesSettings'

// Content Banner Props
const bannerTabNames = ["2021-1","2020-4", "more"]
const bannerTabLabels = ["2021-1","2020-4","더 보기"]
const bannerTabItems = bannerTabNames.map((name,index)=>{
    const label = bannerTabLabels[index]
      return({label, name, key:index})
  })

  // Content Banner Course Data
const bannerCoursesNames = ["담임","학생","납부현황"]

// Course tabs
const coursesTabNames = ["students", "generalInformation", "settings"]
const coursesTabLabels = ["학생", "기본 정보", "설정"]
// const toItemProps = (names, labels) => {
//   return names.map((name, index)=>{
//     const label = labels[index]
//     return {name, label}
//   })
// }
const bannerMoreContentStart = () => {
  const namesList = [bannerCoursesNames, bannerCoursesNames, bannerCoursesNames, bannerCoursesNames]
  const labelsList = [["박민창","9명","56%"], ["박민창","10명","90%"],["이재석","9명","78%"],["이재석","10명","80%"], ]
  const progressList = [[1,1,1,1,1,0,0,0,0], [1,1,1,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,0,0], [1,1,1,1,1,1,1,1,0,0]]
  return namesList.map((names,index) => {
    const labels = labelsList[index]
    const progress = progressList[index]
    return {
      container: {
        items:names.map((name,index2) => {
          const label = labels[index2]
          return {name, label, progress}
      })},
      progress: {
        items: progress
      },
    }
  })
}

const Courses = (props) => {
  const {bannerTabKey, handleBannerTabKey, courseLabels, contentTabKey, handleContentTabKey} = props
  const currentCourseID = props.coursesRouter.match.params.courseID
  const currentCourseName = courseLabels[currentCourseID]
  const bannerCoursesData = {
    title: currentCourseName,
    main:{
      start:{
        container: {
          items:[
            {name: "학생", label: "38명", main: true},
            {name: "납부현황", label: "71%", main: true}
          ]},
        progress: {
          items: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
        }
      },
      end: "CHART"
    },
    more:{
      start: bannerMoreContentStart(),
      end: "CHART",
    }
  }
  const bannerTabProps = {
    items: bannerTabItems,
    itemKey: bannerTabKey,
    setItemKey: handleBannerTabKey,
    ghost: true,
    variant: "contained",
  }
  const bannerProps = {tabProps: bannerTabProps, ...bannerCoursesData}
  const coursesTabItems = coursesTabNames.map((name,index)=>{
    const label = coursesTabLabels[index]
    return({label, name, link: `/database/courses/${currentCourseID}/${name}` , key:index})
  })
  const coursesTabProps = {
    items: coursesTabItems,
    itemKey: contentTabKey,
    setItemKey: handleContentTabKey,
    link:true,
  }
  // console.log(courseTabProps)
  return (
    <>
      <BannerCourses {...props} {...bannerProps}/>
      <Tabs {...coursesTabProps} />
      <Switch>
        <Route path={`/database/courses/:courseID/${coursesTabNames[0]}`} render={router => <CoursesStudents {...props} router={router}/>} />
        <Route path={`/database/courses/:courseID/${coursesTabNames[1]}`} render={router => <CoursesInformation {...props} router={router}/>} />
        <Route path={`/database/courses/:courseID/${coursesTabNames[2]}`} render={router => <CoursesSettings {...props} router={router}/>} />
        <Redirect to={`/database/courses/:courseID/${coursesTabNames[0]}`}/>
      </Switch>
    </>
  )
}

export default Courses
