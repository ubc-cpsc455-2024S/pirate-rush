const mongoose = require("mongoose");
const Members = require("./members");

const playerSchema = new mongoose.Schema({
  playerId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  currentCrew: { type: Members.schema },
  benchCrew: { type: Members.schema },
  berries: { type: Number, default: 100 },
  progress: {
    currentBoss: String,
    currentBossLevel: Number,
    unlockedPirates: [String],
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
