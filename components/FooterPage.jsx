import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'

function FooterPage () {
  return (
    <footer className='footer' 'marginTop:90'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 col-xs-6 '>
            <a
              href='https://kodemia.mx/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>
                <img src='/icons/Logo.svg' alt='Logo' width={200} height={100} />
              </span>
            </a>
          </div>

          <div className='col-md-3 col-xs-6 '>
            <h5> Contacto</h5>
            <p>(MEX) +52 (55) 1234 5678</p>
            <p>info@checaycuadra.com</p>
          </div>

          <div className='col-md-3 col-xs-6 '>
            <h5>Navegacion </h5>
            <ul className='list-unstyled'>
              <li>
                <a href='#home'>Inicio</a>
              </li>
              <li>
                <a href='#Asi funciona'>Asi funciona</a>
              </li>
              <li>
                <a href='#Profesionales'>Profesionales</a>
              </li>
            </ul>
          </div>

          <div className='col-md-3 col-xs-6 '>
            <div>
              <div><TwitterIcon /></div>
              <div><FacebookIcon /></div>
              <div><LinkedInIcon /></div>
              <div><InstagramIcon /></div>
            </div>
            <div>
              <p>@ ChecayCuadra 2021. Todos los derechos reservados</p>
              <p>Politíca de privacidad</p>
            </div>

          </div>

        </div>
      </div>
    </footer>
  )
}

export default FooterPage
