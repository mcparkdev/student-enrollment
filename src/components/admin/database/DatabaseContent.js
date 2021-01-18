import React from 'react'
import Content from "../../generic/layout/content/Content"

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Route, Switch } from 'react-router-dom'
import Courses from './courses/Courses'
import Students from './students/Students'

const DatabaseContent = (props) => {
  const {showContentProps, viewport} = props
  const {isMobile} = viewport
  const {showContent, toggleShowContent} = showContentProps
  const show = isMobile ? showContent : true
  return (
    <Content className="database" show={show}>
      <div className="content-content" styles={{display: (isMobile && !showContent) ? "none" : "flex"}}>
        {isMobile &&
        <div className="content-actions">
          <IconButton aria-label="back" onClick={()=>props.router.history.goBack()}><ArrowBackIcon fontSize="large"/></IconButton>
          <IconButton aria-label="close" onClick={toggleShowContent} ><CloseIcon fontSize="large" /></IconButton>
        </div>
        }
        <Switch>
          <Route path={`/database/courses/:courseID`} render={router => <Courses {...props} coursesRouter={router}/>} />
          <Route path={`/database/students/:studentID`} render={router => <Students {...props} studentsRouter={router}/>} />
        </Switch>
        {/* <Banner {...props} {...bannerProps}/>
        <Tabs {...contentTabProps} />
        <PaperTable {...contentPaperTableProps} /> */}
      </div>
    </Content>
  )
}

export default DatabaseContent
