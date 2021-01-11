import React from 'react'

import { Divider, IconButton, Paper } from '@material-ui/core'
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField'
import { fade, makeStyles } from '@material-ui/core/styles';

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
    '& .MuiPaper-root': {
      background: 'rgba(239, 239, 239, 0.7)'
    },
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
      borderBottom: "1px solid #20416d",
    },
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      color: fade(theme.palette.common.white, 0.65),
    },
  },
}));

const AutoComplete = (props) => {
  const {searchOptions, onSearch} = props
  const classes = useStyles()
  const options = searchOptions.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  return (
    <div className="search-container" style={{padding: "8px 0", width: "100%"}}>
      <MuiAutocomplete
        onChange={(event, value) => value ? onSearch(value.name) : onSearch("")}
        freeSolo
        fullWidth
        size="small"
        id="search-all"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <Paper component="form" elevation={3} className={classes.root}>
            <TextField {...params} size="small" label="검색어를 입력하세요" variant="filled" className={classes.search} />
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
  )
}

export default AutoComplete
