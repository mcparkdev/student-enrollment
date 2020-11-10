import React from 'react'

import "./application.scss"
import Body from '../../../generic/subcontent/body/Body'
import Header from '../../../generic/subcontent/header/Header'
import SubContent from '../../../generic/subcontent/SubContent'
import SubContentEnd from "../../../generic/subcontent/SubContentEnd"

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccountCircle, AddPhotoAlternateOutlined, Done, Payment } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const Application = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <SubContent>
      <SubContentEnd>
        <Header 
          title="¿Cómo inscribirse?"
          subtitle="Para inscribirte a nuestros cursos te recomendamos seguir los siguientes pasos."
        />
        <Body>
          <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <div style={{fontSize: 15, display: "flex", justifyContent:"flex-start", alignItems:"center"}} >
                  <div style={{marginRight: 8, display: "flex", justifyContent:"flex-start", alignItems:"center"}}>
                    <AccountCircle/>
                  </div>
                  Actualiza tus datos
                  <Done style={{color:"#1479ff", marginLeft:"8px"}}/>
                </div>
              </AccordionSummary>
              <AccordionDetails style={{display:"flex", flexDirection:"column"}} >
                Tus datos tienen que estar actualizados para poder inscribirse. 
                <NavLink to="/profile/data/personal" style={{color: "white"}} onClick={()=>props.handleItemKey(3)}>
                  <Button variant="contained" color="primary" style={{width: "fit-content"}}>
                    Actualizar
                  </Button>
                </NavLink>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <div style={{fontSize: 15, display: "flex", justifyContent:"flex-start", alignItems:"center"}} >
                  <div style={{marginRight: 8, display: "flex", justifyContent:"flex-start", alignItems:"center"}}>
                    <Payment/>
                  </div>
                    Realiza el pago
                    {/* <Done style={{color:"#1479ff", marginLeft:"8px"}}/> */}
                </div>
              </AccordionSummary>
              <AccordionDetails style={{display:"flex", flexDirection:"column"}}>
                El pago se realiza mediante una transferencia bancaria o una consignación a la siguiente cuenta:
                <ul className="info-item-container" style={{paddingTop: 16}}>
                  <li className="info-item">
                    <div className="info-item-label">Cuenta de ahorros</div>
                    <div className="info-item-content">DAVIVIENDA</div>
                  </li>
                  <li className="info-item">
                    <div className="info-item-label">N° de la cuenta</div>
                    <div className="info-item-content">4756 7005 2590</div>
                  </li>
                  <li className="info-item">
                    <div className="info-item-label">A nombre de</div>
                    <div className="info-item-content">YURI KIM (C.E. 357349)</div>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <div style={{fontSize: 15, display: "flex", justifyContent:"flex-start", alignItems:"center"}} >
                  <div style={{marginRight: 8, display: "flex", justifyContent:"flex-start", alignItems:"center"}}>
                    <AddPhotoAlternateOutlined/>
                  </div>
                    Confirma tu pago
                    {/* <Done style={{color:"#1479ff", marginLeft:"8px"}}/> */}
                </div>
              </AccordionSummary>
              <AccordionDetails style={{display:"flex", flexDirection:"column"}}>
                Selecciona el periodo y el curso a la que quieres inscribirte y confirma que hayas realizado el pago. La asignación oficial del curso depende de tu nivel actual de coreano.
                <NavLink to="/enrollment/application/confirmPayment" style={{color: "white", paddingTop: 8}}>
                  <Button variant="contained" color="primary" style={{width: "fit-content"}}>
                    Confirmar pago
                  </Button>
                </NavLink>
              </AccordionDetails>
            </Accordion>
          </div>
        </Body>
      </SubContentEnd>
    </SubContent>
  )
}

export default Application
