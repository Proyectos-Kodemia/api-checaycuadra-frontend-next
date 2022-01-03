import React, { useState } from 'react'
import { Box, Tab, Tabs, Grid, Paper } from '@mui/material'
import FormLogin from './FormLogin'

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

const Login = () => {
  const [value, setValue] = useState(0)

  const styleTabs = { style: { background: '#113311', height: '7px' } }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid>
      <Paper elevation={12} className='paperStyle'>
        <Grid align='center'>
          <div className='welcome'>¡Bienvenido! Accede a tu cuenta</div>
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
            <Tab label='Usuario' className={`${!value ? 'activo' : 'inactivo'}`} />
            <Tab label='Contador' className={`${value ? 'activo' : 'inactivo'}`} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <FormLogin rol='Usuario' />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FormLogin rol='Contador' />
          </TabPanel>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Login
