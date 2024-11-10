import { configureStore } from '@reduxjs/toolkit'
import  notesReducer from './redux/slice'

export const store = configureStore({
  reducer: {
    notes : notesReducer
  },
})