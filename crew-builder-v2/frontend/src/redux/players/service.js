import axios from 'axios'
import { handleApiCall } from '../utils.js'

const BASE_URL = '/api/players'
const BERRIES_PATH = 'berries'
const BENCH_PATH = 'benchCrew'

const getPlayerById = (playerId) => {
  return handleApiCall(
    () => axios.get(`${BASE_URL}/${playerId}`),
    `Error fetching player: ${playerId}`
  )
}

const patchPlayerBerries = (playerId, amount) => {
  return handleApiCall(() => axios.patch(`${BASE_URL}/${playerId}/${BERRIES_PATH}`, { amount }, {
    headers: {
      'Content-Type': 'application/json',
    },
  }), `Error patching berries for player: ${playerId}`)
}

const getBenchCrew = (playerId) => {
  return handleApiCall(
    () => axios.get(`${BASE_URL}/${playerId}/${BENCH_PATH}`),
    `Error getting crew info for player: ${playerId}`
  )
}

const deletePlayer = (playerId) => {
  return handleApiCall(
    () => axios.delete(`${BASE_URL}/${playerId}`),
    `Error deleting player: ${playerId}`
  )
}

export default {
  getPlayerById, patchPlayerBerries, getBenchCrew, deletePlayer
}
