import React from "react";
import { useDispatch } from "react-redux";
import MemberCardPopup from "./MemberCardPopup.jsx";
import {
  deleteMemberAsync,
  getMembersAsync,
  patchMemberVersionAsync,
} from "../redux/members/thunks.js";
import { MAX_LEVEL } from "../../global_const.js";

function MemberCardMini({ crewMember }) {
  const [viewDetailed, setViewDetailed] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [isEvolving, setIsEvolving] = React.useState(false);
  const [isSilhouette, setIsSilhouette] = React.useState(false);

  const dispatch = useDispatch();

  const handleUpgradeMember = async (id, name) => {
    if (crewMember.unitLevel === MAX_LEVEL) {
      alert(`Crew member ${name} is at max level.`);
      return;
    }

    await evolveMember(id);
  };

  const evolveMember = async (id) => {
    setIsEvolving(true);

    // Wait for evolve animation
    await new Promise((resolve) => setTimeout(resolve, 500));
    await dispatch(patchMemberVersionAsync(id));
    await new Promise((resolve) => setTimeout(resolve, 200));
    await dispatch(getMembersAsync());
    setIsSilhouette(true);

    // Wait for silhouette animation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSilhouette(false);
    setIsEvolving(false);
  }

  const handleDeleteMember = (id) => {
    dispatch(deleteMemberAsync(id));
  };

  const viewMember = (member) => {
    setSelectedMember(member);
    setViewDetailed(true);
  };

  const closeView = () => {
    setSelectedMember(null);
    setViewDetailed(false);
  };

  const memberLevel = crewMember.unitLevel;

  return (
    <>
      <div>
        <div className={"mini-member-container-" + memberLevel}>
          <div>
            <span className="member-name">{crewMember.name}</span>
            <span className="member-level"> LV {memberLevel}</span>
          </div>

          <img
            className={`member-image ${isEvolving ? "evolving" : ""} ${isSilhouette ? "silhouette" : ""}`}
            src={crewMember.images[memberLevel - 1]}
            alt={crewMember.name}
            width={220}
            onClick={() => viewMember(crewMember)}
          />
          <div className="mini-button-container">
            <button
              className="upgrade-member-button"
              onClick={() => handleUpgradeMember(crewMember.memberId, crewMember.name)}
            >
              {`Upgrade [${crewMember.cost}$]`}
            </button>
            <button
              className="delete-member-button"
              onClick={() => handleDeleteMember(crewMember.memberId)}
            >
              Remove
            </button>
          </div>
        </div>
        <div>
          <MemberCardPopup
            isOpen={viewDetailed}
            onClose={closeView}
            member={selectedMember}
          />
        </div>
      </div>
    </>
  );
}

export default MemberCardMini;
