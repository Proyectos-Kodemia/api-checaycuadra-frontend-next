import React, { useState } from 'react'
import { Box } from '@mui/material'
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

  console.log(selectedDate)
  // console.log(selectedDate.dayOfYear())
  console.log(selectedStar.hour())
  console.log(selectedEnd.hour())

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 1
      }}
      >

        <Box sx={{ p: 2, mx: 'auto', width: 450, textAlign: 'start', fontSize: '3 rem', fontWeight: '700' }}>
          1. Selecciona el dia<br />
        </Box>
        <Box sx={{ textAling: 'center', p: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              format="MM-DD-YYYY"
              orientation='portrait'
              openTo='day'
              value={moment('selectedDate')}
              disablePast='true'
              shouldDisableDate={isWeekend}
              onChange={(newValue) => {
                changeDate(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ p: 2, mx: 'auto', width: 450, textAlign: 'start', fontSize: '3 rem', fontWeight: '700' }}>
          2. Selecciona el horario<br /><br />
        </Box>
        <Box sx={{ mx: 'auto', width: 450, textAlign: 'start', fontSize: '3 rem', fontWeight: '500' }}>
          <p> Hora inicial</p>
        </Box>
        <Box sx={{ textAling: 'center', p: 2 }}>
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
        <Box sx={{ textAling: 'center', p: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={selectedEnd}
              onChange={changeEnd}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box><br /><br />
        <Box sx={{ mx: 'auto', width: 450, textAlign: 'start', fontSize: '3 rem', fontWeight: '700' }}>
          3. Confirma el horario
        </Box>
        <Box sx={{ mx: 'auto', width: 450, textAlign: 'start', fontSize: '3 rem', fontWeight: '500' }}>
          <p> calendario</p>
        </Box>

      </Box>
    </>
  )
}

export default Schedule
