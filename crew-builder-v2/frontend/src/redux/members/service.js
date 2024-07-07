import axios from "axios";

const URL_PATH = "http://localhost:3000/members";

const addMember = async (member) => {
    try {
        const response = await axios.post(URL_PATH, member, {
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
        const response = await axios.get(URL_PATH);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching members");
    }
};

const deleteMember = async (memberId) => {
    try {
        await axios.delete(`${URL_PATH}/${memberId}`);
        return memberId;
    } catch (error) {
        const errorMsg = error.response?.data?.message;
        throw new Error(errorMsg || "Error deleting member");
    }
};

const patchMemberVersion = async (memberId) => {
    try {
        const response = await axios.patch(`${URL_PATH}/${memberId}`);
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
