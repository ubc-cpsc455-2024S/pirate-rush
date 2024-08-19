const mongoose = require('mongoose')

const bossSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: { type: [String], required: true },
  bossId: { type: String, required: true, unique: true },
  stats: {
    TYPE: String,
    ATK: Number,
    HP: Number,
    bossLevel: { type: Number, default: 1 },
    reward: { type: Number, required: true },
  },
  rarity: { type: String, required: true },
})

const Boss = mongoose.model('Boss', bossSchema)

module.exports = Boss
