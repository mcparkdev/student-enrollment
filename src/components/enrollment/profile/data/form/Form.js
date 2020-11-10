import React, {useState, useCallback, memo} from 'react'
import "./Form.scss"

import {useForm} from "react-hook-form"

import FormButtons from './FormButtons';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';

import MomentUtils from '@date-io/moment';
// import moment from 'moment';
import 'moment/locale/es'

import {MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Poppins',
      '"Segoe UI"',
      // 'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      textTransform: 'none'
    }
  },
});

const Form = (props) => {

  const { register, handleSubmit, errors, clearErrors } = useForm({
    mode: 'onBlur',
    defaultValues: {},
  });

  const [readOnly, setReadOnly] = useState(true)
  // form custom props
  const {names, labels, types, options, required, storedData, fileData, setLoading, colombia} = props
  // firebase related data: Current user and its document
  const {currentUser, storage, documentToUpdate, collection, document, userName} = props
  const {firstName, lastName} = userName
  // initial values set to those stored in Firestore
  // Set to default values for new users who don't have any values.
  const [values,setValues] = useState(storedData)
  const [files, setFiles] = useState(fileData)
  const imageTypes = ['image/png','image/jpeg']
  const inputProps = names.map((name,index)=>{
    const label = labels[index]
    const type = types[index]
    if (name === "city" && colombia !== undefined && values.department !== undefined) {
      options["city"] = colombia ("city", values.department)
    }

    if (name === "documentCity" && colombia !== undefined && values.documentDepartment !== undefined) {
      options["documentCity"] = colombia ("city", values.documentDepartment)
    }
    return {
      name,
      label,
      type,
      options: options !== undefined ? options[name] : {},
      required: required[index],
      validation: {
        required: required[index] === true ? `${type === "select" ? "Seleccione" : "Ingrese"} su(s) ${label.toLowerCase()}` : "",
        pattern : type === "email" ? {value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message:"El correo es inválido"} : {},
      },
      error:"",
    }
  })
  
  const handleValues = (inputKey) => {
    const name = inputProps[inputKey].name
    const type = inputProps[inputKey].type
    if (type === "file"){
      const handleValue = (event) => {
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
      return handleValue
    }
    if (type === "checkbox"){
      const handleValue = (event) => {console.log(event.target.checked);console.log(values[name]);setValues({...values, [name]: event.target.checked})}
      return handleValue
    }
    else if (type !== "date"){
      const handleValue = (event) => {console.log(event.target.value);console.log(values[name]);setValues({...values, [name]: event.target.value})}
      return handleValue
    }
    else{
      const handleValue = (date) => setValues({...values, [name]: !!date ? date.toDate() : null}) 
      return handleValue
    }
  }
  // console.log(values)
  // function that returns the props for the field
  const giveFieldProps = (inputKey) => {
    const input = inputProps[inputKey]
    const {name, type, label, required, validation} = input
    const value = storedData !== undefined ? values[name] : ""
    // console.log(name, value)
    const file = fileData !== undefined ? files[name] : {}
    const handleValue = handleValues(inputKey)
    const giveError = (type) => {
      switch (type) {
        case "select": return value.length === 0 ? validation.required : ""
        case "date": return undefined
        case "file": return file ? file.error : ""
        default: return errors[name] !== undefined ? errors[name].message : errors[name]
      }
    }
    const error = giveError(type)
    if (type === "date"){
      return {
        margin:"normal",
        openTo:"year",
        disableFuture: true,
        // views:["year,month,date"],
        fullWidth:true,
        id:name,
        name,
        label,
        format:"DD-MM-YYYY",
        value: value !== undefined ? value : "",
        onChange:(date)=>handleValue(date),
        readOnly,
        disabled:readOnly,
        required,
        KeyboardButtonProps:{'aria-label': 'Cambiar fecha'}
      }
    }
    else if (type === "checkbox") {
      return {
        disabled: readOnly ? true : false,
        checked: value !== undefined ? value : false,
        onChange: handleValue,
        id: name,
        name,
        label,
        color:"primary",
        required,
      }
    }
    else if (type === "file") {
      return {
        input:{
          disabled: readOnly ? true : false,
          accept:"image/*",
          type,
          id:name,
          onChange: handleValue ,
          label,
        },
        button:{
          variant: "contained",
          color: "default",
          component: "span",
          startIcon: <CloudUploadOutlinedIcon/>,
          disabled: readOnly,
        },
        error: (!readOnly && error !== undefined && error !== "") ? true : false,
      }
    }
    else {
      return{
        InputProps:{readOnly},
        disabled: readOnly ? true : false,
        id: name,
        label,
        name,
        margin: "normal",
        inputRef: type === "select" ? register : register(validation),
        required: required,
        fullWidth: true,
        value: value !== undefined ? value : "",
        onChange: handleValue,
        type,
        select: type === "select" ? true : false,
        error: (!readOnly && error !== undefined && error !== "") ? true : false,
        helperText: (!readOnly && error !== undefined && error !== "") ? error : "",
      }
    }
  }

  
  // // resets all values to the values stored in FireStore
  // // If it's a new user, it's reset to the defaultValues.
  const restoreValues = useCallback(() => {
    setValues(storedData)
    setFiles(fileData)
  }, [setValues, storedData, fileData, setFiles])

  const finalSubmit = async (data) => {
    const newData = await {...values, ...data, updatedAt: new Date()}
    documentToUpdate.update(newData)
      .then(doc =>{
        const{ profileTabKey, handleDataIsValid } = props
        handleDataIsValid(profileTabKey)
        alert("Data updated successfully")
        setLoading(true)
        setReadOnly(true)
      })
      .then(()=>{
        const documentID = new Date().getTime().toString()
        const historiesData = { updatedAt: new Date(), record:{collection, document, before: storedData, after: newData, action:"update"}, uid:currentUser.uid, user:{ firstName, lastName, personal:props.studentsDocument.collection("data").doc("personal")} }
        // console.log(historiesData)
        props.db.doc(`/histories/${documentID}`).set(historiesData)
          .then(()=>alert("History updated"))
          .catch(err => {console.log(err);alert("History could no be updated");})
      })
      .catch(err => {console.log(err);alert("Fail");})
  }

  const onSubmit = (data) =>{
    const noErrors = fieldProps.filter(field=> field.error === true).length === 0
    if (noErrors){
      if (files !== undefined) {
        names.filter(name => {
          return files[name] !== undefined
        }).forEach(name=>{
          const path = `students/${currentUser.uid}/${collection}/${document}/${name}`
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
      else {finalSubmit(data)}
    }
    else{
      alert("Diligencie nuevamente los campos con errores")
    }
  }

  // // Upon canceling the edit, return to default values, clear errors and set to readOnly.
  const handleCancelEdit = () => { restoreValues(); clearErrors(); setReadOnly(true); }

  const buttonProps = {readOnly, setReadOnly, handleCancelEdit, handleSubmit, onSubmit}
  // console.log(values)
          
  // console.log(files);
  const fieldProps = inputProps.map((value,index)=>{return {...giveFieldProps(index)}})
  // console.log(fieldProps)

  return (
    <ThemeProvider theme={theme}>
      <ul className="form-input">
        {fieldProps.map((field, index)=>{
          const input = inputProps[index]
          const {name, type, label, options} = input
          const file = fileData !== undefined ? files[name] : {}
          return(
            <li className="form-input-item" key={label}>
              {type === "date" &&
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker {...field} />
                </MuiPickersUtilsProvider>
              }
              {type ==="select" &&
                <TextField {...field}>
                  <MenuItem value="" >
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option.label} value={option.name}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              }
              {
                type === "checkbox" &&
                <FormControlLabel label={label} control={ <Checkbox {...field}/> } color="Primary" />
              }
              {
                type === "file" &&
                <div className="form-files">
                  <div className="form-file-title" style={{color: readOnly ? "#a0a9b0" : ""}}>{field.input.label}</div>
                  {values[name] !== "" &&
                    <div className="form-file-img">
                      <img src={values[name]} alt="Certificado ADEVECO"/>
                    </div>
                  }
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
                  <input {...field.input} hidden />
                  <label htmlFor={field.input.id}>
                    <Button {...field.button} >
                      Subir
                    </Button>
                  </label>
                </div>
              }
              {
                (type === "text" || type === "number" || type === "email") && <TextField {...field}/>
              }
            </li>
          )
        })}
      </ul>
      <FormButtons {...buttonProps} />
    </ThemeProvider>
  )
}

export default memo(Form)
