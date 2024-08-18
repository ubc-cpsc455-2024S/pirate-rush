const { db } = require('../db');
const { BOSS_POOL_COLLECTION, PLAYERS_COLLECTION, RARITY_MODIFIER, RARITY_VALUE } = require('../backend_consts');
const { getPlayer } = require('./playerService');
const { calculateStat } = require('../routes/routeUtils');

async function addBossById(playerId, bossId) {
  return await db.collection(BOSS_POOL_COLLECTION).findOne({ bossId: bossId });
}

async function getPlayerBoss(playerId) {
  const player = await getPlayer(playerId);

  if (!player) {
    throw new Error(`Player with id: ${playerId} not found`);
  }

  return player.currentBoss;
}

async function upgradeBoss(playerId) {
  const boss = await getPlayerBoss(playerId);

  if (!boss) {
    throw new Error('Boss not found');
  }

  const updatedBossStats = {
    bossLevel: boss.bossLevel + 1,
    HP: calculateStat(boss.stats.HP, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
    ATK: calculateStat(boss.stats.ATK, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
    reward: calculateStat(boss.stats.reward, boss.rarity, RARITY_MODIFIER, RARITY_VALUE),
  };

  await db.collection(PLAYERS_COLLECTION).updateOne(
    { playerId: playerId },
    { $set: { 'currentBoss.stats': updatedBossStats } }
  );

  return { ...boss, stats: updatedBossStats };
}

module.exports = {
  addBossById,
  getPlayerBoss,
  upgradeBoss
};
