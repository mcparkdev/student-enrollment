import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BannerCourse from "../../../generic/dataDisplay/banner/bannerCourse/BannerCourse"
import Tabs from "../../../generic/navigation/tabs/Tabs"
import CourseStudents from './CourseStudents'
import CourseInformation from './CourseInformation'
import CourseSettings from './CourseSettings'

// Content Banner Props
const bannerTabNames = ["2021-1","2020-4", "more"]
const bannerTabLabels = ["2021-1","2020-4","더 보기"]
const bannerTabItems = bannerTabNames.map((name,index)=>{
    const label = bannerTabLabels[index]
      return({label, name, key:index})
  })

  // Content Banner Course Data
const bannerCourseNames = ["담임","학생","납부현황"]

const courseTabNames = ["students", "generalInformation", "settings"]
const courseTabLabels = ["학생", "기본 정보", "설정"]


const Courses = (props) => {
  const {bannerTabKey, handleBannerTabKey, courseLabels, contentTabKey, handleContentTabKey} = props
  const currentCourseID = props.courseRouter.match.params.courseID
  const currentCourseName = courseLabels[currentCourseID]
  const bannerCourseData = {
    title: currentCourseName,
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
        {names:bannerCourseNames, labels: ["박민창","9명","56%"], progress: [1,1,1,1,1,0,0,0,0]},
        {names:bannerCourseNames, labels: ["박민창","10명","90%"], progress: [1,1,1,1,1,1,1,1,1,0]},
        {names:bannerCourseNames, labels: ["이재석","9명","78%"], progress: [1,1,1,1,1,1,1,0,0]},
        {names:bannerCourseNames, labels: ["이재석","10명","80%"], progress: [1,1,1,1,1,1,1,1,0,0]},
      ],
      end: "CHART",
    }
  }
  // console.log(currentCourse)
  const bannerTabProps = {
    items: bannerTabItems,
    itemKey: bannerTabKey,
    setItemKey: handleBannerTabKey,
    ghost: true,
    variant: "contained",
  }
  const bannerProps = {tabProps: bannerTabProps, ...bannerCourseData}
  const courseTabItems = courseTabNames.map((name,index)=>{
    const label = courseTabLabels[index]
    return({label, name, link: `/database/courses/${currentCourseID}/${name}` , key:index})
  })
  const courseTabProps = {
    items: courseTabItems,
    itemKey: contentTabKey,
    setItemKey: handleContentTabKey,
    link:true,
  }
  console.log(courseTabProps)
  return (
    <div>
      <BannerCourse {...props} {...bannerProps}/>
      <Tabs {...courseTabProps} />
      <Switch>
        <Route path={`/database/courses/:courseID/${courseTabNames[0]}`} render={router => <CourseStudents {...props} router={router}/>} />
        <Route path={`/database/courses/:courseID/${courseTabNames[1]}`} render={router => <CourseInformation {...props} router={router}/>} />
        <Route path={`/database/courses/:courseID/${courseTabNames[2]}`} render={router => <CourseSettings {...props} router={router}/>} />
        <Redirect to={`/database/courses/:courseID/${courseTabNames[0]}`}/>
      </Switch>
    </div>
  )
}

export default Courses
