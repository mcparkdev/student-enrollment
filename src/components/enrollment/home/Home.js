import React from 'react'
import { Route, Switch } from 'react-router-dom'
import "./home.scss"
import Announcements from './announcements/Announcements'
import AboutUs from "./aboutUs/AboutUs"
import Contact from './contact/Contact'

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
          return (<Announcements {...allProps}/>)
        }}
      />
      <Route
        path={`/home/${subItems[1].name}`}
        render={({ match, history, location }) => {
          const allProps = {...props, match, history, location}
          return (<AboutUs {...allProps} />)
        }}
      />
      <Route
        path={`/home/${subItems[2].name}`}
        render={({ match, history, location }) => {
          const allProps = {...props, match, history, location}
          return (<Contact {...allProps} />)
        }}
      />
    </Switch>
  )
}
