import React, { useEffect, useState } from 'react';
import './BossContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalATK, piratesToUnlock } from './BossUtils.js';
import { patchBerriesAsync, patchBossAsync, patchNewPiratesAsync } from '../../redux/players/thunks.js';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function BossContainer({ player }) {
  const crew = useSelector((state) => state.members.list);
  const playerId = player.playerId;
  const boss = player.currentBoss;
  const [hp, setHP] = useState(boss ? boss.stats.HP : 0);
  const [damageTexts, setDamageTexts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [unlockedPirates, setUnlockedPirates] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (boss) {
      setHP(boss.stats.HP);
    }
  }, [boss]);

  const takeDamage = async (event) => {
    const damage = getTotalATK(crew);
    const { clientX, clientY } = event;
    const offsetX = Math.floor(Math.random() * 10) - 5;

    const newDamageText = {
      id: Date.now(),
      damage,
      x: clientX + offsetX,
      y: clientY - 20,
    };

    setDamageTexts((prevTexts) => [...prevTexts, newDamageText]);

    if (hp - damage <= 0) {
      setHP(0);
      setTimeout(() => {
        window.alert('You defeated ' + boss.name + ' at level ' + boss.stats.bossLevel + "!");
      }, 0);

      await dispatch(patchBerriesAsync({ playerId: playerId, amount: boss.stats.reward }));

      if (boss.stats.bossLevel < 3) {
        await dispatch(patchBossAsync({ playerId: playerId, boss: boss, nextBoss: false }));
      } else {
        await dispatch(patchBossAsync({ playerId: playerId, boss: boss, nextBoss: true }));

        const pirates = piratesToUnlock(boss.name);
        setUnlockedPirates(pirates);
        await dispatch(patchNewPiratesAsync({ playerId: playerId, pirates: pirates }));
        setSnackbarOpen(true);
      }
    } else {
      setHP(hp - damage);
    }

    setTimeout(() => {
      setDamageTexts((prevTexts) => prevTexts.filter((text) => text.id !== newDamageText.id));
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getBossImage = () => {
    const image = boss.stats.bossLevel - 1;
    return image >= 3 ? 2 : image;
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
            src={boss.images[getBossImage()]}
            alt={boss.name}
            width={200}
            onClick={takeDamage}
          />
          {damageTexts.map((text) => (
            <div key={text.id} className="damage-text" style={{ left: text.x, top: text.y }}>
              {`-${text.damage}`}
            </div>
          ))}
        </div>
        <div className="hp-bar-container">
          <div className="hp-bar-background">
            <div className="hp-bar-fill" style={{ width: `${(hp / boss.stats.HP) * 100}%` }}></div>
          </div>
          <span className="hp-text">
            {hp} / {boss.stats.HP}
          </span>
        </div>
        <div id="boss-bounty-text-container">
          <h2 className="mulish-heading boss-bounty-text">BOUNTY:</h2>
          <span className="mulish-p boss-bounty-text">{boss.stats.reward}</span>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Unlocked Pirates: {unlockedPirates.join(', ')}
        </Alert>
      </Snackbar>
    </>
  );
}

export default BossContainer;
