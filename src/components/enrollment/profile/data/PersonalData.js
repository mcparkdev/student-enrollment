import React, {useState,useEffect, memo} from 'react'

import Form from "./form/Form"
// import Item from '../../../section/item/Item';
import Skeleton from '@material-ui/lab/Skeleton';
import colombiaData from "./colombia.json"
import 'moment/locale/es'

import Header from '../../../generic1/subcontent/header/Header';
import Body from '../../../generic1/subcontent/body/Body';

function PersonalData(props) {
  
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
  // The configuration for personalData's form
  const names = ["firstName", "lastName", "birthDate", "gender", "nationality","documentType","documentNumber","documentDepartment", "documentCity", "email"]
  const labels = ["Nombres", "Apellidos", "Fecha de nacimiento", "Género", "Nacionalidad", "Tipo de documento", "Número de documento", "(Departamento) Lugar de exp. de documento", "(Ciudad) Lugar de exp. de documento", "Correo electrónico"]
  const types = ["text", "text", "date", "select", "select", "select", "number", "select", "select", "email"]
  const required = [true, true, true, true, true, true, true, true, true, true]
  const options = {
    gender:[
      {name:"male", label: "Hombre"},
      {name:"female", label: "Mujer"},
    ], 
    nationality:[
      {name:"Colombia", label:"Colombia"},
      {name:"Korea", label:"Corea"},
    ],
    documentType:[
      {name:"TI", label:"T.I. (Tarjeta de identidad)"},
      {name:"CC", label:"C.C. (Cédula de ciudadanía)"},
      {name:"CE", label:"C.E. (Cédula de extranjería)"},
      {name:"PA", label:"P.A. (Pasaporte)"},
    ],
    documentDepartment: colombia("deparment"),
    documentCity: [],
  }
  
  const {studentsDocument} = props
  const [loading, setLoading] = useState(true)
  const [storedData, setStoredData] = useState({})

  const collection = "data"
  const document = "personal"
  const documentToUpdate = studentsDocument.collection(collection).doc(document)

  useEffect(()=>{
    if(loading){
      documentToUpdate.get()
        .then(doc =>{
          // console.log(doc.data())
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
  // [studentsDocument,loading, setLoading, setStoredData, documentToUpdate, handleDataIsValid, names, required]
  )

  // The props of this form's customized props
  const inputProps = {names, labels, types, options, required, colombia}
  const formProps = {storedData, setStoredData, loading, setLoading, documentToUpdate, collection, document}
  // console.log(storedData)
  const {createdAt, updatedAt} = storedData
  const lastUpdate = !!createdAt ? (!!updatedAt ? new Date(updatedAt.seconds * 1000) : new Date(createdAt.seconds * 1000)) : "Sin datos"
  return (
    <>
      <Header
        info={`Última actualización: ${lastUpdate === "Sin datos" ? lastUpdate : lastUpdate.toLocaleString("es-CO",{weekday:"long", day:"2-digit", month:"long", year:"numeric", hour:"2-digit",minute:"2-digit", second:"2-digit" })}`}
        title="Datos personales"
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

export default memo(PersonalData)