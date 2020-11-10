import React, {useState,useEffect, memo} from 'react'

import Form from "./form/Form"
import Skeleton from '@material-ui/lab/Skeleton';
import 'moment/locale/es'

import Header from '../../../generic/subcontent/header/Header';
import Body from '../../../generic/subcontent/body/Body';

function ResponsibleData(props) {
  // The configuration for responsibleData's form
  const names = ["gFirstName", "gLastName", "gRelationship", "gMobile", "gAddress", "gEmail"]
  const labels = ["Nombres", "Apellidos", "Relación", "Número móvil", "Dirección de residencia", "Correo electrónico"]
  const types = ["text", "text", "select", "number", "text", "email"]
  const required = [true, true, true, true, false, false]
  const options = {
    gRelationship:[
      {name:"mother", label: "Madre"},
      {name:"father", label: "Padre"},
      {name:"sibling", label: "Hermano(a)"},
      {name:"partner", label: "Pareja"},
      {name:"aunt/uncle", label: "Tío(a)"},
      {name:"cousin", label: "Primo(a)"},
      {name:"other", label: "Otro"},
    ], 
  }

  // const body = {
  //   body: {
  //     subtitle: "Actualizado el 14.10.2020",
  //     title: "Datos del responsable",
  //   }
  // }

  const {studentsDocument} = props
  const [loading, setLoading] = useState(true)
  const [storedData, setStoredData] = useState({})

  const collection = "data"
  const document = "responsible"
  const documentToUpdate = studentsDocument.collection(collection).doc(document)

  useEffect(()=>{
    if(loading){
      documentToUpdate.get()
        .then(doc =>{
          console.log(doc.data())
          if(doc.exists){
            // birthDate from fireStore is retrieved as a timestamp. Conversion to Date format required
            if (doc.data().birthDate !== undefined){
              setStoredData({...doc.data(), birthDate: new Date(doc.data().birthDate.seconds * 1000)})
            }
            else{
              setStoredData({...doc.data()});
            }
            console.log()
            setLoading(false)
          }
        })
        .catch(err => console.log(err))
    }
  }
  // ,[studentsDocument,loading, setLoading, setStoredData, documentToUpdate]
  )
  
  // The props of this form's customized props
  const inputProps = {names, labels, types, options, required}
  const formProps = {storedData, setStoredData, loading, setLoading, documentToUpdate, collection, document}

  const {createdAt, updatedAt} = storedData
  const lastUpdate = !!createdAt ? (!!updatedAt ? new Date(updatedAt.seconds * 1000) : new Date(createdAt.seconds * 1000)) : "Sin datos"

  return (
    <>
      <Header
        info={`Última actualización: ${lastUpdate === "Sin datos" ? lastUpdate : lastUpdate.toLocaleString("es-CO",{weekday:"long", day:"2-digit", month:"long", year:"numeric", hour:"2-digit",minute:"2-digit", second:"2-digit" })}`}
        title="Datos del responsable"
        subtitle="Haga clic en editar para actualizar los datos"
        annecdote="**Estos datos solo se usarán como contacto de emergencia"
      />
      <Body>
        { loading 
          ?
          <ul className="form-input">
            {names.map((name)=>(
            <Skeleton key={`${name}-skeleton`} width={"100%"} height={72} />
            ))}
          </ul>
          :
          <Form {...props} {...inputProps} {...formProps}/>
        }
      </Body>
    </>
  )
}

export default memo(ResponsibleData)