import React, { useEffect, useState } from 'react'
import './BossContainer.css';
import { useSelector } from 'react-redux';
import { getTotalATK } from './BossUtils.js';

function BossContainer({ player }) {
  const crew = useSelector((state) => state.members.list);
  const boss = player.currentBoss;
  const [hp, setHP] = useState(boss ? boss.stats.HP : 0);
  const [damageTexts, setDamageTexts] = useState([]);

  useEffect(() => {
    if (boss) {
      setHP(boss.stats.HP);
    }
  }, [boss]);

  const takeDamage = (event) => {
    const damage = getTotalATK(crew);
    const { clientX, clientY } = event;

    const newDamageText = {
      id: Date.now(),
      damage,
      x: clientX,
      y: clientY - 20
    };

    setDamageTexts((prevTexts) => [...prevTexts, newDamageText]);

    if (hp - damage <= 0) {
      setHP(0);
      setTimeout(() => {
        window.alert("You defeated " + boss.name + " at level " + boss.stats.bossLevel);
      }, 0);
    } else {
      setHP(hp - damage);
    }

    // Remove the specific damage text after the animation
    setTimeout(() => {
      setDamageTexts((prevTexts) =>
        prevTexts.filter((text) => text.id !== newDamageText.id)
      );
    }, 1000);
  };

  return !boss ? (
    <div className="loading-boss loading mulish-p bborder">Loading Boss...</div>
  ) : (
    <>
      <div id="boss-container">
        <div id="boss-text-containter">
          <span className="boss-name">{boss.name}</span>
          <span className="boss-level">LV {boss.stats.bossLevel}</span>
        </div>
        <div id="boss-image-container">
          <img
            className="boss-image"
            src={boss.images[boss.stats.bossLevel - 1]}
            alt={boss.name}
            width={200}
            onClick={takeDamage}
          />
          {damageTexts.map((text) => (
            <div
              key={text.id}
              className="damage-text"
              style={{ left: text.x, top: text.y }}
            >
              {`-${text.damage}`}
            </div>
          ))}
        </div>
        <div className="hp-bar-container">
          <div className="hp-bar-background">
            <div className="hp-bar-fill" style={{ width: `${(hp / boss.stats.HP) * 100}%` }}></div>
          </div>
          <span className="hp-text">{hp} / {boss.stats.HP}</span>
        </div>
        <div id="boss-bounty-text-container">
          <h2 className="mulish-heading boss-bounty-text">
            BOUNTY:
          </h2>
          <span className="mulish-p boss-bounty-text">{boss.stats.reward}</span>
        </div>
      </div>
    </>
  );
}

export default BossContainer;
