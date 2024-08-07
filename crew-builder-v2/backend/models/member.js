const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  images: { type: [String], required: true },
  memberId: { type: String, required: true, unique: true },
  unitLevel: { type: Number, default: 1 },
  stats: {
    TYPE: String,
    ATK: Number,
    HP: Number,
  },
  rarity: { type: String, required: true },
  icons: { type: [String], required: true },
  cost: { type: Number, required: true },
})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member
