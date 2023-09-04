import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@store/UserReducer';
import NewAccountReducer from '@store/NewAccountReducer';
import Notifications from '@store/NotificationsReducer';

export default configureStore({
    reducer: {
        user: UserReducer,
        newAccount: NewAccountReducer,
        notifications: Notifications
    }
});
