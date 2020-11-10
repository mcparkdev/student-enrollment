import React, {useState, useEffect} from 'react'

import "./data.scss"
import { Route, Switch, NavLink } from 'react-router-dom'
import PersonalData from "./PersonalData"
import ResponsibleData from './ResponsibleData'
import ResidentialData from './ResidentialData'
import AdevecoData from "./AdevecoData"
import PaymentData from './PaymentData'

export default function Data(props) {
  const {items, itemKey, subItemKey} = props
  const item = items[itemKey]
  const {name, subItems} = item
  const subItem = subItems[subItemKey]
  const {tabs} = subItems[0]
  const [profileTabKey, setProfileTabKey] = useState(0)
  const [dataIsValid, setDataIsValid] = useState({})
  const handleDataIsValid = (key) => {
    setDataIsValid({...dataIsValid,[tabs[key].name]: true})
  }

  useEffect(()=>{
    props.db.collection('students').doc(props.currentUser.uid).get()
      .then(doc=>{
        if (doc.data()){
          setDataIsValid(doc.data().dataIsValid)
        }
      })
      .catch(err => console.log(err))
  },[props.currentUser.uid, props.db])

  return (
    <>
      <ul className="body-subcontent-tab-container">
        {tabs.map(tab => {
          const tabName = tab.name;
          const tabLabel = tab.label;
          const tabKey = tab.key;
          // console.log(tabKey, profileTabKey)
          const selected = tabKey === profileTabKey ? "selected" : ""
          // console.log(`/${name}/${subItem.name}/${tabName}`)
          return(
            <li className={`body-subcontent-tab ${selected}`} key={tabLabel}>
              <NavLink to={`/${name}/${subItem.name}/${tabName}`} onClick={() => setProfileTabKey(tabKey)} >
                <span className="body-subcontent-tab-label">
                  {tabLabel}
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
      <Switch>
        <Route
          exact
          path="/profile/data/personal"
          render={({ match, history, location }) => {
            const allProps = {...props, match, history, location, dataIsValid, handleDataIsValid, profileTabKey}
            return (<PersonalData {...allProps} />)
          }}
        />
        <Route
          exact
          path="/profile/data/responsible"
          render={({ match, history, location }) => {
            const allProps = {...props, match, history, location, dataIsValid, handleDataIsValid, profileTabKey}
            return (<ResponsibleData {...allProps}/>)
          }}
        />
        <Route
          exact
          path="/profile/data/residential"
          render={({ match, history, location }) => {
            const allProps = {...props, match, history, location, dataIsValid, handleDataIsValid, profileTabKey}
            return (<ResidentialData {...allProps}/>)
          }}
        />
        <Route
          exact
          path="/profile/data/adeveco"
          render={({ match, history, location }) => {
            const allProps = {...props, match, history, location, dataIsValid, handleDataIsValid, profileTabKey}
            return (<AdevecoData {...allProps}/>)
          }}
        />
        <Route
          exact
          path="/profile/data/payment"
          render={({ match, history, location }) => {
            const allProps = {...props, match, history, location, dataIsValid, handleDataIsValid, profileTabKey}
            return (<PaymentData {...allProps}/>)
          }}
        />
      </Switch>
    </>
    //   </ul>
    // </div>
  )

}
