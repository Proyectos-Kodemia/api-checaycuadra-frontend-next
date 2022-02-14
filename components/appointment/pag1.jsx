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

const columns = [
  { field: 'monday', headerName: 'Lunes', width: 100, alignItems: 'center', sortable: false },
  { field: 'tuesday', headerName: 'Martes', width: 100, alignItems: 'center', sortable: false },
  { field: 'wednesday', headerName: 'Miercoles', width: 100, alignItems: 'center', sortable: false },
  { field: 'thursday', headerName: 'Jueves', width: 100, alignItems: 'center', sortable: false },
  { field: 'friday', headerName: 'Viernes', width: 100, alignItems: 'center', sortable: false },
  { field: 'saturday', headerName: 'Sabado', width: 100, alignItems: 'center', sortable: false },
  { field: 'sunday', headerName: 'Domingo', width: 100, alignItems: 'center', sortable: false }
]

/**
 * Todos los dias entre 10:00 - 15:00
 */

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

const selectSchedule = (element) => {
  console.log('Datos utiles:', element.field, element.value, week0.number, week0.start)
  // console.log(element)
}

const now = moment.now()
const week0 = {
  start: moment(now).isoWeekday(1).format('LL'),
  end: moment(now).isoWeekday(7).format('LL'),
  number: moment(now).format('W')
}
const next1 = {
  addS: moment(week0.start).add(7, 'd').format('LL'),
  addE: moment(week0.edd).add(7, 'd').format('LL'),
  number: moment(week0.start).add(7, 'd').format('W')
}
const next2 = {
  addS: moment(week0.start).add(14, 'd').format('LL'),
  addE: moment(week0.edd).add(14, 'd').format('LL'),
  number: moment(week0.start).add(14, 'd').format('W')
}
const next3 = {
  addS: moment(week0.start).add(21, 'd').format('LL'),
  addE: moment(week0.edd).add(21, 'd').format('LL'),
  number: moment(week0.start).add(21, 'd').format('W')
}

function pag1 () {
  return (
    <>
      <Box sx={{ p: 1, mx: 44.65 }}>
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

    </>
  )
}

export default pag1
