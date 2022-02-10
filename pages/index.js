import Layout from '../components/Layout'

import { Box, Button } from '@mui/material'

import { URL_FULL } from '../services/config'

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
          href='/principal/Buscador'
        >Buscar especialistas
        </Button>
      </Box>

    </Layout>

  )
}
