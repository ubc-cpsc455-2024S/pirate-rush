import React from 'react'
import { useDispatch } from 'react-redux'
import MemberCardPopup from './MemberCardPopup.jsx'
import { getMemberImage, handleDeleteMember, handleUpgradeMember } from './MemberCardUtils.js'

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

  return (
    <>
      <div>
        <div className={`mini-member-container member-type-${crewMember.stats.TYPE}`}>
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
              {`LVL UP [$${crewMember.cost}]`}
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
