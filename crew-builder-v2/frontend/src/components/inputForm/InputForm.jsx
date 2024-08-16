import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMemberAsync } from '../../redux/members/thunks.js'
import { CHARACTER_NAMES } from '../../../consts.js'
import './InputForm.css'
import { getPlayerAsync } from '../../redux/players/thunks.js'

function InputForm({ player }) {
  const playerId = player?.playerId
  const dispatch = useDispatch()

  const [selectedName, setSelectedName] = useState('')
  const [buttonText, setButtonText] = useState('')

  const handleAddMember = async (memberName) => {
    await dispatch(addMemberAsync({ playerId, memberName }))
    await dispatch(getPlayerAsync({ playerId }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedName) {
      void handleAddMember(selectedName)
      setSelectedName('')
      setButtonText('')
    }
  }

  const inCurrent = (character) => player.currentCrew ? player.currentCrew.some((member) => member.name === character) : false
  const inBench = (character) => player.benchCrew ? player.benchCrew.some((member) => member.name === character) : false
  const isRecruited = (character) => inCurrent(character) || inBench(character)

  const handleCharacterClick = (character) => {
    const unlocked = player.unlockedPirates.includes(character)
    const recruited = isRecruited(character)
    const inPlay = inCurrent(character)

    if (!inPlay && unlocked && !recruited) {
      setButtonText(`Recruit: ${character}`)
    } else if (!inPlay && recruited) {
      setButtonText(`Add In: ${character}`)
    }

    if (!inPlay && unlocked) {
      setSelectedName(character)
    }
  }

  return (
    <div id="input-form-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="mulish-heading">Assemble your Crew!</h1>
        <div className="recruit-container">
          <input id="submit-button" type="submit" value={buttonText || 'Select a Pirate'} disabled={!selectedName} />
        </div>
        <div className="character-list">
          {CHARACTER_NAMES.map((character) => {
            const unlocked = player?.unlockedPirates?.includes(character) || false;
            const benched = inBench(character)
            const inPlay = inCurrent(character)
            const recruited = benched || inPlay
            const isNew = unlocked && !recruited

            return (
              <div
                key={character}
                className={
                  `character-item 
                ${inPlay || !unlocked ? 'grayed-out' : ''} 
                ${isNew ? 'new-character' : ''} 
                ${inPlay ? 'in-play-character' : ''}
                ${benched ? 'old-character' : ''}
                `}
                onClick={() => handleCharacterClick(character)}
              >
                <span className="character-name">{unlocked ? character : '???'}</span>
                {isNew && <span className="new-badge">NEW!</span>}
                {inPlay && <span className="gray-badge">IN PLAY</span>}
                {benched && <span className="bench-badge">IN BENCH</span>}
                {!unlocked && <span className="gray-badge">LOCKED</span>}
              </div>
            )
          })}
        </div>
      </form>
    </div>
  )
}

export default InputForm
