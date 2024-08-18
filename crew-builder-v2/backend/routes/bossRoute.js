const express = require('express')
const router = express.Router()
const bossService = require('../services/bossService')
const { asyncHandler } = require('./routeUtils')

/* GET boss by ID */
router.get('/:playerId/boss/:bossId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const bossId = req.params.bossId

  const boss = await bossService.getBossById(playerId, bossId)

  if (boss) {
    res.json(boss)
  } else {
    return res.status(404).json({ message: `Boss with id: ${bossId} not found` });
  }
}))

/* PATCH boss by id -> Increase strength of boss */
router.patch('/:playerId/boss/:bossId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const bossId = req.params.bossId
  const updatedBoss = await bossService.upgradeBoss(playerId, bossId)
  res.status(200).json(updatedBoss)
}))

module.exports = router
