import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Container,
  Grid,
  Stack,
  Chip,
  Fab,
  InputAdornment,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'
import { useSnackbar } from 'notistack'
import { addDoc, doc, updateDoc } from 'firebase/firestore'
import menuSchema from '../utils/schema'
import { colRef, db } from '../utils/firebase/config'

const MenuForm = ({ open, handleClose: onClose, editMode, values }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [options, setOptions] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(menuSchema),
  })

  const handleClose = () => {
    onClose()
    reset()
    setOptions([])
  }

  useEffect(() => {
    if (editMode) {
      reset(values)
      setOptions(values.options)
    }
  }, [editMode, reset, values, open])

  const onSubmit = (data) => {
    const { id, name, category, price, stock, cost } = data

    const item = { name, category, price, stock, cost, options }
    if (!editMode) {
      addDoc(colRef, item)
        .then(() => {
          handleClose()
          enqueueSnackbar(`Successfully added ${data.name}.`, {
            variant: 'success',
          })
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: 'error',
          })
        })
    } else {
      const docRef = doc(db, 'menu-items', id)

      updateDoc(docRef, item)
        .then(() => {
          handleClose()
          enqueueSnackbar(`Successfully updated ${name}.`, {
            variant: 'success',
          })
        })
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: 'error',
          })
        })
    }
  }

  const handleAddOption = () => {
    const option = document.getElementById('option-input').value.trim()
    if (option && !options.includes(option)) {
      setOptions([...options, option])
      document.getElementById('option-input').value = ''
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddOption()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(onSubmit),
        autoComplete: 'off',
        noValidate: true,
      }}
      disableRestoreFocus
    >
      <Container sx={{ py: 4, px: 2 }}>
        <DialogTitle>Add new item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                {...register('name')}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('category')}
                label="Category"
                error={!!errors.category}
                helperText={errors.category?.message}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TextField
                id="option-input"
                name="options"
                label="Option"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                onKeyDown={handleKeyDown}
              />
              <Fab
                size="medium"
                color="secondary"
                sx={{ mt: 1 }}
                onClick={handleAddOption}
              >
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {options.map((option) => (
                  <Chip
                    key={uuidv4()}
                    label={option}
                    onDelete={() =>
                      setOptions(options.filter((o) => o !== option))
                    }
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                {...register('stock')}
                label="Stock"
                type="number"
                error={!!errors.stock}
                helperText={errors.stock?.message}
                margin="normal"
                fullWidth
                defaultValue={0}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                {...register('cost')}
                label="Cost"
                type="number"
                error={!!errors.cost}
                helperText={errors.cost?.message}
                fullWidth
                variant="outlined"
                margin="normal"
                defaultValue={0}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₱</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                {...register('price')}
                label="Price"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                variant="outlined"
                margin="normal"
                defaultValue={0}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₱</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  )
}

export default MenuForm
