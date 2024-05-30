import { useState, useEffect } from "react";

function InputForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState();
    const [imageURL, setImageURL] = useState("");

    return (
        <>
            <div className="mulish-p" id="create-team-form">
                <form id="member-form" className="form-container">
                    <div>
                        <h1 className="mulish-heading">Build Your Pirate Crew!</h1>
                        <p>Fields marked with <span aria-label="required" className="required"> *</span> are required.
                        </p>
                    </div>
                    <div className="input-field-container">
                        <label htmlFor="name">Member Name<span aria-label="required"
                                                               className="required"> *</span></label>
                        <input id="name" maxLength="16" name="name" required type="text"/>
                    </div>
                    <div className="input-field-container">
                        <label htmlFor="description">Description<span aria-label="required"
                                                                      className="required"> *</span></label>
                        <input id="description" maxLength="45" name="description" required type="text"/>
                    </div>
                    <div className="input-field-container">
                        <label htmlFor="age">Age<span aria-label="required" className="required"> *</span></label>
                        <input id="age" min="1" name="age" required type="number"/>
                    </div>
                    <div className="input-field-container">
                        <label htmlFor="imageURL">Image URL</label>
                        <input id="imageURL" name="imageURL"
                               pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                               type="text"/>
                    </div>
                    <div>
                        <input id="submit-button" type="submit" value="Add Pirate"/>
                    </div>
                    <div>
                        <button id="clear-fields-button" type="reset">Clear Fields</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default InputForm