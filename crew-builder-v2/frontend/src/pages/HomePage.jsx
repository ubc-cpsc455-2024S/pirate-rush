import React from "react";
import InputForm from "../components/InputForm.jsx";
import MemberCardContainer from "../components/MemberCardContainer.jsx";
import Footer from "../components/Footer.jsx";
import { v4 as uuidv4 } from "uuid";
import { PLAYER_ID } from "../../consts.js";

function HomePage() {
  const playerId = setPlayerId();

  console.log(playerId);

  return (
    <div id="home-container">
      <div id="main-container">
        <InputForm playerId={playerId} />
        <MemberCardContainer playerId={playerId} />
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
