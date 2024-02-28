import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material'

const ConfirmationDialog = ({ title, open, handleClose, handleOperation }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogContent sx={{ textAlign: 'center' }}>
        <DialogContentText
          style={{ textAlign: 'center' }}
          id="alert-dialog-description"
        >
          {title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className="button-primary"
          onClick={handleOperation}
          size="small"
        >
          Proceed
        </Button>
        <Button
          variant="outlined"
          className="button-primary"
          autoFocus
          onClick={handleClose}
          size="small"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
