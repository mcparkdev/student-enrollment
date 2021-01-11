import React from 'react'
import { Route, Switch } from 'react-router-dom'
import "./home.scss"
import Announcements from './announcements/Announcements'
import Timeline from './timeline/Timeline'

export default function Home(props) {
  const {items, itemKey} = props
  const item = items[itemKey]
  const {subItems} = item
  
  return (
    <Switch>
      <Route
        path={`/home/${subItems[0].name}`}
        render={({ match, history, location }) => {
          const allProps = {...props, match, history, location}
          return (<Timeline {...allProps}/>)
        }}
      />
      <Route
        path={`/home/${subItems[1].name}`}
        render={({ match, history, location }) => {
          const allProps = {...props, match, history, location}
          return (<Announcements {...allProps}/>)
        }}
      />
    </Switch>
  )
}
