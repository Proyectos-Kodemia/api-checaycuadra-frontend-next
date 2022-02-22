import { Search } from '@material-ui/icons'
import { Autocomplete, Box, Button, Chip, TextField } from '@mui/material'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import React, { useEffect } from 'react'
import { URL_FULL } from '../../services/config'
import styles from './Head.module.scss'

const endpoint = `${URL_FULL}/account`
// const endpoint = 'http://localhost:8000/account'
function Head ({ setResults, users, setUsers, buscar, setBuscar, setEspecialidad, especialidad }) {
  useEffect(() => {
    fetch(`${endpoint}`).then((res) => {
      res.json().then((data) => {
        setUsers(data.payload)
        // console.log(data.payload)
      })
    })
  }, [])

  const defaultProps = {
    options: especialidades,
    getOptionLabel: (option) => option.title ? option.title : ''
  }

  function searchCounter (event) {
    const directionBuscar = `${endpoint}?name=${buscar}`
    event.preventDefault()
    console.log('esta es la especialidad', especialidad)
    if (especialidad !== 'Especialidad') {
      const directionEspecialidad = `${endpoint}?specialities=${JSON.stringify(especialidad)}`
      console.log('entro a especialidad', especialidad)
      console.log('nos esta enviando a ', directionEspecialidad)
      fetch(directionEspecialidad).then((res) => {
        res.json().then((data) => {
          console.log(data)
          const val = parseInt(Object.keys(data.payload).length)
          setUsers(data.payload)
          setEspecialidad('Especialidad')
          setResults(val)
        })
      })
    } else if (setBuscar) {
      console.log('entro a buscar', buscar)

      fetch(directionBuscar).then((res) => {
        res.json().then((data) => {
          const val = parseInt(Object.keys(data.payload).length)
          setUsers(data.payload)
          setResults(val)
          setBuscar('')
        })
      })
    }
  }

  return (
    <>
      <form className={styles.boxHead} onSubmit={searchCounter}>
        <h1>¡ Encuentra a tu contador !</h1>
        <h3>No estás solo, obtén ayuda profesional con un solo clic desde la comodidad de tu hogar</h3>
        <div className={styles.boxFind}>
          <div>
            <div className={styles.rowSearch}>
              <div>
                <WorkspacePremiumOutlinedIcon sx={{ mt: 1 }} disabled color='action' fontSize='large' />
              </div>
              <div className={styles.textSearch}>
                <div>Especialista en</div>
                <div>Elige la especialidad que necesitas</div>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
                >
                  <Autocomplete
                    {...defaultProps}
                    id='combo-box'
                    value={especialidad}
                    sx={{ width: '400px', bgcolor: 'none', fontSize: '12px' }}
                    onChange={(event, newValue) => {
                      setEspecialidad(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Especialidades'
                        sx={{ fontSize: '12px' }}
                      />)}
                  />
                </Box>
              </div>
            </div>
            <div className={styles.rowSearch}>
              <div>
                <BadgeOutlinedIcon className={styles.icon} disabled color='action' fontSize='large' />
              </div>
              <div className={styles.textSearch}>
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

const especialidades = [
  { id: 0, title: 'Especialidad' },
  { id: 1, title: 'Contabilidad General' },
  { id: 2, title: 'Finanzas' },
  { id: 3, title: 'Administración' },
  { id: 4, title: 'Auditoría' },
  { id: 5, title: 'Contraloría' },
  { id: 6, title: 'Fiscal' },
  { id: 7, title: 'Impuestos (SAT)' },
  { id: 8, title: 'Costos' },
  { id: 9, title: 'Obligaciones de seguridad social (IMSS)' }
]
