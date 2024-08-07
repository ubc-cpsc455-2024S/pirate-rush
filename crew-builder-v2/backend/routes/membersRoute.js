const express = require('express')
const router = express.Router()
const { db } = require('../db')
const { v4: uuidv4 } = require('uuid')

const MAX_CREW_SIZE = 6
const MAX_LEVEL = 3

const PLAYERS_COLLECTION = 'players'
const POOL_COLLECTION = 'pool'

let pool_cache = []

/* GET all members */
router.get('/:playerId/members', async (req, res) => {
  const playerId = req.params.playerId
  try {
    const player = await db.collection(PLAYERS_COLLECTION).findOne({ playerId: playerId })
    const membersArr = player.currentCrew

    if (membersArr.length > 0) {
      res.json(membersArr)
    } else {
      res.status(404).json({ message: 'No members found' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

/* POST member */
router.post('/:playerId/members', async (req, res) => {
  const playerId = req.params.playerId
  const newMemberName = req.body.name

  try {
    const player = await db.collection(PLAYERS_COLLECTION).findOne({ playerId: playerId })

    if (!player) {
      return res.status(404).json({ message: `Player with id: ${playerId} not found` })
    }

    // Check if pool cache is empty and populate it if necessary
    if (pool_cache.length === 0) {
      pool_cache = await db.collection(POOL_COLLECTION).find().toArray()
    }

    const membersArr = player.currentCrew

    if (membersArr.length < MAX_CREW_SIZE) {
      // Find a pirate from the pool to add to the crew
      const newMember = pool_cache.find((pirate) => pirate.name === newMemberName)

      if (!newMember) {
        return res.status(404).json({ message: `Pirate with name: ${newMemberName} not found in the pool` })
      }

      const newMemberWithId = {
        ...newMember,
        memberId: uuidv4(),
      }

      await db
        .collection(PLAYERS_COLLECTION)
        .updateOne({ playerId: playerId }, { $push: { currentCrew: newMemberWithId } })
      return res.status(201).json(newMemberWithId)
    } else {
      return res.status(403).json({ message: `Cannot exceed max crew size of ${MAX_CREW_SIZE}` })
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

/* DELETE member by id */
router.delete('/:playerId/members/:memberId', async (req, res) => {
  const playerId = req.params.playerId
  const memberId = req.params.memberId
  try {
    const result = await db
      .collection(PLAYERS_COLLECTION)
      .updateOne({ playerId: playerId }, { $pull: { currentCrew: { memberId: memberId } } })

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: `Member with id: ${memberId} not found` })
    }

    return res.status(204).send()
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

/* PATCH member by id -> Upgrade */
router.patch('/:playerId/members/:memberId', async (req, res) => {
  const playerId = req.params.playerId
  const memberId = req.params.memberId
  try {
    const player = await db.collection(PLAYERS_COLLECTION).findOne({ playerId: playerId })
    const member = player.currentCrew.find((member) => member.memberId === memberId)

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    if (member.unitLevel >= MAX_LEVEL) {
      return res.status(400).json({ message: `Pirate ${member.memberId} is already at MAX level` })
    }

    await db
      .collection(PLAYERS_COLLECTION)
      .updateOne(
        { playerId: playerId, 'currentCrew.memberId': memberId },
        { $set: { 'currentCrew.$.unitLevel': member.unitLevel + 1 } }
      )

    // Update the member object to reflect the new level
    member.unitLevel += 1
    return res.status(200).json(member)
  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

module.exports = router
