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
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CheckIcon from '@material-ui/icons/Check';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button"
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//     fontWeight: 600,
//   },
// }));
const Table = (props) => {
  // const classes = useStyles();
  const {header, body, selectedRow, setSelectedRow, breadcrumbLinks, handleIsSiderOpen, loading} = props

  const [anchorElMore, setAnchorElMore] = React.useState(null);

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
  const [checkedItems, setCheckedItems] = useState(Array(body.length).fill(false))
  // console.log(checkedItems)
  const isAllChecked = !checkedItems.includes(false)
  const isNoneChecked = !checkedItems.includes(true)
  const isPartiallyChecked = !isAllChecked && !isNoneChecked
  const handleCheckedItems = (key) => {
    return setCheckedItems((event) => {
      return checkedItems.map((checked, index)=> key === index ? !checked : checked )});
  };
  const handleAllChecked = () => {
    setCheckedItems(checkedItems.map(() => isPartiallyChecked ? false : (isAllChecked ? false : true) ))
  }
  useEffect(() => {
    setAllChecked({checked:isAllChecked, indeterminate:isPartiallyChecked, disabled:!checkedItems.length})
  }, [checkedItems, isAllChecked, isPartiallyChecked])
  const toolbarProps = {router:props.router, viewport: props.viewport, isNoneChecked, breadcrumbLinks, handleIsSiderOpen, checkedItems, handleClickMore}
  const headerProps = {allChecked, handleAllChecked, header, viewport: props.viewport}

  const menuNames = ["open","preview","favorite","select","edit","delete"]
  const menuLabels = ["열기", "보기","즐겨찾기","선택","수정","삭제"]
  const menuActions = [handleCloseMore, handleCloseMore, handleCloseMore, handleCloseMore, handleCloseMore, handleCloseMore, ]
  const menuIcons = [<FolderOpenIcon/>, <VisibilityOutlinedIcon/>, <StarBorderOutlinedIcon/>, <CheckIcon/>, <EditOutlinedIcon/>, <DeleteOutlinedIcon/> ]
  const menuProps = menuNames.map((name, index)=>{
    const label = menuLabels[index]
    const action = menuActions[index]
    const icon = menuIcons[index]
    return {name, label, action, icon}
  })
  return (
    <div className="subcontent-body">
      <TableToolbar {...toolbarProps}/>
      <table className="table">
        <TableHeader {...headerProps}/>
        {!loading && 
          <tbody className="table-body">
          {body.map((row,index)=>{
            const{cells, favorite} = row
            const name = cells[0]
            const modified = cells[1]
            const paymentProgress = cells[2]
            return (
              <tr key={name.label} className={`table-body-row ${index === selectedRow ? "selected" : ""}`} onClick={()=>setSelectedRow(index)}>
                <td className="table-body-row-cell checkbox">
                  <Checkbox key={index} color="primary" checked={checkedItems[index]} onChange={() => handleCheckedItems(index)}/>
                </td>
                <td className="table-body-row-cell name">
                  <NavLink to={`/management/data/${name.label}`}>
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
                {!props.viewport.xs && <td className="table-body-row-cell modified">{modified.label}</td>}
                <td className="table-body-row-cell current-status-actions">
                  {/* <LinearProgress variant="determinate" value={75}/> */}
                  {!props.viewport.xs &&
                    <>
                      <LinearProgressWithLabel variant="determinate" {...paymentProgress} />
                      <div className="table-row-action-buttons">
                        <Button startIcon={<PersonIcon />}>프로필</Button>
                      </div>
                    </>
                  }
                  <Tooltip placement="top" title="더보기">
                    <IconButton aria-label="more" color="primary" onClick={handleClickMore}>
                      <MoreHorizIcon/>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="simple-menu"
                    elevation={1}
                    anchorEl={anchorElMore}
                    keepMounted
                    open={Boolean(anchorElMore)}
                    onClose={handleCloseMore}
                  >
                    {/* {menuOrder.map((order) => {
                      order.map((key, index) =>{
                        const menu = menuProps[key]
                        console.log(menu)
                        const {name, label, icon, action} = menu
                        return(
                          <li className="menu-item" key={`${name} ${label}`}>
                            <Button onClick={action} style={{textAlign: "left"}} fullWidth startIcon={icon}>{label}</Button>
                          </li>    
                        )
                      })
                      return(<div className="divider" style={{}}/>)
                    })} */}
                    {menuProps.map((menu, index)=>{
                      const {name, label, icon, action} = menu
                      const divider = index === 2
                      return (
                        <li className="menu-item" key={`${name} ${label}`}>
                          <Button onClick={action} style={{textAlign: "left"}} fullWidth startIcon={icon}>{label}</Button>
                          {divider && <div className="divider" style={{padding:0}}/>}
                        </li>    
                      )
                    })}
                  </Menu>
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
