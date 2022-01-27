import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { URL_BASE } from '../services/config'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'

function NavPage () {
  const [sessionOn, setSessionOn] = useState(false)
  const router = useRouter()

  const handlerLogin = (e) => {
    e.preventDefault()
    router.push(`${URL_BASE}/Cuenta/LoginPage`, '/auth/loginUser')
  }

  const handlerRegister = (e) => {
    e.preventDefault()
    router.push(`${URL_BASE}/Cuenta/RegisterPage`, '/auth/registerUser')
  }

  const handlerPerfil = (e) => {
    e.preventDefault()
    router.push(`${URL_BASE}/Perfil/Perfil`, '/user/perfil')
  }

  const handlerLogout = (e) => {
    e.preventDefault()
    sessionStorage.removeItem('token')
    setSessionOn(false)
    router.push(`${URL_BASE}/principal/Buscador`)
  }

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      console.log('entro a session storage')
      if (sessionStorage.getItem('token')) {
        console.log('agrego datos a useState')
        setSessionOn(true)
      } else {
        console.log('error en session storage')
      }
    }
  }, [])

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <div>
          <a href={`${URL_BASE}/principal/Buscador`}> <img src='/icons/Logo.svg' alt='Logo' width={200} height={100} /> </a>
        </div>
        <div>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Nav className='me-auto'>
            <Nav.Link href={`${URL_BASE}/principal/Buscador`}>Inicio</Nav.Link>
            <Nav.Link href='#Asi funciona'>Asi funciona</Nav.Link>
            <Nav.Link href='#Profesionales'>Profesionales</Nav.Link>
          </Nav>
        </div>
        <div>
          {!sessionOn && <Button startIcon={<AppRegistrationOutlinedIcon />} type='button' sx={{ mx: 2, color: '#113311' }} variant='light' onClick={handlerRegister}>Registrate</Button>}
          {!sessionOn && <Button startIcon={<VpnKeyOutlinedIcon />} type='button' sx={{ mx: 2, color: '#113311' }} variant='outline-primary' onClick={handlerLogin}>Ingresar</Button>}
          {sessionOn && <Button startIcon={<ManageAccountsOutlinedIcon />} sx={{ mx: 2, color: '#113311' }} variant='text' onClick={handlerPerfil}>Mi Perfil</Button>}
          {sessionOn && <Button startIcon={<ExitToAppOutlinedIcon />} sx={{ mx: 2, color: '#113311' }} variant='text' onClick={handlerLogout}>Cerrar sesión</Button>}
        </div>
      </Container>
    </Navbar>
  )
}

export default NavPage
