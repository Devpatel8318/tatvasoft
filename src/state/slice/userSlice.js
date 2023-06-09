import { createSlice } from '@reduxjs/toolkit'



const userNameLocalStorage =
    localStorage.getItem("user") === null
        ? null
        : JSON.parse(localStorage.getItem("user"));



const initialState = {
    userName: userNameLocalStorage,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.userName = action.payload;
        },

    },
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer;