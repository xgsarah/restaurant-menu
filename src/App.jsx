import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import './utils/firebase/config'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
