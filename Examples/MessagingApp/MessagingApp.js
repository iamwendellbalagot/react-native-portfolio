import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {Provider} from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'
import {getContacts, setContacts} from './reduxSlices/appSlice'
import store from './store'
import {s} from './styles'
import firebase from 'firebase'
import {auth,db} from '../Login/firebase'

const Home = () => {

    const dispatch = useDispatch();
    const contacts = useSelector(getContacts)

    const handleClick = () => {
        dispatch(setContacts({
            items: ['Keqing', 'Klee', 'Diluc']
        }))
    }

    useEffect(() => {
        console.log(contacts)
    }, [contacts])
    
    return (
        <View style={s.app}>
            <Text onPress={handleClick}>MessagingAPP</Text>
            {/* {contacts? contacts.map((c,i) => (
                    <Text key={c.items[i]}>{c.items[i]}</Text>
                )) : null} */}
        </View>
    )
}

const App = () => {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Provider store={store}>
                <Stack.Navigator>
                    <Stack.Screen 
                        name='Home'
                        component={Home}
                        options={{
                            title: 'Home'
                        }}
                    />
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
        
    )
}

export default App
