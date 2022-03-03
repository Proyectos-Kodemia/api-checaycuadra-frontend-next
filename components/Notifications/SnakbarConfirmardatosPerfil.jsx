import React, { useState, forwardRef } from 'react'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function SnackbarConfirmarCita ({ saveData }) {
  const [isOpen, setIsOpen] = useState(true)
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center'
  })

  const { vertical, horizontal } = state

  const handleClose = () => {
    setState({ ...state, open: false })
    setIsOpen(false)
  }

  const severityOptions = (saveData) => {
    let result = ''
    switch (saveData) {
      case 'Save':
        result = 'success'
        break
      case 'Error':
        result = 'error'
        break
    }
    return result
  }

  const messageOptions = (saveData) => {
    let result = ''
    switch (saveData) {
      case 'Save':
        result = 'Datos guardados correctamente'
        break
      case 'Error':
        result = 'Error, no se guardaron los datos, intente nuevamente'
        break
    }
    return result
  }

  const severity = severityOptions(saveData)
  const message = messageOptions(saveData)

  return (
    <div>
      <Snackbar
        open={isOpen}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
        autoHideDuration={6000}
        key={vertical + horizontal}

      >
        <Alert
          onClose={handleClose}
          severity={severity}
          x={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
