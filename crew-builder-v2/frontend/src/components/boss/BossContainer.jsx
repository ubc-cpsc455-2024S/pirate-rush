import React, { useEffect } from 'react'
import './BossContainer.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBossAsync, setBossAsync } from '../../redux/boss/thunks.js'

function BossContainer({ player }) {
  // const boss = useSelector((state) => state.boss.boss)
  const boss = player.currentBoss

  const playerId = player.playerId
  const dispatch = useDispatch()

  const takeDamage = () => {
    console.log("take damage!")
  }

  return (!boss ? (<div className="loading-boss loading mulish-p bborder">Loading Boss...</div>) : (< >
      < div id="boss-container">
        < div
          id="boss-text-containter">
          <span className="boss-name">{boss.name}</span>
          <span className="boss-level">LV {boss.stats.bossLevel}</span>
        </div>
        <div id="boss-image-container">
          <img
            className={`boss-image`}
            src={boss.images[boss.stats.bossLevel - 1]}
            alt={boss.name}
            width={200}
            onClick={() => takeDamage()}
          />
        </div>
        <div className="hp-bar">
          <span>10/10</span>
        </div>
        <div id="boss-bounty-text-container">
          <h2 className="mulish-heading">
            BOUNTY:
          </h2>
          <span className="mulish-p">{boss.stats.reward}</span>
        </div>
      </div>
  </>))
}

export default BossContainer
