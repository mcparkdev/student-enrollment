import React, {useState} from 'react'

import "./account.scss"
import Sign from "./Sign/Sign"
import logo from "../../media/logo.png"
import Paper from '../generic/paper/Paper'
import IconBox from '../generic/iconBox/IconBox'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

// form
import {useForm} from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

// form validation for sign in/out

const Account = (props) => {
  // state that indicates whether the user is logging in or creating an account
  const [sign, setSign] = useState(true)
  // show hide password state while logging in or creating account
  const [showPassword, setShowPassword] = useState(false)
  // page language
  const [language, setLanguage] = useState("korean")
  // message for authentication result
  const [authMsg, setAuthMsg] = useState({})
  const handleLanguage = () => {
    setLanguage(language === "korean" ? "spanish" : "korean")
  }
  const handleShowPassword = (event) => {
    setShowPassword(event.target.checked);
  }
  const handleSign = () => {
    setSign(!sign);
    setAuthMsg({})
  }

  const validationMessages = {
    korean:{
      firstName:{
        required:"이름을 입력하세요"
      },
      lastName:{
        required:"성을 입력하세요"
      },
      email:{
        error: authMsg.email ? authMsg.email : "잘못된 이메일입니다. 다시 입력해주세요",
        required:"이메일을 입력하세요"
      },
      password:{
        error: authMsg.password ? authMsg.password : "비밀번호는 8자 이상이어야 합니다",
        required:"비밀번호를 입력하세요"
      }
    },
    spanish:{
      firstName:{
        required:"Ingresa tu nombre completo"
      },
      lastName:{
        required:"Ingresa tu apellido completo"
      },
      email:{
        error: authMsg.email ? authMsg.email : "El correo es inválido",
        required:"Ingrese su correo electrónico"
      },
      password:{
        error: "La clave debe superar los 8 caractéres.",
        required:"Ingresa tu contraseña"
      }
    }
  }

  const schema = (sign) => {
    const msg = validationMessages[language]
    const {firstName, lastName, email, password} = msg
    const object = {
      email: Yup.string().email(email.error).required(email.required),
      password: Yup.string().min(8, password.error).required(password.required)
      } 
    return sign ? Yup.object().shape(object)
    : Yup.object().shape({
      firstName: Yup.string().required(firstName.required),
      lastName: Yup.string().required(lastName.required),
      ...object,
    })
  }
 
  // react-hooks-form
  const { register, handleSubmit, errors } = useForm({
    // onBlur + onChange after onBlur
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema(sign)),
  });

  const onSubmit = (credentials) =>{
    console.log(errors)
    const submitProps = {
      credentials,
      setAuthMsg,
      language,
      sign,
    }
    // console.log(submitProps)
    return Sign(submitProps)
  }
  const text = {
    korean: {
      title:{
        title: sign ? "로그인" : "계정 만들기",
        subtitle: sign ? "본인 계정으로 로그인하세요" : "계정을 만드세요",
      },
      inputs:{
        firstName: "이름",
        lastName: "성",
        email: "이메일 입력",
        password: "비밀번호 입력",
        showPassword: "비밀번호 표시",
      },
      buttons:{
        primary:{
          swapSign: sign ? "계정 만들기" : "대신 로그인하기",
          submit: !sign ? "계정 만들기" : "로그인",
        },
        secondary:{
          swapLanguage: "한국어",
          recoverPassword: "비밀번호 찾기",
          recoverEmail: "이메일 찾기",
        }
      },
      footer:{
        privacy: "개인정보",
        terms: "약관",
      }
    },
    spanish:{
      title:{
        title: sign ? "Iniciar sesión" : "Crear cuenta",
        subtitle: sign ? "Inicia sesión con tu cuenta" : "Crea tu propia cuenta"
      },
      inputs:{
        firstName: "Nombre completo",
        lastName: "Apellido completo",
        email: "Correo electrónico",
        password: "Contrasesña",
        showPassword: "Mostrar contraseña",
      },
      buttons:{
        primary:{
          swapSign: sign ? "Crear cuenta" : "Inicar sesión",
          submit: !sign ? "Crear cuenta" : "Iniciar sesión",
        },
        secondary:{
          swapLanguage: "Español",
          recoverPassword: "Recuperar contraseña",
          recoverEmail: "Recuperar correo electrónico",
        }
      },
      footer:{
        privacy: "Privacidad",
        terms: "Términos",
      }
    }
  }
  const labels = text[language] ? text[language] : text["korean"]
  const {title, inputs, buttons, footer} = labels
  const inputProps = {
    variant: "outlined",
    fullWidth: true,
    style:{marginBottom:20, fontSize:16},
    inputRef: register,
  }
  const inputList = sign ? ["email", "password"] : ["firstName", "lastName", "email", "password"]
  return (
    <div className="account">   
      <Paper flex col alignItems="center" justifyContent="center">
        <div className="content">
          <div className="header">
            <IconBox icon={logo} size={40} iconSize={32}/>
            재콜롬비아한국학교
          </div>
          <div className="title">
            <div className="title">{title.title}</div>
            <div className="subtitle">{title.subtitle}</div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="inputs">
              {inputList.map(inputField => {
                const type = inputField === "email" ? "email" : (inputField === "password" ? (!showPassword ? "password" : "") : "")
                const helperText = errors[inputField] 
                ? errors[inputField].message
                : (authMsg[inputField] ? authMsg[inputField] : "")
                console.log(authMsg)
                const fieldProps = {...inputProps, name: inputField, type, label:inputs[inputField], error:helperText !== "", helperText}
                return (
                  <TextField key={`account-${inputField}`} {...fieldProps}/>  
                )
              })}
              {/* {!sign && 
              <>
                <TextField {...inputProps} name="firstName" label={inputs.firstName}/>
                <TextField {...inputProps} name="lastName" label={inputs.lastName}/>
              </>
              }
              <TextField {...inputProps} name="email" type="email" label={inputs.email} error={}/>
              <TextField {...inputProps} name="password" type={showPassword ? "" : "password"} label={inputs.password} /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={handleShowPassword}
                    name="showPassowrd"
                    color="primary"
                  />
                }
                label={inputs.showPassword}
              />
            </div>
            <div className="buttons">
              <div className="primary">
                <Button color="primary" onClick={handleSign}>{buttons.primary.swapSign}</Button>
                <Button color="primary" variant="contained" style={{fontSize:14, fontWeight: 700}} type="submit" onClick={()=>console.log(errors)} >{buttons.primary.submit}</Button>
              </div>
              <div className="secondary">
                <Button size="small" color="primary" style={{boxShadow: 0}} >{buttons.secondary.recoverPassword}</Button>
                <Button size="small" color="primary" style={{boxShadow: 0}} >{buttons.secondary.recoverEmail}</Button>
              </div>
            </div>
          </form>
          <div className="footer">
            <div className="footer-start">
              <Button size="small" color="primary" endIcon={<SwapHorizIcon/>} onClick={handleLanguage}>{buttons.secondary.swapLanguage}</Button>
            </div>
            <div className="footer-end">
              <Button size="small" color="primary">{footer.privacy}</Button>
              <Button size="small" color="primary">{footer.terms}</Button>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Account