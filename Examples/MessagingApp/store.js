import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import appReducer from './reduxSlices/appSlice'
import userSlice from './reduxSlices/userSlice'

export default configureStore({
    reducer: {
        app: appReducer,
        user: userSlice
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})