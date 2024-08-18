import React from 'react'
import { useDispatch } from 'react-redux'
import MemberCardPopup from './MemberCardPopup.jsx'
import { getMemberImage, handleDeleteMember, handleUpgradeMember } from './MemberCardUtils.js'
import { GrUpgrade } from "react-icons/gr";
import './MemberCard.css'
import { FULL_UPGRADE_LEVEL } from '../../../consts.js'

function MemberCardMini({ crewMember, player }) {
  const [viewDetailed, setViewDetailed] = React.useState(false)
  const [selectedMember, setSelectedMember] = React.useState(null)
  const [isLevelingUp, setIsLevelUp] = React.useState(false)
  const [isEvolving, setIsEvolving] = React.useState(false)

  const dispatch = useDispatch()

  const viewMember = () => {
    setSelectedMember(crewMember)
    setViewDetailed(true)
  }

  const closeView = () => {
    setSelectedMember(null)
    setViewDetailed(false)
  }

  const canBuy = () => {
    if (crewMember.cost <= player.berries) {
      return "canBuy"
    } else {
      return "cannotBuy"
    }
  }

  const lastEvolve = () => {
    if (crewMember.unitLevel >= FULL_UPGRADE_LEVEL) {
      return `last-evolve-${crewMember.stats.TYPE}`
    }

    return `member-type-${crewMember.stats.TYPE}`
  }

  return (
    <>
      <div>
        <div className={`mini-member-container member-type-${crewMember.stats.TYPE} ${lastEvolve()}`}>
          <div>
            <span className="member-name">{crewMember.name}</span>
            <span className="member-level"> LV {crewMember.unitLevel}</span>
          </div>
          <img
            className={`member-image ${isLevelingUp ? 'levelingUp' : ''} ${isEvolving ? 'evolving' : ''}`}
            src={getMemberImage(crewMember)}
            alt={crewMember.name}
            width={200}
            onClick={() => viewMember()}
          />
          <div className="mini-button-container">
            <button
              className={`upgrade-member-button ${canBuy()}`}
              onClick={() => handleUpgradeMember(crewMember, player, dispatch, setIsLevelUp, setIsEvolving)}
            >
              <GrUpgrade className="svg-text"/>
              {`$${crewMember.cost}`}
            </button>
            <button
              className="delete-member-button"
              onClick={() => handleDeleteMember(player.playerId, crewMember, dispatch)}
            >
              Remove
            </button>
          </div>
        </div>
        <div>
          <MemberCardPopup isOpen={viewDetailed} onClose={closeView} member={selectedMember} />
        </div>
      </div>
    </>
  )
}

export default MemberCardMini
