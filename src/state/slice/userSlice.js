import { createSlice } from '@reduxjs/toolkit'

const userNameLocalStorage =
    localStorage.getItem("userRedux") === null
        ? null
        : JSON.parse(localStorage.getItem("userRedux"));

const initialState = {
    userName: userNameLocalStorage,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            localStorage.setItem("userRedux", action.payload)
            state.userName = action.payload;
        },
        logOut: (state) => {
            window.localStorage.removeItem('userRedux');
            state.userName = null;
        },

    },
})

export const { updateUser,logOut } = userSlice.actions

export default userSlice.reducer;