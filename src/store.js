import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './reducers/menuReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    menu: menuReducer,
    filter: filterReducer,
  },
})

export default store
