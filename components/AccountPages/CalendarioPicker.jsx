import React, { useState } from 'react'
import MomentUtils from '@date-io/moment' // choose your lib
import { Box } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'

import { DatePicker, TimePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
const drawerWidth = 240

function Schedule () {
  const [selectedDate, changeDate] = useState(moment())
  const [selectedStar, changeStar] = useState(moment())
  const [selectedEnd, changeEnd] = useState(moment())

  // console.log(selectedDate.month())
  // console.log(selectedDate.dayOfYear())
  // console.log(selectedStar.hour())
  // console.log(selectedEnd.hour())

  return (
    <>

      <Box sx={{ p: 2, mx: 'auto', width: 450, fontSize: '3 rem', fontWeight: '700' }}>
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

        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <KeyboardDatePicker
            label='Material Date Picker'
            showTimeSelect
            variant='static'
            format='DD/MM/YYYY'
            value={selectedDate}
            onChange={date => changeDate(date)}
            disablePast
          />
        </MuiPickersUtilsProvider>

      </Box>
      <Box sx={{ p: 2, mx: 'auto', width: 450, fontSize: '3 rem', fontWeight: '700' }}>
        2. Selecciona el horario
      </Box>
      <Box sx={{ textAling: 'center', p: 2, mx: 'auto', width: 150, fontSize: '3 rem', fontWeight: '700' }}>
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

      <Box sx={{ p: 2, mx: 'auto', width: 450, fontSize: '3 rem', fontWeight: '700' }}>
        3. Confirma el horario
      </Box>
      <Box sx={{ p: 2, mx: 'auto', width: 200, fontSize: '3 rem', fontWeight: '700' }} />

    </>
  )
}

export default Schedule
