import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMemberAsync, getMembersAsync } from '../../redux/members/thunks.js'
import { getBenchCrewAsync } from '../../redux/players/thunks.js'
import { CHARACTER_NAMES } from '../../../consts.js'
import { isUnlocked, isRecruited, isInPlay, isBenched } from "./InputFormUtils.js";
import './InputForm.css'

function InputForm({ player }) {
  const playerId = player.playerId
  const dispatch = useDispatch()

  const [selectedName, setSelectedName] = useState('')
  const [buttonText, setButtonText] = useState('')

  const handleAddMember = async (memberName) => {
    await dispatch(addMemberAsync({ playerId, memberName }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedName) {
      handleAddMember(selectedName)
      setSelectedName('')
      setButtonText('')
    }
  }

  const handleCharacterClick = (character) => {
    const unlocked = isUnlocked(character, player.unlockedPirates)
    const recruited = isRecruited(character, player.currentCrew, player.benchCrew)
    const inPlay = player.currentCrew.some((member) => member.name === character)

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
    <div className="mulish-p">
      <form id="member-form" className="form-container" onSubmit={handleSubmit}>
        <h1 className="mulish-heading">Assemble your Crew!</h1>
        <div className="recruit-container">
          <input id="submit-button" type="submit" value={buttonText || 'Select a Pirate'} disabled={!selectedName} />
        </div>
        <div className="character-list">
          {CHARACTER_NAMES.map((character) => {
            const unlocked = isUnlocked(character, player.unlockedPirates)
            const recruited = isRecruited(character, player.currentCrew, player.benchCrew)
            const benched = isBenched(character, player.benchCrew)
            const inPlay = isInPlay(character, player.currentCrew)
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
