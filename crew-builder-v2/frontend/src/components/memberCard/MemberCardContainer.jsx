import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMembersAsync } from '../../redux/members/thunks.js'
import MemberCardMini from './MemberCardMini.jsx'
import { REQUEST_STATE } from '../../redux/utils.js'

function MemberCardContainer({ player }) {
  const crew = useSelector((state) => state.members.list)
  const playerId = player.playerId
  const getPlayerStatus = useSelector((state) => state.players.getPlayer)
  const dispatch = useDispatch()

  async function fetchData() {
    await dispatch(getMembersAsync({ playerId: playerId }))
  }

  useEffect(() => {
    void fetchData()
  }, [dispatch, playerId])

  if (getPlayerStatus === REQUEST_STATE.PENDING || !player) {
    return <div className="loading mulish-p">Loading Your Crew...</div>
  }

  return (
    <div id="team-container">
      <div className="team-display-container">
        <div className="member-container-headings">
          <h2 className="mulish-heading">{`${player.username}'s Crew`}</h2>
          <h2 className="mulish-heading berries-text-box">{`Berries ($): ${player.berries}`}</h2>
        </div>
        {crew.length === 0 ? (
          <div className="empty mulish-p">
            Your crew is currently empty.
          </div>
        ) : (
          <ul id="team-list">
            {crew.map((crewMember) => (
              <li key={crewMember.name} className="each-card">
                <MemberCardMini crewMember={crewMember} player={player} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MemberCardContainer
