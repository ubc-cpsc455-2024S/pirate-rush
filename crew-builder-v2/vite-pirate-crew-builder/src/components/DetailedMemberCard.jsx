import React from "react";

const DetailedMemberCard = ({ isOpen, onClose, member }) => {
  if (!isOpen) return null;

  const handleClickOffView = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const memberLevel = member.unitLevel + 1

  return (
    <>
      <div className="detailed-container" onClick={handleClickOffView}>
        <div className={"detailed-content" + "-" + memberLevel}>
          <div className="detailed-text">
            <div>
              <span className="member-name">{member.name}</span>
              <span className="member-level"> LV {memberLevel}</span>
            </div>
            <span className="mulish-p">{member.description}</span>
          </div>
          <img
            className="detailed-image"
            src={member.images[member.unitLevel]}
            alt={member.name}
          />
        </div>
      </div>
    </>
  );
};

export default DetailedMemberCard;
