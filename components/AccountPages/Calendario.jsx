import React, { useState } from 'react'
import MomentUtils from '@date-io/moment' // choose your lib
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'
import styles from './Calendario.module.scss'

import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

function Calendario () {
  const [selectedDate, changeDate] = useState(new Date('25-03-2015'))
  const [selectedStar, changeStar] = useState(new Date())
  const [selectedEnd, changeEnd] = useState(new Date())
  return (
    <div className={`${styles.containerHorario}`}>
      <Box sx={{ p: 2, mx: 'auto', width: 450, fontSize: '3 rem', fontWeight: '700' }}>

        <Typography sx={{ fontWeight: 'bold', color: '#00244C', flexGrow: 2 }} align='center' variant='h5' component='div'>1. Selecciona el dia</Typography>
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
    </div>
  )
}

export default Calendario
