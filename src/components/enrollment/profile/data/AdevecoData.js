import React, {useState,useEffect, memo} from 'react'

import Form from "./form/Form"
import Skeleton from '@material-ui/lab/Skeleton';
import 'moment/locale/es'
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import Header from '../../../generic1/subcontent/header/Header';
import Body from '../../../generic1/subcontent/body/Body';
import Footer from '../../../generic1/subcontent/footer/Footer';

function AdevecoData(props) {
  const names = ["member", "adevecoCertificateUrl"]
  const labels = ["Soy miembro ADEVECO", "Certificado de afiliación ADEVECO"]
  const types = ["checkbox", "file"]
  const required = [true, true]
  // const body = {
  //   body: {
  //     subtitle: "Actualizado el 14.10.2020",
  //     title: "Datos de miembro ADEVECO",
  //   }
  // }
  
  const {studentsDocument} = props
  const [loading, setLoading] = useState(true)
  const [storedData, setStoredData] = useState({})
  const [fileData, setFileData] = useState({
    adevecoCertificateUrl: {
      file: null,
      error: "",
      progress: 0,
    },
  })

  const collection = "data"
  const document = "adeveco"
  const documentToUpdate = studentsDocument.collection(collection).doc(document)
  useEffect(()=>{
    if(loading){
      documentToUpdate.get()
        .then(doc =>{
          // console.log(doc.data())
          if(doc.exists){
            setStoredData({...doc.data()});
            setLoading(false)
          }
        })
        .catch(err => console.log(err))
    }
  },[loading, setLoading, setStoredData, documentToUpdate])

  const inputProps = {names, labels, types, required}
  const formProps = {storedData, setStoredData, fileData, setFileData, loading, setLoading, documentToUpdate, collection, document}

  const {createdAt, updatedAt} = storedData
  const lastUpdate = !!createdAt ? (!!updatedAt ? new Date(updatedAt.seconds * 1000) : new Date(createdAt.seconds * 1000)) : "Sin datos"

  return (
    <>
      <Header
        info={`Última actualización: ${lastUpdate === "Sin datos" ? lastUpdate : lastUpdate.toLocaleString("es-CO",{weekday:"long", day:"2-digit", month:"long", year:"numeric", hour:"2-digit",minute:"2-digit", second:"2-digit" })}`}
        title="Miembros ADEVECO"
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
      <div className="divider"/>
      <br/>
      <Footer title="¿Para quién aplica?">
      <div className="body-subcontent-parragraph">
          <span>Si usted es <strong>descendiente de los veteranos de la guerra de Corea</strong> y desea recibir el <i>descuento</i>, suba el certificado que demuestre que está afiliado a ADEVECO. Si aún no está afiliado, inscrbíbase mediante el siguiente link</span>
        </div>
        <div className="body-subcontent-parragraph">
          <div className="body-subcontent-annecdote">*El proceso de afiliación con ADEVECO tiene una duración estimada de 1~3 días hábiles</div>
        </div>
        <div className="body-subcontent-parragraph">
          <Button href="https://sites.google.com/view/adeveco/asociaci%C3%B3n/afiliaci%C3%B3n?authuser=0" target="_blank" variant="outlined" color="primary">Afiliarse</Button>
        </div>
        <div className="divider"/>
        <br/>
        <div className="body-subcontent-parragraph">
          <div className="body-subcontent-title">Contacto</div>
          <div className="body-subcontent-subtitle" >Angélica María Frías Orrego (Secretaría de ADEVECO)</div>
          <ul>
            <li>Personal - 314 240 4443
              <IconButton aria-label="WhatsApp" href="https://wa.me/573142404443" target="_blank" variant="contained" size="small">
                <WhatsAppIcon/>
              </IconButton>
              {/* <IconButton>
                <CopyTwoTone/>
              </IconButton> */}
            </li>
            <li>ADEVECO - 301 761 4899
              <IconButton aria-label="WhatsApp" href="https://wa.me/573017614899" target="_blank" variant="contained" size="small">
                <WhatsAppIcon/>
              </IconButton>
              {/* <IconButton>
                <CopyTwoTone/>
              </IconButton> */}
            </li>
          </ul>
        </div>
      </Footer>
    </>
  )
}

export default memo(AdevecoData)