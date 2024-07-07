import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import { getPlayerAsync, patchBerriesAsync } from "./thunks";

const INITIAL_STATE = {
    player: null,
    getPlayer: REQUEST_STATE.IDLE,
    patchBerries: REQUEST_STATE.IDLE,
    error: null,
};

const playerSlice = createSlice({
    name: "player",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder
            .addCase(getPlayerAsync.pending, (state) => {
                state.getPlayer = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getPlayerAsync.fulfilled, (state, action) => {
                state.getPlayer = REQUEST_STATE.FULFILLED;
                state.player = action.payload;
            })
            .addCase(getPlayerAsync.rejected, (state, action) => {
                state.getPlayer = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(patchBerriesAsync.pending, (state) => {
                state.patchBerries = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(patchBerriesAsync.fulfilled, (state, action) => {
                state.patchBerries = REQUEST_STATE.FULFILLED;
                if (state.player) {
                    state.player.berries = action.payload;
                }
            })
            .addCase(patchBerriesAsync.rejected, (state, action) => {
                state.patchBerries = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export default playerSlice.reducer;
