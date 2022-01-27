import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Link, TextField, InputAdornment, IconButton } from '@mui/material'
import MuiPhoneNumber from 'material-ui-phone-number'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import imageLogin from '../../images/graphLogin.svg'

// esquema de validaciones de input
const schema = yup.object({
  email: yup.string().email('***El email no es valido').required('***El campo es requerido').max(100, '***Máximo 100 caracteres'),
  phone: yup.string().min(8, 'El número debe incluir al menos 8 caracteres').required('El campo es requerido'),
  password: yup.string().required('El campo es requerido').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Debe contener 8 caracteres, 1 Mayuscula, 1 minuscula, 1 número y 1 caracter especial'
  ),
  passwordConfirmation: yup.string().required('El campo es requerido').oneOf([yup.ref('password'), null], 'Ambas casillas de password deben coincidir')
}).required('El campo es requerido')

function FormRegister ({ rol }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  async function sendFetchNoToken (url, data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    return response.json()
  }

  const dataLogin = async (data) => {
    let direction = ''

    console.log(data)
    if (rol === 'Contador') direction = 'http://localhost:8000/account'
    else direction = 'http://localhost:8000/users'

    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token')
    }
    // aqui pondriamos aviso al usuario que se creo correctamente
    const response = sendFetchNoToken(direction, data)

    router.push('/')
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  if (error) {
    return <div className='pass'>Error al obtener los datos. Favor de recargar la página</div>
  }

  if (loading) return <>Please wait a moment...</>

  return (
    <>
      <form className='rounded mt-3 justify-content-center' onSubmit={handleSubmit(dataLogin)}>
        <TextField
          name='email'
          label='Correo electrónico'
          placeholder='midirección@mail.com'
          color='secondary'
          required
          fullWidth
          sx={{ fontSize: ' 12px' }}
          {...register('email')}
        />
        <div id='emailHelp' className='mb-4 error text-danger'>{errors.email?.message}</div>

        {/* https://codesandbox.io/s/64024619-how-to-validate-material-ui-phone-number-with-yup-forked-8329m */}
        <Controller
          name='phone'
          control={control}
          defaultValue=''
          render={({ field: { name, onBlur, onChange, value } }) => (
            <MuiPhoneNumber
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              regions='america'
              color='secondary'
              id='contactPhoneNumber'
              defaultCountry='mx'
              fullWidth
              label='Número telefónico'
              variant='outlined'
              margin='normal'
              error={Boolean(errors.phone)}
            />
          )}
        />

        <span id='passwordHelp' className='mb-2 error text-danger'>{errors.phone?.message}</span>

        <TextField
          label='Contraseña'
          placeholder='Ingrese contraseña'
          color='secondary'
          required
          fullWidth
          sx={{ fontSize: ' 12px', mb: 2 }}
          type={showPassword ? 'text' : 'password'}
          name='password'
          {...register('password')}
          InputProps={{
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
        <span id='passwordHelp' className='mb-2 error text-danger'>{errors.password?.message}</span>

        <TextField
          label='ConfirmeContraseña'
          placeholder='Reingrese contraseña'
                  // falta checar cambio de color de contorno input
          color='secondary'
          type='password'
          required
          fullWidth
          sx={{ fontSize: ' 12px', mb: 2 }}
          name='passwordConfirmation'
          {...register('passwordConfirmation')}
        />
        <span id='passwordHelp' className='mb-2 error text-danger'>{errors.passwordConfirmation?.message}</span>

        <div className='remember'>
          <Button
            type='submit'
            className='buttonStyle'
            sx={{ px: 2, py: 1, my: 1, mx: 'auto' }}
            variant='contained'
          >
            ¡ Registrarme !
          </Button>
        </div>
      </form>

      <div className='remember'>
        <div><a className='forgetPass' href='#'>Olvidé mi contraseña</a></div>
        <Image src={imageLogin} width='300' height='150' />
        <div className='register'>¿Ya tienes una cuenta?<Link href={'/Cuenta/LoginPage'} underline='none'> ¡Inicia sesión!</Link></div>
      </div>

    </>
  )
}

export default FormRegister
