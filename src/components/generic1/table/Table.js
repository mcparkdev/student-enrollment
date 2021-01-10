import React, {useState, useEffect} from 'react'

import { NavLink } from 'react-router-dom';
import LinearProgressWithLabel from "../../generic/linearProgress/LinearProgressWithLabel"

import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip"
import Menu from '@material-ui/core/Menu';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box'
// import MenuItem from '@material-ui/core/MenuItem';

import PersonIcon from "@material-ui/icons/Person";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import FolderIcon from '@material-ui/icons/Folder';
// import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CheckIcon from '@material-ui/icons/Check';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button"
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';

const Table = (props) => {
  // const classes = useStyles();
  const {header, body, selectedRow, setSelectedRow, breadcrumbLinks, handleIsSiderOpen, loading} = props

  const [anchorElMore, setAnchorElMore] = useState(null);

  const handleClickMore = (event) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorElMore(null);
  };

  const [allChecked, setAllChecked] = useState({
    checked: false,
    indeterminate: false,
    disabled: false
  })
  const [checkedItems, setCheckedItems] = useState(Array(props.body.length).fill(false))
  
  useEffect(()=>{
    // console.log(props.body.length)
    setCheckedItems(Array(props.body.length).fill(false))
  },[props.body])

  const isAllChecked = !checkedItems.includes(false)
  const isNoneChecked = !checkedItems.includes(true)
  const isPartiallyChecked = !isAllChecked && !isNoneChecked
  const handleCheckedItems = (key) => {
    console.log("handleCheckedItems")
    return setCheckedItems((event) => {
      return checkedItems.map((checked, index)=> key === index ? !checked : checked )});
  };
  const handleAllChecked = () => {
    console.log("handleAll")
    setCheckedItems(checkedItems.map(() => isPartiallyChecked ? false : (isAllChecked ? false : true) ))
  }
  useEffect(() => {
    setAllChecked({checked:isAllChecked, indeterminate:isPartiallyChecked, disabled:!checkedItems.length})
  }, [checkedItems, isAllChecked, isPartiallyChecked])
  const toolbarProps = {router:props.router, viewport: props.viewport, isNoneChecked, breadcrumbLinks, handleIsSiderOpen, checkedItems, handleClickMore}
  const headerProps = {allChecked, handleAllChecked, header, viewport: props.viewport}

  const menuNames = ["preview","favorite","select","edit","delete"]
  const menuLabels = ["미리보기","즐겨찾기","선택","수정","삭제"]
  const handlePreview = () =>{
    handleCloseMore();
    // setSelectedRow()
  }
  const menuActions = [handlePreview, handleCloseMore, handleCloseMore, handleCloseMore, handleCloseMore, ]
  const menuIcons = [<VisibilityOutlinedIcon/>, <StarBorderOutlinedIcon/>, <CheckIcon/>, <EditOutlinedIcon/>, <DeleteOutlinedIcon/> ]
  const menuProps = menuNames.map((name, index)=>{
    const label = menuLabels[index]
    const action = menuActions[index]
    const icon = menuIcons[index]
    return {name, label, action, icon}
  })
  console.log(body)
  return (
    <div className="subcontent-body">
      <TableToolbar {...toolbarProps}/>
      <table className="table">
        <TableHeader {...headerProps}/>
        {!loading && 
          <tbody className="table-body">
          {body.map((row,index)=>{
            const{cells, favorite, id} = row
            const name = cells[0]
            const modified = cells[1]
            const paymentProgress = cells[2]
            return (
              <tr key={name.label} className={`table-body-row ${index === selectedRow ? "selected" : ""}`} >
                <td className="table-body-row-cell checkbox">
                  <Checkbox key={index} color="primary" checked={checkedItems[index]} onChange={() => handleCheckedItems(index)}/>
                </td>
                <td className="table-body-row-cell name" onClick={()=>setSelectedRow(index)} >
                  <NavLink to={`/management/${name.label}`}>
                    <Button startIcon={<FolderIcon color="disabled"/>}>
                      {name.label}
                    </Button>
                  </NavLink>
                  {favorite && 
                    <Tooltip placement="top" title="즐겨찾기에서 제거" >
                      <div className="favorite">
                        <Checkbox icon={<StarIcon />} disabled/>                      
                      </div>
                    </Tooltip>
                  }
                </td>
                {!props.viewport.xs && 
                  <td className="table-body-row-cell modified">
                    <div className="modified-cell">
                      {modified.label}
                    </div>
                    <div className="table-row-action-buttons">
                      <Button startIcon={<PersonIcon />}>프로필</Button>
                    </div>
                  </td>
                  }
                <td className="table-body-row-cell current-status-actions">
                  {/* <LinearProgress variant="determinate" value={75}/> */}
                  {!props.viewport.xs &&
                    <>
                      <LinearProgressWithLabel variant="determinate" {...paymentProgress} />
                    </>
                  }
                  <Tooltip placement="top" title="더보기">
                    <IconButton aria-label="more" color="primary" onClick={handleClickMore}>
                      <MoreHorizIcon/>
                    </IconButton>
                  </Tooltip>
                  {Boolean(anchorElMore) &&
                    <Menu
                      id="simple-menu"
                      elevation={1}
                      anchorEl={anchorElMore}
                      keepMounted
                      open={Boolean(anchorElMore)}
                      onClose={handleCloseMore}
                    >
                      {menuProps.map((menu, menuIndex)=>{
                        const {label, icon, action} = menu
                        const divider = menuIndex === 2
                        // console.log("index: ", key)
                        return (
                          <li className="menu-item" key={`${menu.name} ${label}`}>
                            <Button onClick={()=>{action();console.log(id)}} style={{textAlign: "left"}} fullWidth startIcon={icon}>
                              {label} {id}
                            </Button>
                            {divider && <div className="divider" style={{padding:0}}/>}
                          </li>
                        )
                      })}
                    </Menu>
                  }
                </td>
              </tr>
            )
          })}
          </tbody>
        }
      </table>
      {loading &&
        <>
          {[0,1,2,3,4,5,6,7,8].map(key => (
            <Box  py={1} key={`table-row-skeleton-${key}`} display="flex" flexDirection="row" justifyContent="space-between">
              <Skeleton variant="rect" width="85%" height={40} />
              <Skeleton variant="circle" width={40} height={40}/>
            </Box>
            // <Box py={2} display="flex" flexDirection="row" justifyContent="flex-start">
            //   <Box mr={props.viewport.xs ? 0 : 4} fullWidth>
            //   </Box>
            //   {!props.viewport.xs && <Skeleton key={`table-row-skeleton-${key}`} variant="rect" width="20%" height={27} />}                
            // </Box>
          ))}
        </>          
      }
    </div>
  )
}

export default Table
