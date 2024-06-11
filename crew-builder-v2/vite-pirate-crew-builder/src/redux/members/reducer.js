import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from '../utils';
import { addMemberAsync, getMembersAsync } from "./thunks";

const INITIAL_STATE = {
  list: [],
  getMembers: REQUEST_STATE.IDLE,
  addMember: REQUEST_STATE.IDLE,
  error: null
};

export const reducer = createSlice({
  name: "members",
  initialState: INITIAL_STATE,
  reducers: {
    addMember: (state, action) => {
      if (state.length < 6) {
        state.push(action.payload);
      } else {
        alert("You can only have up to 6 members in the crew.");
      }
    },
    removeMemberById: (state, action) => {
      return state.filter((member) => member.memberId !== action.payload);
    },
    removeAllMembers: () => {
      return [];
    },
    reorderMembers: (state, action) => {
      const { srcIndex, destIndex } = action.payload;
      const [removed] = state.splice(srcIndex, 1);
      state.splice(destIndex, 0, removed);
    }
  },
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
      .addCase(addMemberAsync.pending, (state) => {
        state.addMember = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addMemberAsync.fulfilled, (state, action) => {
        state.addMember = REQUEST_STATE.FULFILLED;
        state.list.push(action.payload);
      })
  }
});

export const {
  addMember,
  removeMemberById,
  removeAllMembers,
  reorderMembers } = reducer.actions;

export default reducer.reducer;
