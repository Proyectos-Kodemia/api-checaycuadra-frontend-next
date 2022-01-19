import React, { useState } from 'react'

import { ThemeProvider } from '@material-ui/core/styles'

import Navandslider from '../../components/AccountPages/Navandslider'
import Schedule from '../../components/AccountPages/Schedule'

function calendar () {
  return (
    <ThemeProvider>
      <Navandslider />

      <Schedule />
    </ThemeProvider>

  )
}
export default calendar
