const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      res.status(500).json({ message: err.message })
    })
  }
}

const calculateStat = (baseStat, rarity, modifierMap, valueMap) => {
  return Math.floor(baseStat + baseStat * modifierMap[rarity] + valueMap[rarity])
}

module.exports = {
  asyncHandler,
  calculateStat,
}
