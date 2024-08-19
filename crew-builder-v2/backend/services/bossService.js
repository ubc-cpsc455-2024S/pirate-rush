const { db } = require('../db')
const {
  BOSS_POOL_COLLECTION,
  PLAYERS_COLLECTION,
  RARITY_MODIFIER,
  RARITY_VALUE,
} = require('../backend_consts')
const { calculateStat } = require('../routes/routeUtils')

async function addBossById(playerId, bossId) {
  const newBoss = await db.collection(BOSS_POOL_COLLECTION).findOne({ bossId: bossId })
  await db
    .collection(PLAYERS_COLLECTION)
    .updateOne({ playerId: playerId }, { $set: { currentBoss: newBoss } })

  return newBoss
}

async function upgradeBoss(playerId, boss) {
  const updatedBossStats = {
    bossLevel: boss.stats.bossLevel + 1,
    HP: calculateStat(boss.stats.HP, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
    ATK: calculateStat(boss.stats.ATK, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
    reward: calculateStat(boss.stats.reward, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
  }

  await db
    .collection(PLAYERS_COLLECTION)
    .updateOne({ playerId: playerId }, { $set: { 'currentBoss.stats': updatedBossStats } })

  return { ...boss, stats: updatedBossStats }
}

module.exports = {
  addBossById,
  upgradeBoss,
}
