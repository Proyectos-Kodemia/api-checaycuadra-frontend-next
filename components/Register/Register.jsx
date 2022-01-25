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
      <Paper elevation={12} sx={{ p: 3, h: 560, width: 420, my: 10 }}>
        <Grid align='center'>
          <div className='regCount'>¡Bienvenido! Crea tu cuenta</div>
        </Grid>
        <Box>
          <Tabs
            sx={{ bgcolor: '#fff', color: '#00244C' }}
            value={value}
            onChange={handleChange}
            TabIndicatorProps={styleTabs}
            textColor='inherit'
            fullWidth
          >
            <Tab sx={{ borderRadius: 1, width: 180 }} label='Necesito asesoría' className={`${!value ? 'activo' : 'inactivo'}`} />
            <Tab sx={{ borderRadius: 1, width: 180 }} label='Soy contador' className={`${value ? 'activo' : 'inactivo'}`} />
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
