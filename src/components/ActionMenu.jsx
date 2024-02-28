import React from 'react'
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

import MenuForm from './MenuForm'

const ActionMenu = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSearch = (value) => {
    dispatch(filterChange(value))
  }

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.7 }} />
        <TextField
          id="search-input"
          label="Search"
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            style: { borderRadius: 30 },
          }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        size="small"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleClickOpen}
      >
        Add Item
      </Button>
      <MenuForm open={open} handleClose={handleClose} />
    </Box>
  )
}

export default ActionMenu
