import { createTheme } from '@mui/material/styles'
import darkScrollbar from "@mui/material/darkScrollbar"
import * as colors from '@mui/material/colors'


export default createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // main: colors.purple[600],
      // main: 'rgb(66, 165, 245)',
      // main: '#111119',
      main: '#30a9bb',
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
