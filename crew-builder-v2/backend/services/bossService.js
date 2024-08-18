const { db } = require('../db')
const { BOSS_POOL_COLLECTION, PLAYERS_COLLECTION, RARITY_MODIFIER, RARITY_VALUE } = require('../backend_consts')

const { getPlayer } = require('./playerService')
const { calculateStat } = require('../routes/routeUtils')

async function getBossById(bossId) {
  return await db.collection(BOSS_POOL_COLLECTION).findOne({ bossId: bossId })
}

async function getPlayerBoss(playerId) {
  const player = await getPlayer(playerId)
  if (!player) {
    throw new Error(`Player with id: ${playerId} not found`)
  }

  return player.currentBoss
}

async function upgradeBoss(playerId) {
  const boss = await getPlayerBoss(playerId)

  if (!boss) {
    throw new Error('Boss not found')
  }

  await db
    .collection(PLAYERS_COLLECTION)
    .updateOne({
      playerId: playerId
    }, {
      $set: {
        'currentBoss.stats.bossLevel': boss.bossLevel + 1,
        'currentBoss.stats.HP': calculateStat(boss.stats.HP, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
        'currentBoss.stats.ATK': calculateStat(boss.stats.ATK, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
        'currentBoss.stats.reward': calculateStat(boss.stats.reward, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
      },
    })

  return boss
}

module.exports = {
  getBossById,
  upgradeBoss
}