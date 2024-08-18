import React, { useEffect, useState } from 'react'
import InputForm from '../components/inputForm/InputForm.jsx'
import MemberCardContainer from '../components/memberCard/MemberCardContainer.jsx'
import BossContainer from '../components/boss/BossContainer.jsx'
import { v4 as uuidv4 } from 'uuid'
import { PLAYER_ID } from '../../consts.js'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlayerAsync, getPlayerAsync } from '../redux/players/thunks.js'
import "./HomePage.css"

function HomePage() {
  const [loading, setLoading] = useState(true)
  const player = useSelector((state) => state.players.player)
  const dispatch = useDispatch()

  useEffect(() => {
    void initializePlayerIdAndFetch()
  }, [dispatch])

  async function initializePlayerIdAndFetch() {
    const id = await getPlayerId()
    await dispatch(getPlayerAsync({ playerId: id }))
    setLoading(false)
  }

  async function handleReset() {
    const userConfirmed = window.confirm("Are you sure you want to reset your progress?");
    if (userConfirmed) {
      await dispatch(deletePlayerAsync({ playerId: player.playerId }))
      setLoading(true)
      setTimeout(async () => {
        void initializePlayerIdAndFetch()
      }, 1000)
    }
  }

  return (
      <div id="home-container">
        {
          loading ?
            <div className="loading-player">Loading Player...</div>
            :
            <div id="main-container">
              <BossContainer player={player} />
              <MemberCardContainer player={player} />
              <InputForm player={player} />
              <div id="reset-button-container">
                <button className="reset-button" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
        }
        {/*<Footer />*/}
      </div>
  )
}

async function getPlayerId() {
  let playerId = localStorage.getItem(PLAYER_ID)
  if (playerId === null) {
    playerId = uuidv4()
    localStorage.setItem(PLAYER_ID, playerId)
  }

  return playerId
}

export default HomePage
