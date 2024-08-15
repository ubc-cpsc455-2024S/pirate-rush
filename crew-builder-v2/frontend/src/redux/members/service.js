import axios from 'axios'
import { handleApiCall } from '../utils.js'

const BASE_URL = '/api/players'
const MEMBERS_PATH = 'members'

const addMember = async (playerId, memberName) => {
  return handleApiCall(
    () =>
      axios.post(
        `${BASE_URL}/${playerId}/${MEMBERS_PATH}`,
        { name: memberName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    'Error adding member'
  )
}

const getMembers = async (playerId) => {
  return handleApiCall(
    () => axios.get(`${BASE_URL}/${playerId}/${MEMBERS_PATH}`),
    'Error fetching members'
  )
}

const getMemberById = async (playerId, memberId) => {
  return handleApiCall(
    () => axios.get(`${BASE_URL}/${playerId}/${MEMBERS_PATH}/${memberId}`),
    `Error fetching member with memberId: ${memberId}`
  )
}

const deleteMember = async (playerId, memberId) => {
  return handleApiCall(
    () => axios.delete(`${BASE_URL}/${playerId}/${MEMBERS_PATH}/${memberId}`),
    'Error deleting member'
  ).then(() => memberId)
}

const patchMemberVersion = async (playerId, memberId) => {
  return handleApiCall(
    () => axios.patch(`${BASE_URL}/${playerId}/${MEMBERS_PATH}/${memberId}`),
    'Error patching member'
  )
}

export default {
  addMember,
  getMembers,
  getMemberById,
  deleteMember,
  patchMemberVersion,
}
