import {createSlice} from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        contacts: [
            {name: 'Keqing', lm: 'Where are you?'},
            {name: 'Zhongli', lm: 'Hey Traveler, I need money.'},
            {name: 'Childe', lm: 'Oi lets play!!!'}
        ],
        loadedMessages: ['Where are you?', 'Come on!!', 'Fire mannn']
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