import React from 'react'
import "./banner.scss"
import BannerCourse from './bannerCourse/BannerCourse'


const BannerTwo = (props) => {
  return (
    <div className="banner-2">
      Banner 2
    </div>
  )
}
const BannerThree = (props) => {
  return (
    <div className="banner-3">
      Banner 3
    </div>
  )
}

const Banner = (props) => {
  const type = props.type
  return (
    <>
      {(!type || type === "course") 
      ? <BannerCourse {...props}></BannerCourse>
      : (type === 2
        ?<BannerTwo {...props}></BannerTwo>
        :<BannerThree {...props}></BannerThree>
        )
      }
    </>
  )
}

export default Banner
