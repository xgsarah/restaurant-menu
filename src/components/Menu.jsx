import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { v4 as uuidv4 } from 'uuid'
import { Chip, IconButton, Box, Stack } from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'

import { setMenuItems } from '../reducers/menuReducer'
import { colRef, db } from '../utils/firebase/config'
import ConfirmationDialog from './ConfirmationDialog'
import MenuForm from './MenuForm'

const OptionsRenderer = ({ options }) => {
  return options.length ? (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      flexWrap="wrap"
      sx={{ my: 1 }}
    >
      {options.map((option) => (
        <Chip
          key={uuidv4()}
          label={option}
          style={{ marginRight: 5, marginBottom: 5 }}
        />
      ))}
    </Stack>
  ) : null
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
  const [open, setOpen] = useState(false)

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

const formatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'stock', headerName: 'Stock', type: 'number', width: 120 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 120,
    renderCell: (params) => formatter.format(params.value),
  },
  {
    field: 'cost',
    headerName: 'Cost',
    type: 'number',
    width: 120,
    renderCell: (params) => formatter.format(params.value),
  },
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
    sortable: false,
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
  const filter = useSelector((state) => state.filter)

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()) ||
      item.options.some((option) =>
        option.toLowerCase().includes(filter.toLowerCase())
      )
  )

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
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={filteredMenuItems}
        columns={columns}
        pageSize={10}
        pageSizeOptions={[10, 20, 30]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        getRowHeight={() => 'auto'}
        disableColumnMenu
        autoHeight
        autoWidth
      />
    </div>
  )
}

export default Menu
