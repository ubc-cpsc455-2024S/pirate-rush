import axios from 'axios'
import { handleApiCall } from '../utils.js'

const BASE_URL = '/api/players'
const BOSS_PATH = 'boss'

const getBoss = async (playerId) => {
  return handleApiCall(
    () => axios.get(`${BASE_URL}/${playerId}/${BOSS_PATH}`),
    'Error fetching boss'
  )
}

const setBoss = async (playerId, bossId) => {
  return handleApiCall(
    () => axios.post(`${BASE_URL}/${playerId}/${BOSS_PATH}`,
      { bossId: bossId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
    'Error setting boss'
  )
}

const patchBoss = async (playerId, bossId) => {
  return handleApiCall(
    () => axios.patch(`${BASE_URL}/${playerId}/${BOSS_PATH}/${bossId}/upgrade`),
    'Error patching boss'
  )
}

export default {
  getBoss,
  setBoss,
  patchBoss,
}