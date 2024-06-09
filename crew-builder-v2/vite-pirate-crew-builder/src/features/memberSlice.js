import { createSlice } from "@reduxjs/toolkit";

const initialCrew = [
  {
    name: "Luffy",
    description: "Captain of the Straw Hat Pirates",
    age: 19,
    image:
      "https://optc-db.github.io/api/images/full/transparent/1/400/1404.png",
    memberId: 1,
  },
  {
    name: "Zoro",
    description: "Esteemed swordsman and pirate bounty hunter",
    age: 21,
    image:
      "https://optc-db.github.io/api/images/full/transparent/1/300/1362.png",
    memberId: 2,
  },
  {
    name: "Nami",
    description: "Elusive thief and self-proclaimed world-class navigator",
    age: 20,
    image:
      "https://optc-db.github.io/api/images/full/transparent/1/300/1366.png",
    memberId: 3,
  },
  {
    name: "Usopp",
    description: "Supreme sniper the bravest warrior of the sea",
    age: 19,
    image:
      "https://optc-db.github.io/api/images/full/transparent/1/400/1406.png",
    memberId: 4,
  },
];

export const memberSlice = createSlice({
  name: "member",
  initialState: initialCrew,
  reducers: {
    addMember: (state, action) => {
      state.push(action.payload);
    },
    removeMemberById: (state, action) => {
      return state.filter((member) => member.memberId !== action.payload);
    },
    removeAllMembers: () => {
      return [];
    },
  },
});

export const { addMember, removeMemberById, removeAllMembers } =
  memberSlice.actions;

export default memberSlice.reducer;
