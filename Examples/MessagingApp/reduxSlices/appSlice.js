import {createSlice} from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        contacts: [
            {name: 'Keqing', lm: 'Where are you?'},
            {name: 'Zhongli', lm: 'Hey Traveler, I need money.'},
            {name: 'Childe', lm: 'Oi lets play!!!'}
        ],
        loadedMessages: [
            {
                id: 0,
                name: 'Keqing',
                photoUri: 'https://genshin.honeyhunterworld.com/img/char/keqing.png',
                date: '25/12/20',
                message: 'Hey, Where are you? I got Something to tell.'
            },
            {
                id: 0,
                name: 'Keqing',
                photoUri: 'https://genshin.honeyhunterworld.com/img/char/keqing.png',
                date: '25/12/20',
                message: 'Go to liyue, I will wait.'
            },
            {
                id: 1,
                name: 'You',
                photoUri: 'https://i.pinimg.com/564x/5e/a5/24/5ea524be1d230dc27809d6942a0a2947.jpg',
                date: '25/12/20',
                message: 'I will be there, just wait a second.'
            },
            {
                id: 0,
                name: 'Keqing',
                photoUri: 'https://genshin.honeyhunterworld.com/img/char/keqing.png',
                date: '25/12/20',
                message: 'Ok, see you!!!'
            },
            {
                id: 1,
                name: 'You',
                photoUri: 'https://i.pinimg.com/564x/5e/a5/24/5ea524be1d230dc27809d6942a0a2947.jpg',
                date: '25/12/20',
                message: 'Laoreet sit amet cursus sit amet. In fermentum et sollicitudin ac orci phasellus.'
            },
            {
                id: 0,
                name: 'Keqing',
                photoUri: 'https://genshin.honeyhunterworld.com/img/char/keqing.png',
                date: '25/12/20',
                message: 'At tellus at urna condimentum mattis pellentesque id nibh tortor. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Lacinia quis vel eros donec ac odio tempor orci dapibus.'
            },
            {
                id: 1,
                name: 'You',
                photoUri: 'https://i.pinimg.com/564x/5e/a5/24/5ea524be1d230dc27809d6942a0a2947.jpg',
                date: '25/12/20',
                message: 'Sed vulputate odio ut enim blandit volutpat. Amet consectetur adipiscing elit ut aliquam purus. Eu lobortis elementum nibh tellus molestie nunc non. '
            },
        ]
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