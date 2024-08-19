const mongoose = require('mongoose')
const Member = require('./member')
const Boss = require('./boss')

const playerSchema = new mongoose.Schema({
  playerId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  unlockedPirates: [String],
  currentBoss: Boss.schema,
  currentCrew: [Member.schema],
  benchCrew: [Member.schema],
  berries: { type: Number, default: 100 },
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player
