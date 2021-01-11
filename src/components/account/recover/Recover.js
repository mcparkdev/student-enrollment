import React from 'react'
import fb from "../../../firebase"

import "./recover.scss"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Recover = (props) => {
  const {language, errors, authMsg, setAuthMsg, handleRecover, register, handleSubmit, openRecoverDialog, setOpenRecoverDialog} = props
  const type = props.recoverType
  // console.log(props)
  const helperText = errors[type] ? errors[type].message : (authMsg[type] ? authMsg[type] : "")
  const text = {
    korean: {
      title: type === "recoverEmail" ? "이메일 찾기" : "비밀번호 찾기",
      content: type === "recoverEmail" ? "학생ID를 입력하세요" : "사용자 계정의 이메일을 입력하세요",
      textFieldProps:{
        // variant: "outlined",
        fullWidth: true,
        style:{marginBottom:20, fontSize:16},
        inputRef: register,
        type: type === "recoverPassword" ? "email" : "",
        name: type,
        label: type === "recoverEmail" ? "학생ID 입력" : "이메일 입력",
        helperText,
        error: helperText !== ""
      },
      actions:{
        cancel: "취소",
        recover: "복구",
      }
    },
    spanish: {
      title: type === "recoverEmail" ? "Recuperar mi correo electrónico" : "Recuperar mi contraseña",
      content: type === "recoverEmail" ? "Ingresa tu código de estudiante" : "Ingresa el correo electrónico de tu cuenta",
      textFieldProps:{
        // variant: "outlined",
        fullWidth: true,
        style:{marginBottom:20, fontSize:16},
        inputRef: register,
        type: type === "recoverPassword" ? "email" : "",
        name: type,
        label: type === "recoverEmail" ? "Código de estudiante" : "Correo electrónico",
        helperText,
        error: helperText !== ""
      },
      actions:{
        cancel: "Cancelar",
        recover: "Recuperar",
      }
    },
  }
  const {title, content, textFieldProps, actions} = text[language] ? text[language] : text["korean"]
  const recoverPassword = (credentials) => {
    console.log(credentials)
    fb.auth().sendPasswordResetEmail(credentials.email)
    .then((u) => {
      setOpenRecoverDialog(false)
      setAuthMsg({...authMsg, recoverPassword: ""})
      alert(language === "korean" 
      ? "암호 재설정 메일을 보냈습니다."
      : "Se ha enviado un correo para restablecer la contraseña.")
    })
    .catch((err)=> {
      console.log(err);
      if (err.code === "auth/user-not-found") {
        setAuthMsg({
          ...authMsg,
          recoverPassword: language === "korean" 
          ? "해당 이메일은 등록되어 있지 않습니다. 다시 시도 하세요."
          : "El correo electrónico ingresado no se encuentra registrado. Intenta nuevamente."
        })
      }
      else {
        setAuthMsg({
          recoverPassword: err.code 
        })
      }
    })
  }
  const onSubmit = (credentials) =>{
    console.log(type)
    return type === "recoverPassword"
    ? recoverPassword({email:credentials.recoverPassword})
    : alert(`${credentials.recoverEmail} - Recover Email`)
    // return Sign(submitProps)
  }
  return (
    <Dialog open={openRecoverDialog} onClose={()=>setOpenRecoverDialog(false)} aria-labelledby="recover-dialog" maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <TextField {...textFieldProps} />
          {/* <DialogContentText>{result}</DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleRecover(type)} color="primary">
            {actions.cancel}
          </Button>
          <Button color="primary" type="submit">
            {actions.recover}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Recover
