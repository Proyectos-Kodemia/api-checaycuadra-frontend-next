import React, { useState } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Link, TextField, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import imageLogin from '../../images/graphLogin.svg'
import { URL_BASE } from '../../services/config'

import LoginAccount from './LoginAccount'

const schema = yup.object({
  email: yup.string().email('***El email no es valido').required('***El campo es requerido').max(50, '***Máximo 50 caracteres'),
  password: yup.string().required('El campo es requerido')
}).required('El campo es requerido')

const FormLogin = ({ rol }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const url = '#'
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const dataLogin = async (data) => {
    let direction = ''

    if (rol === 'Contador') direction = 'http://localhost:8000/auth/account'
    else direction = 'http://localhost:8000/auth/users'

    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token')
    }

    try {
      const result = await LoginAccount(direction, data)
      const res = await result.json()
      console.log(res.status)
      if (res.status) {
        console.log('se creo el token y se almaceno')
        const response={
          token:res.token,
          id:res.sub,
          role:res.role
        }
        

        sessionStorage.setItem('token', JSON.stringify(response))
        // localStorage.setItem('user-info', JSON.stringify(res.token))
        setLoading(false)
       
        router.push(`${URL_BASE}/principal/Buscador`)

      } else {
        setError(true)
        console.log('error en login ')
      }
    } catch (err) {
      setError(true)
      console.log(err)
    }
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  if (error) {
    return <div>Error al obtener los datos. Favor de recargar la página</div>
  }

  if (loading) return <>Please wait a moment...</>

  return (
    <>
      <div>
        <form className='rounded mt-3 justify-content-center' onSubmit={handleSubmit(dataLogin)}>
          <TextField
            label='Correo electrónico'
            placeholder='midirección@mail.com'
            color='secondary'
            required
            fullWidth
            sx={{ fontSize: '12' }}
            {...register('email')}
          />
          <div id='emailHelp' className='mb-4 error text-danger'>{errors.email?.message}</div>

          <TextField
            label='Contraseña'
            placeholder='Ingrese contraseña'
            color='secondary'
            required
            fullWidth
            sx={{ fontSize: '12', mb: 3 }}
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <span id='passwordHelp' className='mb-4 error text-danger'>{errors.password?.message}</span>
          <Button
            type='submit'
            className='buttonStyle mb-2'
            variant='contained'
            fullWidth
          >
            Iniciar sesión
          </Button>
        </form>
      </div>

      <div className='remember'>
        <a className='forgetPass' href={url}>Olvidé mi contraseña</a>
        <Image src={imageLogin} width='300' height='150' />
        <div className='register'>¿No tienes una cuenta?<Link href={`${URL_BASE}/Cuenta/RegisterPage`} underline='none'> ¡Registrate!</Link></div>
      </div>
    </>
  )
}

export default FormLogin
