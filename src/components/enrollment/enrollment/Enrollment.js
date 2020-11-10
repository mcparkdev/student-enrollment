import React, {useState, useEffect} from 'react'

import "./enrollment.scss"
import { Route, Switch, Redirect } from 'react-router-dom'
import Application from './application/Application'
import ConfirmPayment from './application/confirmPayment/ConfirmPayment'
// import PersonalData from "./PersonalData"
// import ResponsibleData from './ResponsibleData'
// import ResidentialData from './ResidentialData'
// import AdevecoData from "./AdevecoData"
// import PaymentData from './PaymentData'

export default function Enrollment(props) {
  const names = ["period", "courseType", "courseName", "courseLevel"]
  const labels = ["Periodo", "Modalidad", "Nombre del curso", "Nivel del curso"]
  const instructions = ["Seleccion el periodo académico", "Seleccione la modalidad del curso", "Seleccione el nombre del curso", "Seleccione el nivel del curso"]
  const options = {
    period:[
      {name:"2020-4", label: "2020-4"},
      {name:"2020-3", label: "2020-3"},
    ], 
    courseType:[
      {name:"faceToFace", label:"1:00PM ~ 3:30 PM"},
      {name:"online", label:"4:00PM ~ 6:30 PM"},
    ],
    courseName:[
      {name:"beginner-1", label:"Básico 1"},
      {name:"beginner-2", label:"Básico 2"},
      {name:"intermediate-1", label:"Intermedio 1"},
      {name:"intermediate-2", label:"Intermedio 2"},
      {name:"advanced-1", label:"Avanzado 1"},
      {name:"advanced-2", label:"Avanzado 2"},
    ],
    courseLevel: [
      {name: "1", label: "1"},
      {name: "2", label: "2"},
      {name: "3", label: "3"},
    ]
  }
  const [dataIsValid, setDataIsValid] = useState({})

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
      {(props.router.location.pathname === "/enrollment") && 
        <Redirect to="/enrollment/application" />
      }
      <Switch>
        <Route
          exact
          path="/enrollment/application"
          render={({ match, history, location }) => {
            const allProps = {...props, match, history, location, dataIsValid}
            return (<Application {...allProps} />)
          }}
        />
        <Route
            exact
            path="/enrollment/application/confirmPayment"
            render={({ match, history, location }) => {
              const allProps = {...props, match, history, location, names, labels, instructions, options}
              return (<ConfirmPayment {...allProps} />)
            }}
          />
        {/* <Route
          exact
          path="/profile/data/responsible"
          render={({ match, history, location }) => {
            const allProps = {...props, match, history, location, dataIsValid, handleDataIsValid, profileTabKey}
            return (<ResponsibleData {...allProps}/>)
          }}
        /> */}
      </Switch>
    </>
    //   </ul>
    // </div>
  )

}
