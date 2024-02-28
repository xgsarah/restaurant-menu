import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Container,
} from '@mui/material'

const ConfirmationDialog = ({ title, open, handleClose, handleOperation }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <Container sx={{ py: 4, px: 2 }}>
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
            color="secondary"
            onClick={handleOperation}
          >
            Proceed
          </Button>
          <Button
            variant="contained"
            className="button-primary"
            autoFocus
            onClick={handleClose}
          >
            No
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  )
}

export default ConfirmationDialog
