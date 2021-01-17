import React from 'react'
import "./progress.scss"

export const BannerProgress = (props) => {
  const {items, label} = props
  // console.log(props)
  return (
    <div className="banner-progress">
      {!!label &&
        <div className="banner-progress-label">
          {label}
        </div>
      }
      {!!items &&
        <div className="bar-container">
          {items.map(item => {
            const status = item === 1 ? "checked" : "unchecked"
            return(
              <div key={`${status}-${Math.round(Math.random()*1000000)}`} className={`bar ${status}`}/>
            )
          })}
        </div>
      }
    </div>
  )
}

const Progress = (props) => {
  return (
    <div className="progress">
      Progress
    </div>
  )
}

export default Progress
