const { db } = require('../db')
const { MAX_CREW_SIZE, MAX_LEVEL, RARITY_MODIFIER, RARITY_VALUE, PLAYERS_COLLECTION, PIRATE_POOL_COLLECTION } = require('../backend_consts')
const { v4: uuidv4 } = require('uuid')

const { getPlayer } = require('./playerService')
const { calculateStat } = require('../routes/routeUtils')

let pool_cache = []

async function getMemberById(playerId, memberId) {
  const player = await getPlayer(playerId)
  if (!player) {
    throw new Error(`Player with id: ${playerId} not found`)
  }
  return player.currentCrew.find((member) => member.memberId === memberId)
}

async function getAllMembers(playerId) {
  const player = await getPlayer(playerId)
  return player ? player.currentCrew : []
}

async function addMember(playerId, newMemberName) {
  const player = await getPlayer(playerId)

  if (!player) {
    throw new Error(`Player with id: ${playerId} not found`)
  }

  if (pool_cache.length === 0) {
    pool_cache = await db.collection(PIRATE_POOL_COLLECTION).find().toArray()
  }

  const membersArr = player.currentCrew
  const bench = player.benchCrew
  let memberToAdd

  if (membersArr.length < MAX_CREW_SIZE) {
    const benchMember = bench.find((pirate) => pirate.name === newMemberName)

    if (benchMember) {
      memberToAdd = benchMember
      await db
        .collection(PLAYERS_COLLECTION)
        .updateOne({ playerId: playerId }, { $pull: { benchCrew: { memberId: benchMember.memberId } } })
    } else {
      const newMember = pool_cache.find((pirate) => pirate.name === newMemberName)

      if (!newMember) {
        throw new Error(`Pirate with name: ${newMemberName} not found in the pool`)
      }

      memberToAdd = {
        ...newMember, memberId: uuidv4(),
      }
    }

    await db
      .collection(PLAYERS_COLLECTION)
      .updateOne({ playerId: playerId }, { $push: { currentCrew: memberToAdd } })

    return memberToAdd
  } else {
    throw new Error(`Cannot exceed max crew size of ${MAX_CREW_SIZE}`)
  }
}

async function moveMemberToBench(playerId, memberId) {
  const player = await getPlayer(playerId)

  if (!player) {
    throw new Error(`Player with id: ${playerId} not found`)
  }

  const memberToBench = player.currentCrew.find((member) => member.memberId === memberId)

  if (!memberToBench) {
    throw new Error(`Member with id: ${memberId} not found in currentCrew`)
  }

  const result = await db
    .collection(PLAYERS_COLLECTION)
    .updateOne({ playerId: playerId }, {
      $pull: { currentCrew: { memberId: memberId } }, $push: { benchCrew: memberToBench },
    })

  if (result.modifiedCount === 0) {
    throw new Error(`Member with id: ${memberId} not found`)
  }
}

async function upgradeMember(playerId, memberId) {
  const member = await getMemberById(playerId, memberId)

  if (!member) {
    throw new Error('Member not found')
  }

  if (member.unitLevel >= MAX_LEVEL) {
    throw new Error(`Pirate ${member.memberId} is already at MAX level`)
  }

  await db
    .collection(PLAYERS_COLLECTION)
    .updateOne({
      playerId: playerId, 'currentCrew.memberId': memberId,
    }, {
      $set: {
        'currentCrew.$.unitLevel': member.unitLevel + 1,
        'currentCrew.$.stats.HP': calculateStat(member.stats.HP, member.rarity, RARITY_MODIFIER, RARITY_VALUE),
        'currentCrew.$.stats.ATK': calculateStat(member.stats.ATK, member.rarity, RARITY_MODIFIER, RARITY_VALUE),
        'currentCrew.$.cost': calculateStat(member.cost, member.rarity, RARITY_MODIFIER, RARITY_VALUE),
      },
    })

  member.unitLevel += 1
  return member
}

module.exports = {
  getAllMembers,
  addMember,
  moveMemberToBench,
  upgradeMember,
}