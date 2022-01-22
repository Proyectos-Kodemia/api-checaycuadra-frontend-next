import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({statusPayment}) {

  const severityOptions = (statusPayment)=>{
    switch (statusPayment) {
      case "approved":
        result = "success"
        break
      case "failure":
        result =  "error"
        break
      case "pending":
        result = "warning"
        break
      default:
        result ="warning"
  
    }
    return result
  }
  
  const messageOptions = (statusPayment)=>{
    switch (statusPayment) {
      case "approved":
        result = "Pago realizado exitosamente"
        break
      case "failure":
        result =  "Pago no realizado"
        break
      case "pending":
        result = "Pago no concluido"
        break
      default:
        result ="Pago no realizado, intente de nuevo"
    }
    return result
  }




  const [open, setOpen] = React.useState(false);


  // 
  const handleOpen = (event, statusPayment) => {
    setOpen(true)
    let severity = severityOptions(statusPayment)
    let message = messageOptions(statusPayment)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
  
      <Snackbar
        value={open}
        onChange ={e => setOpen(e.target.value)}
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}>
        <Alert onClose={handleClose} 
        severity= {severity} 
        x={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  );
}