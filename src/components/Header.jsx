import React from 'react'
import { Box, Typography } from '@mui/material'

const Header = ({ name, action }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <Typography variant="h4" color="secondary">
        {name}
      </Typography>
      <Box>{action}</Box>
    </Box>
  )
}

export default Header
