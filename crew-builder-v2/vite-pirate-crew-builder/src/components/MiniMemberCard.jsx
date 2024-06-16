import React from "react";
import { useDispatch } from "react-redux";
import DetailedMemberCard from "./DetailedMemberCard.jsx";
import { deleteMemberAsync, getMembersAsync, patchMemberVersionAsync } from "../redux/members/thunks.js";

function MiniMemberCard({ crewMember }) {
  const [viewDetailed, setViewDetailed] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [isEvolving, setIsEvolving] = React.useState(false);
  const [isSilhouette, setIsSilhouette] = React.useState(false);

  const dispatch = useDispatch();

  const handleUpgradeMember = async (id) => {
    if (crewMember.imgVersion === 2) {
      alert(`Crew member: ${id} is already at maximum level.`);
      return;
    }

    setIsEvolving(true);

    // Wait for evolve animation
    await new Promise((resolve) => setTimeout(resolve, 500));
    await dispatch(patchMemberVersionAsync(id));
    await dispatch(getMembersAsync());
    setIsSilhouette(true);

    // Wait for silhouette animation
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSilhouette(false);
    setIsEvolving(false);
  };


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

  const memberLevel = crewMember.imgVersion + 1;

  return (
    <>
      <div>
        <div className={"mini-member-container-" + memberLevel}>
          <div>
            <span className="member-name">{crewMember.name}</span>
            <span className="member-level"> LV {memberLevel}</span>
          </div>

          <img
            className={`member-image ${isEvolving ? 'evolving' : ''} ${isSilhouette ? 'silhouette' : ''}`}
            src={crewMember.images[crewMember.imgVersion]}
            alt={crewMember.name}
            width={250}
          />
          <div>
            <button
              className="view-member-button"
              onClick={() => viewMember(crewMember)}
            >
              View
            </button>
            <button
              className="upgrade-member-button"
              onClick={() => handleUpgradeMember(crewMember.memberId)}
            >
              Upgrade
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
          <DetailedMemberCard
            isOpen={viewDetailed}
            onClose={closeView}
            member={selectedMember}
          />
        </div>
      </div>
    </>
  );
}

export default MiniMemberCard;
