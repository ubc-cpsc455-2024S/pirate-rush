import React from 'react';
import {removeAllMembers, removeMemberById} from "../features/memberSlice.js";
import {useDispatch, useSelector} from "react-redux";

function MemberContainer() {
    const crew = useSelector((state) => state.member);
    const dispatch = useDispatch();

    const handleClearMembers = () => {
        dispatch(removeAllMembers());
    }

    const handleDeleteMember = (id) => {
        dispatch(removeMemberById(id))
    }

    const viewMember = (id) => {
        console.log("view pirate clicked!", id)
    }
    return (
        <>
            <div id="team-display">
                <div>
                    <h2 className="mulish-heading">Your Crew</h2>
                    <div className="center">
                        <button id="clear-team-button" onClick={() => handleClearMembers()}>Clear Pirates</button>
                    </div>
                    <ul id="team-list">
                        {crew.map((crewMember) => (
                            <li key={crewMember.id} className="each-card">
                                <div className="member-container">
                                    <span className="member-name">{crewMember.name}</span>
                                    <span className="member-age">{`${crewMember.age} y/o`}</span>
                                    <span className="member-description">{crewMember.description}</span>
                                    <img className="member-image" src={crewMember.image} alt={crewMember.name}
                                         width={300}/>
                                    <div>
                                        <button className="view-member-button" onClick={() => viewMember(crewMember.id)}>View</button>
                                        <button className="delete-member-button" onClick={() => handleDeleteMember(crewMember.id)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MemberContainer;
