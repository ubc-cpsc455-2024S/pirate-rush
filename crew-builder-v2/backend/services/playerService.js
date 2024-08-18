const { db } = require('../db')
const { CHARACTER_NAMES, PLAYERS_COLLECTION } = require('../backend_consts')

async function getPlayer(playerId) {
  return await db.collection(PLAYERS_COLLECTION).findOne({ playerId: playerId })
}

// TODO - Balance numbers, use boss data
async function createPlayer(playerId) {
  const newPlayer = {
    playerId: playerId,
    username: 'New Pirate',
    unlockedPirates: CHARACTER_NAMES,
    currentBoss: {
      name: 'TODO', level: 1, HP: 100, ATK: 10,
    },
    currentCrew: [],
    benchCrew: [],
    berries: 100000,
  }

  await db.collection(PLAYERS_COLLECTION).insertOne(newPlayer)
  return newPlayer
}

async function deletePlayer(playerId) {
  return await db.collection(PLAYERS_COLLECTION).deleteOne({ playerId: playerId })
}

async function updatePlayerBerries(playerId, amount) {
  const player = await getPlayer(playerId)
  if (!player) {
    return null
  }

  const newBerries = player.berries + amount

  await db.collection(PLAYERS_COLLECTION).updateOne({ playerId: playerId }, { $set: { berries: newBerries } })
  return newBerries
}

async function updatePlayerName(playerId, name) {
  const player = await getPlayer(playerId)
  if (!player) {
    return null
  }

  await db.collection(PLAYERS_COLLECTION).updateOne({ playerId: playerId }, { $set: { username: name } })
  return name
}

module.exports = {
  getPlayer,
  createPlayer,
  deletePlayer,
  updatePlayerBerries,
  updatePlayerName
}
