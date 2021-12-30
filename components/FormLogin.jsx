import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, TextField } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'

import LoginAccount from './LoginAccount'

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

  // useEffect(() => {
  // if (localStorage.getItem('user-info')) {
  // }
  // }, [])

  const heartStyle = { color: 'red' }
  const inputStyle = { padding: '8px 0' }
  const buttonStyle = { backgroundColor: '#075c2c', padding: '5px 0', margin: '5px 0' }

  const dataLogin = async (data) => {
    let direction = ''

    if (rol === 'Contador') direction = 'http://localhost:8000/auth/account'
    else direction = 'http://localhost:8000/auth/users'

    localStorage.removeItem('user-info')
    const result = await LoginAccount(direction, data)
    // .then((res) => {
    //   if (!response.ok) {
    //   throw new Error('Network response was not OK');
    // }
    // })
    // .catch((err) => {
    //   // setError(true)
    //   console.log('error dentro del fetch 2 ', err)
    //   return { status: 'false' }
    // })
    // .finally(() => setLoading(true))

    const res = await result.json()
    const responseJSON = await res.json()
    if (res.status === 200) {
      router.push('/dashboard')
      console.log('se creo el token y se almaceno')
      sessionStorage.setItem('token', responseJSON.token)
      setLoading(false)
      localStorage.setItem('user-info', JSON.stringify(res.token))
    } else {
      setError(true)
      console.log('error en login ')
    }
  }

  if (error) {
    return <div className='pass'>Error al obtener los datos. Favor de recargar la página</div>
  }

  if (loading) return <>Please wait a moment...</>

  return (
    <>
      {/* <span className='remember'>
        {credencialsValid && <div style={textStyle}>El usuario o contraseña son incorrectos</div>}
        {emailValid && <div style={textStyle}>Los datos son incorrectos</div>}
      </span> */}
      <div className='container'>
        <div className='row'>
          <form className='border rounded mt-2 justify-content-center' onSubmit={handleSubmit(dataLogin)}>
            <TextField
              label='Email'
              placeholder='Ingrese Email'
              color='secondary'
              required
              fullWidth
              style={inputStyle}
              {...register('email')}
            />
            <div id='emailHelp' className='mb-4 error text-danger'>{errors.email?.message}</div>

            <TextField
              label='Password'
              placeholder='Ingrese Password'
              color='secondary'
              type='password'
              required
              fullWidth
              style={inputStyle}
              {...register('password')}
            />
            <span id='passwordHelp' className='mb-4 error text-danger'>{errors.password?.message}</span>

            <FormControlLabel
              style={inputStyle}
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite style={heartStyle} />}
                />
        }
              label='Recordar Usuario'
            />

            <Button
              type='submit'
              style={buttonStyle}
              variant='contained'
              fullWidth
            >
              Ingresar
            </Button>
          </form>
        </div>
      </div>

      <div className='remember'>
        <a className='pass' href={url}>¿Olvidaste la contraseña?</a>
        <div className='pass'>¿No tienes cuenta?<a href={url}>Registrate</a></div>
      </div>

    </>
  )
}

export default FormLogin
