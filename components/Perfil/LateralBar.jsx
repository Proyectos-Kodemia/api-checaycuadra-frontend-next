import React, { useState, useEffect } from 'react'
import { Tabs, Tab, List, Box } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import EventIcon from '@mui/icons-material/Event'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import RestoreIcon from '@mui/icons-material/Restore'
import FormPerfil from './FormPerfil'
import FormUser from './FormUser'
import Schedule from '../AccountPages/Schedule'
import ScheduleCita from '../AccountPages/ScheduleCita'

// import CalendarioPicker from '../AccountPages/CalendarioPicker'
import styles from './LateralBar.module.scss'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  )
}

function a11yProps (index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

function LateralBar () {
  const [value, setValue] = useState(0)
  const [rol, setRol] = useState('')

  useEffect(() => {
    if (typeof window.sessionStorage !== 'undefined') {
      if (window.sessionStorage.getItem('role')) {
        const user = window.sessionStorage.getItem('role')
        // console.log(user)
        setRol(user)
      } else {
        console.log('error en session storage')
      }
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={`${styles.containerPrincipal}`}>

      <List>
        <Tabs
          orientation='vertical'
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          aria-label='Vertical tabs example'
          centered
          selectionFollowsFocus
          sx={{ borderRight: 2, borderColor: 'divider' }}
        >
          <Tab
            sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }}
            icon={<ManageAccountsIcon />} iconPosition='start' color='primary' label='Mi perfil' {...a11yProps(0)}
          />
          {rol === 'Contador' && <Tab sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }} icon={<EventIcon />} iconPosition='start' color='primary' label='Calendario' {...a11yProps(1)} />}
          <Tab sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }} icon={<AttachFileIcon />} iconPosition='start' color='primary' label='Archivos' {...a11yProps(2)} />
          <Tab sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }} icon={<MarkChatUnreadIcon />} iconPosition='start' color='primary' label='Chat' {...a11yProps(3)} />
          <Tab sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }} icon={<RestoreIcon />} iconPosition='start' color='primary' label='Historial' {...a11yProps(4)} />
        </Tabs>
      </List>

      <List sx={{ flex: 1 }}>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={0}>
          {rol === 'Contador' ? <FormPerfil /> : <FormUser />}
        </TabPanel>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={1} />
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={2} />
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={3} />
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={4}>
          Item Five
        </TabPanel>
      </List>
    </div>
  )
}

export default LateralBar
