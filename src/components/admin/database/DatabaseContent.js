import React from 'react'
import Content from "../../generic/layout/content/Content"

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import { Route, Switch } from 'react-router-dom'
import Courses from './courses/Courses'


// CONTENT
// Content Tabs
const contentTabNames = [["students", "generalInformation", "settings"],["currentInformation","generalInformation","History"],["currentInformation","generalInformation","History"]]
const contentTabLabels = [["학생", "기본 정보", "설정"],["현황","기본 정보", "기록"],["현황","기본 정보", "기록"]]
const contentTabItems = (siderTabKey) => (
  contentTabNames[siderTabKey].map((name,index)=>{
    const label = contentTabLabels[index]
    return({label, name, key:index})
  })
)

const DatabaseContent = (props) => {
  const {siderTableLastSelectedRow, showContentProps, contentTabKey, handleContentTabKey, isMobile} = props
  const {siderTabKey} = siderTableLastSelectedRow
  const contentTabProps = {
    items: contentTabItems(siderTabKey),
    itemKey: contentTabKey,
    setItemKey: handleContentTabKey,
  }
  const courseProps = {courseTabProps: contentTabProps, ...props}
  // console.log(contentPaperTableProps)
  
  const {showContent, toggleShowContent} = showContentProps
  const show = isMobile ? showContent : true
  return (
    <Content className="database" show={show}>
      <div className="content-content" styles={{display: (isMobile && !showContent) ? "none" : "flex"}}>
        {isMobile &&
        <div className="content-close">
          <IconButton aria-label="close" onClick={toggleShowContent} ><CloseIcon fontSize="large" /></IconButton>
        </div>
        }
        <Switch>
          <Route path="/database/courses"><Courses {...courseProps}/></Route>
        </Switch>
        {/* <Banner {...props} {...bannerProps}/>
        <Tabs {...contentTabProps} />
        <PaperTable {...contentPaperTableProps} /> */}
      </div>
    </Content>
  )
}

export default DatabaseContent
