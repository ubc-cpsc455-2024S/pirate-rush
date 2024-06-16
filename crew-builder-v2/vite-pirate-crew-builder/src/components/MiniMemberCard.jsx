import React from "react";
import { useDispatch } from "react-redux";
import DetailedMemberCard from "./DetailedMemberCard.jsx";
import { deleteMemberAsync, getMembersAsync, patchMemberVersionAsync } from "../redux/members/thunks.js";

function MiniMemberCard({ crewMember }) {
  const [viewDetailed, setViewDetailed] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);

  const dispatch = useDispatch();

  const handleUpgradeMember = async (id) => {
    await dispatch(patchMemberVersionAsync(id));
    await dispatch(getMembersAsync())
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

  const memberLevel = crewMember.imgVersion + 1

  return (
    <>
      <div>
        <div className={"mini-member-container" + "-" + memberLevel}>
          <div>
            <span className="member-name">{crewMember.name}</span>
            <span className="member-level"> LV {memberLevel}</span>
          </div>

          <img
            className="member-image"
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
              Delete
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
