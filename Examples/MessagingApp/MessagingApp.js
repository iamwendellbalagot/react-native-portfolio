import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import {Provider} from 'react-redux'
import store from './store'
import {s} from './styles'
import firebase from 'firebase'
import {auth,db} from '../Login/firebase'

const App = () => {
    return (
        <Provider store={store}>
            <View style={s.app}>
                <Text>MessagingAPP</Text>
            </View>
        </Provider>
    )
}

export default App
