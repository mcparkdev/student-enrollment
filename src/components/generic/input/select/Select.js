import React from 'react'

import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  select: {
    display: "flex",
    flex: 1,
    // minWidth: '120px',
    backgroundColor: '#20416d !important',
    color: '#f3f8ff',
    fontWeight: 400,
    borderStyle:'none',
    borderWidth: 2,
    borderRadius: "4px !important",
    padding: 10,
    paddingRight: "40px !important",
    '& .MuiSelect-icon':{
      color: "#f3f8ff",
    },
  },
  icon:{
    color: "#f3f8ff",
    marginLeft: 8,
    marginRight: 8,
    // right: 12,
    // position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  paper: {
    borderRadius: 4,
    marginTop: 8
  },
  list: {
    paddingTop:0,
    paddingBottom:0,
    background:'#20416d',
    color: "#f3f8ff",
    "& li":{
      fontWeight:200,
      paddingTop:12,
      paddingBottom:12,
    },
    "& li:hover":{
      background: '#265697'
    },
    "& li.Mui-selected":{
      // color:'white',
      background: '#265697'
    },
    "& li.Mui-selected:hover":{
      background: '#265697'
    }
  }
}))

const Select = (props) => {
  const classes = useStyles()
  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list
    },
    anchorOrigin: {
      vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null
  };
  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + classes.icon}/>
    )};
  const {value, onChange, items} = props
  return (
    <FormControl>
      <MuiSelect
        disableUnderline
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={value}
        onChange={onChange}
      >
        {items.map((item,index)=>{
          const {value, label} = item
          return(
            <MenuItem key={`select-${index}-${value}-${label}`} value={value}>{label}</MenuItem>
          )
        })}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
