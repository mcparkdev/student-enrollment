import React from 'react'

// import { Route, Switch } from 'react-router-dom'
import "./management.scss"
import Data from "./data/Data"



export default function Management(props) {
  return (
    <>
      <Data {...props}/>
    </>
  )
}
