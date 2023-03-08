import { createTheme } from '@mui/material/styles'
import darkScrollbar from "@mui/material/darkScrollbar"
import * as colors from '@mui/material/colors'

console.log({
  'APP COLOR': process.env.APP_COLOR,
})

export default createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: process.env.APP_COLOR || '#33cc22',
    },
    secondary: {
      main: colors.blue[400],
    },
    typography: {
      fontFamily: [
        'proxima-nova',
        'sans-serif',
      ].join(',')
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: ({ theme }) => ({
          ...darkScrollbar(),
          backgroundColor: theme.palette.primary.main,
        }),
      }
    }
  }
})
