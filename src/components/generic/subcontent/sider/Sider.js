import React from 'react'

import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SubContentSider = (props) => {
  const{header, viewport, isSiderOpen, handleIsSiderOpen} = props
  const {xs, sm} = viewport
  return (
    <>
    {!xs && !sm
    ?
      <div className="subcontent-sider">
        <div className="subcontent-sider-header">
          {header}
        </div>
        {props.children}
      </div>
    : 
    <Dialog fullScreen open={isSiderOpen} onClose={handleIsSiderOpen} TransitionComponent={Transition}>
      <div className="subcontent-sider">
        <div className="subcontent-sider-back">
          <IconButton onClick={handleIsSiderOpen} aria-label="close-sider">
            <ArrowBackIcon/>
          </IconButton>
        </div>
        {props.children}
      </div>
    </Dialog>
    }
    </>
  )
}

export default SubContentSider
