import { Search } from '@material-ui/icons'
import { Button, TextField } from '@mui/material'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import React, { useEffect } from 'react'

const endpoint = 'http://localhost:5000/account'
function Head ({ setResults, users, setUsers, buscar, setBuscar }) {
  useEffect(() => {
    fetch(`${endpoint}`).then((res) => {
      res.json().then((data) => {
        setUsers(data.payload)
        // console.log(data.payload)
      })
    })
  }, [])

  const searchCounter = (event) => {
    const direction = `${endpoint}?name=${buscar}`
    event.preventDefault()
    fetch(direction).then((res) => {
      res.json().then((data) => {
        const val = parseInt(Object.keys(data.payload).length)
        setUsers(data.payload)
        setResults(val)
        setBuscar('')
      })
    })
  }

  return (
    <>
      <form className='boxHead' onSubmit={searchCounter}>
        <h1>¡ Encuentra a tu contador !</h1>
        <h3>No estás solo, obtén ayuda profesional con un solo clic desde la comodidad de tu hogar</h3>
        <div className='boxFind'>
          <div>
            <div className='rowSearch'>
              <div>
                <WorkspacePremiumOutlinedIcon sx={{ mt: 1 }} disabled color='action' fontSize='large' />
              </div>
              <div className='textSearch'>
                <div>Especialista en</div>
                <div>Elige la especialidad que necesitas</div>
                <TextField sx={{ p: 0 }} />
              </div>
            </div>
            <div className='rowSearch'>
              <div>
                <BadgeOutlinedIcon className='icon' disabled color='action' fontSize='large' />
              </div>
              <div className='textSearch'>
                <div>Nombre del especialista</div>
                <div>Coloca el nombre de tu contador</div>
                <TextField
                  type='text'
                  value={buscar}
                  onChange={(e) => setBuscar(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <Button
              type='submit' startIcon={<Search />} variant='contained' sx={{
                border: 'none',
                bgcolor: '#000',
                '&:hover': {
                  background: '#005'
                }
              }}
            >BUSCAR MI ESPECIALISTA
            </Button>
          </div>
        </div>
      </form>

    </>
  )
}

export default Head
