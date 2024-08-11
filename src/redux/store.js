import { configureStore } from '@reduxjs/toolkit'
import user from './slicers/user'
import ticket from './slicers/ticket'

export default configureStore({
  reducer: {
    user: user,
    ticket: ticket
  },
})