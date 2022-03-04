import React, { useState, useEffect } from 'react'
import { Box, TextField, Typography, InputAdornment, Button, styled, Autocomplete, Chip } from '@mui/material'

import AttachFileIcon from '@mui/icons-material/AttachFile'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import styles from './FormPerfil.module.scss'
import { URL_FULL } from '../../services/config'
import ControlledSwitches from '../Controlled/Switch'
import Modal from '../Controlled/Modal'
import { Router, useRouter } from 'next/router'
import { FourGPlusMobiledataRounded } from '@mui/icons-material'
import Snackbar from '../Notifications/SnakbarConfirmardatosPerfil'

const especialidades = [
  { id: 1, title: 'Contabilidad General' },
  { id: 2, title: 'Finanzas' },
  { id: 3, title: 'Administración' },
  { id: 4, title: 'Auditoría' },
  { id: 5, title: 'Contraloría' },
  { id: 6, title: 'Fiscal' },
  { id: 7, title: 'Impuestos (SAT)' },
  { id: 8, title: 'Costos' },
  { id: 9, title: 'Obligaciones de seguridad social (IMSS)' }
]
// const {id} = router.query

const schema = yup.object().shape({
  nombre: yup.string().max(80, '***Máximo 80 caracteres').required('El nombre es requerido'),
  apellidos: yup.string().max(80, '***Máximo 80 caracteres').required('Los apellidos son requeridos'),
  estado: yup.string().max(50, '***Máximo 50 caracteres').required('El estado es requerido'),
  municipio: yup.string().max(50, '***Máximo 50 caracteres').required('El municipio es requerido'),
  precio: yup.string().max(50, '***Máximo 50 caracteres').required('El precio de honorarios es requerido'),
  cedula: yup.string().max(20, '***Máximo 20 caracteres'),
  formacion: yup.string().max(50, '***Máximo 50 caracteres').required('La formación es requerida'),
  google: yup.boolean(),
  email: yup.string().when('google', {
    is: true,
    then: (schema) => schema.required('El correo gmail es requerido').email('***El email no es valido')
      .max(50, '***Máximo 50 caracteres')
      .matches(/[\w.\-]{0,25}@gmail\.com/gm, '***Solo correos gmail son aceptados'),
    otherwise: (schema) => schema.optional()
  })
}).required()

