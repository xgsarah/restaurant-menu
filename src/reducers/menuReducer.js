import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
  name: 'menu',
  initialState: [],
  reducers: {
    setMenuItems(state, action) {
      return action.payload
    },
  },
})

export const { setMenuItems } = menuSlice.actions
export default menuSlice.reducer
