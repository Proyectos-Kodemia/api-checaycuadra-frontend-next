import React from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

function NavPage () {
  const router = useRouter()

  const handlerLogin = (e) => {
    e.preventDefault()
    console.log(e)
    router.push('/LoginPage')
  }

  const handlerRegister = (e) => {
    e.preventDefault()
    console.log(e)
    router.push('/RegisterPage')
  }

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <div>
          <a href='#home'> <img src='/icons/Logo.svg' alt='Logo' width={200} height={100} /> </a>
        </div>
        <div>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Inicio</Nav.Link>
            <Nav.Link href='#Asi funciona'>Asi funciona</Nav.Link>
            <Nav.Link href='#Profesionales'>Profesionales</Nav.Link>
          </Nav>
        </div>
        <div>
          <Button type='button' variant='light' onClick={handlerRegister}>Registrate</Button>{' '}
          <Button type='button' variant='outline-primary' onClick={handlerLogin}>Ingresar</Button>{' '}
        </div>
      </Container>
    </Navbar>
  )
}

export default NavPage
