import React from 'react'

const ImageBox = (props) => {
  const {image, boxSize, imageSize, style} = props
  const styleProps = style ? { ...style, } : {}
  const defaultBoxSize = 40
  const defaultImageSize = 32
  return (
    <div className="imageBox" style={{...styleProps, width: boxSize ? boxSize : defaultBoxSize}} >
      <img src={image} style={{width: boxSize ? (imageSize ? imageSize : boxSize) : defaultImageSize}} alt="logo"/>
    </div>
  )
}

export default ImageBox
