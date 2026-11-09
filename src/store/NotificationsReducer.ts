import { createSlice } from '@reduxjs/toolkit';
import { Notifications } from '@store/index/index.props';

const initialState: Notifications = {
  unreadChats: 0,
  unseenInvites: 0
};

export const NotificationsReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUnreadChats: (state, action) => {
      state.unreadChats = action.payload;
    },
    setUnseenInvites: (state, action) => {
      state.unseenInvites = action.payload;
    }
  }
});

export const { setUnreadChats, setUnseenInvites } =
  NotificationsReducer.actions;

export default NotificationsReducer.reducer;
