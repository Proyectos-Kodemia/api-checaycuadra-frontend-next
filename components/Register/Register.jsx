import React, { useState } from 'react'
import { Box, Tab, Tabs, Grid, Paper } from '@mui/material'
import FormRegister from './FormRegister'

const TabPanel = (props) => {
  const { children, value, index } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

function Register () {
  const [value, setValue] = useState(0)

  const styleTabs = { style: { background: '#113311', height: '7px' } }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Grid>
      <Paper elevation={12} className='cardStyle'>
        <Grid align='center'>
          <div className='regCount'>¡Bienvenido! Crea tu cuenta</div>
        </Grid>
        <Box>
          <Tabs
            className='styleBox'
            value={value}
            onChange={handleChange}
            TabIndicatorProps={styleTabs}
            textColor='inherit'
            variant='fullWidth'
          >
            <Tab label='Necesito asesoría' className={`${!value ? 'activo' : 'inactivo'}`} />
            <Tab label='Soy contador' className={`${value ? 'activo' : 'inactivo'}`} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <FormRegister rol='Usuario' />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FormRegister rol='Contador' />
          </TabPanel>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Register
