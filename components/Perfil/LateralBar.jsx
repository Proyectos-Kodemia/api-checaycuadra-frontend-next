import React, { useState } from 'react'
import { Tabs, Tab, List, Box } from '@mui/material'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import EventIcon from '@mui/icons-material/Event'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import RestoreIcon from '@mui/icons-material/Restore'
import FormPerfil from './FormPerfil'
import FormUser from './FormUser'
import Schedule from '../AccountPages/Schedule'

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
          <Tab sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }} icon={<EventIcon />} iconPosition='start' color='primary' label='Calendario' {...a11yProps(1)} />
          <Tab sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }} icon={<AttachFileIcon />} iconPosition='start' color='primary' label='Archivos' {...a11yProps(2)} />
          <Tab sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }} icon={<MarkChatUnreadIcon />} iconPosition='start' color='primary' label='Chat' {...a11yProps(3)} />
          <Tab sx={{ display: 'flex', justifyContent: 'space-between', m: 0, py: 0, px: 3 }} icon={<RestoreIcon />} iconPosition='start' color='primary' label='Historial' {...a11yProps(4)} />
        </Tabs>
      </List>

      <List>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={0}>
          <FormPerfil />
        </TabPanel>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={1}>
          <FormUser />
        </TabPanel>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={2}>
          <Schedule />
        </TabPanel>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={3}>
          Item
        </TabPanel>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel sx={{ flexGrow: 1 }} value={value} index={6}>
          Item Seven
        </TabPanel>

      </List>
    </div>
  )
}

export default LateralBar
