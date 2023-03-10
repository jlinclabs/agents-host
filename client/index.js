import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Routes from './Routes'
import theme from './theme'
import ErrorBoundary from './components/ErrorBoundary'
import AppError from './components/AppError'

const root = ReactDOM.createRoot(document.querySelector('body > main'))

root.render(
  <React.StrictMode>
    <ThemeProvider {...{theme}}>
      <CssBaseline enableColorScheme />
      <ToastContainer/>
      <ErrorBoundary onError={error => <AppError {...{error}}/>}>
        <div> hello 6 </div>
        {/* <BrowserRouter>
          <Routes/>
        </BrowserRouter> */}
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
)
