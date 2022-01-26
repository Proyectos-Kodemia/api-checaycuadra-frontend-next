import React, { useState } from 'react'
import { List, TransitionGroup, Collapse, Stack, Typography, Box } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'

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

function ScheduleCita () {
  const [selectedDate] = useState(moment())

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

        <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, p: 2 }}>
          <Typography variant='h6' component='div'>
            {nameWeek}
            <br />
            {daySelected}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, p: 2 }}>
          <Typography variant='h6' component='div'>
            {nextName1}
            <br />
            {nextNumber1}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, p: 2 }}>
          <Typography variant='h6' component='div'>
            {nextName2}
            <br />
            {nextNumber2}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, p: 2 }}>
          <Typography variant='h6' component='div'>
            {nextName3}
            <br />
            {nextNumber3}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: 120, ml: 3, p: 2 }}>
          <Typography variant='h6' component='div'>
            {nextName4}
            <br />
            {nextNumber4}
          </Typography>
        </Box>
      </Box>

    </>

  )
}

export default ScheduleCita
