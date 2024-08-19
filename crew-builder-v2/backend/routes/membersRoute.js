const express = require('express')
const router = express.Router()
const memberService = require('../services/memberService')
const { asyncHandler } = require('./routeUtils')

/* GET all members */
router.get(
  '/:playerId/members',
  asyncHandler(async (req, res) => {
    const playerId = req.params.playerId
    const members = await memberService.getAllMembers(playerId)

    if (members.length > 0) {
      res.json(members)
    } else {
      res.json([])
    }
  })
)

/* POST member */
router.post(
  '/:playerId/members',
  asyncHandler(async (req, res) => {
    const playerId = req.params.playerId
    const newMemberName = req.body.name

    const member = await memberService.addMember(playerId, newMemberName)
    res.status(201).json(member)
  })
)

/* DELETE member by id */
router.delete(
  '/:playerId/members/:memberId',
  asyncHandler(async (req, res) => {
    const playerId = req.params.playerId
    const memberId = req.params.memberId
    await memberService.moveMemberToBench(playerId, memberId)
    res.status(204).send()
  })
)

/* PATCH member by id -> Upgrade */
router.patch(
  '/:playerId/members/:memberId',
  asyncHandler(async (req, res) => {
    const playerId = req.params.playerId
    const memberId = req.params.memberId
    const updatedMember = await memberService.upgradeMember(playerId, memberId)
    res.status(200).json(updatedMember)
  })
)

module.exports = router
