import React, { useState } from 'react'
import { Box, Tab, Tabs, Grid, Paper } from '@mui/material'
import FormLogin from './FormLogin'
import styles from './FormLogin.module.scss'

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
    <Grid align='center'>
      <Paper
        elevation={12} sx={{ p: 3, h: 560, width: 320, my: 10 }}
      >
        <Grid align='center'>
          <div className={`${styles.welcome}`}>¡Bienvenido! Accede a tu cuenta</div>
        </Grid>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
        >
          <Tabs
            sx={{
              bgcolor: '#fff',
              color: '#00244C'
            }}
            value={value}
            onChange={handleChange}
            TabIndicatorProps={styleTabs}
            textColor='inherit'
            // mx='auto'
          >
            <Tab sx={{ borderRadius: 1, width: 120 }} label='Usuario' className={`${!value} ? ${styles.activo} : ${styles.inactivo}}`} />
            <Tab sx={{ borderRadius: 1, width: 120 }} label='Contador' className={`${value} ? ${styles.activo} : ${styles.inactivo}}`} />
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
