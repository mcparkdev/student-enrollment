import React, {useState,useEffect, memo} from 'react'

import Form from "./form/Form"
import Skeleton from '@material-ui/lab/Skeleton';
import 'moment/locale/es'

import Header from '../../../generic1/subcontent/header/Header';
import Body from '../../../generic1/subcontent/body/Body';

function PaymentData(props) {
  // The configuration for responsibleData's form
  const names = ["bankingEntity", "paymentType", "payerName"]
  const labels = ["Entidad bancaria", "Tipo de pago", "Nombre de quien realiza la transacción"]
  const types = ["text", "select", "text"]
  const required = [true, true, true]
  const options = {
    paymentType:[
      {name:"wireTransfer", label: "Transferencia bancaria"},
      {name:"consignment", label: "Consignación en el sucursal bancario"},
    ], 
  }

  const {studentsDocument} = props
  const [loading, setLoading] = useState(true)
  const [storedData, setStoredData] = useState({})

  const collection = "data"
  const document = "payment"
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
  })
  
  // The props of this form's customized props
  const inputProps = {names, labels, types, options, required}
  const formProps = {storedData, setStoredData, loading, setLoading, documentToUpdate, collection, document}

  const {createdAt, updatedAt} = storedData
  const lastUpdate = !!createdAt ? (!!updatedAt ? new Date(updatedAt.seconds * 1000) : new Date(createdAt.seconds * 1000)) : "Sin datos"

  return (
    <>
      <Header
        info={`Última actualización: ${lastUpdate === "Sin datos" ? lastUpdate : lastUpdate.toLocaleString("es-CO",{weekday:"long", day:"2-digit", month:"long", year:"numeric", hour:"2-digit",minute:"2-digit", second:"2-digit" })}`}
        title="Configuración de pago"
        subtitle="Haga clic en editar para actualizar los datos"
        annecdote="**Estos datos son para confirmar el pago de la matrícula."
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

export default memo(PaymentData)