import {
  patchMemberVersionAsync,
  getMembersAsync,
  deleteMemberAsync,
} from "../redux/members/thunks.js";
import { patchBerriesAsync } from "../redux/players/thunks.js";
import { MAX_LEVEL } from "../../consts.js";

export const handleUpgradeMember = async (
  crewMember,
  player,
  dispatch,
  setIsEvolving,
  setIsSilhouette,
) => {
  if (crewMember.unitLevel === MAX_LEVEL) {
    alert(`Crew member ${crewMember.name} is at max level.`);
    return;
  }

  if (crewMember.cost > player.berries) {
    alert(`Not enough berries to upgrade ${crewMember.name}.`);
    return;
  }

  try {
    await spendToUpgrade(crewMember, player, dispatch);
    await evolveMember(crewMember, dispatch, setIsEvolving, setIsSilhouette);
  } catch (error) {
    console.error("Error during upgrade:", error);
    alert(`Failed to upgrade ${crewMember.name}: ${error.message}`);
  }
};

const spendToUpgrade = async (crewMember, player, dispatch) => {
  await dispatch(
    patchBerriesAsync({
      playerId: player.playerId,
      amount: -crewMember.cost,
    }),
  );
};

const evolveMember = async (
  crewMember,
  dispatch,
  setIsEvolving,
  setIsSilhouette,
) => {
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

export const handleDeleteMember = (crewMember, dispatch) => {
  dispatch(deleteMemberAsync(crewMember.memberId));
};
