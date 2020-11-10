import React from 'react'
import SubContent from '../../../generic/subcontent/SubContent'
import SubContentEnd from '../../../generic/subcontent/SubContentEnd'
import Header from '../../../generic/subcontent/header/Header';

import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import PersonIcon from '@material-ui/icons/Person';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import PaymentIcon from '@material-ui/icons/Payment';

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import LoopIcon from '@material-ui/icons/Loop';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { green, red, blue } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';

import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';



const searchOptions = [
  { label: "Principal", name: "home"},
  { label: "Perfil", name: "profile"},
  { label: "Cursos", name: "courses"},
  { label: "Matriculas", name: "enrollment"}
]

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
    display:"flex", 
    flexDirection:"column",
  },
  timelineContent:{
    transition: "0.2s all ease-in-out",
    padding:0,
    margin: "6px 16px",
    "&:hover":{
      boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);",
    }
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  timeline: {
    width: "100%",
    padding: 0,
    '& .MuiTimelineItem-missingOppositeContent:before': {
      flex: 0,
      padding: 0,
    }
  },
  timelineDot:{
    color: "#707070",
    borderColor: "transparent",
    backgroundColor: "transparent",
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)"
    // color: "#fff",
    // borderColor: "transparent",
    // backgroundColor: "#1479ff",
  },
  // time: {
  //   width: 100,
  //   flex: 1,
  // },
  badgeCreate: {
    color: green[500],
    background: "white",
  },
  badgeDelete: {
    color: red[500],
    background: "white",
  },
  badgeUpdate: {
    color: blue[500],
    background: "white",
  },
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

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 14,
    height: 14,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const TimelineComp = (props) => {
  const classes = useStyles();
  const options = searchOptions.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const badgeContent = {
    create: <SmallAvatar className={classes.badgeCreate}><AddCircleOutlineIcon style={{fontSize: "0.9rem"}} /></SmallAvatar>,
    delete: <SmallAvatar className={classes.badgeDelete}><RemoveCircleOutlineOutlinedIcon style={{fontSize: "0.9rem"}} /></SmallAvatar>,
    update: <SmallAvatar className={classes.badgeUpdate}><LoopIcon style={{fontSize: "0.9rem"}} /></SmallAvatar>,
  }
  const timelineDotIcon = {
    profile: <PersonIcon/>,
    course: <CollectionsBookmarkIcon/>,
    payment: <PaymentIcon/>,
  }
  const timelineProps = [
    {
      action: "update",
      type: "profile",
      content: "Min Chang Park님이 개인정보를 수정했습니다.",
      date: "30/10/2020",
      link: "/home/timeline",
    },
    {
      action: "create",
      type: "profile",
      content: "Min Chang Park님이 등록했습니다.",
      date: "30/10/2020",
      link: "/home/timeline",
    },
  ]
  const actionLabels = {
    create: "등록",
    update: "수정",
    delete: "삭제",
  }
  
  return (
    <SubContent>
      <SubContentEnd>
        <Header annecdote="검색기능은 기본적으로 현재 학기에만 적용됩니다. 설정하려면 필터를 바꾸세요"/>
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
                <TextField {...params} size="small" label="타임라인에서 검색하기" variant="filled" className={classes.search} />
                <Divider className={classes.divider} orientation="vertical"/>
                <Tooltip placement="top" arrow title="검색하기" aria-label="search" >
                  <IconButton onClick={()=>console.log("clicked")} className={classes.iconButton} aria-label="search">
                    <SearchIcon/>
                  </IconButton>
                </Tooltip>
                <Divider className={classes.divider} orientation="vertical"/>
                <Tooltip placement="top" arrow title="필터" aria-label="filter" >
                  <IconButton onClick={()=>console.log("clicked")} className={classes.iconButton} aria-label="filter">
                    <FilterListIcon/>
                  </IconButton>
                </Tooltip>
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
        <Timeline className={classes.timeline}>
          {timelineProps.map((item, index)=>{
            const {action, type, content, date, link} = item
            console.log(timelineProps.length, index + 1)
            const last = timelineProps.length === index + 1
            return(
              <TimelineItem>
                <TimelineSeparator>
                  <Tooltip placement="top" arrow title={actionLabels[action]} aria-label={action}>
                    <TimelineDot className={classes.timelineDot}>
                      <Badge 
                        badgeContent={badgeContent[action]}
                        anchorOrigin={{vertical: 'bottom',horizontal: 'right',}}
                      >
                        {timelineDotIcon[type]}
                      </Badge>
                    </TimelineDot>
                  </Tooltip>
                  {!last && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContent}>
                  <NavLink to={link}>
                    <Paper elevation={0} className={classes.paper}>
                      <span style={{fontSize: 16, fontWeight:400}}>
                        {content}
                      </span>
                      <span style={{fontSize: 12, fontWeight: 300, color: "#707070"}}>
                        {date}
                      </span>
                    </Paper>
                  </NavLink>
                </TimelineContent>
              </TimelineItem>
            )
          })}
        </Timeline>
      </SubContentEnd>
    </SubContent>
  )
}

export default TimelineComp
