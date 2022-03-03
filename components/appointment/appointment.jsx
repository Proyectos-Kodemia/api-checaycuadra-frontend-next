import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'
import imageLogin from '../../images/img1.jpg'
import { MobileStepper, Button, Box, List, ListItem, ListItemIcon, ListItemText, Typography, CardContent, Chip, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import { URL_FULL } from '../../services/config'
import { useTheme } from '@mui/material/styles'
import { KeyboardArrowLeft, KeyboardArrowRight, LegendToggleRounded } from '@mui/icons-material'
import { date } from 'yup'

// const endpoint = `${URL_FULL}/mercadopago/checkout`
// async function sendDate (url, credentials) {
//  // console.log('entrando a la funcion')
//  const options = {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  }
//  // return fetch(url, options)
//  const response = await fetch(url, options)
//  return response.json()
// }
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
// semanas
const dayNow = moment.now()
const weeks = [
  {
    start: moment(dayNow).isoWeekday(1).format('LL'),
    end: moment(dayNow).isoWeekday(7).format('LL'),
    number: moment(dayNow).format('W')
  },
  {
    start: moment(dayNow).isoWeekday(8).format('LL'),
    end: moment(dayNow).isoWeekday(14).format('LL'),
    number: moment(dayNow.start).add(7, 'd').format('W')
  },
  {
    start: moment(dayNow).isoWeekday(15).format('LL'),
    end: moment(dayNow).isoWeekday(21).format('LL'),
    number: moment(dayNow.start).add(14, 'd').format('W')
  },
  {
    start: moment(dayNow).isoWeekday(22).format('LL'),
    end: moment(dayNow).isoWeekday(28).format('LL'),
    number: moment(dayNow.start).add(21, 'd').format('W')
  }
]
const steps = [
  { label: weeks[0].number, labelStart: weeks[0].start, labelEnd: weeks[0].end },
  { label: weeks[1].number, labelStart: weeks[1].start, labelEnd: weeks[1].end },
  { label: weeks[2].number, labelStart: weeks[2].start, labelEnd: weeks[2].end },
  { label: weeks[3].number, labelStart: weeks[3].start, labelEnd: weeks[3].end }
]
// console.log(weeks)
const columns = [
  { field: 'monday', headerName: 'Lunes', alignItems: 'center', flex: 1, minWidth: 100, maxWidth: 200 },
  { field: 'tuesday', headerName: 'Martes', alignItems: 'center', flex: 1, minWidth: 100, maxWidth: 200 },
  { field: 'wednesday', headerName: 'Miercoles', alignItems: 'center', flex: 1, minWidth: 100, maxWidth: 200 },
  { field: 'thursday', headerName: 'Jueves', alignItems: 'center', flex: 1, minWidth: 100, maxWidth: 200 },
  { field: 'friday', headerName: 'Viernes', alignItems: 'center', flex: 1, minWidth: 100, maxWidth: 200 },
  { field: 'saturday', headerName: 'Sabado', alignItems: 'center', flex: 1, minWidth: 100, maxWidth: 200 },
  { field: 'sunday', headerName: 'Domingo', alignItems: 'center', flex: 1, minWidth: 100, maxWidth: 200, sortable: false }
]

function Appointment ({ handlerAuthGoogle, statusPayment, id, name, lastname, degree, degreeId, profileImage, description, role, evaluation, specialities, address, Schedule, times }) {
  const [schedules, setSchedules] = useState([])
  useEffect(() => {
    setSchedules(
      times
    )
  }, [times])
  const daysAvailable = Schedule.daysAvailable
  const servicio = {
    title: 'consultoria',
    unit_price: Schedule.costHour,
    quantity: '1',
    id: id
  }
  const [open, setOpen] = React.useState(false)
  const handleClose = () => { setOpen(false) }

  const theme = useTheme()

  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = steps.length
  const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) }
  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) }
  const weekActive = moment(weeks[activeStep].start).format('W')
  const meetings = [{
    week: '7',
    date: '14-02-2022',
    day: 'monday',
    hour: '14:00 - 15:00'
  },
  {
    week: '7',
    date: '23-02-2022',
    day: 'tuesday',
    hour: '10:00 - 11:00'

  }
  ]
  const hasMeeting = (daySelected, hourSelected, weekActive) => {
    return meetings.find(({ day, hour, week }) => {
      if (day === daySelected && hour === hourSelected && week === weekActive) { return true } else { return false }
    })
  }

  const [finalClickInfo, setFinalClickInfo] = useState(null)

  // Enviar el post  de cita con el boton de pagar
  const createMeeting = async (e) => {
    // e.preventDefault()
    const { startDateTime, endDateTime } = finalClickInfo

    console.log('check starDateTime', startDateTime)

    const token = window.sessionStorage.getItem('token')

    // console.log("tokenn en el handler",token)
    const endpointMeeting = `${URL_FULL}/metting`
    console.log(endpointMeeting, 'endpointmeeting')
    const data = {
      userAccount: id,
      startDateTime: startDateTime.trim(),
      endDateTime: endDateTime.trim(),
      title: `consultoria ${name} ${lastname}`,
      unit_price: Schedule.costHour,
      quantity: '1',
      statusPayment: 'pending'
    }
    console.log('la data en el handler', data)
    // post
    const optionsMeeting = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token // Enviar en el post el token de JWT
      },
      body: JSON.stringify(data)

    }
    const response = await fetch(endpointMeeting, optionsMeeting).then((res) => {
      res.json().then((value) => {
        console.log('Objeto Id cita', value)

        const idMeeting = value.payload.meetCreated._id
        window.localStorage.setItem('idMeeting', idMeeting)
        console.log('id Meeting', idMeeting)

        return idMeeting
      })
    })
  }

  // Enviando al mercadopago checkout
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

  const handlerPago = (e) => {
    console.log('entrando al handler-finalClickINfo', finalClickInfo)
    e.preventDefault()
    createMeeting()
      .then(data => {
        console.log(data)

        const idMeeting = data.payload.meetCreated._id

        window.localStorage.setItem('idMeeting', idMeeting)

        console.log('id Meeting', idMeeting)

        return idMeeting
      })
      .catch(error => {
        console.log(error)
      })

    LoginAccount(endpoint, servicio)
      .then(data => {
        location.href = data
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handlerLinkGoogle = async (e) => {
    e.preventDefault()
    const token = window.sessionStorage.getItem('token')
    const idMeeting = window.localStorage.getItem('idMeeting')
    const endpointMeeting = `${URL_FULL}/metting/${idMeeting}`

    const endpointLink = `${URL_FULL}/metting/hangout-link`

    console.log(' el endpoint link', endpointLink, endpointMeeting)

    if (statusPayment === 'approved') {
      const dataStatusPayment = {
        statusPayment: statusPayment
      }
      // Patch para el status Payment approved
      const optionsMeeting = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token // Enviar en el post el token de JWT
        },
        body: JSON.stringify(dataStatusPayment)
        // console.log(' el endpoint link', endpointLink, endpointMeeting)
      }
      const response = await fetch(endpointMeeting, optionsMeeting).then((res) => {
        res.json().then((value) => {
          console.log('Objeto Id cita', value)
        })
      })
      // información necesario para el patch que crea el link
      const dataLink = {
        idMeeting: idMeeting
      }
      // Patch para link
      const optionsLink = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token // Enviar en el post el token de JWT
        },
        body: JSON.stringify(dataLink)

      }
      // Enviando info para el crear link
      const responseLink = await fetch(endpointLink, optionsLink).then((res) => {
        res.json().then((value) => {
          console.log('Hangout LInk information', value)
        })
      })
    }
  }

  const handleOnCellClick = (element) => {
    // const day = element.field
    if (!daysAvailable.includes(element.field)) { return }
    let dateFormat = null
    let dateMeet = null
    switch (element.field) {
      case 'monday':
        dateFormat = moment(weeks[activeStep].start).add(0, 'd').format('DD-MM-YYYY')
        dateMeet = moment(weeks[activeStep].start).add(0, 'd').format('YYYY-MM-DD')
        break
      case 'tuesday':
        dateFormat = moment(weeks[activeStep].start).add(1, 'd').format('DD-MM-YYYY')
        dateMeet = moment(weeks[activeStep].start).add(1, 'd').format('YYYY-MM-DD')
        break
      case 'wednesday':
        dateFormat = moment(weeks[activeStep].start).add(2, 'd').format('DD-MM-YYYY')
        dateMeet = moment(weeks[activeStep].start).add(2, 'd').format('YYYY-MM-DD')
        break
      case 'thursday':
        dateFormat = moment(weeks[activeStep].start).add(3, 'd').format('DD-MM-YYYY')
        dateMeet = moment(weeks[activeStep].start).add(3, 'd').format('YYYY-MM-DD')
        break
      case 'friday':
        dateFormat = moment(weeks[activeStep].start).add(4, 'd').format('DD-MM-YYYY')
        dateMeet = moment(weeks[activeStep].start).add(4, 'd').format('YYYY-MM-DD')
        break
      case 'saturday':
        dateFormat = moment(weeks[activeStep].start).add(5, 'd').format('DD-MM-YYYY')
        dateMeet = moment(weeks[activeStep].start).add(5, 'd').format('YYYY-MM-DD')
        break
      case 'sunday':
        dateFormat = moment(weeks[activeStep].start).add(6, 'd').format('DD-MM-YYYY')
        dateMeet = moment(weeks[activeStep].start).add(6, 'd').format('YYYY-MM-DD')
        break
    }

    if (hasMeeting(element.field, element.value, weekActive)) {
      // AQUI NO ESTA MANDANDO NADA PREGUNTAR POR Q

    } else {
      setOpen(true)
    }
    // LLAMAR AL BACK PARA AGENDAR LA CITA
    const startHour = ((element.value).slice(0, 5))
    const endHour = ((element.value).slice(7)).trim()
    const startDateTime = `${dateMeet}T${startHour}`
    const endDateTime = `${dateMeet}T${endHour}`
    const dataOfCita = {
      date: dateFormat,
      day: element.field,
      hour: element.value,
      week: weekActive,
      startDateTime: startDateTime,
      endDateTime: endDateTime
    }
    // console.log(dataOfCita, 'dataOfCita')
    setFinalClickInfo(dataOfCita)
    return dataOfCita
  }
  // console.log('daySelected', finalClickInfo)
  const createRows = (schedules, daysAvailable, daysReserved) => {
    const lasRows = []
    schedules.forEach((element) => {
      // Aquí se declara el número de fila
      const row = {
        id: schedules.indexOf(element)
      }
      daysAvailable.forEach((day) => {
        row[day] = element
      })
      lasRows.push(row)
    })
    // console.log('las lasRows', lasRows)
    return lasRows
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, m: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: 2, height: 300, boxShadow: 2, borderRadius: 3 }}>
          <Image src={imageLogin} layout='fixed' width={200} quality={100} />
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
          <CardContent sx={{ width: 500 }}>
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
          Elige tu horario y agenda tu cita con tu contador
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
          <Button
            size='small' onClick={handleBack} disabled={activeStep === 0}
          >
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
      <Box sx={{
        height: 'auto',
        width: 'auto',
        '& .cold': {
          backgroundColor: '#e3e3e3',
          color: '#1a3e72'
        },
        '& .hot': {
          backgroundColor: '#f14233',
          color: '#1a3e72'
        }
      }}
      >
        <Box sx={{ w: 1 }}>
          {schedules && <DataGrid
            rows={createRows(schedules, daysAvailable)}
            columns={columns}
            checkboxSelection={false}
            onCellClick={handleOnCellClick}
            hideFooter='true'
            disableColumnMenu='false'
            AutoSizeColumnsMode='fill'
            autoHeight
            density='comfortable'
            sx={{ marginX: 75 }}
            getCellClassName={(params) => {
              if (hasMeeting(params.field, params.value, weekActive)) {
                return 'hot'
              }
              if (!daysAvailable.includes(params.field)) {
                return 'cold'
              }
            }}
                        />}
        </Box>
      </Box>
      {/* confirmar */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={null}
        aria-describedby='alert-dialog-slide-description'
        fullWidth='false'
        maxWidth='sm'
      >
        <DialogTitle sx={{ mx: 'auto', my: 1 }}>Confirma tu horario</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description' sx={{ mx: 'auto', my: 1, textAlign: 'center' }}>
            La cita con tu contador es  el dia {finalClickInfo?.date} <br /> en un horario de {finalClickInfo?.hour}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button onClick={handleClose}>Regresar</Button>
          <Button onClick={handlerPago}>Realizar pago</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ w: 50, display: 'flex', justifyContent: 'center', p: 1, m: 5 }}>
        <Button
          onClick={handlerLinkGoogle}
          variant='contained'
          disableElevation
          size='large'
          sx={{ alignItems: 'center' }}
        >Confirmar Cita
        </Button>

      </Box>

    </div>
  )
}

export default Appointment
