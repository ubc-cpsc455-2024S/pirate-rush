import { configureStore } from '@reduxjs/toolkit'
import membersReducer from './members/reducer.js'
import playersReducer from './players/reducer.js'

export default configureStore({
  reducer: {
    members: membersReducer,
    players: playersReducer
  },
})
