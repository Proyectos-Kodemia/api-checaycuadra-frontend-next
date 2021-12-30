import React from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'

function NavbarH () {
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
          <Button variant='light'>Registrate</Button>{' '}
          <Button variant='outline-primary'>Ingresar</Button>{' '}
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarH
