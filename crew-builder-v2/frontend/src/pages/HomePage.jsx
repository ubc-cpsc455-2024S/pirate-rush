import React from "react";
import InputForm from "../components/InputForm.jsx";
import MemberCardContainer from "../components/MemberCardContainer.jsx";
import BossContainer from "../components/BossContainer.jsx";
import Footer from "../components/Footer.jsx";
import { v4 as uuidv4 } from "uuid";
import { PLAYER_ID } from "../../consts.js";

function HomePage() {
  const playerId = setPlayerId();

  console.log("Current playerId: " + playerId);

  return (
    <div id="home-container">
      <div id="main-container">
        <BossContainer playerId={playerId}/>
        <MemberCardContainer playerId={playerId} />
        <InputForm playerId={playerId} />
      </div>
      {/*<Footer />*/}
    </div>
  );
}

function setPlayerId() {
  let playerId = localStorage.getItem(PLAYER_ID);
  if (playerId === null) {
    playerId = uuidv4();
    localStorage.setItem(PLAYER_ID, playerId);
  }

  return playerId;
}

export default HomePage;
