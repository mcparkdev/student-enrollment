import React, {useState,useEffect, memo} from 'react'

import Form from "./form/Form"
import Skeleton from '@material-ui/lab/Skeleton';
import 'moment/locale/es'
import colombiaData from "./colombia.json"

import Header from '../../../generic/subcontent/header/Header';
import Body from '../../../generic/subcontent/body/Body';

function ResidentialData(props) {
  // The configuration for residentialData's form
  const names = ["department", "city", "address", "phoneNumber", "telephone"]
  const labels = ["Departamento", "Ciudad", "Dirección", "Número móvil", "Número fijo"]
  const types = ["select", "select", "text", "number", "number"]

  const required = [true, true, true, true, false, false]

  const colombia = (type, department) =>{
    const departmentList = []
    const cityList = []
    const cityKeys = {}
    colombiaData.map(dep=>{
      const {departamento} = dep
      departmentList.push({name:departamento, label: departamento})
      cityKeys[departamento] = dep.id
      return null;
    })
    
    const cities = (department !== "" && department !== undefined) ? colombiaData[cityKeys[department]].ciudades : []
    cities.map(currentCity=>{
      cityList.push({name:currentCity, label: currentCity})
      return null;
    }) 
    return type === "city" ? cityList : departmentList
  }

  const options = {
    department: colombia("department"), 
    city: []
  }

  // const body = {
  //   body: {
  //     subtitle: "Actualizado el 14.10.2020",
  //     title: "Datos residenciales",
  //   }
  // }

  const {studentsDocument} = props
  const [loading, setLoading] = useState(true)
  const [storedData, setStoredData] = useState({})

  const collection = "data"
  const document = "residential"
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
            setLoading(false)
          }
        })
        .catch(err => console.log(err))
    }
  }
  // ,[studentsDocument, loading, setLoading, setStoredData, documentToUpdate]
  )

  const inputProps = {names, labels, types, options, required, colombia}
  const formProps = {storedData, setStoredData, loading, setLoading, documentToUpdate, collection, document}

  const {createdAt, updatedAt} = storedData
  const lastUpdate = !!createdAt ? (!!updatedAt ? new Date(updatedAt.seconds * 1000) : new Date(createdAt.seconds * 1000)) : "Sin datos"

  return (
    <>
      <Header
        info={`Última actualización: ${lastUpdate === "Sin datos" ? lastUpdate : lastUpdate.toLocaleString("es-CO",{weekday:"long", day:"2-digit", month:"long", year:"numeric", hour:"2-digit",minute:"2-digit", second:"2-digit" })}`}
        title="Datos residenciales"
        subtitle="Haga clic en editar para actualizar los datos"
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

export default memo(ResidentialData)
