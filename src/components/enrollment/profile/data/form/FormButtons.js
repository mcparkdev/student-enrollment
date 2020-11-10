import React from 'react'
import Button from '@material-ui/core/Button';

const FormButtons = (props) => {
  const {readOnly, setReadOnly, handleCancelEdit,handleSubmit, onSubmit} = props
  return (
    <div className="form-buttons">
      {readOnly ?
        <Button 
          className="form-edit"
          // type="submit"
          // fullWidth
          variant="contained"
          color="primary"
          onClick={()=>setReadOnly(false)}
        >
          Editar
        </Button>
        :
        <>
          <Button 
            className="form-submit"
            type="reset"
            // fullWidth
            // variant="contained"
            color="primary"
            onClick={()=>handleCancelEdit()}
          >
            Cancelar
          </Button>
          <Button 
            className="form-submit"
            type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Actualizar
          </Button>
        </>
      }
    </div>
  )
}

export default FormButtons
