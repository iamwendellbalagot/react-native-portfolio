import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {Provider} from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'
import {getContacts, setContacts} from './reduxSlices/appSlice'
import store from './store'
import {s} from './styles'
import firebase from 'firebase'
import {auth,db} from '../Login/firebase'
import { TextInput } from 'react-native-gesture-handler';

const Search = ({size, color}) => {
    return (
        <View style={s.search}>
            <TextInput 
                placeholder='Search message'
                style={s.search__input}
            />
            <FontAwesome name="search" size={size} color={color} />
        </View>
    )
}



const Home = ({navigation}) => {

    // const dispatch = useDispatch();
    // const contacts = useSelector(getContacts)

    // const handleClick = () => {
    //     dispatch(setContacts({
    //         items: ['Keqing', 'Klee', 'Diluc']
    //     }))
    // }

    // useEffect(() => {
    //     console.log(contacts)
    // }, [contacts])

    return (
        <View style={s.app}>
            <Search size={20} color='#14274e'/>
        </View>
    )
}

const App = () => {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Provider store={store}>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#394867'
                        },
                        headerTitleStyle: {
                            alignSelf: 'center'
                        },
                        headerTintColor: '#f1f6f9'
                    }}
                >
                    <Stack.Screen 
                        name='Messages'
                        component={Home}
                        options={{
                            title: 'Messages'
                        }}
                    />
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
        
    )
}

export default App
