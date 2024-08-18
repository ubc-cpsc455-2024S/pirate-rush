import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils'
import { getBossAsync, setBossAsync, patchBossVersionAsync } from './thunks'

const INITIAL_STATE = {
  boss: null,
  getBoss: REQUEST_STATE.IDLE,
  setBoss: REQUEST_STATE.IDLE,
  upgradeBoss: REQUEST_STATE.IDLE,
  error: null,
}

export const bossSlice = createSlice({
  name: 'boss',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getBossAsync.pending, (state) => {
        state.getBoss = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(getBossAsync.fulfilled, (state, action) => {
        state.getBoss = REQUEST_STATE.FULFILLED
        state.boss = action.payload
      })
      .addCase(getBossAsync.rejected, (state, action) => {
        state.getBoss = REQUEST_STATE.REJECTED
        state.error = action.error
      })
      .addCase(setBossAsync.pending, (state) => {
        state.setBoss = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(setBossAsync.fulfilled, (state, action) => {
        state.setBoss = REQUEST_STATE.FULFILLED
        state.boss = action.payload
      })
      .addCase(setBossAsync.rejected, (state, action) => {
        state.setBoss = REQUEST_STATE.REJECTED
        state.error = action.error
      })
      .addCase(patchBossVersionAsync.pending, (state) => {
        state.upgradeBoss = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(patchBossVersionAsync.fulfilled, (state, action) => {
        state.upgradeBoss = REQUEST_STATE.FULFILLED
        state.boss = {
          ...state.boss,
          ...action.payload,
        }
      })
      .addCase(patchBossVersionAsync.rejected, (state, action) => {
        state.upgradeBoss = REQUEST_STATE.REJECTED
        state.error = action.error
      })
  },
})

export default bossSlice.reducer
