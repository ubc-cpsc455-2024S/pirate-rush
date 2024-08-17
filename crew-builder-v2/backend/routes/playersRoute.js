const express = require('express');
const router = express.Router();
const playerService = require('../services/playerService');

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      res.status(500).json({ message: err.message });
    });
  };
};

/* GET player by id */
router.get('/:playerId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  let player = await playerService.getPlayer(playerId);

  if (!player) {
    player = await playerService.createPlayer(playerId);
  }

  return res.status(200).json(player);
}));

/* DELETE player by id */
router.delete('/:playerId', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  await playerService.deletePlayer(playerId)
  res.status(204).send()
}));

/* GET player's bench by id */
router.get('/:playerId/benchCrew', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const player = await playerService.getPlayer(playerId);

  if (!player) {
    return res.status(404).json({ message: `Player with id: ${playerId} not found` });
  }

  return res.status(200).json(player.benchCrew);
}));

/* PATCH player berries by id. { body.amount } has the amount to update berries by */
router.patch('/:playerId/berries', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const amount = parseInt(req.body.amount);

  if (isNaN(amount)) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  const updatedBerries = await playerService.updatePlayerBerries(playerId, amount);

  if (updatedBerries === null) {
    return res.status(404).json({ message: `Player with id: ${playerId} not found` });
  }

  return res.status(200).json(updatedBerries);
}));

router.patch('/:playerId/username', asyncHandler(async (req, res) => {
  const playerId = req.params.playerId;
  const username = req.body.username;

  const updatedName = await playerService.updatePlayerName(playerId, username);

  if (updatedName === null) {
    return res.status(404).json({ message: `Player with id: ${playerId} not found` });
  }

  return res.status(200).json(updatedName);
}));

module.exports = router;
