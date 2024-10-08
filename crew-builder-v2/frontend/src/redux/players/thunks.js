import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionTypes } from './actionTypes'
import PlayerService from './service'

export const getPlayerAsync = createAsyncThunk(actionTypes.GET_PLAYER, async ({ playerId }) => {
  return await PlayerService.getPlayerById(playerId)
})

export const patchBerriesAsync = createAsyncThunk(
  actionTypes.PATCH_BERRIES,
  async ({ playerId, amount }) => {
    return await PlayerService.patchPlayerBerries(playerId, amount)
  }
)

export const patchNewPiratesAsync = createAsyncThunk(
  actionTypes.PATCH_NEW_PIRATES,
  async ({ playerId, pirates }) => {
    return await PlayerService.patchNewPirates(playerId, pirates)
  }
)

export const getBenchCrewAsync = createAsyncThunk(
  actionTypes.GET_BENCH_CREW,
  async ({ playerId }) => {
    return await PlayerService.getBenchCrew(playerId)
  }
)

export const deletePlayerAsync = createAsyncThunk(
  actionTypes.DELETE_PLAYER,
  async ({ playerId }) => {
    return await PlayerService.deletePlayer(playerId)
  }
)

export const patchPlayerNameAsync = createAsyncThunk(
  actionTypes.PATCH_PLAYER_NAME,
  async ({ playerId, username }) => {
    return await PlayerService.patchPlayerName(playerId, username)
  }
)

export const patchBossAsync = createAsyncThunk(
  actionTypes.PATCH_BOSS,
  async ({ playerId, boss, nextBoss }) => {
    return await PlayerService.patchBoss(playerId, boss, nextBoss)
  }
)
