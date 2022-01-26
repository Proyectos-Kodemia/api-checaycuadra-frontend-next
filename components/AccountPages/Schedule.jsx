import React, { useState } from 'react'
import { Button, Stack, Typography, Box } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'
import isWeekend from 'date-fns/isWeekend'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import TimePicker from '@mui/lab/TimePicker'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionGroup } from 'react-transition-group'

const Horas = [
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '17:00',
  '18:00',
  '19:00'

]
console.log(Horas)
function renderItem ({ item, handleRemoveHour }) {
  return (
    <ListItem
      sx={{ textAlign: 'center' }}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='delete'
          title='Delete'
          onClick={() => handleRemoveHour(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item} sx={{ backgroundColor: '#2388C6;', color: 'white' }} />
    </ListItem>
  )
}

const Confirmar = (
  <Button
    sx={{ backgroundColor: '#2388C6;', color: 'white' }}
    variant='contained'
    onClick='confirmarHorario' // accion
  >
    Confirmar Horario
  </Button>
)

function Schedule () {
  const [selectedDate, changeDate] = useState(moment())
  const [selectedStar, changeStar] = useState(moment())

  // const add = Horas.push(selectedStar)
  // console.log(add)
  const hourSelected = (moment(selectedStar).hour())
  const hourFormat = moment().day(hourSelected).format('LT')
  console.log(hourFormat)

  const daySelected = (moment(selectedDate).date())
  const numberWeek = (moment(selectedDate).day())
  const nameWeek = moment().day(numberWeek).format('dddd')
  console.log(daySelected, nameWeek)

  const nextNumber1 = moment().date(daySelected).add(1, 'd').date()
  const nextName1 = moment().date(daySelected).add(1, 'd').format('dddd')
  console.log(nextNumber1, nextName1)

  const nextNumber2 = moment().date(daySelected).add(2, 'd').date()
  const nextName2 = moment().date(daySelected).add(2, 'd').format('dddd')
  console.log(nextNumber2, nextName2)

  const nextNumber3 = moment().date(daySelected).add(3, 'd').date()
  const nextName3 = moment().date(daySelected).add(3, 'd').format('dddd')
  console.log(nextNumber3, nextName3)

  const nextNumber4 = moment().date(daySelected).add(4, 'd').date()
  const nextName4 = moment().date(daySelected).add(4, 'd').format('dddd')
  console.log(nextNumber4, nextName4)

  const numberMonth = (moment(selectedDate).month())
  const nameMonth = moment().month(numberMonth).format('MMMM')
  // console.log(nameMonth)

  const [InBasket, setInBasket] = React.useState(Horas.slice())

  const handleRemoveHour = (item) => {
    setInBasket((prev) => [...prev.filter((i) => i !== item)])
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        m: 1

      }}
      >
        <Typography className='typografyPerfil' align='center' variant='h4' component='div'>Calendario</Typography>
        <br />
        <br />

        <Box sx={{ p: 2, width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          1. Selecciona el dia<br />
        </Box>
        <Box sx={{ textAling: 'center', p: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              format='MM-DD-YYYY'
              orientation='portrait'
              openTo='day'
              value='selectedDate'
              disablePast='true'
              shouldDisableDate={isWeekend}
              onChange={(newValue) => {
                changeDate(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <br />
        <Box sx={{ p: 2, width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          2. Selecciona mas horas<br /><br />
        </Box>

        <Box sx={{ textAling: 'center', mx: 'auto', mb: 5 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={selectedStar}
              onChange={changeStar}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <br /><br />

        <Box sx={{ p: 2, width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          3. Confirma el horario
        </Box>
        <Box sx={{ mx: 'auto', width: 450, textAlign: 'start', fontWeight: '500' }}>

          <Typography sx={{ fontWeight: 'bold' }} align='center' variant='h4' component='div' style={{ margin: '1rem' }}>
            {nameMonth}
          </Typography>
          <Typography sx={{ color: '#00244C' }} align='center' variant='h5' component='div'>
            {nameWeek}
          </Typography>
          <Typography sx={{ color: '#00244C' }} align='center' variant='h6' component='div' style={{ marginBottom: '1rem' }}>
            {daySelected}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mx: 'auto', width: 300 }}>

        <List>
          <TransitionGroup>
            {InBasket.map((item) => (
              <Collapse key={item} sx={{ pl: 5 }}>
                {renderItem({ item, handleRemoveHour })}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>

      </Box>

      <Box sx={{ mx: 'auto', width: 150, mt: 5 }}>
        {Confirmar}
      </Box>

    </>

  )
}

export default Schedule

/*
  const dia = (moment(selectedDate).date())
  const dia2 = 2
  const dia3 = 3
  const dia4 = 4
  const dia5 = 5
  console.log(dia)

 // console.log(moment(selectedDate).month())
 const numberMonth = (moment(selectedDate).month())
 const mess = moment().month(numberMonth).format('MMMM')
 console.log(mess)

 const nameMonth = ''
 switch (numberMonth) {
   case 0:
     nameMonth = 'Enero'
     break
   case 1:
     nameMonth = 'Febrero'
     break
   case 2:
     nameMonth = 'Marzo'
     break
   case 3:
     nameMonth = 'Abril'
     break
   case 4:
     nameMonth = 'Mayo'
     break
   case 5:
     nameMonth = 'Junio'
     break
   case 6:
     nameMonth = 'Julio'
     break
   case 7:
     nameMonth = 'Agosto'
     break
   case 8:
     nameMonth = 'Septiembre'
     break
   case 9:
     nameMonth = 'Octubre'
     break
   case 10:
     nameMonth = 'Noviembre'
     break
   case 11:
     nameMonth = 'Diciembre'
     break
 }
 console.log(nameMonth)

 // console.log(moment(selectedDate).day()) semana
  const numberWeek = (moment(selectedDate).day())
  const nextName = ''
  switch (numberWeek) {
    case 0:
      nextName = 'Domingo'
      break
    case 1:
      nextName = 'Lunes'
      break
    case 2:
      nextName = 'Marte'
      break
    case 3:
      nextName = 'Miercoles'
      break
    case 4:
      nextName = 'Jueves'
      break
    case 5:
      nextName = 'Viernes'
      break
    case 6:
      nextName = 'Sabado'
      break
  }
  console.log(nextName)

 */
