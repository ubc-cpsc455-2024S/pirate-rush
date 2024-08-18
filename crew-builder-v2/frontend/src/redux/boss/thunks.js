import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import BossService from './service'

export const getBossAsync = createAsyncThunk(actionTypes.GET_BOSS, async ({ playerId }) => {
  return await BossService.getBoss(playerId)
})

export const setBossAsync = createAsyncThunk(actionTypes.SET_BOSS, async ({ playerId, bossId }) => {
  return await BossService.setBoss(playerId, bossId)
})

export const patchBossVersionAsync = createAsyncThunk(
  actionTypes.UPGRADE_BOSS,
  async ({ playerId }) => {
    return await BossService.patchBoss(playerId)
  }
)
