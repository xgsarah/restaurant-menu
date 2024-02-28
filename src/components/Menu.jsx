import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { v4 as uuidv4 } from 'uuid'
import { Chip, IconButton, Box } from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { setMenuItems } from '../reducers/menuReducer'
import { colRef, db } from '../utils/firebase/config'
import ConfirmationDialog from './ConfirmationDialog'
import MenuForm from './MenuForm'

const OptionsRenderer = ({ options }) => {
  return (
    <>
      {options.map((option) => (
        <Chip
          key={uuidv4()}
          label={option}
          style={{ marginRight: 5, marginBottom: 5 }}
        />
      ))}
    </>
  )
}

const DeleteButton = ({ row }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)

  const handleDelete = (id, name) => {
    const docRef = doc(db, 'menu-items', id)

    deleteDoc(docRef)
      .then(() => {
        enqueueSnackbar(`Successfully deleted ${name}.`, {
          variant: 'success',
        })
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: 'error',
        })
      })
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        title={`Are you sure you want to delete ${row.name}?`}
        open={open}
        handleClose={() => setOpen(false)}
        handleOperation={() => handleDelete(row.id, row.name)}
      />
    </>
  )
}

const EditButton = ({ row }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)

  const handleEdit = () => {}

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <MenuForm
        open={open}
        handleClose={() => setOpen(false)}
        editMode
        values={row}
      />
    </>
  )
}

const columns = [
  { field: 'id', headerName: 'id', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'stock', headerName: 'Stock', type: 'number', width: 120 },
  { field: 'price', headerName: 'Price', type: 'number', width: 120 },
  { field: 'cost', headerName: 'Cost', type: 'number', width: 120 },
  {
    field: 'options',
    headerName: 'Options',
    width: 300,
    renderCell: (params) => <OptionsRenderer options={params.value} />,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    renderCell: (params) => (
      <Box>
        <EditButton row={params.row} />
        <DeleteButton row={params.row} />
      </Box>
    ),
  },
]

const Menu = () => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const menuItems = useSelector((state) => state.menu)

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        const items = []
        snapshot.docs.forEach((document) => {
          items.push({ ...document.data(), id: document.id })
        })
        dispatch(setMenuItems(items))
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' })
      })

    onSnapshot(colRef, (snapshot) => {
      const items = []
      snapshot.docs.forEach((document) => {
        items.push({ ...document.data(), id: document.id })
      })
      dispatch(setMenuItems(items))
    })

    return () => {}
  }, [dispatch, enqueueSnackbar])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={menuItems}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  )
}

export default Menu
