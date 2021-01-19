import React from 'react'
import MuiTooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

const Tooltip = (props) => {
  const tooltipProps = {interactive: true, arrow: true, placement: "top", enterTouchDelay: 50, ...props.tooltipProps}
  const {isIcon} = props
  console.log(!!isIcon)
  return (
    <MuiTooltip {...tooltipProps} >
      {!!isIcon 
      ?
        <IconButton {...props.iconButtonProps}>{props.children}</IconButton>
      :
        <Button {...props.buttonProps} >
          {props.children}
        </Button>
      }
    </MuiTooltip>
  )
}

export default Tooltip
