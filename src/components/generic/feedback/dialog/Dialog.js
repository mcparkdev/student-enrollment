import React from 'react'
import MuiDialog from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "./dialog.scss"

const styles = (theme) => ({
  title: {
    margin: 0,
    padding: 20,
    fontWeight: 600,
    fontSize: 18,
  },
  titleWithClose:{
    margin: 0,
    padding: 20,
    fontWeight: 600,
    fontSize: 18,
    paddingRight: 68,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, subtitle, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={onClose ? classes.titleWithClose : classes.title} {...other}>
      <div className="dialog-title">{children}</div>
      {subtitle && <div className="dialog-subtitle">{subtitle}</div>}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: 20,
    fontSize: 16,
    fontWeight: 400,
    // marginBottom: 20,
  },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Dialog = (props) => {
  return (
    <MuiDialog className="dialog" {...props} >
      {props.children}
    </MuiDialog>    
  )
}

export default Dialog
