import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembersAsync } from "../redux/members/thunks.js";
import { getPlayerAsync } from "../redux/players/thunks.js";
import MemberCardMini from "./MemberCardMini.jsx";
import { REQUEST_STATE } from "../redux/utils.js";
import Loading from "./Loading.jsx";

function MemberCardContainer() {
  const crew = useSelector((state) => state.members.list);
  const player = useSelector((state) => state.players.player);
  const getPlayerStatus = useSelector((state) => state.players.getPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlayerAsync({ playerId: "123456" }));
  }, [dispatch]);

  if (getPlayerStatus === REQUEST_STATE.PENDING || !player) {
    return <Loading />;
  }

  return (
    <>
      <div id="team-display">
        <div>
          <div className="member-container-headings">
            <h2 className="mulish-heading">{`${player.username}'s Crew`}</h2>
            <h2 className="mulish-heading">{`Berries ($): ${player.berries}`}</h2>
          </div>
          <ul id="team-list">
            {crew.map((crewMember) => (
              <li key={crewMember.memberId} className="each-card">
                <MemberCardMini crewMember={crewMember} player={player} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MemberCardContainer;
