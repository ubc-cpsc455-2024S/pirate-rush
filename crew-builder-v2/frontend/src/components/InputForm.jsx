import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMemberAsync } from "../redux/members/thunks.js";
import { CHARACTER_NAMES } from "../../consts.js";
import { isUnlocked, isRecruited } from "../componentUtils/InputFormUtils.js";
import './InputForm.css';

function InputForm({ player }) {
  const playerId = player.playerId;
  const [selectedName, setSelectedName] = useState("");
  const [buttonText, setButtonText] = useState("");
  const dispatch = useDispatch();

  const handleAddMember = (memberName) => {
    dispatch(addMemberAsync({ playerId: playerId, memberName: memberName }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedName) {
      handleAddMember(selectedName);
      setSelectedName("");
      setButtonText("");
    }
  };

  const handleCharacterClick = (character) => {
    const unlocked = isUnlocked(character, player.unlockedPirates);
    const recruited = isRecruited(character, player.currentCrew, player.benchCrew);
    const inPlay = player.currentCrew.some((member) => member.name === character);

    if (!inPlay && unlocked && !recruited) {
      setButtonText(`Recruit: ${character}`);
    } else if (!inPlay && recruited) {
      setButtonText(`Sub in: ${character}`);
    }

    if (!inPlay && unlocked) {
      setSelectedName(character);
    }
  };

  return (
    <div className="mulish-p">
      <form id="member-form" className="form-container" onSubmit={handleSubmit}>
        <h1 className="mulish-heading">Assemble your Crew!</h1>
        <div className="character-list">
          {CHARACTER_NAMES.map((character) => {
            const unlocked = isUnlocked(character, player.unlockedPirates);
            const recruited = isRecruited(character, player.currentCrew, player.benchCrew);
            const isNew = unlocked && !recruited;
            const inPlay = player.currentCrew.some((member) => member.name === character);

            return (
              <div
                key={character}
                className={`character-item ${
                  recruited || !unlocked ? "grayed-out" : ""
                } ${isNew ? "new-character" : ""} ${
                  inPlay ? "in-play-character" : ""
                }`}
                onClick={() => handleCharacterClick(character)}
              >
                <span className="character-name">
                  {unlocked ? character : "???"}
                </span>
                {isNew && <span className="new-badge">NEW!</span>}
                {inPlay && <span className="gray-badge">IN PLAY</span>}
                {!unlocked && <span className="gray-badge">LOCKED</span>}
              </div>
            );
          })}
        </div>
        <div className="recruit-container">
          <input
            id="submit-button"
            type="submit"
            value={buttonText || "Select a Pirate"}
            disabled={!selectedName}
          />
        </div>
      </form>
    </div>
  );
}

export default InputForm;
