import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import { Link } from '@mui/material'
import styles from './Footer.module.scss'

function FooterPage () {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 col-xs-6 '>
            <a href=''>
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
                <Link href='/' sx={{ textDecoration: 'none', color: '#000' }} underline='none'>Inicio</Link>
              </li>
              <li className='my-3'>
                <Link href='/principal/Buscador' sx={{ textDecoration: 'none', color: '#000' }} underline='none'>Profesionales</Link>
              </li>
            </ul>
          </div>

          <div className='col-md-3 col-xs-6 '>
            <TwitterIcon />
            <FacebookIcon />
            <LinkedInIcon />
            <InstagramIcon />
          </div>
        </div>
        <div className={` row ${styles.direction}`}>
          <div className='my-5 col-md-6 col-xs-12 '>
            <p>Politíca de privacidad</p>
            <p>ChecayCuadra© 2022. Todos los derechos reservados</p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterPage
