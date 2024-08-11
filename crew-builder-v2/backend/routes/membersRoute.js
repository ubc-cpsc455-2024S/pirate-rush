const express = require('express')
const router = express.Router()
const playerService = require('../services/playerService')

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      res.status(500).json({ message: err.message })
    })
  }
}

/* GET all members */
router.get('/:playerId/members', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const members = await playerService.getAllMembers(playerId)

  if (members.length > 0) {
    res.json(members)
  } else {
    res.status(404).json({ message: 'No members found' })
  }
}))

/* GET member by id */
router.get('/:playerId/members/:memberId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const memberId = req.params.memberId
  const member = await playerService.getMemberById(playerId, memberId)

  if (!member) {
    return res
      .status(404)
      .json({ message: `Member with id: ${memberId} not found` })
  }

  res.json(member)
}))

/* POST member */
router.post('/:playerId/members', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const newMemberName = req.body.name

  const member = await playerService.addMember(playerId, newMemberName)
  res.status(201).json(member)
}))

/* DELETE member by id */
router.delete('/:playerId/members/:memberId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const memberId = req.params.memberId
  await playerService.moveMemberToBench(playerId, memberId)
  res.status(204).send()
}))

/* PATCH member by id -> Upgrade */
router.patch('/:playerId/members/:memberId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId
  const memberId = req.params.memberId
  const updatedMember = await playerService.upgradeMember(playerId, memberId)
  res.status(200).json(updatedMember)
}))

module.exports = router
