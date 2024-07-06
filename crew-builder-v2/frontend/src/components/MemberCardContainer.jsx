import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembersAsync } from "../redux/members/thunks.js";
import MemberCardMini from "./MemberCardMini.jsx";

function MemberCardContainer() {
  const crew = useSelector((state) => state.members.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersAsync());
  }, []);

  return (
    <>
      <div id="team-display">
        <div>
          <div className="member-container-headings">
            <h2 className="mulish-heading">Your Crew</h2>
            <h2 className="mulish-heading">Berries ($):</h2>
          </div>
          <ul id="team-list">
            {crew.map((crewMember) => (
              <li key={crewMember.memberId} className="each-card">
                <MemberCardMini crewMember={crewMember} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MemberCardContainer;
