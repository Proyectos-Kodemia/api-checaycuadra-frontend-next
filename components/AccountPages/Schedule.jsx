import React, { useState } from 'react'
import MomentUtils from '@date-io/moment' // choose your lib
import { Box } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'

import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import Head from 'next/head'

function Schedule ({ children, title = 'Checa y Cuadra' }) {
  const [selectedDate, changeDate] = useState(new Date('25-03-2015'))
  const [selectedStar, changeStar] = useState(new Date())
  const [selectedEnd, changeEnd] = useState(new Date())

  console.log(selectedDate)
  console.log(selectedStar)
  console.log(selectedEnd)

  return (
    <>
      <Box className='calendar'>
        1. Selecciona el dia
        <br /><br />
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <DatePicker
            autoOk
            orientation='landscape'
            variant='static'
            openTo='date'
            value={selectedDate}
            onChange={date => changeDate(date)}
            disablePast='true'
          />

        </MuiPickersUtilsProvider>
      </Box>
      <Box className='calendar'>
        2. Selecciona el horario
      </Box>
      <Box sclassName='calendar'>
        <Box>
          <p> Hora inicial</p>

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <TimePicker
              placeholder='08:00 AM'
              value={selectedStar}
              onChange={date => changeStar(date)}
            />
          </MuiPickersUtilsProvider>
        </Box>
        <br /><br />
        <Box>
          <p> Hora final</p>

          <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <TimePicker
                placeholder='08:00 AM'
                value={selectedEnd}
                onChange={date => changeEnd(date)}
              />

            </MuiPickersUtilsProvider>
          </div>
        </Box>
      </Box>
      <Box className='calendar'>
        3. Confirma el horario
      </Box>
      <Box className='calendar' />

    </>
  )
}

export default Schedule
