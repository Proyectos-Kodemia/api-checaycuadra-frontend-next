import Layout from '../components/Layout'
import { Box, Button } from '@mui/material'
<<<<<<< HEAD
import { URL_FULL } from '../services/config'
=======
import { URL_BASE } from '../services/config'
>>>>>>> 5f6925b3a0eced795535d7cda66baab2b621a215

export default function Home () {
  return (

    <Layout>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
      >
        <img src='/icons/principal.svg' alt='inicio' width={1300} />
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        pb: 15,
        m: 1
      }}
      >
        <Button
          className='buttonPrincipal'
          variant='contained'
          type='submit'
          fullWidth

          href={`${URL_FULL}/principal/Buscador`}

        >Buscar especialistas
        </Button>
      </Box>

    </Layout>

  )
}
