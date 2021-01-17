import React from 'react'
// import "../banner.scss"
import "./bannerStudents.scss"
import Tabs from '../../../navigation/tabs/Tabs'
import logo from "../../../../../media/logo.png"
import { BannerItemContainer } from '../../item/ItemContainer'
import { BannerProgress } from "../../../feedback/progress/Progress"

const BannerStudents = (props) => {
  const {tabProps, main} = props
  console.log(main)
  return (
    <div className="banner banner-students">
      <div className="banner-profile-image">
        <img src={logo} aria-label="profile-image"/>
      </div>
      <div className="banner-header">
        <div className="banner-title">
          Min Chang Park
          {/* {title} */}
        </div>
        <div className="banner-tabs">
          <Tabs {...tabProps}/>
        </div>
      </div>
      <div className="banner-content">
        <div className="main-content">
          <div className="content-start">
            <BannerItemContainer items={main.start}/>
          </div>
          <div className="content-center">
            <BannerProgress {...main.center.progressProps}/>
          </div>
          <div className="content-end">
            <BannerItemContainer items={main.end}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerStudents
