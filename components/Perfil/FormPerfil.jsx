import React from 'react'
import { Box, TextField, Typography, InputAdornment, Button, styled, Autocomplete, Chip, Grid } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import styles from './FormPerfil.module.scss'

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
    <form className={`${styles.containerFormPerfil}`} onSubmit={handleSubmit(dataFormPerfil)}>
      <div>
        <span id='passwordHelp' className='mb-2 error text-danger'>{errors.nombre?.message}</span>
        <Typography sx={{ fontWeight: 'bold', color: '#00244C' }} align='center' variant='h4' component='div'>Perfil</Typography>
      </div>

      <Box sx={{ width: '60%', flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
          <Grid item xs={3} sm={5} md={5}>
            <TextField
              label='Nombre'
              color='secondary'
              variant='filled'
              fullWidth
              // sx={{ m: 2 }}
              {...register('nombre')}
            />
          </Grid>

          <Grid item xs={3} sm={5} md={5}>
            <TextField
              label='Apellidos'
              color='secondary'
              variant='filled'
              fullWidth
              // sx={{ m: 2 }}
              {...register('apellidos')}
            />
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <TextField
              label='Estado'
              color='secondary'
              variant='filled'
              fullWidth
              {...register('estado')}
            />
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <TextField
              label='Delegación o Municipio'
              color='secondary'
              variant='filled'
              fullWidth
              {...register('municipio')}
            />
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <TextField
              label='Código Postal'
              color='secondary'
              variant='filled'
              fullWidth
              inputProps={{ maxLength: 5 }}
              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
              {...register('cp')}
            />
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <TextField
              label='Precio Hora'
              placeholder='Precio Honorarios'
              color='secondary'
              variant='filled'
              fullWidth
              sx={{
                width: '230px',
                label: { width: '100px', mt: 0 }
              }}
              InputProps={{ startAdornment: <InputAdornment sx={{ my: 0 }} position='start'>$</InputAdornment> }}
              inputProps={{ maxLength: 5 }}
              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
              {...register('precio')}
            />
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <TextField
              label='Cédula'
              placeholder='Cédula Profesional'
              color='secondary'
              variant='filled'
              fullWidth
              sx={{ my: 2 }}
              {...register('cedula')}
            />
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <label htmlFor='contained-button-file' className={`${styles.uploadFile}`}>
              <Input accept='image/*' id='contained-button-file' multiple type='file' {...register('fotoPerfil')} />
              <Button variant='text' component='span' endIcon={<AttachFileIcon />}>
                Adjunta tu Foto
              </Button>
            </label>
          </Grid>

          <Grid item xs={6} sm={12} md={12}>
            <TextField
              label='Formación Académica'
              fullWidth
              sx={{ my: 2 }}
              color='secondary'
              variant='filled'
              {...register('formacion')}
            />
          </Grid>

          <Grid item xs={6} sm={12} md={12}>
            <Autocomplete
              multiple
              id='tags-filled'
              options={especialidades.map((option) => option.title)}
              defaultValue={[especialidades[0].title]}
              freeSolo
              fullWidth
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
                  fullWidth
                  sx={{ my: 1 }}
                  {...register('especialidades')}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} sm={12} md={12}>
            <TextField
              label='Servicios Profesionales'
              color='secondary'
              variant='filled'
              sx={{ my: 1 }}
              fullWidth
              {...register('servicios')}
            />
          </Grid>

          <Grid item xs={6} sm={12} md={12}>
            <TextField
              label='Acerca de Mí'
              color='secondary'
              inputProps={{ maxLength: 450 }}
              multiline
              fullWidth
              rows={4}
              variant='filled'
              sx={{ my: 1 }}
              // className='textFieldsPerfil textAboutMe'
              {...register('acercade')}
            />
          </Grid>

          <Grid item xs={3} sm={5} md={5}>
            <Button
              className='buttonPerfilAccount'
              variant='contained'
              type='submit'
              fullWidth
            >Guardar
            </Button>
          </Grid>
        </Grid>
      </Box>
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
