import axios from "axios";

const BASE_URL = "/api/players";
const MEMBERS_PATH = "members";

const addMember = async (playerId, memberName) => {
  try {
    const response = await axios.post(`${BASE_URL}/${playerId}/${MEMBERS_PATH}`, {
      name: memberName
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    throw new Error(errorMsg || "Error adding member");
  }
};


const getMembers = async (playerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${playerId}/${MEMBERS_PATH}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching members");
  }
};

const getMemberById = async (playerId, memberId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${playerId}/${MEMBERS_PATH}/${memberId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching member with memberId: " + memberId);
  }
};

const deleteMember = async (playerId, memberId) => {
  try {
    await axios.delete(`${BASE_URL}/${playerId}/${MEMBERS_PATH}/${memberId}`);
    return memberId;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    throw new Error(errorMsg || "Error deleting member");
  }
};

const patchMemberVersion = async (playerId, memberId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${playerId}/${MEMBERS_PATH}/${memberId}`);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    throw new Error(errorMsg || "Error patching member");
  }
};

export default {
  addMember,
  getMembers,
  getMemberById,
  deleteMember,
  patchMemberVersion,
};
