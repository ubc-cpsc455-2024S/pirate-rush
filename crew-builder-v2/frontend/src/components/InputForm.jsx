import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMemberAsync } from "../redux/members/thunks.js";
import { CHARACTER_NAMES } from "../../consts.js";

function InputForm({ player }) {
  const playerId = player.playerId
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  // For when a character is available but not yet recruited
  const NEW = "NEW!"
  let recruitButtonText = "Recruit"


  const handleAddMember = (memberName) => {
    dispatch(addMemberAsync({playerId: playerId, memberName: memberName}));
  };

  function handleSubmit(event) {
    event.preventDefault();
    handleAddMember(name);
    setName("");
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="mulish-p" id="create-team-form">
        <form
          id="member-form"
          className="form-container"
          onSubmit={handleSubmit}
        >
          <div className="input-title-container">
            <h1 className="mulish-heading">Assemble your Crew!</h1>
          </div>
          <div className="select-container">
            <div className="input-field-container">
              <select
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                required
              >
                <option value="">Select a member...</option>
                {CHARACTER_NAMES.map((character) => (
                  <option key={character} value={character}>
                    {character}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input id="submit-button" type="submit" value={recruitButtonText} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default InputForm;
