import {
  ZORO,
  NAMI,
  USOPP,
  SANJI,
  ROBIN,
  CHOPPER,
  BROOK,
  FRANKY,
  JINBEI,
  PORTGAS_D_ACE,
  YAMATO,
  GOL_D_ROGER,
  ODEN_KOZUKI,
} from '../../../consts.js'

import {
  SEA_MONSTER,
  ARLONG,
  CROCODILE,
  ENEL,
  ROB_LUCCI,
  DOFLAMINGO,
  BIG_MOM,
  KAIDO,
} from '../../../consts.js'

export const getTotalATK = (crew) => {
  if (crew.length === 0) {
    return 0
  }

  return crew.reduce((total, pirate) => {
    return total + pirate.stats.ATK
  }, 0)
}

export const piratesToUnlock = (bossName) => {
  switch (bossName) {
    case SEA_MONSTER:
      return [ZORO]
    case ARLONG:
      return [NAMI, USOPP, SANJI]
    case CROCODILE:
      return [ROBIN]
    case ENEL:
      return [CHOPPER]
    case ROB_LUCCI:
      return [FRANKY, BROOK]
    case DOFLAMINGO:
      return [JINBEI, PORTGAS_D_ACE]
    case BIG_MOM:
      return [YAMATO]
    case KAIDO:
      return [ODEN_KOZUKI, GOL_D_ROGER]
    default:
      return []
  }
}
