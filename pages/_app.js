import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/app.scss'
// import { ThemeProvider } from '@material-ui/core/styles'
// import theme from '../styles/abstract/styles'

function MyApp ({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
