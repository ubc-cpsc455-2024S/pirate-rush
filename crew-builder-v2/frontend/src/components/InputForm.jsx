import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addMemberAsync } from "../redux/members/thunks.js";
import {
  setMemberImages,
  setMemberDescription,
} from "../componentUtils/InputFormUtils.js";
import { CHARACTER_NAMES } from "../../consts.js";

function InputForm({ playerId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(1);
  const [imageURL, setImageURL] = useState("");

  const dispatch = useDispatch();

  const handleAddMember = (member) => {
    const newMember = {
      ...member,
      stats: {
        TYPE: "STR",
        ATK: 1,
        HP: 1,
      },
      cost: 5,
      memberId: uuidv4(),
    };
    dispatch(addMemberAsync(newMember));
  };

  function resetForm() {
    setName("");
    setDescription("");
    setLevel(1);
    setImageURL("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newMember = {
      name: name,
      description: setMemberDescription(description),
      images: setMemberImages(imageURL, name),
      unitLevel: level,
    };

    handleAddMember(newMember);
    resetForm();
  }

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    setName(selectedName);
    setDescription("");
    setImageURL("");
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
            <h1 className="mulish-heading">Build Your Pirate Crew!</h1>
          </div>
          <div className="input-field-container">
            <label htmlFor="name">Member Name</label>
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
          <div className="input-field-container">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              maxLength="45"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description here..."
            />
          </div>
          <div className="input-field-container">
            <label htmlFor="level">Level</label>
            <input
              id="level"
              min="1"
              max="3"
              name="level"
              type="number"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
            />
          </div>
          <div className="input-field-container">
            <label htmlFor="imageURL">Image URL</label>
            <input
              id="imageURL"
              name="imageURL"
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="Enter Image URL here..."
            />
          </div>
          <div>
            <input id="submit-button" type="submit" value="Recruit!" />
          </div>
          <div>
            <button
              id="clear-fields-button"
              type="reset"
              onClick={() => resetForm()}
            >
              Clear Fields
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default InputForm;
