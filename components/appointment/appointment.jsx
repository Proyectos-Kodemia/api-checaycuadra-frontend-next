import React from 'react'
import Image from 'next/image'
import moment from 'moment'
import locale from 'date-fns/locale/es'
import { DataGrid } from '@mui/x-data-grid'
import imageLogin from '../../images/img1.jpg'
import { Button, Box, List, ListItem, ListItemIcon, ListItemText, Typography, CardContent, Chip, TextField } from '@mui/material'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { URL_FULL } from '../../services/config'
import { useTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

const endpoint = `${URL_FULL}/mercadopago/checkout`

async function LoginAccount (url, credentials) {
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

// semanas
const now = moment.now()
const week0 = {
  start: moment(now).isoWeekday(1).format('LL'),
  end: moment(now).isoWeekday(7).format('LL'),
  number: moment(now).format('W')
}
const next1 = {
  start: moment(week0.start).add(7, 'd').format('LL'),
  end: moment(week0.end).add(7, 'd').format('LL'),
  number: moment(week0.start).add(7, 'd').format('W')
}
const next2 = {
  start: moment(week0.start).add(14, 'd').format('LL'),
  end: moment(week0.end).add(14, 'd').format('LL'),
  number: moment(week0.start).add(14, 'd').format('W')
}
const next3 = {
  start: moment(week0.start).add(21, 'd').format('LL'),
  end: moment(week0.end).add(21, 'd').format('LL'),
  number: moment(week0.start).add(21, 'd').format('W')
}

// tabla
const columns = [
  { field: 'monday', headerName: 'Lunes', width: 100, alignItems: 'center', sortable: false },
  { field: 'tuesday', headerName: 'Martes', width: 100, alignItems: 'center', sortable: false },
  { field: 'wednesday', headerName: 'Miercoles', width: 100, alignItems: 'center', sortable: false },
  { field: 'thursday', headerName: 'Jueves', width: 100, alignItems: 'center', sortable: false },
  { field: 'friday', headerName: 'Viernes', width: 100, alignItems: 'center', sortable: false },
  { field: 'saturday', headerName: 'Sabado', width: 100, alignItems: 'center', sortable: false },
  { field: 'sunday', headerName: 'Domingo', width: 100, alignItems: 'center', sortable: false }
]
const schedules = [
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00'
]
const rows = []
schedules.forEach((element) => {
  rows.push({
    id: schedules.indexOf(element),
    monday: element,
    tuesday: element,
    wednesday: element,
    thursday: element,
    friday: element,
    saturday: element,
    sunday: element
  })
})
// get day
const selectSchedule = (element) => {
  const day = element.field
  switch (day) {
    case day = 'monday':
      return console.log(moment(week0.start).add(0, 'd').format('LL'), element.value)
    case day = 'tuesday':
      return console.log(moment(week0.start).add(1, 'd').format('LL'), element.value)
    case day = 'wednesday':
      return console.log(moment(week0.start).add(2, 'd').format('LL'), element.value)
    case day = 'thursday':
      return console.log(moment(week0.start).add(3, 'd').format('LL'), element.value)
    case day = 'friday':
      return console.log(moment(week0.start).add(4, 'd').format('LL'), element.value)
    case day = 'saturday':
      return console.log(moment(week0.start).add(5, 'd').format('LL'), element.value)
    case day = 'tuesdsundayay':
      return console.log(moment(week0.start).add(6, 'd').format('LL'), element.value)
  }

  // console.log('Datos utiles:', element.field, element.value, week0.number, week0.start)
  // console.log(day)
  // console.log(fecha)
}
// botones de steps
const steps = [
  {
    label: week0.number,
    labelStart: week0.start,
    labelEnd: week0.end
  },
  {
    label: next1.number,
    labelStart: next1.start,
    labelEnd: next1.end
  },
  {
    label: next2.number,
    labelStart: next2.start,
    labelEnd: next2.end
  },
  {
    label: next3.number,
    labelStart: next3.start,
    labelEnd: next3.end
  }
]

function Appointment ({ handlerAuthGoogle, id, name, lastname, degree, degreeId, profileImage, description, role, evaluation, specialities, address, Schedule }) {
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
  // console.log('campo especialista inicial', specialities)
  // console.log(name, lastname, degree, degreeId, profileImage, description, role, evaluation, specialities, address, Schedule)
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = steps.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div>
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

        {/* card */}
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
                {specialities && specialities?.map((speciality) => (
                  <Chip key={speciality.id} align='center' label={speciality.title} variant='outlined' />
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
      </Box>
      <br />
      {/* botones */}
      <MobileStepper
        variant='dots'
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            adelante
            {theme.direction === 'rtl'
              ? (
                <KeyboardArrowLeft />
                )
              : (
                <KeyboardArrowRight />
                )}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl'
              ? (
                <KeyboardArrowRight />
                )
              : (
                <KeyboardArrowLeft />
                )}
            Atras
          </Button>
        }
        sx={{ mx: 60 }}
      />
      {/* encabezado */}
      <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'space-evenly' }}>
        <Typography>
          Semana {steps[activeStep].label}
          <br />
          {steps[activeStep].labelStart} - {steps[activeStep].labelEnd}
        </Typography>
      </Box>
      {/* tabla */}
      <Box sx={{ p: 1, mx: 74.2, mt: 5 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          checkboxSelection={false}
          onCellClick={selectSchedule}
          hideFooter='true'
          disableColumnMenu='false'
          disableExtendRowFullWidth='true'
          AutoSizeColumnsMode='fill'
        />
      </Box>
      {/* ultimos botones */}
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
    </div>
  )
}

export default Appointment

/* <Box sx={{ height: 255, width: '100%', p: 2 }}>
        {steps[activeStep].description}
        </Box>
*/
