import React from 'react'
import Tabs from '../../../navigation/tabs/Tabs'
import "./bannerCourse.scss"
import Button from '@material-ui/core/Button'
const BannerCourse = (props) => {
  const {tabProps, title, main, more} = props
  
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
            <div className="chart">
              {main.start.end}
            </div>
          </div>
        </div>
        <div className="more-content">
          <div className="content-start">
              {more.start.map((moreItem,index)=>{
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
            {/* <div className="banner-container">
              <div className="banner-item-container">
                <div className="banner-item">
                  <div className="name">담임</div>
                  <div className="label">박민창</div>
                </div>
                <div className="banner-item">
                  <div className="name">학생</div>
                  <div className="label">9명</div>
                </div>
                <div className="banner-item">
                  <div className="name">납부현황</div>
                  <div className="label">70%</div>
                </div>
              </div>
              <div className="banner-progress">
                <div className="bar-container">
                  {[1,1,1,1,1,1,1,0,0,0].map((item,index)=>{
                    const status = item === 1 ? "checked" : "unchecked"
                    return(
                      <div key={`${status}-${Math.random()}`} className={`bar ${status}`}/>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="banner-container">
              <div className="banner-item-container">
                <div className="banner-item">
                  <div className="name">담임</div>
                  <div className="label">박민창</div>
                </div>
                <div className="banner-item">
                  <div className="name">학생</div>
                  <div className="label">9명</div>
                </div>
                <div className="banner-item">
                  <div className="name">납부현황</div>
                  <div className="label">70%</div>
                </div>
              </div>
              <div className="banner-progress">
                <div className="bar-container">
                  {[1,1,1,1,1,1,1,0,0,0].map((item,index)=>{
                    const status = item === 1 ? "checked" : "unchecked"
                    return(
                      <div key={`${status}-${Math.random()}`} className={`bar ${status}`}/>
                    )
                  })}
                </div>
              </div>
            </div> */}
            <div className="show-more-less">
              <Button color="secondary">간략히</Button>
            </div>
          </div>
          <div className="content-end">
            <div className="chart">
              {more.end}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerCourse
