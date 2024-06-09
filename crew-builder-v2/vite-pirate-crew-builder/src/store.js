import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./features/memberSlice";

// import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    member: memberReducer,
  },
  // middleware: [thunk]
});
