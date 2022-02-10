import React, { useEffect } from 'react'
import { Box, TextField, Typography, Button, styled, Grid, CardMedia } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import styles from './FormUser.module.scss'
// import { useSearchParams } from 'react-router-dom'
import { URL_FULL } from '../../services/config'

const schema = yup.object({
  nombre: yup.string().max(50, '***Máximo 50 caracteres'),
  apellidos: yup.string().max(80, '***Máximo 80 caracteres'),
  contraseña: yup.string().max(50, '***Máximo 50 caracteres'),
  numero: yup.string().max(18, '***Máximo 18 caracteres'),
  correo: yup.string().email('***El email no es valido').required('***El campo es requerido').max(50, '***Máximo 50 caracteres')
}).required('El campo es requerido')

function FormUser () {
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
    const token = sessionStorage.getItem('token')
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
              console.log('data desde el fetch', data)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [router.query])

  let profileImage = 'https://media-exp1.licdn.com/dms/image/C4E03AQFLWyN2KG8eZw/profile-displayphoto-shrink_200_200/0/1642529783595?e=1648080000&v=beta&t=pJtCPe8HmFsi05fx4ad-rqHlg2ENSnhMkNUioRXFp_Y'
  const name = 'imagen'

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const Input = styled('input')({
    display: 'none'
  })

  if (!profileImage) {
    profileImage = imageCard
  }

  const dataFormPerfil = async (data) => {
    console.log(data)
  }
  return (
    <Box sx={{ flexGrow: 1 }} justifyContent='center' alignItems='center'>
      <div>
        <span id='passwordHelp' className='mb-2 error text-danger'>{errors.nombre?.message}</span>
        <Typography sx={{ fontWeight: 'bold', color: '#00244C', mb: 3 }} align='center' variant='h4' component='div'>Perfil Usuario</Typography>
      </div>
      <div className={`${styles.flexContainerPerfilUsuario}`}>
        <div className={`${styles.containerImg}`}>
          <CardMedia
            component='img'
            sx={{ width: 200, my: 1, borderRadius: 4, flexGrow: 1 }}
            image={profileImage}
          />
          <label htmlFor='contained-button-file' className={`${styles.uploadFile}`}>
            <Input accept='image/*' id='contained-button-file' multiple type='file' {...register('fotoPerfil')} />
            <Button variant='text' component='span' endIcon={<AttachFileIcon />}>
              Cambiar Foto
            </Button>
          </label>
        </div>
        <form className={`${styles.containerFormUser}`} onSubmit={handleSubmit(dataFormPerfil)}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} justifyContent='center' alignItems='center'>
              <table>
                <tr>
                  <td className={`${styles.celdaChicaTexto}`}>
                    <label>Nombre:</label>
                  </td>
                  <td className={`${styles.celdaInput}`}>
                    <TextField
                      label='Nombre'
                      fullWidth
                      color='secondary'
                      variant='filled'
                      {...register('nombre')}
                    />
                  </td>

                </tr>
                <tr>
                  <td className={`${styles.celdaChicaTexto}`}>
                    <label>Apellidos:</label>
                  </td>
                  <td className={`${styles.celdaInput}`}>
                    <TextField
                      label='Apellidos'
                      color='secondary'
                      variant='filled'
                      {...register('apellidos')}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={`${styles.celdaChicaTexto}`}>
                    <label>Contraseña:</label>
                  </td>
                  <td className={`${styles.celdaInput}`}>
                    <TextField
                      label='Contraseña'
                      color='secondary'
                      variant='filled'
                      {...register('contraseña')}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={`${styles.celdaGrandeTexto}`}>
                    <label>Número de teléfono:</label>
                  </td>
                  <td className={`${styles.celdaInput}`}>
                    <TextField
                      label='Número de teléfono'
                      color='secondary'
                      variant='filled'
                      onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                      {...register('numero')}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={`${styles.celdaGrandeTexto}`}>
                    <label>Correo Electrónico:</label>
                  </td>
                  <td className={`${styles.celdaInput}`}>
                    <TextField
                      label='Correo Electrónico'
                      placeholder='midirección@mail.com'
                      color='secondary'
                      variant='filled'
                      sx={{ fontSize: '12px' }}
                      {...register('correo')}
                    />
                  </td>
                </tr>
              </table>
              {/* <Grid item sx={{ alignItems: 'center' }} align='center' xs={4} sm={12} md={12}> */}
              <Grid item xs={4} sm={12} md={12}>
                <Button
                  sx={{ width: '180px', fontSize: '16px', bgcolor: '#00244C', '& hover': { bgcolor: '#00244C' } }}
                  variant='contained'
                  type='submit'
                >Guardar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </Box>
  )
}

export default FormUser
