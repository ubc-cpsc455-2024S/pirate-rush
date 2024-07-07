import React from "react";
import { useDispatch } from "react-redux";
import MemberCardPopup from "./MemberCardPopup.jsx";
import {
    deleteMemberAsync,
    getMembersAsync,
    patchMemberVersionAsync,
} from "../redux/members/thunks.js";
import { MAX_LEVEL } from "../../global_const.js";
import { patchBerriesAsync } from "../redux/players/thunks.js";

function MemberCardMini({ crewMember, player }) {
    const [viewDetailed, setViewDetailed] = React.useState(false);
    const [selectedMember, setSelectedMember] = React.useState(null);
    const [isEvolving, setIsEvolving] = React.useState(false);
    const [isSilhouette, setIsSilhouette] = React.useState(false);

    const dispatch = useDispatch();

    const handleUpgradeMember = async () => {
        if (crewMember.unitLevel === MAX_LEVEL) {
            alert(`Crew member ${crewMember.name} is at max level.`);
            return;
        }

        if (crewMember.cost > player.berries) {
            alert(`Not enough berries to upgrade ${crewMember.name}.`);
            return;
        }

        try {
            await spendToUpgrade();
            await evolveMember();
        } catch (error) {
            console.error("Error during upgrade:", error);
            alert(`Failed to upgrade ${crewMember.name}: ${error.message}`);
        }
    };

    const spendToUpgrade = async () => {
        await dispatch(
            patchBerriesAsync({
                playerId: player.playerId,
                amount: crewMember.cost,
            }),
        );
    };

    const evolveMember = async () => {
        // Wait for evolve animation
        setIsEvolving(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        await dispatch(patchMemberVersionAsync(crewMember.memberId));
        await new Promise((resolve) => setTimeout(resolve, 150));
        await dispatch(getMembersAsync());
        setIsEvolving(false);

        // Wait for silhouette animation
        setIsSilhouette(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSilhouette(false);
    };

    const handleDeleteMember = () => {
        dispatch(deleteMemberAsync(crewMember.memberId));
    };

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
                <div
                    className={"mini-member-container-" + crewMember.unitLevel}
                >
                    <div>
                        <span className="member-name">{crewMember.name}</span>
                        <span className="member-level">
                            {" "}
                            LV {crewMember.unitLevel}
                        </span>
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
                            onClick={() => handleUpgradeMember()}
                        >
                            {`Upgrade [${crewMember.cost}$]`}
                        </button>
                        <button
                            className="delete-member-button"
                            onClick={() => handleDeleteMember()}
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
