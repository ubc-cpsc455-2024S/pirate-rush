import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import { addMemberAsync, getMembersAsync, deleteMemberAsync } from "./thunks";

const INITIAL_STATE = {
  list: [],
  getMembers: REQUEST_STATE.IDLE,
  addMember: REQUEST_STATE.IDLE,
  deleteMember: REQUEST_STATE.IDLE,
  error: null
};

export const reducer = createSlice({
  name: "members",
  initialState: INITIAL_STATE,
  // reducers: {
  //   reorderMembers: (state, action) => {
  //     const { srcIndex, destIndex } = action.payload;
  //     const [removed] = state.list.splice(srcIndex, 1);
  //     state.list.splice(destIndex, 0, removed);
  //   }
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getMembersAsync.pending, (state) => {
        state.getMembers = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getMembersAsync.fulfilled, (state, action) => {
        state.getMembers = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getMembersAsync.rejected, (state, action) => {
        state.getMembers = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addMemberAsync.pending, (state) => {
        state.addMember = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addMemberAsync.fulfilled, (state, action) => {
        state.addMember = REQUEST_STATE.FULFILLED;
        if (state.list.length < 6) {
          state.list.push(action.payload);
        } else {
          alert("You can only have up to 6 members in the crew.");
        }
      })
      .addCase(addMemberAsync.rejected, (state, action) => {
        state.addMember = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(deleteMemberAsync.pending, (state) => {
        state.deleteMember = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        state.deleteMember = REQUEST_STATE.FULFILLED;
        console.log(state.list)
        state.list = state.list.filter(member => member.memberId !== action.payload);
        console.log(state.list)
      })
      .addCase(deleteMemberAsync.rejected, (state, action) => {
        state.deleteMember = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
  }
});

export default reducer.reducer;
