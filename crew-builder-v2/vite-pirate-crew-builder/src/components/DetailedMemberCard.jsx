import React from "react";

const DetailedMemberCard = ({ isOpen, onClose, member }) => {
  if (!isOpen) return null;

  const handleClickOffView = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="detailed-container" onClick={handleClickOffView}>
        <div className="detailed-content">
          <div className="detailed-text">
            <h2 className="mulish-heading">{member.name}</h2>
            {/*<p className="mulish-p">{`${member.age} y/o`}</p> Excluding for preference */}
            <p className="mulish-p">{member.description}</p>
          </div>
          <img
            className="detailed-image"
            src={member.images[member.imgVersion]}
            alt={member.name}
          />
        </div>
      </div>
    </>
  );
};

export default DetailedMemberCard;
