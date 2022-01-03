import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, TextField } from '@mui/material'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
// import Favorite from '@mui/icons-material/Favorite'

// import { makeStyles } from '@material-ui/core'

import LoginAccount from './LoginAccount'

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: theme.spacing(2),

//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '300px'
//     },
//     '& .MuiButtonBase-root': {
//       margin: theme.spacing(2)
//     }
//   }
// }))

const schema = yup.object({
  email: yup.string().email('***El email no es valido').required('***El campo es requerido').max(100, '***Máximo 100 caracteres'),
  password: yup.string().required('El campo es requerido')
}).required('El campo es requerido')

// const validarCorreo = (email) => {
//   const expReg =
//     /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
//   const isValid = expReg.test(email)
//   // isValid ? setEmailValid(false) : setEmailValid(true)
//   return isValid
// }

const FormLogin = ({ rol }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const url = '#'
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  // const classes = useStyles()

  // useEffect(() => {
  // if (localStorage.getItem('user-info')) {
  // }
  // }, [])

  const dataLogin = async (data) => {
    let direction = ''

    if (rol === 'Contador') direction = 'http://localhost:8000/auth/account'
    else direction = 'http://localhost:8000/auth/users'

    // if (localStorage.getItem('user-info')) {
    //   localStorage.removeItem('user-info')
    // }
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token')
    }

    try {
      const result = await LoginAccount(direction, data)
      const res = await result.json()
      console.log(res.status)
      if (res.status) {
        console.log('se creo el token y se almaceno')
        sessionStorage.setItem('token', JSON.stringify(res.token))
        // localStorage.setItem('user-info', JSON.stringify(res.token))
        setLoading(false)
        router.push('/Login/Login')
      } else {
        setError(true)
        console.log('error en login ')
      }
    } catch (err) {
      setError(true)
      console.log(err)
    }
  }

  if (error) {
    return <div className='pass'>Error al obtener los datos. Favor de recargar la página</div>
  }

  if (loading) return <>Please wait a moment...</>

  return (
    <>
      <div className='container'>
        <div className='row'>
          <form className='rounded mt-3 justify-content-center' onSubmit={handleSubmit(dataLogin)}>
            <TextField
              label='Correo electrónico'
              placeholder='midirección@mail.com'
              color='secondary'
              required
              fullWidth
              className='inputStyle'
              {...register('email')}
            />
            <div id='emailHelp' className='mb-4 error text-danger'>{errors.email?.message}</div>

            <TextField
              label='Contraseña'
              placeholder='Ingrese contraseña'
              // falta checar cambio de color de contorno input
              color='secondary'
              type='password'
              required
              fullWidth
              className='inputStyle'
              {...register('password')}
            />
            <span id='passwordHelp' className='mb-4 error text-danger'>{errors.password?.message}</span>
            {/*
            <FormControlLabel
              className='inputStyle'
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite className='heartStyle' />}
                />
              } label='Recordar Usuario'
            /> */}

            <Button
              type='submit'
              className='buttonStyle'
              variant='contained'
              fullWidth
            >
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>

      <div className='remember'>
        <a className='forgetPass' href={url}>Olvidé mi contraseña</a>

        <div className='register'>¿No tienes una cuenta?<a href={url}>¡Registrate!</a></div>
      </div>

    </>
  )
}

export default FormLogin
