import React, { useState } from 'react'
import { Stack, Typography, Box } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'
import isWeekend from 'date-fns/isWeekend'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import TimePicker from '@mui/lab/TimePicker'

function Schedule () {
  const [selectedDate, changeDate] = useState(moment())
  const [selectedStar, changeStar] = useState(moment())
  const [selectedEnd, changeEnd] = useState(moment())

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

  const nextNumber = (moment(selectedDate).day())
  const nextName = moment().day(numberWeek).format('dddd')
  // console.log(nextName)

  // console.log(moment(selectedStar).hour())
  // console.log(moment(selectedEnd).hour())

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 15,
        backgroundColor: 'primary.dark'
      }}
      >

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
        <Box sx={{ p: 2, width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          2. Selecciona el horario<br /><br />
        </Box>
        <Box sx={{ mx: 'auto', width: 450, textAlign: 'start', fontSize: '3 rem', fontWeight: '500' }}>

          <p> Hora inicial</p>
        </Box>
        <Box sx={{ textAling: 'center', mx: 'auto' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={selectedStar}
              onChange={changeStar}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <br /><br />
        <Box sx={{ mx: 'auto', width: 450, textAlign: 'start', fontSize: '3 rem', fontWeight: '500' }}>
          <p> Hora Final</p>
        </Box>
        <Box sx={{ textAling: 'center', mx: 'auto' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={selectedEnd}
              onChange={changeEnd}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box><br /><br />
        <Box sx={{ p: 2, width: 450, fontSize: '3 rem', fontWeight: '700' }}>
          3. Confirma el horario
        </Box>
        <Box sx={{ mx: 'auto', width: 450, textAlign: 'start', fontSize: '3 rem', fontWeight: '500' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#00244C', mb: 3 }} align='center' variant='h4' component='div'> {nameMonth}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            bgcolor: 'background.paper',
            borderRadius: 1
          }}
        >

          <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, border: 1, p: 2 }}>
            <Typography variant='h6' component='div'>
              {nextName}
              <br />
              {daySelected}
            </Typography>

          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, border: 1, p: 2 }}>
            <Typography variant='h6' component='div'>
              {nextName1}
              <br />
              {nextNumber1}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, border: 1, p: 2 }}>
            <Typography variant='h6' component='div'>
              {nextName2}
              <br />
              {nextNumber2}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, border: 1, p: 2 }}>
            <Typography variant='h6' component='div'>
              {nextName3}
              <br />
              {nextNumber3}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, border: 1, p: 2 }}>
            <Typography variant='h6' component='div'>
              {nextName4}
              <br />
              {nextNumber4}
            </Typography>
          </Box>
        </Box>

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
