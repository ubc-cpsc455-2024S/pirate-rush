import React, { useEffect, useState } from 'react'
import InputForm from '../components/inputForm/InputForm.jsx'
import MemberCardContainer from '../components/memberCard/MemberCardContainer.jsx'
import BossContainer from '../components/BossContainer.jsx'
import Footer from '../components/Footer.jsx'
import { v4 as uuidv4 } from 'uuid'
import { PLAYER_ID } from '../../consts.js'
import { useDispatch, useSelector } from 'react-redux'
import { getPlayerAsync } from '../redux/players/thunks.js'

function HomePage() {
  const [loading, setLoading] = useState(true)
  const player = useSelector((state) => state.players.player)
  const dispatch = useDispatch()

  useEffect(() => {
    async function initializePlayerIdAndFetch() {
      const id = await getPlayerId()
      await dispatch(getPlayerAsync({ playerId: id }))
      setLoading(false)
    }

    initializePlayerIdAndFetch()
  }, [dispatch])

  if (loading) {
    return <div className="loading-player">Loading Player...</div>
  }

  return (
    <div id="home-container">
      <div id="main-container">
        <BossContainer player={player} />
        <MemberCardContainer player={player} />
        <InputForm player={player} />
      </div>
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
