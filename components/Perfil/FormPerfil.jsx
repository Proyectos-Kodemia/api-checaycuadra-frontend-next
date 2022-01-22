import React from 'react'
import { TextField, Typography, InputAdornment, Button, styled, Autocomplete, Chip } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

const schema = yup.object({
  nombre: yup.string().max(80, '***Máximo 80 caracteres'),
  apellidos: yup.string().max(80, '***Máximo 80 caracteres'),
  estado: yup.string().max(50, '***Máximo 50 caracteres'),
  municipio: yup.string().max(50, '***Máximo 50 caracteres'),
  cedula: yup.string().max(20, '***Máximo 20 caracteres'),
  formacion: yup.string().max(50, '***Máximo 50 caracteres')
}).required('El campo es requerido')

function FormPerfil () {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const Input = styled('input')({
    display: 'none'
  })

  const dataFormPerfil = async (data) => {
    console.log(data)
  }

  return (
    <form className='containerFormPerfil' onSubmit={handleSubmit(dataFormPerfil)}>
      <span id='passwordHelp' className='mb-2 error text-danger'>{errors.nombre?.message}</span>
      <Typography className='typografyPerfil' align='center' variant='h4' component='div'>Perfil</Typography>
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

      <TextField
        label='Formación Académica'
        color='secondary'
        variant='filled'
        className='textFieldsPerfil textGrande'
        {...register('formacion')}
      />

      <Autocomplete
        multiple
        id='tags-filled'
        sx={{ width: '740px', margin: '20px' }}
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
            label='Especialidades'
            color='secondary'
            variant='filled'
            className='textFieldsPerfil textAutocomplete'
            {...register('especialidades')}
          />
        )}
      />

      <TextField
        label='Servicios Profesionales'
        color='secondary'
        variant='filled'
        className='textFieldsPerfil textGrande'
        {...register('servicios')}
      />

      <TextField
        label='Acerca de Mí'
        color='secondary'
        inputProps={{ maxLength: 450 }}
        multiline
        fullWidth
        rows={4}
        variant='filled'
        className='textFieldsPerfil textAboutMe'
        {...register('acercade')}
      />

      <Button
        className='buttonPerfilAccount'
        variant='contained'
        type='submit'
        fullWidth
      >Guardar
      </Button>
    </form>
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