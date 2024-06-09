import React, { useState } from "react";
import { addMember } from "../features/memberSlice.js";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

function InputForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [imageURL, setImageURL] = useState("");

  const dispatch = useDispatch();

  const handleAddMember = (member) => {
    dispatch(addMember({ ...member, memberId: uuidv4() }));
  };

  function resetForm() {
    setName("");
    setDescription("");
    setAge("");
    setImageURL("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    let image;

    if (imageURL.trim() !== "") {
      image = imageURL;
    } else {
      image = createImage(name);
    }

    const newMember = {
      name: name,
      description: description,
      age: age,
      image: image,
    };

    handleAddMember(newMember);
    resetForm();
  }

  function createImage(name) {
    switch (name.toLowerCase()) {
      case "luffy":
        return "https://optc-db.github.io/api/images/full/transparent/1/400/1404.png";
      case "zoro":
        return "https://optc-db.github.io/api/images/full/transparent/1/300/1362.png";
      case "nami":
        return "https://optc-db.github.io/api/images/full/transparent/1/300/1366.png";
      case "usopp":
        return "https://optc-db.github.io/api/images/full/transparent/1/400/1406.png";
      case "sanji":
        return "https://optc-db.github.io/api/images/full/transparent/1/300/1368.png";
      case "chopper":
        return "https://optc-db.github.io/api/images/full/transparent/1/300/1370.png";
      case "robin":
        return "https://optc-db.github.io/api/images/full/transparent/1/400/1408.png";
      case "franky":
        return "https://optc-db.github.io/api/images/full/transparent/1/300/1364.png";
      default:
        return "https://optc-db.github.io/api/images/full/transparent/3/500/3515.png";
    }
  }

  return (
    <>
      <div className="mulish-p" id="create-team-form">
        <form
          id="member-form"
          className="form-container"
          onSubmit={handleSubmit}
        >
          <div>
            <h1 className="mulish-heading">Build Your Pirate Crew!</h1>
            <p>
              Fields marked with{" "}
              <span aria-label="required" className="required">
                {" "}
                *
              </span>{" "}
              are required.
            </p>
          </div>
          <div className="input-field-container">
            <label htmlFor="name">
              Member Name
              <span aria-label="required" className="required">
                {" "}
                *
              </span>
            </label>
            <input
              id="name"
              maxLength="16"
              name="name"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name here..."
            />
          </div>
          <div className="input-field-container">
            <label htmlFor="description">
              Description
              <span aria-label="required" className="required">
                {" "}
                *
              </span>
            </label>
            <input
              id="description"
              maxLength="45"
              name="description"
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description here..."
            />
          </div>
          <div className="input-field-container">
            <label htmlFor="age">
              Age
              <span aria-label="required" className="required">
                {" "}
                *
              </span>
            </label>
            <input
              id="age"
              min="1"
              name="age"
              required
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
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
            <input id="submit-button" type="submit" value="Add Pirate" />
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
