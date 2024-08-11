export const isUnlocked = (character, unlockedPirates) => {
  return unlockedPirates.includes(character)
}

export const isRecruited = (character, currentCrew, benchCrew) => {
  const isInCurrentCrew = currentCrew.some((member) => member.name === character)
  const isInBenchCrew = benchCrew ? benchCrew.some((member) => member.name === character) : false

  return isInCurrentCrew || isInBenchCrew
}
