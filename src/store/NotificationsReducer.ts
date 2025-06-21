import { createSlice } from '@reduxjs/toolkit';
import { Notifications } from '@store/index/index.props';

const initialState: Notifications = {
  unseenNotifications: 0
};

export const NotificationsReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUnseenNotifications: (state, action) => {
      state.unseenNotifications = action.payload;
    }
  }
});

export const { setUnseenNotifications } = NotificationsReducer.actions;

export default NotificationsReducer.reducer;
