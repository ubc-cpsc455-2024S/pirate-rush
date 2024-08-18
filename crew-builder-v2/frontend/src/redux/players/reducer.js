import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils'
import {
  getBenchCrewAsync,
  getPlayerAsync,
  patchBerriesAsync,
  deletePlayerAsync,
  patchPlayerNameAsync,
  patchNewPiratesAsync,
} from './thunks'

const INITIAL_STATE = {
  player: null,
  currentCrew: [],
  benchCrew: [],
  getPlayer: REQUEST_STATE.IDLE,
  getBenchCrew: REQUEST_STATE.IDLE,
  patchBerries: REQUEST_STATE.IDLE,
  deletePlayer: REQUEST_STATE.IDLE,
  patchPlayerName: REQUEST_STATE.IDLE,
  patchNewPirates: REQUEST_STATE.IDLE,
  error: null,
}

const playerSlice = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerAsync.pending, (state) => {
        state.getPlayer = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(getPlayerAsync.fulfilled, (state, action) => {
        state.getPlayer = REQUEST_STATE.FULFILLED
        state.player = action.payload
      })
      .addCase(getPlayerAsync.rejected, (state, action) => {
        state.getPlayer = REQUEST_STATE.REJECTED
        state.error = action.error
      })
      .addCase(patchBerriesAsync.pending, (state) => {
        state.patchBerries = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(patchBerriesAsync.fulfilled, (state, action) => {
        state.patchBerries = REQUEST_STATE.FULFILLED
        if (state.player) {
          state.player.berries = action.payload
        }
      })
      .addCase(patchBerriesAsync.rejected, (state, action) => {
        state.patchBerries = REQUEST_STATE.REJECTED
        state.error = action.error
      })
      .addCase(getBenchCrewAsync.pending, (state) => {
        state.getBenchCrew = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(getBenchCrewAsync.fulfilled, (state, action) => {
        state.getBenchCrew = REQUEST_STATE.FULFILLED
        if (state.player) {
          state.player.benchCrew = action.payload
          state.benchCrew = action.payload
        }
      })
      .addCase(getBenchCrewAsync.rejected, (state, action) => {
        state.getBenchCrew = REQUEST_STATE.REJECTED
        state.error = action.error
      })
      .addCase(deletePlayerAsync.pending, (state) => {
        state.deletePlayer = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(deletePlayerAsync.fulfilled, (state, action) => {
        state.deletePlayer = REQUEST_STATE.FULFILLED
        state.player = action.payload
      })
      .addCase(deletePlayerAsync.rejected, (state, action) => {
        state.deletePlayer = REQUEST_STATE.REJECTED
        state.error = action.error
      })
      .addCase(patchPlayerNameAsync.pending, (state) => {
        state.patchPlayerName = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(patchPlayerNameAsync.fulfilled, (state, action) => {
        state.patchPlayerName = REQUEST_STATE.FULFILLED
        if (state.player) {
          state.player.username = action.payload
        }
      })
      .addCase(patchPlayerNameAsync.rejected, (state, action) => {
        state.patchPlayerName = REQUEST_STATE.REJECTED
        state.error = action.error
      })
      .addCase(patchNewPiratesAsync.pending, (state) => {
        state.patchNewPirates = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(patchNewPiratesAsync.fulfilled, (state, action) => {
        state.patchNewPirates = REQUEST_STATE.FULFILLED
        if (state.player) {
          state.player.unlockedPirates = action.payload
        }
      })
      .addCase(patchNewPiratesAsync.rejected, (state, action) => {
        state.patchNewPirates = REQUEST_STATE.REJECTED
        state.error = action.error
      })
  },
})

export default playerSlice.reducer
