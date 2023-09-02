import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@store/UserReducer';
import NewAccountReducer from '@store/NewAccountReducer';

export default configureStore({
    reducer: {
        user: UserReducer,
        newAccount: NewAccountReducer
    }
});
