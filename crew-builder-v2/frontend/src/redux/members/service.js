import axios from "axios";

const BASE_URL = "/api/members";

const addMember = async (member) => {
  try {
    const response = await axios.post(BASE_URL, member, {
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

const getMembers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching members");
  }
};

const deleteMember = async (memberId) => {
  try {
    await axios.delete(`${BASE_URL}/${memberId}`);
    return memberId;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    throw new Error(errorMsg || "Error deleting member");
  }
};

const patchMemberVersion = async (memberId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${memberId}`);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    throw new Error(errorMsg || "Error patching member");
  }
};

export default {
  addMember,
  getMembers,
  deleteMember,
  patchMemberVersion,
};
