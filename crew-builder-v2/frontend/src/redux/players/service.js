import axios from 'axios'
import { handleApiCall } from '../utils.js'

const BASE_URL = '/api/players'
const BERRIES_PATH = 'berries'
const BENCH_PATH = 'benchCrew'
const USERNAME_PATH = 'username'
const jsonContent = { 'Content-Type': 'application/json' }

const getPlayerById = (playerId) => {
  return handleApiCall(
    () => axios.get(`${BASE_URL}/${playerId}`),
    `Error fetching player: ${playerId}`
  )
}

const patchPlayerBerries = (playerId, amount) => {
  return handleApiCall(() => axios.patch(`${BASE_URL}/${playerId}/${BERRIES_PATH}`, { amount }, {
    headers: jsonContent,
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

const patchPlayerName = (playerId, username) => {
  return handleApiCall(
    () => axios.patch(`${BASE_URL}/${playerId}/${USERNAME_PATH}`, { username: username }, {
      headers: jsonContent,
    }), `Error deleting player: ${playerId}`
  )
}

export default {
  getPlayerById, patchPlayerBerries, getBenchCrew, deletePlayer, patchPlayerName
}
