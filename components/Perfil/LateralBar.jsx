import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import EventIcon from '@mui/icons-material/Event'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import RestoreIcon from '@mui/icons-material/Restore'
import FormPerfil from './FormPerfil'
import Schedule from '../AccountPages/Schedule'

// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: 'block',
//     height: 400
//   },
//   tabs: {
//     borderRight: `1px solid ${theme.palette.divider}`
//     width: 100
//   },
//   flexContainerVertical: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   flexOuter: {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%'
//   }
// }))

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
        <>{children}</>
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
  //   const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className='containerPrincipal'>
      <div className='containerLateralMenu'>
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
          <Tab className='tabElement' icon={<ManageAccountsIcon />} iconPosition='start' color='primary' label='Mi perfil' {...a11yProps(0)} />
          <Tab className='tabElement' icon={<EventIcon />} iconPosition='start' color='primary' label='Calendario' {...a11yProps(1)} />
          <Tab className='tabElement' icon={<AttachFileIcon />} iconPosition='start' color='primary' label='Archivos' {...a11yProps(2)} />
          <Tab className='tabElement' icon={<MarkChatUnreadIcon />} iconPosition='start' color='primary' label='Chat' {...a11yProps(3)} />
          <Tab className='tabElement' icon={<RestoreIcon />} iconPosition='start' color='primary' label='Historial' {...a11yProps(4)} />
        </Tabs>
      </div>
      <div className='containerPages'>
        <TabPanel value={value} index={0}>
          <FormPerfil />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Schedule />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
    </div>
  )
}

export default LateralBar
