import Layout from '../components/Layout'
import Login from '../components/Login'

export default function Home () {
  return (
    <Layout>
      {/* <div className='container'>
        <img src='/icons/inicio.svg' alt='inicio' width={1500} height={1200} />
      </div> */}
      <Login />
    </Layout>
  )
}
