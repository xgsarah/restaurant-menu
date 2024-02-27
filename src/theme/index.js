import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D9596',
    },
    secondary: {
      main: '#B67352',
    },
    text: {
      primary: '#265073',
    },
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
})

export default theme
