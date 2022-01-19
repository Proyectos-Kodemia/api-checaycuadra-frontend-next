import { Link } from '@mui/material'
import Layout from '../components/Layout'
import { URL_BASE } from '../services/config'

export default function Home () {
  return (

    <Layout>
      <div className='container'>
        <img src='/icons/inicio.svg' alt='inicio' width={1500} height={1200} />
      </div>
      <Link href={`${URL_BASE}/Perfil/PerfilAccount`}><a>perfil contador</a></Link>
      <Link href={`${URL_BASE}/Buscador`} underline='none'><button>Buscar mas especialistas</button></Link>
    </Layout>

  )
}
