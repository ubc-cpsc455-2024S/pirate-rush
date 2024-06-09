import React from "react";
import { removeMemberById } from "../features/memberSlice.js";
import { useDispatch } from "react-redux";
import DetailedMemberCard from "./DetailedMemberCard.jsx";

function MiniMemberCard({ crewMember }) {
  const [viewDetailed, setViewDetailed] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);

  const dispatch = useDispatch();

  const handleDeleteMember = (id) => {
    dispatch(removeMemberById(id));
  };

  const viewMember = (member) => {
    setSelectedMember(member);
    setViewDetailed(true);
  };

  const closeView = () => {
    setSelectedMember(null);
    setViewDetailed(false);
  };

  return (
    <>
      <div>
        <div className="member-container">
          <span className="member-name">{crewMember.name}</span>
          <img
            className="member-image"
            src={crewMember.image}
            alt={crewMember.name}
            width={300}
          />
          <div>
            <button
              className="view-member-button"
              onClick={() => viewMember(crewMember)}
            >
              View
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
