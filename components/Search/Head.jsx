import { Search } from '@material-ui/icons'
import { Autocomplete, Box, Button, Chip, TextField } from '@mui/material'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import React, { useEffect } from 'react'
import { URL_FULL } from '../../services/config'
import styles from './Head.module.scss'

const endpoint = `${URL_FULL}/account`
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

  const searchCounter = (event) => {
    const direction = `${endpoint}?name=${buscar}`
    event.preventDefault()
    if (especialidad) {
      console.log('entro a especialidad', especialidad)
      setEspecialidad('Especialidad')
    } else if (setBuscar) {
      console.log('entro a buscar', buscar)

      // fetch(direction).then((res) => {
      //   res.json().then((data) => {
      //     const val = parseInt(Object.keys(data.payload).length)
      //     setUsers(data.payload)
      //     setResults(val)
      setBuscar('')
    //   })
    // })
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
                        // className={`${styles.textFieldsPerfil} ${styles.textAutocomplete}`}
                      />)}
                  />
                  {/* <Autocomplete
                    multiple
                    id='tags-filled'
                    sx={{ width: '400px', bgcolor: 'none' }}
                    options={especialidades}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label='Especialidades'
                        sx={{ bgcolor: 'none' }}
                        color='secondary'
                        variant='filled'
                        className={`${styles.textFieldsPerfil} ${styles.textAutocomplete}`}
                      />
                    )}
                  /> */}
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
  { title: 'Especialidad' },
  { title: 'Contabilidad General' },
  { title: 'Finanzas' },
  { title: 'Administración' },
  { title: 'Auditoría' },
  { title: 'Contraloría' },
  { title: 'Fiscal' },
  { title: 'Impuestos (SAT)' },
  { title: 'Costos' },
  { title: 'Obligaciones de seguridad social (IMSS)' }
]
