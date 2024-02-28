// components/Menu.js
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { v4 as uuidv4 } from 'uuid'
import { Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { setMenuItems } from '../reducers/menuReducer'
import { colRef } from '../utils/firebase/config'

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

const columns = [
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
]

const Menu = () => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const menuItems = useSelector((state) => state.menu)

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        const items = []
        snapshot.docs.forEach((doc) => {
          items.push({ ...doc.data(), id: doc.id })
        })
        dispatch(setMenuItems(items))
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' })
      })

    onSnapshot(colRef, (snapshot) => {
      const items = []
      snapshot.docs.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id })
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
