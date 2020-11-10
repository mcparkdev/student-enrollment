import React, { useState } from 'react'

import {useForm} from "react-hook-form"

import Header from '../../../../generic/subcontent/header/Header'
import Body from '../../../../generic/subcontent/body/Body'
import SubContent from '../../../../generic/subcontent/SubContent'
import SubContentEnd from '../../../../generic/subcontent/SubContentEnd'

import "./confirmPayment.scss"

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { LinearProgress, MenuItem, TextField } from '@material-ui/core'
import { CloudUploadOutlined } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    // maxWidth: 600,
    flexGrow: 1,
    background: "white",
    width: "inherit",
  },
});

const ConfirmPayment = (props) => {
  const {names, labels, instructions, options, currentUser, userName, storage} = props
  const {firstName, lastName} = userName
  const [values, setValues] = useState({
    period:"2020-4",
    courseType:"faceToFace",
    courseName: "beginner-1",
    courseLevel: "1",
  })

  const handleValues = (inputKey) => {
    const name = names[inputKey]
    const handleValue = (event) => {setValues({...values, [name]: event.target.value})}
      return handleValue
  }

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const giveFieldProps = (inputKey) => {
    const name = names[inputKey]
    const label = labels[inputKey]
    const value = values[name]
    const handleValue = handleValues(inputKey)
    const error = value.length === 0
    return{
      id: name,
      label,
      name,
      // margin: "normal",
      inputRef: register,
      required: true,
      fullWidth: true,
      value: !!value ? value : "",
      onChange: handleValue,
      type:"select",
      select: true,
      error,
    }
  }
  const [files, setFiles] = useState({
    paymentConfirmationUrl: {
      file: null,
      error: "",
      progress: 0,
    },
  })
  const imageTypes = ['image/png','image/jpeg']
  const handleFiles = (event) => {
    const name = "paymentConfirmationUrl"
    let file = event.target.files[0]
    const imageValid = file && imageTypes.includes(file.type)
    const sizeValid = file && file.size < 2097152
    const error = () => {
      if (!imageValid) {
        return "El formato de imagen es inválido. Solo se acepta .png o .jpg"
      }
      else if (!sizeValid) {
        return "El archivo debe ser inferior a 2MB"
      }
      else return ""
    }
    setFiles({
      ...files,
      [name]:{
        file: (imageValid && sizeValid) ? file : null,
        error: error(),
        progress: 0,
      }
    })
  }

  const fileProps = {
    input:{
      accept:"image/*",
      type: "file",
      id:"paymentConfirmationUrl",
      onChange: handleFiles,
      label: "Imagen de evidencia",
    },
    button:{
      variant: "contained",
      color: "default",
      component: "span",
      startIcon: <CloudUploadOutlined/>,
    },
    error: files["paymentConfirmationUrl"] ? files["paymentConfirmationUrl"].error : ""
  }
  const fileNames = ["paymentConfirmationUrl",]
  const file = files[fileNames[0]]
  const fieldProps = names.map((name,index)=> {return {...giveFieldProps(index)}})
  // console.log(fieldProps)

  const finalSubmit = async (data) => {
    const newData = await {...values, ...data, updatedAt: new Date()}
    props.db.doc(`periods/${values.period}`).set({[props.currentUser.uid]: newData})
      .then(doc =>{
        alert("Data updated successfully")
        // setLoading(true)
      })
      .then(()=>{
        const documentID = new Date().getTime().toString()
        const historiesData = { updatedAt: new Date(), record:{collection:"Period", document:values.period, after: newData, action:"applied"}, uid:currentUser.uid, user:{ firstName, lastName, personal:props.studentsDocument.collection("data").doc("personal")} }
        // console.log(historiesData)
        props.db.doc(`/histories/${documentID}`).set(historiesData)
          .then(()=>{
            alert("History updated")
            handleNext()
          })
          .catch(err => {console.log(err);alert("History could no be updated");})
      })
      .catch(err => {console.log(err);alert("Fail");})
  }
  console.log(file)
  const onSubmit = (data) =>{
    const noErrors = fieldProps.filter(field=> field.error === true).length === 0
    if (noErrors){
      if (!!file && !!file.file) {
        fileNames.forEach(name=>{
          console.log(name)
          const path = `periods/${values.period}/${props.currentUser.uid}`
          const file = files[name]
          const storageRef = storage.ref().child(path)
          // const adevecoRef = storageRef.child(path);
          
          storageRef.put(file.file).on('state_changed', (snap) => {
            let progress = (snap.bytesTransferred / snap.totalBytes) * 100
            // const test = {...files,[name]:{...file,progress}}
            // console.log(test)
            setFiles({...files,[name]:{...file,progress}})
          }, (error) => {
            setFiles({...files,[name]:{...file,error}})
          }, async () => {
            const url = await storageRef.getDownloadURL();
            // console.log(url);
            console.log({...values,[name]:url})
            setValues({...values,[name]:url})
            // console.log(values)
            finalSubmit({...data, [name]:url})
          })
        })
      }
      else alert("Favor cargar la imagen de evidencia de pago")
    }
    else{
      alert("Diligencie nuevamente los campos con errores")
    }
  }
  return (
    <>
      {activeStep === 4 && <Redirect to="/enrollment/application"/>}
      <SubContent>
        <SubContentEnd>
          {activeStep === 0 && 
            <>
              <Header 
                title="Confirmación de pago"
                subtitle="Selecciona el periodo y el curso a inscribirse"
              />
              <Body>
                {fieldProps.map((field, index)=>{
                const name = names[index]
                const instruction = instructions[index]
                const label = labels[index]
                return(
                  <div className="form-input-item" key={label} style={{marginTop: 16}}>
                    <div className="form-input-instructions">
                      {instruction}
                    </div>
                    <TextField {...field}>
                      <MenuItem value="" >
                        <em>Seleccione una opción</em>
                      </MenuItem>
                      {options[name].map((option) => (
                        <MenuItem key={option.label} value={option.name}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                )})}
              </Body>
            </>
            }
            {activeStep === 1 &&
              <>
                <Header title="Datos relevantes" subtitle="Verifica tu configuración de pago y tu curso a solicitar antes de confirmar el pago">
                  {/* <div className="divider"/> */}
                </Header>
                <Body>
                  <ul className="info-item-container">
                    <div className="info-item-container-title">Configuración de pago</div>
                    <li className="info-item">
                      <div className="info-item-label">Entidad bancaria</div>
                      <div className="info-item-content">Bancolombia</div>
                    </li>
                    <li className="info-item">
                      <div className="info-item-label">Tipo de pago</div>
                      <div className="info-item-content">Transferencia bancaria</div>
                    </li>
                    <li className="info-item">
                      <div className="info-item-label">Nombre de quien realiza la transacción</div>
                      <div className="info-item-content">Sam Bok Park</div>
                    </li>
                  </ul>
                  <div className="divider"/>
                  <ul className="info-item-container" style={{paddingTop: 16}}>
                    <div className="info-item-container-title">Curso a solicitar</div>
                    <li className="info-item">
                      <div className="info-item-label">Nombre</div>
                      <div className="info-item-content">Básico 1-1</div>
                    </li>
                    <li className="info-item">
                      <div className="info-item-label">Modalidad</div>
                      <div className="info-item-content">Virtual</div>
                    </li>
                    <li className="info-item">
                      <div className="info-item-label">Costo</div>
                      <div className="info-item-content">$200.000</div>
                    </li>
                    <li className="info-item">
                      <div className="info-item-label">Periodo</div>
                      <div className="info-item-content">2020-4</div>
                    </li>
                    <li className="info-item">
                      <div className="info-item-label">Fecha inicio</div>
                      <div className="info-item-content">7 de agosto de 2020</div>
                    </li>
                    <li className="info-item">
                      <div className="info-item-label">Fecha finalización</div>
                      <div className="info-item-content">27 de septiembre de 2020</div>
                    </li>
                    <li className="info-item">
                      <div className="info-item-label">Horario académico</div>
                      <div className="info-item-content">Sábados de 1:00AM a 3:30PM</div>
                    </li>
                  </ul>
                </Body>
              </>
            }
            {activeStep === 2 && 
              <>
                <Header 
                  title="Confirmación de pago" 
                  subtitle="Adjunte la foto del comprobante del pago o un screenshot del pantallazo de comfirmación exitosa de la banca móvil"
                />
                <Body>
                <div className="form-files">
                  <div className="form-file-title" >{fileProps.input.label}</div>
                  {file !== undefined 
                  ? (
                    file.file !== null
                    ? (
                    <span className="form-file-upload">
                      {file.file.name}
                      {/* {console.log(file.progress)} */}
                      <LinearProgress variant="determinate" value={file.progress} />
                    </span>
                    )
                    : <span style={{color:"red"}}>{file.error}</span>
                  )
                  : "No files yet"}
                  <input {...fileProps.input} hidden />
                  <label htmlFor={fileProps.input.id}>
                    <Button {...fileProps.button} >
                      Subir
                    </Button>
                  </label>
                  </div>
                  <div className="form-buttons" style={{padding: 16, width: "inherit", display: "flex", justifyContent:"flex-end"}}>
                    <Button 
                      className="form-submit"
                      type="submit"
                      variant="contained"
                      color="primary"  
                      onClick={handleSubmit(onSubmit)}
                    >
                      Confirmar Pago
                    </Button>
                  </div>
                </Body>
              </>
            }
            {activeStep === 3 && 
              <Header title="Confirmación enviado" subtitle="Tu comprobante de pago ha sido enviado satisfactoriamente. Una vez validada, te avisaremos vía WhatsApp o Correo"/>
            }
          <MobileStepper
            variant="dots"
            steps={3}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
              <Button 
                size="small" 
                onClick={handleNext} 
                disabled={activeStep === 2 || (fieldProps.filter(field => {return field.error}).length !== 0)}>
                Continuar
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0 || activeStep === 3}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Regresar
              </Button>
            }
          />
        </SubContentEnd>
      </SubContent>
    </>
  )
}

export default ConfirmPayment
