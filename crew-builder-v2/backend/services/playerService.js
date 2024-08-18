const { db } = require('../db')
const { PLAYERS_COLLECTION, LUFFY } = require('../backend_consts')
const { addBossById } = require('./bossService')

async function getPlayer(playerId) {
  return await db.collection(PLAYERS_COLLECTION).findOne({ playerId: playerId })
}

async function createPlayer(playerId) {
  const firstBoss = await addBossById(playerId,"1")

  const newPlayer = {
    playerId: playerId,
    username: 'New Pirate',
    unlockedPirates: [LUFFY],
    currentBoss: firstBoss,
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
