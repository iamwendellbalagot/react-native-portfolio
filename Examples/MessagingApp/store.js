import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import appReducer from './reduxSlices/appSlice'

export default configureStore({
    reducer: {
        app: appReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})