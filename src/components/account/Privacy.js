import React from 'react'

import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Privacy = (props) => {
  const {language, openPrivacyDialog, setOpenPrivacyDialog} = props
  const text = {
    korean: {
      title: "재콜롬비아한국학교 개인정보처리방침",
      content: "개인정보처리방침",
      actions:{
        ok: "확인",
      }
    },
    spanish: {
      title: "Políticas de privacidad del Colegio Colombo Coreano",
      content: "Contenidos de políticas de privacidad",
      actions:{
        ok: "Entendido",
      }
    },
  }
  const {title, content, actions} = text[language] ? text[language] : text["korean"]
  return (
    <Dialog open={openPrivacyDialog} onClose={()=>setOpenPrivacyDialog(false)} aria-labelledby="terms-dialog" maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpenPrivacyDialog(false)} color="primary">
          {actions.ok}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Privacy
