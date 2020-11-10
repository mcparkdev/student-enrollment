import React from 'react'
import "./banner.scss"
import Account from "../account/Account";

export default function Banner(props) {
  return (
      <div className="banner">
      <div className="content">
        <h1 className="content-title">
          <p>Aprende coreano</p>
          <p>desde tu casa</p>
        </h1>
        <ul className="content-buttons">
          <li onClick={()=>props.handleAccount(false,false)} >Regístrate</li>
          <li onClick={()=>props.handleAccount(false,true)} >Inicia sesión</li>
        </ul>
        <h2 className="content-subtitle">
          <span>Aprende con profesores 100% <strong>nativos</strong> virtualmente. ¿Qué esperas? Estás solo a un clic de registrate. Te guiaremos paso a paso el proceso de matrícula.</span>
        </h2>
      </div>
      {/* Account component - shows upon call */}
      {!props.hideAccount && <Account {...props} />}
    </div>
  )
}
