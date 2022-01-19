import * as React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Box, Avatar, Drawer, IconButton, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const drawerWidth = 190

function sliderAcoount (props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div style={{ paddingLeft: 20 }}>
      <Toolbar />
      <List>

        <ListItem button>
          <ListItemIcon>
            <a href='#home'> <img src='/icons/iconsSlider/perfil.svg' alt='Logo' width={25} height={35} /></a>
          </ListItemIcon>
          <ListItemText primary='Mi perfil' />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <a href='#home'> <img src='/icons/iconsSlider/calendario.svg' alt='Logo' width={25} height={35} /></a>
          </ListItemIcon>
          <ListItemText primary='Calendario' />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <a href='#home'> <img src='/icons/iconsSlider/archivos.svg' alt='Logo' width={25} height={35} /></a>
          </ListItemIcon>
          <ListItemText primary='Archivos' />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <a href='#home'> <img src='/icons/iconsSlider/chat.svg' alt='Logo' width={25} height={35} /></a>
          </ListItemIcon>
          <ListItemText primary='Chat' />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <a href='#home'> <img src='/icons/iconsSlider/historial.svg' alt='Logo' width={25} height={35} /></a>
          </ListItemIcon>
          <ListItemText primary='Historial' />
        </ListItem>

      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>

      <AppBar
        color='default'
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box>
            <a href='#home'> <img src='/icons/Logo.svg' alt='Logo' width={150} height={60} /> </a>
          </Box>

          <Box>
            <IconButton sx={{ p: 1 }}>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
            </IconButton>
            <IconButton sx={{ p: 1 }}>
              <ExitToAppIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

      </Box>
    </Box>

  )
}

sliderAcoount.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
}

export default sliderAcoount
