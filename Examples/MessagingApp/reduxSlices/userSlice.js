import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state, action) => {
            state.user = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions
export const getUser = (state) => state.user.user

export default userSlice.reducer