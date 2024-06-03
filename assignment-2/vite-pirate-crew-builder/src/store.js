import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './features/memberSlice';

export default configureStore({
    reducer: {
        member: memberReducer
    }
})
