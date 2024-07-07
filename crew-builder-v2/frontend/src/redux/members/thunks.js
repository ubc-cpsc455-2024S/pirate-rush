import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import MemberService from "./service";

export const getMembersAsync = createAsyncThunk(
    actionTypes.GET_MEMBERS,
    async () => {
        return await MemberService.getMembers();
    },
);

export const addMemberAsync = createAsyncThunk(
    actionTypes.ADD_MEMBER,
    async (member) => {
        return await MemberService.addMember(member);
    },
);

export const deleteMemberAsync = createAsyncThunk(
    actionTypes.DELETE_MEMBER,
    async (memberId) => {
        return await MemberService.deleteMember(memberId);
    },
);

export const patchMemberVersionAsync = createAsyncThunk(
    actionTypes.PATCH_MEMBER_VERSION,
    async (memberId) => {
        return await MemberService.patchMemberVersion(memberId);
    },
);
