import React from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailedMemberCard from "./DetailedMemberCard.jsx";
import {
  deleteMemberAsync,
  getMembersAsync,
  patchMemberVersionAsync,
} from "../redux/members/thunks.js";
import { MAX_LEVEL } from "../constants.js";

function MiniMemberCard({ crewMember }) {
  const [viewDetailed, setViewDetailed] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [isEvolving, setIsEvolving] = React.useState(false);
  const [isSilhouette, setIsSilhouette] = React.useState(false);

  const dispatch = useDispatch();

  const handleUpgradeMember = async (id) => {
    if (crewMember.unitLevel === MAX_LEVEL) {
      toast.info(`Crew member: ${id} is already at maximum level.`);
      return;
    }

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
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      </>
  );
}

export default MiniMemberCard;
