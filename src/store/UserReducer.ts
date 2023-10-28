import { createSlice } from '@reduxjs/toolkit';
import { User } from '@store/index/index.props';

const initialState: User = {
    token: null,
    user: {
        name: null,
        username: null,
        profilePhoto: null
    },
    emotions: null
};

export const UserReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setUserStateAction: (state, action) => {
            state.user = action.payload;
        },
        setUserEmotionsStateAction: (state, action) => {
            state.emotions = action.payload;
        },
        setProfilePhotoAction: (state, action) => {
            state.user.profilePhoto = action.payload;
        },
        resetUserState: () => initialState
    }
});

export const {
    setUserToken,
    setUserStateAction,
    setUserEmotionsStateAction,
    resetUserState
} = UserReducer.actions;

export default UserReducer.reducer;
