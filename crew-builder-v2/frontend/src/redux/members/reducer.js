import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils'
import { addMemberAsync, getMembersAsync, deleteMemberAsync, patchMemberVersionAsync } from './thunks'

const INITIAL_STATE = {
  list: [],
  getMembers: REQUEST_STATE.IDLE,
  addMember: REQUEST_STATE.IDLE,
  deleteMember: REQUEST_STATE.IDLE,
  patchMemberVersion: REQUEST_STATE.IDLE,
  error: null,
}

export const membersSlice = createSlice({
  name: 'members',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getMembersAsync.pending, (state) => {
        state.getMembers = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(getMembersAsync.fulfilled, (state, action) => {
        state.getMembers = REQUEST_STATE.FULFILLED
        state.list = action.payload
      })
      .addCase(getMembersAsync.rejected, (state, action) => {
        state.getMembers = REQUEST_STATE.REJECTED
        state.error = action.error
      })
      .addCase(addMemberAsync.pending, (state) => {
        state.addMember = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(addMemberAsync.fulfilled, (state, action) => {
        state.addMember = REQUEST_STATE.FULFILLED
        state.list.push(action.payload)
      })
      .addCase(addMemberAsync.rejected, (state, action) => {
        state.addMember = REQUEST_STATE.REJECTED
        state.error = action.error
        alert(action.error.message)
      })
      .addCase(deleteMemberAsync.pending, (state) => {
        state.deleteMember = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        state.deleteMember = REQUEST_STATE.FULFILLED
        state.list = state.list.filter((member) => member.memberId !== action.payload)
      })
      .addCase(deleteMemberAsync.rejected, (state, action) => {
        state.deleteMember = REQUEST_STATE.REJECTED
        state.error = action.error
        alert(action.error.message)
      })
      .addCase(patchMemberVersionAsync.pending, (state) => {
        state.patchMemberVersion = REQUEST_STATE.PENDING
        state.error = null
      })
      .addCase(patchMemberVersionAsync.fulfilled, (state, action) => {
        state.patchMemberVersion = REQUEST_STATE.FULFILLED
        const memberIndex = state.list.findIndex((member) => member.memberId === action.payload.memberId)
        state.list[memberIndex].patchMemberVersion = action.payload
      })
      .addCase(patchMemberVersionAsync.rejected, (state, action) => {
        state.patchMemberVersion = REQUEST_STATE.REJECTED
        state.error = action.error
        alert(action.error.message)
      })
  },
})

export default membersSlice.reducer
