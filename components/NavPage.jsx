import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import { color } from '@mui/system'

function NavPage () {
  const [sessionOn, setSessionOn] = useState(false)
  const router = useRouter()

  const handlerLogin = (e) => {
    e.preventDefault()
    router.push('/Cuenta/LoginPage')
  }

  const handlerRegister = (e) => {
    e.preventDefault()
    router.push('/Cuenta/RegisterPage')
  }

  const handlerPerfil = (e) => {
    e.preventDefault()
    router.push('/Perfil/Perfil')
  }

  const handlerLogout = (e) => {
    e.preventDefault()
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('role')
    setSessionOn(false)
    router.push('/principal/Buscador')
  }

  useEffect(() => {
    if (typeof window.sessionStorage !== 'undefined') {
      // console.log('entro a session storage')
      if (window.sessionStorage.getItem('token')) {
        // console.log('agrego datos a useState')
        setSessionOn(true)
      } else {
        console.log('Log Nav storage')
      }
    }
  }, [])

  return (
    <Navbar style={{ background: '#F0F0F0' }} expand='lg'>
      <Container>
        <div>
          <Link href='/'>
            <img src='/icons/Logo.svg' alt='Logo' width={200} height={100} />
          </Link>
        </div>
        <div>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Nav className='me-auto'>
            <Nav.Link href='/'>Inicio</Nav.Link>
            <Nav.Link href='/principal/Buscador'>Profesionales</Nav.Link>
          </Nav>
        </div>
        <div>
          {!sessionOn && <Button startIcon={<AppRegistrationOutlinedIcon />} type='button' sx={{ mx: 2, color: '#113311' }} variant='light' color='primary' onClick={handlerRegister}>Registrate</Button>}
          {!sessionOn && <Button startIcon={<VpnKeyOutlinedIcon />} type='button' sx={{ mx: 2, color: '#113311' }} variant='outline-primary' color='primary' onClick={handlerLogin}>Ingresar</Button>}
          {sessionOn && <Button startIcon={<ManageAccountsOutlinedIcon />} sx={{ mx: 2, color: '#113311' }} variant='text' color='primary' onClick={handlerPerfil}>Mi Perfil</Button>}
          {sessionOn && <Button startIcon={<ExitToAppOutlinedIcon />} sx={{ mx: 2, color: '#113311' }} variant='text' color='primary' onClick={handlerLogout}>Cerrar sesión</Button>}
        </div>
      </Container>
    </Navbar>
  )
}

export default NavPage
