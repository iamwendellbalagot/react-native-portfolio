import {createSlice} from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        contacts: null,
        loadedMessages: null
    },
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload
        },
        setLoadedMessages: (state, action) => {
            state.loadedMessages = action.payload
        }
    }
})

export const {setContacts, setLoadedMessages} = appSlice.actions
export const getContacts = (state) => state.app.contacts
export const getLoadedMessages = (state) => state.app.loadedMessages

export default appSlice.reducer