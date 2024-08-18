export const getTotalATK = (crew) => {
  if (crew.length === 0) {
    return 0;
  }

  return crew.reduce((total, pirate) => {
    return total + pirate.stats.ATK
  }, 0)
}