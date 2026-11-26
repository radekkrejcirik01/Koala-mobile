import { createSlice } from '@reduxjs/toolkit';
import { User } from '@store/index/index.props';
import { Appearances } from '@enums/appearance';

const initialState: User = {
  token: null,
  emailRequired: false,
  user: {
    id: null,
    name: null,
    username: null,
    profilePhoto: null
  },
  image: null,
  appearance: Appearances.SYSTEM
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
    setProfilePhotoAction: (state, action) => {
      state.user.profilePhoto = action.payload;
    },
    setNameAction: (state, action) => {
      state.user.name = action.payload;
    },
    setEmailAction: (state, action) => {
      state.user.email = action.payload;
    },
    setEmailRequiredAction: (state, action) => {
      state.emailRequired = action.payload;
    },
    setImageAction: (state, action) => {
      state.image = action.payload;
    },
    setAppearanceAction: (state, action) => {
      state.appearance = action.payload;
    },
    resetUserState: (state) => ({
      ...initialState,
      image: state.image,
      appearance: state.appearance
    })
  }
});

export const {
  setUserToken,
  setUserStateAction,
  setProfilePhotoAction,
  setNameAction,
  setEmailAction,
  setEmailRequiredAction,
  setImageAction,
  setAppearanceAction,
  resetUserState
} = UserReducer.actions;

export default UserReducer.reducer;
