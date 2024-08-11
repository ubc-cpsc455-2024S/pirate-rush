import axios from 'axios'

const BASE_URL = '/api/players'
const BERRIES_PATH = 'berries'

const getPlayerById = async (playerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${playerId}`)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.message
    throw new Error(errorMsg || 'Error fetching player: ' + playerId)
  }
}

const patchPlayerBerries = async (playerId, amount) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${playerId}/${BERRIES_PATH}`,
      { amount },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error
    throw new Error(errorMsg || 'Error patching berries')
  }
}

export default {
  getPlayerById,
  patchPlayerBerries,
}
