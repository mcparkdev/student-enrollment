import React from 'react'
import banner from "../../../../media/news.jpg"
// import logo from "../../../../media/logo.png"

// import Header from '../subcontent/header/Header'
// import Body from "../subcontent/body/Body"
// import Footer from '../subcontent/footer/Footer'
import Banner from "../../../generic/subcontent/banner/Banner"
import SubContent from '../../../generic/subcontent/SubContent'
import SubContentEnd from '../../../generic/subcontent/SubContentEnd'

import { Divider, IconButton, Paper } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
// import TabContainer from '../subcontent/tabContainer/TabContainer'
// import SubContentStart from '../subcontent/SubContentStart'


const searchOptions = [
  { label: "Principal", name: "home"},
  { label: "Perfil", name: "profile"},
  { label: "Cursos", name: "courses"},
  { label: "Matriculas", name: "enrollment"}
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: "100%",
  },
  iconButton: {
    padding: 10,
    margin: 2,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 28,
    margin: "4px 0",
  },
  search: {
    boxShadow: "none",
    '#search-all': {
      color: fade(theme.palette.common.black, 0.45),
      '&:hover': {
        color: fade(theme.palette.common.black, 0.65),
      },
    },  
    '& .MuiFormLabel-root': {
      color: fade(theme.palette.common.black, 0.45),
      '&:hover': {
        color: fade(theme.palette.common.black, 0.65),
      }, 
    },
    '& .MuiInputBase-input': {
      color: fade(theme.palette.common.black, 0.65),
      '&:hover': {
        color: fade(theme.palette.common.black, 0.85),
      }, 
    },
    '& .MuiFilledInput-root':{
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: 0,
    },
    '& .MuiFilledInput-underline:after':{
      borderBottom: "2px solid #1479ff",
    },
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      color: fade(theme.palette.common.white, 0.65),
    },
  },
}));

const Announcements = (props) => {
  // const {items, itemKey} = props
  // const item = items[itemKey]
  // const {label} = item
  const {userName} = props
  const {firstName, lastName} = userName

  const classes = useStyles()
  const options = searchOptions.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  return (
    <SubContent>
      <SubContentEnd>
        <div className="body-subcontent-end-title">
          Hola, {firstName} {lastName}
        </div>
        <div className="search-container" style={{padding: "8px 0", width: "100%"}}>
          <Autocomplete
            freeSolo
            fullWidth
            size="small"
            id="search-all"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <Paper component="form" elevation={3} className={classes.root}>
                <TextField {...params} size="small" label="Buscar" variant="filled" className={classes.search} />
                <Divider className={classes.divider} orientation="vertical"/>
                <IconButton onClick={()=>console.log("clicked")} className={classes.iconButton} aria-label="search">
                  <SearchIcon/>
                </IconButton>
              </Paper>
            )}
            renderOption={(option, { inputValue }) => {
              const matches = match(option.label, inputValue);
              const parts = parse(option.label, matches);
              return (
                <div>
                  {parts.map((part, index) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                      {part.text}
                    </span>
                  ))}
                </div>
              );
            }}
          />
        </div>
        <div className={`item-1 `} >
          <Paper elevation={3}>
            <Banner banner={banner} {...props} thumbnail={true}/>
            <div className="item-1-header">
              <div className="item-1-subtitle">
                Cursos virtuales de coreano
              </div>
              <div className="item-1-title">
                Matrículas 2020-4
              </div>
              <div className="item-1-subtitle">
                ¡Inscríbite ya y te guiaremos paso a paso!
              </div>
            </div>
          </Paper>
        </div>
        <div className={`item-1 `} >
          <Paper elevation={3}>
            <Banner banner={banner} {...props} thumbnail={true}/>
            <div className="item-1-header">
              <div className="item-1-subtitle">
                Cursos virtuales de coreano
              </div>
              <div className="item-1-title">
                Matrículas 2020-4
              </div>
              <div className="item-1-subtitle">
                ¡Inscríbite ya y te guiaremos paso a paso!
              </div>
            </div>
          </Paper>
        </div>
        {/* <Header {...announcementProps} />
        <Body>
          <div className="body-parragraph">Actualmente, no te encuentras matriculado a ningún curso. Para iniciar el proceso, actualiza tus datos personales.</div>
          <div className="body-parragraph">Te acordamos que tus datos se trataran de manera confidencial de acuerdo a nuestra Política de Privacidad.</div>  
          <div className="button" style={{display: "flex", justifyContent:"center"}}>
            <Button variant="contained" color="primary" >Actualizar mis datos</Button>
          </div>
        </Body>
        <Footer>
          Footer
        </Footer>  */}
      </SubContentEnd>
    </SubContent>
  )
}

export default Announcements
