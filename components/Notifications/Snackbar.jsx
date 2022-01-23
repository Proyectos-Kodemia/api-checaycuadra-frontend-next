import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({statusPayment}) {
  const [isOpen, setIsOpen] = useState(true);

  const callBack = () => {
    setIsOpen(false)
  };

  const severityOptions = (statusPayment)=>{
    let result =""
    switch (statusPayment) {
      case "approved":
        result = "success"
        break
      case "failure":
        result = "error"
        break
      case "pending":
        result = "warning"
        break
      // default:
      //   result ="warning"
      //   break
    }
    return result
  }
  
  const messageOptions = (statusPayment)=>{
    let result =""
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
      // default:
      //   result ="Pago no realizado, intente de nuevo"
      //   break
    }
    return result
  }


  let severity = severityOptions(statusPayment)
  let message = messageOptions(statusPayment)


  return (
  
      <Snackbar
        open={isOpen} 
        autoHideDuration={6000} 
        onClose={callBack}>
        <Alert onClose={callBack} 
        severity= {severity} 
        x={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  );
}