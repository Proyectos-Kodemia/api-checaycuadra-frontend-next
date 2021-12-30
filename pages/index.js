import { Nav, Navbar, Container, Button } from "react-bootstrap"



export default function Home() {


  return (
    <div >
      <Navbar bg="light" expand="lg">
        <Container>
          <div>
            <a href="#home"> <img src="/icons/Logo.svg" alt="Logo" width={200} height={100} /> </a>
          </div>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
              <Nav.Link href="#Asi funciona">Asi funciona</Nav.Link>
              <Nav.Link href="#Profesionales">Profesionales</Nav.Link>
            </Nav>
          </div>
          <div>
            <Button variant="light">Registrate</Button>{' '}
            <Button variant="outline-primary">Ingresar</Button>{' '}
          </div>
        </Container>
      </Navbar>

      <main >
        <div className="container">
        <img src="/icons/inicio.svg" alt="inicio" width={1500} height={1200} />
        </div>
      </main>

      <footer  >
        <div className="container">
          <div className="row">
            <div className="col-4">
              <a
                href="https://kodemia.mx/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span >
                  <img src="/icons/Logo.svg" alt="Logo" width={200} height={100} />
                </span>
              </a>
            </div>

            <div className="col-4">
              <h5> Contacto</h5>
              <p>(MEX) +52 (55) 1234 5678</p>
              <p>info@checaycuadra.com</p>
            </div>

            <div className="col-4">
              <h5>Navegacion </h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#home">Inicio</a>
                </li>
                <li>
                  <a href="#Asi funciona">Asi funciona</a>
                </li>
                <li>
                  <a href="#Profesionales">Profesionales</a>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </footer >
    </div >
  )
}
