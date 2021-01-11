import React from 'react'
import "./settings.scss"
import Button from "@material-ui/core/Button"
import Sider from '../../generic/layout/sider/Sider'

const Settings = (props) => {
  const {auth} = props
  return (
    <Sider>
      설정
      <Button variant="contained" color="primary" onClick={()=>auth.signOut()}>로그아웃</Button>
    </Sider>
  )
}

export default Settings
