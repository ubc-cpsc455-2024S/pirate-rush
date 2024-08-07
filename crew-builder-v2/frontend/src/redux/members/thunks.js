import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import MemberService from "./service";

export const getMembersAsync = createAsyncThunk(
  actionTypes.GET_MEMBERS,
  async ({playerId}) => {
    return await MemberService.getMembers(playerId);
  },
);

export const addMemberAsync = createAsyncThunk(
  actionTypes.ADD_MEMBER,
  async ({playerId, memberName}) => {
    return await MemberService.addMember(playerId, memberName);
  },
);

export const deleteMemberAsync = createAsyncThunk(
  actionTypes.DELETE_MEMBER,
  async ({playerId, memberId}) => {
    return await MemberService.deleteMember(playerId, memberId);
  },
);

export const patchMemberVersionAsync = createAsyncThunk(
  actionTypes.PATCH_MEMBER_VERSION,
  async ({playerId, memberId}) => {
    return await MemberService.patchMemberVersion(playerId, memberId);
  },
);
