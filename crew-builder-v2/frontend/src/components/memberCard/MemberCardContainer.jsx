import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMembersAsync } from '../../redux/members/thunks.js'
import MemberCardMini from './MemberCardMini.jsx'
import { REQUEST_STATE } from '../../redux/utils.js'
import { FaPencilAlt } from "react-icons/fa";
import './MemberCard.css'
import { patchPlayerNameAsync } from '../../redux/players/thunks.js'
import validator from 'validator';
import Filter from 'bad-words';

function MemberCardContainer({ player }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newUsername, setNewUsername] = useState(player.username)
  const crew = useSelector((state) => state.members.list)
  const playerId = player.playerId
  const getPlayerStatus = useSelector((state) => state.players.getPlayer)
  const dispatch = useDispatch()
  const filter = new Filter();

  async function fetchData() {
    await dispatch(getMembersAsync({ playerId: playerId }))
  }

  useEffect(() => {
    void fetchData()
  }, [dispatch, playerId])

  const handleUsernameClick = () => {
    setIsEditing(true)
  }

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value)
  }

  const handleUsernameBlur = () => {
    setIsEditing(false)
    if (newUsername !== player.username) {
      if (!validator.isAlphanumeric(newUsername)) {
        window.alert('Username must be alphanumeric.');
      } else if (!validator.isLength(newUsername, { min: 3, max: 10 })) {
        window.alert('Username must be between 3 and 10 characters.');
      } else if (filter.isProfane(newUsername)) {
        window.alert("Inappropriate username! Don't do that!");
      } else {
        dispatch(patchPlayerNameAsync({ playerId: playerId, username: newUsername }))
      }
    }
  }

  if (getPlayerStatus === REQUEST_STATE.PENDING || !player) {
    return <div className="loading mulish-p">Loading Your Crew...</div>
  }

  return (
    <div id="team-container">
      <div className="team-display-container">
        <div className="member-container-headings">
          {isEditing ? (
            <input
              type="text"
              className="mulish-heading"
              value={newUsername}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              autoFocus
            />
          ) : (
            <h2 className="mulish-heading">
              {`${player.username}'s Crew`}
              <FaPencilAlt className="pencil-icon" onClick={handleUsernameClick}/>
            </h2>
          )}
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
