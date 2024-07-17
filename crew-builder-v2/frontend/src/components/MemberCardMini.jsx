import React from "react";
import { useDispatch } from "react-redux";
import MemberCardPopup from "./MemberCardPopup.jsx";
import {
  handleDeleteMember,
  handleUpgradeMember,
} from "../componentUtils/MemberCardMiniUtils.js";

function MemberCardMini({ crewMember, player }) {
  const [viewDetailed, setViewDetailed] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [isEvolving, setIsEvolving] = React.useState(false);
  const [isSilhouette, setIsSilhouette] = React.useState(false);

  const dispatch = useDispatch();

  const viewMember = () => {
    setSelectedMember(crewMember);
    setViewDetailed(true);
  };

  const closeView = () => {
    setSelectedMember(null);
    setViewDetailed(false);
  };

  return (
    <>
      <div>
        <div className={"mini-member-container-" + crewMember.unitLevel}>
          <div>
            <span className="member-name">{crewMember.name}</span>
            <span className="member-level"> LV {crewMember.unitLevel}</span>
          </div>

          <img
            className={`member-image ${isEvolving ? "evolving" : ""} ${isSilhouette ? "silhouette" : ""}`}
            src={crewMember.images[crewMember.unitLevel - 1]}
            alt={crewMember.name}
            width={220}
            onClick={() => viewMember()}
          />
          <div className="mini-button-container">
            <button
              className="upgrade-member-button"
              onClick={() =>
                handleUpgradeMember(
                  crewMember,
                  player,
                  dispatch,
                  setIsEvolving,
                  setIsSilhouette,
                )
              }
            >
              {`Upgrade [${crewMember.cost}$]`}
            </button>
            <button
              className="delete-member-button"
              onClick={() => handleDeleteMember(crewMember, dispatch)}
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