function FormPerfil({ sendToCalendar }) {
  // Hook del switch
  const [checked, setChecked] = useState(true)

  // Hook del modal
  const [open, setOpen] = useState(false)

  // snakbarperfil
  const [saveData, setSaveData] = useState(false)

  // Recibiendo code autenticación de google
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const token = window.sessionStorage.getItem('token')

      const url = `${URL_FULL}/google/callback`

      const bodyCode = JSON.stringify({ code: router.query.code })

      const datos = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', token: token },
        body: bodyCode
      }

      fetch(url, datos)
        .then((res) => {
          res.json()
            .then((data) => {
              // console.log('data desde el fetch formperfil', data)
              setSaveData(data.ok)
            })
        })
        .catch(function (error) {
          console.log(error)
        })

      // Obteniendo datos de id desde token
      // const options = {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     token: token
      //   }
      // }

      // const endpoint = `${URL_FULL}/account/verifyAuth` // :${idUser}

      // fetch(endpoint, options)
      //   .then(res => {
      //     res.json()
      //       .then((data) => {
      //         setIdUser(data.payload)
      //       })
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })

      // console.log('endpoint del patch', endpoint)
      // console.log('response fetch', response)
    }
  }, [router.query])

  const defaultValues = {
    nombre: '',
    apellidos: '',
    estado: '',
    municipio: '',
    cedula: '',
    precio: '',
    formacion: '',
    google: true,
    email: ''
    // especialidades:[especialidades[0]]
  }

  const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  })

  // Handle switch
  const handleSwitch = (val) => {
    setValue('google', val)
    if (!val) {
      setOpen(true)
      // console.log(' en el handleswitch', val)
    }
  }

  // Handle del modal
  const handleClose = () => {
    setOpen(false)
  }

  const Input = styled('input')({
    display: 'none'
  })

  // Enviendo informacion al back con autentiacion google / sin autenticacion Google
  const dataFormPerfil = async (data) => {
    setSaveData(false)
    if (checked === true) {
      const token = window.sessionStorage.getItem('token')

      // Sending patch Account info
      async function patchAccount(data) {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'multipart/form-data',
            token: token
          },
          body: JSON.stringify(data)
        }

        const endpoint = `${URL_FULL}/account/perfil/`
        const response = await fetch(endpoint, options)
        return response.json()
      }

      // Sending request to account patch to server
      await patchAccount(data)
        .then(response => {
          // console.log(data)
          setSaveData(response.status)
          // console.log('se almacenaron los datos', response)
        })
        .catch(error => {
          console.log(error)
        })

      // Enviando a autenticacion de google
      const endpointAuthGoogle = `${URL_FULL}/google/auth`

      async function loginAccountGoogle (url) {
        // console.log('entrando a la funcion loginaccount google')
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const response = await fetch(url, options)
        return response.json()
      }

      const optionsAuthGoogle = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          token: token // Enviar en el post el token de JWT
        }
      }

      await loginAccountGoogle(endpointAuthGoogle)
        .then(response => {
          location.href = response.payload.authUrl
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      const token2 = window.sessionStorage.getItem('token')
      // Sending patch Account info
      async function patchAccount2(data) {
        // console.log(">> data " ,data)
        const sendData = new FormData()
        sendData.append('imgfile',data.fotoPerfil[0])
        sendData.append('nombre',data.nombre)
        sendData.append('apellidos',data.apellidos)
        sendData.append('estado',data.estado)
        sendData.append('municipio',data.municipio)
        sendData.append('cp',data.cp)
        sendData.append('precio',data.precio)
        sendData.append('cedula',data.cedula)
        sendData.append('formacion',data.formacion)

        const especialidades = JSON.stringify(data.especialidades)
        sendData.append('especialidades',especialidades)

        sendData.append('acercade',data.acercade)
        sendData.append('email',data.email)

        const options = {
          method: 'PATCH',
          headers: {
            token: token2
          },
          body: sendData
        }
        const endpoint = `${URL_FULL}/account/perfil`
        const response = await fetch(endpoint, options)

        return response.json()
      }

      // Sending request to account patch
      await patchAccount2(data)
        .then(response => {
          setSaveData(response.status)
          // console.log('se almacenaron los datos', response)
          // console.log(data)
          // console.log(response)
        })
        .catch(error => {
          setSaveData(false)
          console.log(error)
        })
      function waitforme (milisec) {
        return new Promise(resolve => {
          setTimeout(() => { resolve('') }, milisec)
        })
      }

      async function printy () {
        for (let i = 0; i < 10; ++i) {
          await waitforme(1000)
        }
        sendToCalendar()
      }

      if (saveData) {
        printy()
      }
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      p: 1,
      m: 1

    }}
    >
      <form className='containerFormPerfil' onSubmit={handleSubmit(dataFormPerfil)}>
        <Typography className='typografyPerfil' align='center' variant='h4' component='div'>Perfil</Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        >
          <TextField
            label='Nombre'
            color='secondary'
            variant='filled'
            className='textFieldsPerfil textNomAp'
            {...register('nombre')}
          />

          <TextField
            label='Apellidos'
            color='secondary'
            variant='filled'
            className='textFieldsPerfil textNomAp'
            {...register('apellidos')}
          />

        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          p: 0,
          m: 0
        }}
        >
          <span id='passwordHelp' className='mb-2 error text-danger'>{errors.nombre?.message}</span>
          <span id='passwordHelp' className='mb-2 error text-danger'>{errors.apellidos?.message}</span>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        >
          <span className='orderRowFlex'>
            <TextField
              label='Estado'
              color='secondary'
              variant='filled'
              className='textFieldsPerfil'
              {...register('estado')}
            />

            <TextField
              label='Delegación o Municipio'
              color='secondary'
              variant='filled'
              className='textFieldsPerfil'
              {...register('municipio')}
            />

            <TextField
              label='Código Postal'
              color='secondary'
              variant='filled'
              inputProps={{ maxLength: 5 }}
              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
              className='textFieldsPerfil textCP'
              {...register('cp')}
            />
          </span>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          p: 0,
          m: 0
        }}
        >
          <span id='passwordHelp' className='mb-2 error text-danger'>{errors.estado?.message}</span>
          <span id='passwordHelp' className='mb-2 error text-danger'>{errors.municipio?.message}</span>

        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        >
          <span className='orderRowFlex'>

            <TextField
              label='Precio Hora'
              placeholder='Precio Honorarios'
              color='secondary'
              variant='filled'
              className='textFieldsPerfil textPrecio'
              InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
              inputProps={{ maxLength: 5 }}
              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
              {...register('precio')}
            />

            <TextField
              label='Cédula'
              placeholder='Cédula Profesional'
              color='secondary'
              variant='filled'
              className='textFieldsPerfil'
              {...register('cedula')}
            />

            <label htmlFor='contained-button-file' className='uploadFile'>

              <Input accept='image/*'
                id='contained-button-file'
                type='file' {...register('fotoPerfil')} />
              <Button variant='text' component='span' endIcon={<AttachFileIcon />}>
                Adjunta tu Foto
              </Button>
            </label>

          </span>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          p: 0,
          m: 0
        }}
        >
          <span id='passwordHelp' className='mb-2 error text-danger'>{errors.precio?.message}</span>
          <span id='passwordHelp' className='mb-2 error text-danger'>{errors.cedula?.message}</span>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        >
          <TextField
            label='Formación Académica'
            color='secondary'
            fullWidth
            variant='filled'
            className='textFieldsPerfil textGrande'
            {...register('formacion')}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          p: 0,
          m: 0
        }}
        >
          <span id='passwordHelp' className='mb-2 error text-danger'>{errors.formacion?.message}</span>
        </Box>

        {/* Especialidades */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        >
          <Controller
            control={control}
            name='especialidades'
            // rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                sx={{ width: '700px' }}
                onChange={(event, item) => {
                  onChange(item)
                }}
                multiple
                value={value}
                options={especialidades}
                getOptionLabel={(item) => (item.title ? item.title : '')}
                getOptionSelected={(option, value) =>
                  value === undefined || value === '' || option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label='Especialidades'
                    color='secondary'
                    variant='filled'
                    className='textFieldsPerfil textAutocomplete'
                    margin='normal'
                    error={!!errors.item}
                    helperText={errors.item && 'item required'}
                  />
                )}
              />
            )}
          />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        />
        {/* Acerca de mi */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        >
          <TextField
            label='Acerca de mi'
            color='secondary'
            inputProps={{ maxLength: 450 }}
            multiline
            fullWidth
            rows={4}
            variant='filled'
            className='textFieldsPerfil textAboutMe'
            {...register('acercade')}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        >
          <ControlledSwitches
            checked={checked}
            setChecked={setChecked}
            name='google'
            label='Autenticación Google'
            onChange={handleSwitch}
          />
        </Box>
        {checked &&
          <>
            <TextField
              label='Correo electrónico'
              placeholder='midirección@gmail.com'
              color='secondary'
              fullWidth
              sx={{ fontSize: '12' }}
              {...register('email')}
            />
            <span
              id='emailerror'
              className='mb-2 error text-danger'
            >{errors.email?.message}
            </span>
          </>}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          p: 1,
          m: 1
        }}
        >
          <Button
            className='buttonPerfilAccount'
            variant='contained'
            type='submit'
            fullWidth
          >Guardar
          </Button>

          <Modal
            open={open}
            handleClose={handleClose}

          />
        </Box>
      </form>
      {saveData && (<Snackbar saveData='Save' />)}
    </Box>

  )
}

export default FormPerfil
