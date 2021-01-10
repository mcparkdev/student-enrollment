import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import SubContent from "../../generic1/subcontent/SubContent"
import SubContentEnd from '../../generic1/subcontent/SubContentEnd'
import Data from './data/Data'
// import { Route, Switch } from 'react-router-dom'
import "./profile.scss"

const Profile = (props) => {
  return (
    <>
      {(props.router.location.pathname === "/profile" || props.router.location.pathname === "/profile/data") && 
        <Redirect to="/profile/data/personal" />
      }
      <SubContent>
        <SubContentEnd>
          <Switch>
            <Route
              path="/profile/data"
              render={({ match, history, location }) => {
                const allProps = {...props, match, history, location}
                return (<Data {...allProps}/>)
              }}
            />
          </Switch>
        </SubContentEnd>
      </SubContent>
    </>
  )
}

export default Profile
