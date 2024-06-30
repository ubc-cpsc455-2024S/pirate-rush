import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembersAsync } from "../redux/members/thunks.js";
import MiniMemberCard from "./MiniMemberCard.jsx";

function MemberContainer() {
  const crew = useSelector((state) => state.members.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersAsync());
  }, []);

  return (
    <>
      <div id="team-display">
        <div>
          <h2 className="mulish-heading">Your Crew</h2>
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
