import React from 'react'
import { Box, TextField, Typography, InputAdornment, Button, styled, Autocomplete, Chip } from '@mui/material'

import AttachFileIcon from '@mui/icons-material/AttachFile'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import styles from './FormPerfil.module.scss'
import { URL_FULL } from '../../services/config'
import ControlledSwitches from '../Controlled/Switch'
import Modal from '../Controlled/Modal'

// const {id} = router.query

const schema = yup.object().shape({
  nombre: yup.string().max(80, '***Máximo 80 caracteres').required('El campo es requerido'),
  apellidos: yup.string().max(80, '***Máximo 80 caracteres').required('El campo es requerido'),
  estado: yup.string().max(50, '***Máximo 50 caracteres').required('El campo es requerido'),
  municipio: yup.string().max(50, '***Máximo 50 caracteres').required('El campo es requerido'),
  cedula: yup.string().max(20, '***Máximo 20 caracteres'),
  formacion: yup.string().max(50, '***Máximo 50 caracteres').required('El campo es requerido'),
  google: yup.boolean(),
  email: yup.string().when('google', {
    is: true,
    then: (schema) => schema.required("El campo es requerido").email('***El email no es valido')
    .max(50, '***Máximo 50 caracteres')
    .matches(/[\w.\-]{0,25}@gmail\.com/gm, '***Solo correos gmail son aceptados'),
    otherwise: (schema) => schema.optional(),
  }),
}).required()

function FormPerfil () {
  // Hook del switch
  const [checked, setChecked] = React.useState(true)
  // Hook del modal
  const [open, setOpen] = React.useState(false)

  const defaultValues ={
    nombre:"",
    apellidos:"",
    estado:"",
    municipio:"",
    cedula:"",
    formacion:"",
    google:true,
    email:""
  }

  const { register, handleSubmit,control, formState: { errors },setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  })

  //Handle switch
  const handleSwitch =(val)=>{
    setValue('google', val)
    if(!val){
      setOpen(true)
      console.log(" en el handle",val)
    }

  }

  // Handle del modal
  const handleClose = () => {
    setOpen(false)
  }

  

  const Input = styled('input')({
    display: 'none'
  })

  const dataFormPerfil = async (data) => {
    console.log("entra a dataFOrm")
    console.log('data', data)
    if (checked === true) {
      const token = sessionStorage.getItem('token')
      console.log("esto es la data del form",data)
      console.log("esto es la data token",token)
      console.log("info", JSON.stringify(data))

      // Sending patch Account info
      async function patchAccount (data) {
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            token: token
          },
          body: JSON.stringify(data)
        }
        const endpoint = `${URL_FULL}/account/perfil`
        console.log("endpoint del patch", endpoint)
        const response = await fetch(endpoint, options)
        // console.log('response fetch', response)
        return response.json()
        console.log("response",response)
      }

      // Enviando a autenticacion de google
      const endpointAuthGoogle = `${URL_FULL}/google/auth`

      async function loginAccountGoogle (url) {
        // console.log("entrando a la funcion")
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
          // location.href = response.payload.authUrl
        })
        .catch(error => {
          console.log(error)
        })

      // Sending request to account patch
      await patchAccount(data)
        .then(response => {
          console.log(data)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    } else {

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
        <span id='passwordHelp' className='mb-2 error text-danger'>{errors.nombre?.message}</span>
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

              <Input accept='image/*' id='contained-button-file' multiple type='file' {...register('fotoPerfil')} />
              <Button variant='text' component='span' endIcon={<AttachFileIcon />}>
                Adjunta tu Foto
              </Button>
            </label>

          </span>
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
        {/* Especialidades */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 1,
          m: 1
        }}
        >
          <Autocomplete
            multiple
            id='tags-filled'
            sx={{ width: '700px' }}
            options={especialidades.map((option) => option.title)}
            defaultValue={[especialidades[1].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={index} variant='outlined' label={option} {...getTagProps({ index })} />
              ))}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label='Especialidades'
                color='secondary'
                variant='filled'
                className='textFieldsPerfil textAutocomplete'
                {...register('especialidades')}
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
        >
        </Box>
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
        {checked && <>
          <TextField
            label='Correo electrónico'
            placeholder='midirección@gmail.com'
            color='secondary'
            fullWidth
            sx={{ fontSize: '12' }}
            {...register('email')}
          />}
          
          <span
            id='emailerror'
            className={styles.errors}
          >{errors.email?.message}
          </span>
          </>
        }
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
    </Box>

  )
}

export default FormPerfil

const especialidades = [
  { title: 'Contabilidad General' },
  { title: 'Finanzas' },
  { title: 'Administración' },
  { title: 'Auditoría' },
  { title: 'Contraloría' },
  { title: 'Fiscal' },
  { title: 'Impuestos (SAT)' },
  { title: 'Costos' },
  { title: 'Obligaciones de seguridad social (IMSS)' }
]
