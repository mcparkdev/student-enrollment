import React, {useState} from 'react'
import Tabs from '../../../navigation/tabs/Tabs'
import "./bannerCourse.scss"
import Button from '@material-ui/core/Button'
const BannerCourse = (props) => {
  const {tabProps, title, main, more, viewport} = props
  const isDesktop = viewport.width > 1280
  const [showMore, setShowMore] = useState(false)
  const handleShowMore = () => {
    setShowMore(!showMore)
  }
  const showMoreMsg = showMore ? "간략히" : "자세히"
  console.log(props)
  return (
    <div className="banner banner-course">
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
              <div className="banner-item-container">
                {main.start.names.map((name, index)=>{
                  const label = main.start.labels[index]
                  return(
                  <div className="banner-item main" key={`banner-item main ${name}-${index}`}>
                    <div className="name">{name}</div>
                    <div className="label">{label}</div>
                  </div>
                  )
                })}
              </div>
              <div className="banner-progress">
                <div className="bar-container">
                  {main.start.progress.map((item,index)=>{
                    const status = item === 1 ? "checked" : "unchecked"
                    return(
                      <div key={`${status}-${Math.random()}`} className={`bar ${status}`}/>
                    )
                  })}
                </div>
              </div>
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
                const {names, labels, progress} = moreItem
                return(
                  <div className="banner-container" key={`more-content ${index}`}>
                    <div className="banner-item-container">
                      {names.map((name,itemIndex)=>{
                        const label = labels[itemIndex]
                        return(
                          <div className="banner-item" key={`banner-item ${name}-${index}`}>
                            <div className="name">{name}</div>
                            <div className="label">{label}</div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="banner-progress">
                      <div className="bar-container">
                        {progress.map(item=>{
                          const status = item === 1 ? "checked" : "unchecked"
                          return(
                            <div key={`${status}-${Math.random()}`} className={`bar ${status}`}/>
                          )
                        })}
                      </div>
                    </div>
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

export default BannerCourse
