import { createTheme } from '@mui/material/styles'
import darkScrollbar from "@mui/material/darkScrollbar"
import * as colors from '@mui/material/colors'
console.log({ colors })
export default createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.purple[600],
    },
    secondary: {
      main: colors.blue[400],
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
