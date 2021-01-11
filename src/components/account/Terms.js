import React from 'react'

import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Terms = (props) => {
  const {language, openTermsDialog, setOpenTermsDialog} = props
  const text = {
    korean: {
      title: "재콜롬비아한국학교 서비스 약관",
      content: "서비스 약관 내용",
      actions:{
        ok: "확인",
      }
    },
    spanish: {
      title: "Términos y condiciones del servicio del Colegio Colombo Coreano",
      content: "Términos y condiciones",
      actions:{
        ok: "Entendido",
      }
    },
  }
  const {title, content, actions} = text[language] ? text[language] : text["korean"]
  return (
    <Dialog open={openTermsDialog} onClose={()=>setOpenTermsDialog(false)} aria-labelledby="terms-dialog" maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpenTermsDialog(false)} color="primary">
          {actions.ok}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Terms
