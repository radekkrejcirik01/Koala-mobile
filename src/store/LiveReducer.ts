import { createSlice } from '@reduxjs/toolkit';
import { Live } from '@store/index/index.props';

const initialState: Live = {
  typingIds: []
};

export const LiveReducer = createSlice({
  name: 'live',
  initialState,
  reducers: {
    startTypingAction: (state, action) => {
      if (!state.typingIds.includes(action.payload)) {
        state.typingIds.push(action.payload);
      }
    },
    stopTypingAction: (state, action) => {
      if (state.typingIds.includes(action.payload)) {
        state.typingIds = state.typingIds.filter((id) => id !== action.payload);
      }
    },
    resetTypingAction: (state) => {
      if (state.typingIds.length) {
        state.typingIds = [];
      }
    }
  }
});

export const { startTypingAction, stopTypingAction, resetTypingAction } =
  LiveReducer.actions;

export default LiveReducer.reducer;
