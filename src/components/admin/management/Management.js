import React from 'react'

import { Route, Switch } from 'react-router-dom'
import "./management.scss"
import Home from './home/Home'
import Data from "./data/Data"
import Finance from "./finance/Finance"
import Announcements from "./announcements/Announcements"


export default function Management(props) {
  const {items, itemKey} = props
  const item = items[itemKey]
  const {subItems} = item
  
  return (
    <Switch>
      <Route
        path={`/management/${subItems[0].name}`}
        render={({ match, history, location }) => {
          const allProps = {...props, match, history, location}
          return (<Home {...allProps}/>)
        }}
      />
      <Route
        path={`/management/${subItems[1].name}`}
        render={({ match, history, location }) => {
          const allProps = {...props, match, history, location}
          return (<Data {...allProps}/>)
        }}
      />
      <Route
        path={`/management/${subItems[2].name}`}
        render={({ match, history, location }) => {
          const allProps = {...props, match, history, location}
          return (<Finance {...allProps}/>)
        }}
      />
      <Route
        path={`/management/${subItems[3].name}`}
        render={({ match, history, location }) => {
          const allProps = {...props, match, history, location}
          return (<Announcements {...allProps}/>)
        }}
      />      
    </Switch>
  )
}
