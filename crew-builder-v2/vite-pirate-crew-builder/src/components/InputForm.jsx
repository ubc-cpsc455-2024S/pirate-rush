import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addMemberAsync } from "../redux/members/thunks.js";

function InputForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [imageURL, setImageURL] = useState("");

  const dispatch = useDispatch();

  const handleAddMember = (member) => {
    const newMember = { ...member, memberId: uuidv4() };
    dispatch(addMemberAsync(newMember));
  };

  function resetForm() {
    setName("");
    setDescription("");
    setAge("");
    setImageURL("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    let images;

    if (imageURL.trim() !== "") {
      images = [
        imageURL,
        "https://optc-db.github.io/api/images/full/transparent/3/500/3514.png",
        "https://optc-db.github.io/api/images/full/transparent/3/500/3515.png",
      ];
    } else {
      images = createImage(name);
    }

    const newMember = {
      name: name,
      description: description,
      age: age,
      images: images,
      imgVersion: 0,
    };

    handleAddMember(newMember);
    resetForm();
  }

  function createImage(name) {
    switch (name.toLowerCase()) {
      case "luffy":
        return [
          "https://optc-db.github.io/api/images/full/transparent/0/000/0002.png",
          "https://optc-db.github.io/api/images/full/transparent/2/000/2073.png",
          "https://optc-db.github.io/api/images/full/transparent/2/300/2363.png",
        ];
      case "zoro":
        return [
          "https://optc-db.github.io/api/images/full/transparent/0/000/0005.png",
          "https://optc-db.github.io/api/images/full/transparent/2/400/2476.png",
          "https://optc-db.github.io/api/images/full/transparent/3/200/3202.png",
        ];
      case "nami":
        return [
          "https://optc-db.github.io/api/images/full/transparent/0/000/0009.png",
          "https://optc-db.github.io/api/images/full/transparent/2/000/2073.png",
          "https://optc-db.github.io/api/images/full/transparent/2/300/2363.png",
        ];
      case "usopp":
        return [
          "https://optc-db.github.io/api/images/full/transparent/0/000/0013.png",
          "https://optc-db.github.io/api/images/full/transparent/1/500/1531.png",
          "https://optc-db.github.io/api/images/full/transparent/1/500/1543.png",
        ];
      case "sanji":
        return [
          "https://optc-db.github.io/api/images/full/transparent/0/000/0017.png",
          "https://optc-db.github.io/api/images/full/transparent/1/500/1587.png",
          "https://optc-db.github.io/api/images/full/transparent/1/500/1588.png",
        ];
      case "robin":
        return [
          "https://optc-db.github.io/api/images/full/transparent/0/200/0209.png",
          "https://optc-db.github.io/api/images/full/transparent/1/900/1950.png",
          "https://optc-db.github.io/api/images/full/transparent/2/800/2830.png",
        ];
      default:
        return [
          "https://optc-db.github.io/api/images/full/transparent/3/600/3682.png",
          "https://optc-db.github.io/api/images/full/transparent/3/500/3514.png",
          "https://optc-db.github.io/api/images/full/transparent/3/500/3515.png",
        ];
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
          <div className="input-title-container">
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
