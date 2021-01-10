import React from 'react'

const Banner = (props) => {
  const {banner, thumbnail,background} = props
  const bannerProps = thumbnail === true 
  ? {
    height: 300,
    background: background !== undefined ? background : "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    objectPosition: "0% 0%"
  } 
  : {
    width: props.viewport.xs ? "100%" : 600
  }
  return (
    <div className="body-subcontent-banner">
      <img src={banner} alt="banner" style={{ objectFit: "cover", ...bannerProps}}/>
    </div>
  )
}

export default Banner
