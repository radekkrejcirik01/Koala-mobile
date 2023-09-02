import { createSlice } from '@reduxjs/toolkit';
import { NewAccount } from '@store/index/index.props';

const initialState: NewAccount = {
    name: null,
    username: null
};

export const NewAccountReducer = createSlice({
    name: 'newAccount',
    initialState,
    reducers: {
        setNameAction: (state, action) => {
            state.name = action.payload;
        },
        setUsernameAction: (state, action) => {
            state.username = action.payload;
        }
    }
});

export const { setNameAction, setUsernameAction } = NewAccountReducer.actions;

export default NewAccountReducer.reducer;
