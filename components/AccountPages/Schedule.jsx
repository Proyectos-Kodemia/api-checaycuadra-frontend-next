import React, { useState, useCallback } from 'react'
import { Button, Stack, Typography, Box } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es-mx'
import isWeekend from 'date-fns/isWeekend'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import locale from 'date-fns/locale/es'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import StaticTimePicker from '@mui/lab/StaticTimePicker'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionGroup } from 'react-transition-group'

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
  const [theArray, setTheArray] = useState([])
  const [selectedHour, setSelecterHour] = useState(moment())

  const changeHour = (newValue) => {
    const newHour = (moment(newValue).hour())
    if (!theArray.includes(newHour)) {
      setSelecterHour(newHour)
      setTheArray(array => [...array, `${newHour}:00`])

      console.log(newHour)
    }
  }
  console.log(theArray)

  const handleRemoveHour = (item) => {
    setTheArray((prev) => [...prev.filter((i) => i !== item)])
  }

  const [selectedDate, changeDate] = useState(moment())
  const daySelected = (moment(selectedDate).date())
  const numberWeek = (moment(selectedDate).day())
  const nameWeek = moment().day(numberWeek).format('dddd')
  console.log(daySelected, nameWeek)

  const numberMonth = (moment(selectedDate).month())
  const nameMonth = moment().month(numberMonth).format('MMMM')

  console.log(nameMonth)

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
        <Box sx={{ textAling: 'center', mx: 'auto', mb: 5 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
            <StaticDatePicker
              format='MM-DD-YYYY'
              orientation='portrait'
              openTo='day'
              value='selectedDate'
              disablePast='true'
              toolbarTitle=''
              shouldDisableDate={isWeekend}
              onChange={(newValue) => {
                changeDate(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <br />
        <Box sx={{ p: '2 2 0 2', width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          2. Selecciona tu horario disponible<br /><br />
          <Box sx={{ fontSize: '0 rem', fontWeight: '200' }}>
            Recuerda solo se utilizan horas completas<br /><br />
          </Box>
        </Box>
        <Box sx={{ textAling: 'center', mx: 'auto', mb: 5 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
              toolbarTitle=''
              views='hours'
              am PM='false'
              orientation='landscape'
              displayStaticWrapperAs='mobile'
              value='selectedHour'
              onClick='addEntryClick'
              onChange={(newValue) => {
                changeHour(newValue)
              }}
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
            {theArray.map((item) => (
              <Collapse key={item}>
                {renderItem({ item, handleRemoveHour })}

              </Collapse>
            ))}
          </TransitionGroup>
        </List>

      </Box>

      <Box sx={{ mx: 'auto', width: 150, mt: 5 }}>
        {Confirmar}
      </Box>
      <Box sx={{ mx: 'auto', width: 150, mt: 5 }} />
    </>

  )
}

export default Schedule

/*

  {renderItem({ item: `${item}:00`, handleRemoveHour })}

 <input type='button' onClick={addEntryClick} value='Add' />,
 <List>
          <TransitionGroup>

            {theArray.map((entry) => (
              <div>{entry}</div>

            ))}

          </TransitionGroup>
        </List>

   <List>
          <TransitionGroup>
            {InBasket.map((item) => (
              <Collapse key={item}>
                {renderItem({ item, handleRemoveHour })}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>

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
