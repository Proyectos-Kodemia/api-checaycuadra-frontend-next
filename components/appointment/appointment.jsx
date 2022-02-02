import React from 'react'
import Image from 'next/image'
import imageLogin from '../../images/img1.jpg'
import { Button, Box, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar, CardContent, Chip, TextField } from '@mui/material'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { URL_FULL } from '../../services/config'
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

const endpoint = `${URL_FULL}/mercadopago/checkout`

async function LoginAccount(url, credentials) {
  // console.log('entrando a la funcion')
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }
  // return fetch(url, options)
  const response = await fetch(url, options)
  return response.json()
}

function Appointment({ handlerAuthGoogle, id, name, lastname, degree, degreeId, profileImage, description, role, evaluation, specialities, address, Schedule }) {
  const servicio = {
    title: 'consultoria',
    unit_price: Schedule.costHour,
    quantity: '1',
    id: id
  }

  const handlerPago = (e) => {
    // console.log('entrando al handler')
    e.preventDefault()
    LoginAccount(endpoint, servicio)
      .then(data => {
        location.href = data
      })
      .catch(error => {
        console.log(error)
      })
  }

  const [value, setValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'))

  // console.log('campo especialista inicial', specialities)

  // console.log(name, lastname, degree, degreeId, profileImage, description, role, evaluation, specialities, address, Schedule)
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: 2, height: 300, boxShadow: 2, borderRadius: 3 }}>
          <Image
            src={imageLogin}
            layout='fixed'
            width={200}
            quality={100}
          />

          <CardContent sx={{ width: 220, margin: 3, marginTop: 6 }}>
            <Typography variant='h6' style={{ fontWeight: '600' }}>
              {name} {lastname}
            </Typography>
            <br />
            <Typography variant='subtitle1'>
              {degree}
            </Typography>
            <br />
            <Typography variant='body2'>
              Cedula {degreeId}
            </Typography>
          </CardContent>
        </Box>

        <Box sx={{ display: 'flex', w: 400, h: 300 }}>
          <CardContent
            sx={{ width: 500 }}
          >
            <List>
              <ListItem disableGutters>
                <ListItemIcon>
                  <img src='/icons/iconsCard2/video.svg' alt='video' ml={0} />
                </ListItemIcon>
                <ListItemText primary='Consultoria online' />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <img src='/icons/iconsCard2/especialidad.svg' alt='especialidad' ml={0} />
                </ListItemIcon>
                <ListItemText primary='Especialista en: ' />
              </ListItem>
              <ListItem sx={{ justifyContent: 'space-evenly' }}>
                {specialities && specialities?.map((index) => (
                  <Chip key={index} align='center' label={index} variant='outlined' />
                ))}
              </ListItem>
              {Schedule?.costHour &&
                <ListItem disableGutters>
                  <ListItemIcon>
                    <img src='/icons/iconsCard2/price.svg' alt='price' ml={0} />
                  </ListItemIcon>
                  <ListItemText primary='Precio: ' />
                  {Schedule?.costHour || 'NA'}
                  <ListItemText primary='  MXN' />
                </ListItem>}
              <ListItem disableGutters>
                <ListItemIcon>

                  <img src='/icons/iconsCard2/local.svg' alt='local' ml={0} />
                </ListItemIcon>
                <ListItemText primary='Ubicacion:' />
                {address?.town}, {address?.state}

              </ListItem>
            </List>
            <Typography variant='h5'>
              Acerca de mi:
            </Typography>
            <br />
            <Typography variant='body1' sx={{ textAlign: 'justify' }}>
              {description}
            </Typography>
          </CardContent>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 5 }}>
        <CalendarTodayRoundedIcon sx={{ fontSize: 36, mr: 5 }} />
        <Typography variant='h4'>
          Elije tu horario y agenda tu cita con tu contador
        </Typography>
        <Box />
        <Box sx={{}}>
          <br /><br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDateTimePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

        </Box>

        <Box sx={{ w: 50, display: 'flex', justifyContent: 'space-between', p: 1, m: 5 }}>

          <Button
            // href='../../pages/Cuenta/RegisterPage.js'
            onClick={handlerPago}
            variant='contained'
            disableElevation
            size='large'
            endIcon={<ArrowForwardIcon />}
          >Realizar Pago
          </Button>
          <Button
            // href='../../pages/Cuenta/RegisterPage.js'
            onClick={handlerAuthGoogle}
            variant='contained'
            disableElevation
            size='large'
            sx={{ mr: 0 }}
            endIcon={<ArrowForwardIcon />}
          >Confirmar Cita
          </Button>
        </Box>
      </>
      )
}

      export default Appointment
