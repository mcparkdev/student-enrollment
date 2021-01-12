import React from 'react'
import Content from "../../generic/layout/content/Content"
import Banner from '../../generic/dataDisplay/banner/Banner'
import Tabs from '../../generic/navigation/tabs/Tabs'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
// import PaperTable from '../../generic/dataDisplay/table/PaperTable'

const DatabaseContent = (props) => {
  const {bannerProps, contentTabProps, isMobile, showContentProps} = props
  const {showContent, toggleShowContent} = showContentProps
  const show = isMobile ? showContent : true
  return (
    <Content className="database" show={show}>
      <div className="content-content" styles={{display: (isMobile && !showContent) ? "none" : "flex"}}>
        {isMobile &&
        <div className="content-close">
          <IconButton aria-label="close" onClick={toggleShowContent} ><CloseIcon fontSize="large" /></IconButton>
        </div>
        }
        <Banner {...props} {...bannerProps}/>
        <Tabs {...contentTabProps} />
        {/* <PaperTable {...contentPaperTableProps} /> */}
      </div>
    </Content>
  )
}

export default DatabaseContent
