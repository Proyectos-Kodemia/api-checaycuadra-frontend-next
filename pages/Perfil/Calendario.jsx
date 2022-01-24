import React, { useState } from 'react'
import { Box, Toolbar } from '@mui/material'

import { ThemeProvider } from '@material-ui/core/styles'

import Navandslider from '../../components/AccountPages/Navandslider'
import Schedule from '../../components/AccountPages/Schedule'
import Form from '../../components/Perfil/FormPerfil'

function calendar () {
  const drawerWidth = 240

  return (
    <>

      <Navandslider />
      <Schedule />

    </>
  )
}
export default calendar
