import React, {useState} from 'react'
import "./account.scss";

// media, icons
import logo from "../../../media/logo.png" 
import CloseIcon from '@material-ui/icons/Close';

// Components
import Input from '../../generic/Input/Input';
import { NavLink } from 'react-router-dom';
import Sign from "./Sign/Sign"

// form
import {useForm} from "react-hook-form"
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


// form validation for sign in/out
const schema = (sign) => {
  const object = {
    email: Yup.string().email("El correo es inválido").required("Ingrese un correo electrónico"),
    password: Yup.string().min(6, "La clave debe superar los 6 caractéres").required("Ingrese una contraseña")
    } 
  return sign ? Yup.object().shape(object)
  : Yup.object().shape({
    firstName: Yup.string().required("Ingrese su nombre completo"),
    lastName: Yup.string().required("Ingrese su apellido completo"),
    ...object,
  })
}

// form input for sign in/out
const signFormList = (sign) => {
  return sign ? ['email','password'] : ['firstName','lastName','email','password']
} 

// default component
const Account= (props) => {
  // message for authentication result
  const [authMsg, setAuthMsg] = useState("")
  // react-hooks-form
  const { register, handleSubmit, errors } = useForm({
    // onBlur + onChange after onBlur
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema(props.sign)),
  });

  const onSubmit = (credentials) =>{
    const submitProps = {
      credentials,
      setAuthMsg,
      sign: props.sign
    }
    return Sign(submitProps)
  }
  // console.log(errors);

  return (
    <div className="account">
      <div className="account-content">
        {/* Body start*/}
        <div className="account-body">
          <div onClick={()=>props.setHideAccount(true)} className="account-close">
            <CloseIcon/>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="account-logo">
              <img src={logo} alt="ccc logo"/>
            </div>
            <div className="account-title">Bienvenido/a</div>
            <div className="account-subtitle">
              <span onClick={()=>props.handleSign(true)}>Inicia sesión</span>
              <span> o </span>
              <span onClick={()=>props.handleSign(false)}>regístrate</span>
            </div>
            <div className="account-error">
              {/* {errors['email']!== undefined && errors['email'].message} */}
              {signFormList(props.sign).map((input,index) => {
                const name = errors[input];
                return (
                <div key={input}>
                  {name !== undefined && <p style={{margin:0, padding:0}}>{name.message}</p>}
                </div>
              )
              })}
              {authMsg}
            </div>
            <ul className="account-input">
              {!props.sign && (
                <>
                  <Input placeholder="Nombres" register={register} name="firstName"/>
                  <Input placeholder="Apellidos" register={register} name="lastName"/>
                </>
              )}
              <Input placeholder="Correo electrónico" register={register} name="email"/>
              <Input type="password" placeholder="Contraseña" register={register} name="password"/>
              
            </ul>
            <div className="account-policies">
              <span>Al usar nuestra plataforma, acepta nuestra <NavLink to="policies" target="_blank" className="policies">política de privacidad</NavLink>.</span>
            </div>
            <button className="account-submit" type="submit">
            {/* onClick={()=>handleErrorMsg("wrong-credentials")} */}
            {props.sign ? "Iniciar sesión" : "Registar"}
            </button>
          </form>
        </div>
        {/* Body End*/}
        {/* Footer Start*/}
        <div className="account-footer">
          <div className="account-footer-title">재콜롬비아한국학교</div>
          <div className="account-footer-divider divider"></div>
          <div className="account-footer-subtitle">
            <span>@2016-2020 Colegio Colombo Coreano</span>
            <span>Todos los derechos reservados</span>
          </div>
        </div>
        {/* Footer End*/}
      </div>
    </div>
    )
}

export default Account;