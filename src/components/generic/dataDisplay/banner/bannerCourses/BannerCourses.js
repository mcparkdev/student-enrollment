import React, {useState} from 'react'
import Tabs from '../../../navigation/tabs/Tabs'
import "./bannerCourses.scss"
import Button from '@material-ui/core/Button'
import {BannerItemContainer} from "../../item/ItemContainer"
import { BannerProgress } from '../../../feedback/progress/Progress'

const BannerCourses = (props) => {
  const {tabProps, title, main, more, viewport, isSemiMobile} = props
  const isDesktop = viewport.width > 1280 || isSemiMobile
  const [showMore, setShowMore] = useState(false)
  const handleShowMore = () => {
    setShowMore(!showMore)
  }
  const showMoreMsg = showMore ? "간략히" : "자세히"
  console.log(isDesktop)
  return (
    <div className="banner banner-courses">
      <div className="banner-header">
        <div className="banner-title">
          {title}
        </div>
        <div className="banner-tabs">
          <Tabs {...tabProps}/>
        </div>
      </div>
      <div className="banner-content">
        <div className="main-content">
          <div className="content-start">
            <div className="banner-container">
              <BannerItemContainer {...main.start.container}/>
              <BannerProgress {...main.start.progress}/>
            </div>
          </div>
          <div className="content-end">
            <div className="content-chart">
              {main.end}
            </div>
          </div>
        </div>
        <div className={`more-content ${showMore ? "" : "hidden"}`}>
          <div className="content-start">
              {showMore && more.start.map((moreItem,index)=>{
                const {container, progress} = moreItem
                return(
                  <div className="banner-container" key={`more-content ${index}`}>
                    <BannerItemContainer {...container}/>
                    <BannerProgress {...progress}/>
                  </div>
                )
              })}
            {isDesktop &&
              <div className="show-more-less">
                <Button onClick={handleShowMore} color="secondary">{showMoreMsg}</Button>
              </div>
            }
          </div>
          <div className="content-end">
            {showMore &&
              <div className="content-chart">
                {more.end}
              </div>
            }
            {!isDesktop &&
              <div className="show-more-less">
                <Button onClick={handleShowMore} color="secondary">{showMoreMsg}</Button>
              </div>
            }
          </div>
        </div>  
      </div>
    </div>
  )
}

export default BannerCourses
