import React from 'react'
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material'

const MainLayout = ({ children }) => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">My Restaurant</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        {children}
      </Container>
      <Box
        sx={{
          textAlign: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
      >
        &copy; 2024 srhqmp
      </Box>
    </div>
  )
}

export default MainLayout
