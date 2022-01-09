import { Search } from '@material-ui/icons'
import { Button, TextField } from '@mui/material'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import React from 'react'

function Head () {
  return (
    <>
      <div className='boxHead'>
        <h1>¡ Encuentra a tu contador !</h1>
        <h3>No estás solo, obtén ayuda profesional con un solo clic desde la comodidad de tu hogar</h3>
        <div className='boxFind'>
          <div>
            <div className='rowSearch'>
              <div>
                <WorkspacePremiumOutlinedIcon className='icon' disabled color='action' fontSize='large' />
              </div>
              <div className='textSearch'>
                <div>Especialista en</div>
                <div>Elige la especialidad que necesitas</div>
                <TextField className='searchEspecialist' />
              </div>
            </div>
            <div className='rowSearch'>
              <div>
                <BadgeOutlinedIcon className='icon' disabled color='action' fontSize='large' />
              </div>
              <div className='textSearch'>
                <div>Nombre del especialista</div>
                <div>Coloca el nombre de tu contador</div>
                <TextField />
              </div>
            </div>
          </div>
          <div>
            <Button startIcon={<Search />} variant='contained' className='buttonEspecialist'>BUSCAR MI ESPECIALISTA</Button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Head
