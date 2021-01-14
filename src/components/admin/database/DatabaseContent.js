import React from 'react'
import Content from "../../generic/layout/content/Content"

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import { Route, Switch } from 'react-router-dom'
import Courses from './courses/Courses'


const DatabaseContent = (props) => {
  const {showContentProps, isMobile} = props
  
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
          <Route path={`/database/courses/:courseID`} render={router => <Courses {...props} courseRouter={router}/>} />
        </Switch>
        {/* <Banner {...props} {...bannerProps}/>
        <Tabs {...contentTabProps} />
        <PaperTable {...contentPaperTableProps} /> */}
      </div>
    </Content>
  )
}

export default DatabaseContent
