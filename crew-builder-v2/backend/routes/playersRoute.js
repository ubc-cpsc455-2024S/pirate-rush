const express = require('express');
const router = express.Router();
const playerService = require('../services/playerService');
const bossService = require('../services/bossService')
const { asyncHandler } = require('./routeUtils')

/* GET player by id */
router.get('/:playerId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  let player = await playerService.getPlayer(playerId);

  if (!player) {
    player = await playerService.createPlayer(playerId);
  }

  return res.status(200).json(player);
}));

/* DELETE player by id */
router.delete('/:playerId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  await playerService.deletePlayer(playerId)
  res.status(204).send()
}));

/* GET player's bench by id */
router.get('/:playerId/benchCrew', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const player = await playerService.getPlayer(playerId);

  if (!player) {
    return res.status(404).json({ message: `Player with id: ${playerId} not found` });
  }

  return res.status(200).json(player.benchCrew);
}));

/* PATCH player berries by id. { body.amount } has the amount to update berries by */
router.patch('/:playerId/berries', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const amount = parseInt(req.body.amount);

  if (isNaN(amount)) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  const updatedBerries = await playerService.updatePlayerBerries(playerId, amount);

  if (updatedBerries === null) {
    return res.status(404).json({ message: `Player with id: ${playerId} not found` });
  }

  return res.status(200).json(updatedBerries);
}));

router.patch('/:playerId/username', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const username = req.body.username;

  const updatedName = await playerService.updatePlayerName(playerId, username);

  if (updatedName === null) {
    return res.status(404).json({ message: `Player with id: ${playerId} not found` });
  }

  return res.status(200).json(updatedName);
}));

router.patch('/:playerId/newPirates', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const pirates = req.body.pirates;

  const updatedUnlockedPirates = await playerService.updateUnlockedPirates(playerId, pirates);

  if (updatedUnlockedPirates === null) {
    return res.status(404).json({ message: `Player with id: ${playerId} not found` });
  }

  return res.status(200).json(updatedUnlockedPirates);
}));

router.patch('/:playerId/boss', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const boss = req.body.boss;
  const nextBoss = req.body.nextBoss;
  const nextBossId = parseInt(boss.bossId) + 1;

  if (nextBossId >= 8) {
    const updatedBoss = await bossService.upgradeBoss(playerId, boss)
    return res.status(200).json(updatedBoss)
  }

  if (nextBoss) {
    const newBoss = await bossService.addBossById(playerId, nextBossId.toString())
    return res.status(200).json(newBoss);
  } else {
    const updatedBoss = await bossService.upgradeBoss(playerId, boss)
    return res.status(200).json(updatedBoss)
  }
}));

module.exports = router;
