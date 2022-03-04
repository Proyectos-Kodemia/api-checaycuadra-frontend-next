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
          <div className='col-md-4 col-xs-6 '>
            <a href=''>
              <span>
                <img src='/icons/Logo.svg' alt='Logo' width={200} height={100} />
              </span>
            </a>
          </div>

          <div className='col-md-4 col-xs-6 '>
            <h5> Contacto</h5>
            <br />
            <p>(MEX) +52 (55) 1234 5678</p>
            <p>info@checaycuadra.com</p>
          </div>

          <div className='col-md-3 col-xs-6 '>
            <h5>Navegacion </h5>
            <br />
            <p> <Link href='' underline='none' color='black'>Inicio</Link></p>
            <p> <Link href='/principal/Buscador' underline='none' color='black'>Profesionales</Link></p>
          </div>

          <div className='col-md-1 col-xs-6 '>
            <div><TwitterIcon /> </div>
            <div><FacebookIcon /> </div>
            <div><LinkedInIcon /> </div>
            <div><InstagramIcon /> </div>
          </div>

        </div>

        <div className={` row ${styles.direction}`}>
          <div className='mt-5 mb-3 col-md-6 col-xs-12 '>
            <p>Politíca de privacidad</p>
            <p>ChecayCuadra© 2022. Todos los derechos reservados</p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterPage
