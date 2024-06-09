import React from "react";
import { removeAllMembers } from "../features/memberSlice.js";
import { useDispatch, useSelector } from "react-redux";
import MiniMemberCard from "./MiniMemberCard.jsx";

function MemberContainer() {
  const crew = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const handleClearMembers = () => {
    dispatch(removeAllMembers());
  };

  return (
    <>
      <div id="team-display">
        <div>
          <h2 className="mulish-heading">Your Crew</h2>
          <div className="center">
            <button id="clear-team-button" onClick={() => handleClearMembers()}>
              Clear Pirates
            </button>
          </div>
          <ul id="team-list">
            {crew.map((crewMember) => (
              <li key={crewMember.memberId} className="each-card">
                <MiniMemberCard crewMember={crewMember} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MemberContainer;
