const express = require('express')
const router = express.Router()
const bossService = require('../services/bossService')
const { asyncHandler } = require('./routeUtils')

/* GET boss by ID */
router.get('/:playerId/boss', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const boss = await bossService.getPlayerBoss(playerId)

  if (boss) {
    res.json(boss)
  } else {
    return res.status(404).json({ message: `Boss not found` });
  }
}))

/* POST boss by ID */
router.post('/:playerId/boss', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const bossId = parseInt(req.body.bossId)

  const boss = await bossService.addBossById(playerId, bossId)
  res.status(201).json(boss)
}))

/* PATCH boss by id -> Increase strength of boss */
router.patch('/:playerId/boss/upgrade', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const updatedBoss = await bossService.upgradeBoss(playerId)
  res.status(200).json(updatedBoss)
}))

module.exports = router
