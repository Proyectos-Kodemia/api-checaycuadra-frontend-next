import React from 'react'

function FooterPage () {
  return (
    <footer>
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
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

          <div className='col-4'>
            <h5> Contacto</h5>
            <p>(MEX) +52 (55) 1234 5678</p>
            <p>info@checaycuadra.com</p>
          </div>

          <div className='col-4'>
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
        </div>
      </div>
    </footer>
  )
}

export default FooterPage
