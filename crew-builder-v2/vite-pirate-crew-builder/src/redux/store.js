import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "./members/reducer.js";

export default configureStore({
  reducer: {
    members: membersReducer,
  },
});
