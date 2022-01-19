import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#113311'
    },
    secondary: {
      main: '#8fed4d'
    }
  },
  shape: {
    borderRadius: 15
  },
  spacing: 1
})

export default theme
