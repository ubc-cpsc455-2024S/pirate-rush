import { patchMemberVersionAsync, getMembersAsync, deleteMemberAsync } from '../../redux/members/thunks.js'
import { getPlayerAsync, patchBerriesAsync } from '../../redux/players/thunks.js'
import { FIRST_UPGRADE_LEVEL, FULL_UPGRADE_LEVEL, MAX_LEVEL } from '../../../consts.js'

export const handleUpgradeMember = async (crewMember, player, dispatch, setIsLevelingUp, setIsEvolving) => {
  if (crewMember.unitLevel === MAX_LEVEL) {
    alert(`Crew member ${crewMember.name} is at max level.`)
    return
  }

  if (crewMember.cost > player.berries) {
    alert(`Not enough berries to upgrade ${crewMember.name}.`)
    return
  }

  try {
    await spendToUpgrade(crewMember, player, dispatch)
    await levelUpMember(player.playerId, crewMember, dispatch, setIsLevelingUp, setIsEvolving)

    if (crewMember.unitLevel === FIRST_UPGRADE_LEVEL - 1 || crewMember.unitLevel === FULL_UPGRADE_LEVEL - 1) {
      await evolveMember(setIsEvolving)
    }
  } catch (error) {
    console.error('Error during upgrade:', error)
    alert(`Failed to upgrade ${crewMember.name}: ${error.message}`)
  }
}

const spendToUpgrade = async (crewMember, player, dispatch) => {
  await dispatch(
    patchBerriesAsync({
      playerId: player.playerId,
      amount: -crewMember.cost,
    })
  )
}

const levelUpMember = async (playerId, crewMember, dispatch, setIsLevelingUp) => {
  // Wait for evolve animation
  setIsLevelingUp(true)
  await new Promise((resolve) => setTimeout(resolve, 400))
  await dispatch(patchMemberVersionAsync({ playerId: playerId, memberId: crewMember.memberId }))
  await new Promise((resolve) => setTimeout(resolve, 150))
  await dispatch(getMembersAsync({ playerId: playerId }))
  setIsLevelingUp(false)
}

const evolveMember = async (setIsEvolving) => {
  // Wait for silhouette animation
  setIsEvolving(true)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  setIsEvolving(false)
}

export const handleDeleteMember = async (playerId, crewMember, dispatch) => {
  await dispatch(deleteMemberAsync({ playerId: playerId, memberId: crewMember.memberId }))
  await dispatch(getPlayerAsync({ playerId }))
}

export const getMemberImage = (crewMember) => {
  if (crewMember.unitLevel < FIRST_UPGRADE_LEVEL) {
    return crewMember.images[0]
  } else if (crewMember.unitLevel >= FIRST_UPGRADE_LEVEL && crewMember.unitLevel < FULL_UPGRADE_LEVEL) {
    return crewMember.images[1]
  } else {
    return crewMember.images[2]
  }
}

export const getMemberIcon = (crewMember) => {
  if (crewMember.unitLevel < FIRST_UPGRADE_LEVEL) {
    return crewMember.icons[0]
  } else if (crewMember.unitLevel >= FIRST_UPGRADE_LEVEL && crewMember.unitLevel < FULL_UPGRADE_LEVEL) {
    return crewMember.icons[1]
  } else {
    return crewMember.icons[2]
  }
}