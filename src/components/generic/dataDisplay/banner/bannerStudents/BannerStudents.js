import React from 'react'
// import "../banner.scss"
import "./bannerStudents.scss"
import Tabs from '../../../navigation/tabs/Tabs'
import { BannerItemContainer } from '../../item/ItemContainer'
// import { BannerProgress } from "../../../feedback/progress/Progress"
import Avatar from "../../avatar/Avatar"
import Paper from '../../../paper/Paper'
// import Button from "@material-ui/core/Button"

const BannerStudents = (props) => {
  const {sider, content, viewport, isSemiMobile} = props
  const isDesktop = viewport.width > 1280 || isSemiMobile
  console.log(isDesktop)
  return (
    <Paper opacity={0.95} padding={"0"}>
      <div className="banner banner-students">
        <div className="banner-sider">
          <div className="banner-sider-profile">
            <BannerItemContainer {...sider.profile} />
          </div>
          <div className="banner-sider-actions">
            {sider.contact}
          </div>
        </div>
        <div className="banner-content">
          <div className="banner-header">
            <div className="banner-content-title">
              {content.header.title}
            </div>
            <div className="banner-tabs">
              <Tabs {...content.header.tabs}/>
            </div>
          </div>
          <div className="banner-content-body">
            <div className="banner-content-body-main">
              <div className="banner-content-body-main-course-name">
                <Avatar status="new">{content.body.main.courseName[0]}</Avatar>
                {content.body.main.courseName}
              </div>
              <div className="banner-content-body-main-course-details">
                <BannerItemContainer {...content.body.main} />
              </div>
            </div>
            <div className="banner-content-body-actions">
              {content.body.actions.map((action, index)=><React.Fragment key={`banner-student-actions-${index}`} >{action}</React.Fragment>)}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default BannerStudents
