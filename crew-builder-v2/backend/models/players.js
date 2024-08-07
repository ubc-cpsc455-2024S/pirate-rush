const mongoose = require('mongoose')
const Player = require('./player')

const playersSchema = new mongoose.Schema({
  players: [Player.schema],
})

const Players = mongoose.model('Players', playersSchema)

module.exports = Players
