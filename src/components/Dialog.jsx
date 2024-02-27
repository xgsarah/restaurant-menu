import React from 'react'
import {
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Container,
  Grid,
} from '@mui/material'

const Dialog = ({ open, handleClose }) => {
  return (
    <MUIDialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          const formJson = Object.fromEntries(formData.entries())
          const email = formJson.email
          console.log(email)
          handleClose()
        },
      }}
    >
      <Container sx={{ py: 4, px: 2 }}>
        <DialogTitle>Add new item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                required
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                required
                id="category"
                name="category"
                label="Category"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                id="options"
                name="options"
                label="Options"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                id="cost"
                name="cost"
                label="cost"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                id="price"
                name="price"
                label="price"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                id="stock"
                name="stock"
                label="stock"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </DialogActions>
      </Container>
    </MUIDialog>
  )
}

export default Dialog
