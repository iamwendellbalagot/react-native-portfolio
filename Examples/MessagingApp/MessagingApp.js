import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Avatar } from 'react-native-elements'
import { FontAwesome, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons' 
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {Provider} from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'
import {getContacts, setContacts, getLoadedMessages, setLoadedMessages} from './reduxSlices/appSlice'
import store from './store'
import {s} from './styles'
import firebase from 'firebase'
import {auth,db} from '../Login/firebase'
import moment from 'moment'
import { FlatList, TextInput } from 'react-native-gesture-handler';

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


const ProfileIcon = () => {
    return (
        <Avatar
            rounded
            size='large'
            source={{
                uri:
                'https://i.pinimg.com/564x/5e/a5/24/5ea524be1d230dc27809d6942a0a2947.jpg',
            }}
        />
    )
}

const StartChat = ({method}) => {
    return (
        <TouchableOpacity 
            style={s.startChat} 
            onPress={() => method()}
            activeOpacity={0.7}>
            <MaterialIcons 
                name="message" 
                size={25} 
                color="#f1f6f9" />
            <Text style={s.startChat__text}>
                Start Chat
            </Text>
        </TouchableOpacity>
    )
}

const MessageInput =() => {
    return (
    <View style={s.message__inputCont}>
        <View style={s.message1}>
            <Ionicons name="add-circle-outline" size={30} color="#14274e" />
            <MaterialIcons name="monochrome-photos" size={30} color="#14274e" />
        </View>
        <View style={s.message2}>
            <TextInput 
                placeholder='Message'
                style={{
                    flex: 0.8,
                    paddingLeft: 10
                }}
            />
            <MaterialIcons 
                name="insert-emoticon" 
                size={30} 
                color="#14274e" />
            <Ionicons 
                name="ios-send-sharp" 
                size={30} 
                color="#14274e" />
        </View>
    </View> 
    )
}

//[Containers] ************
const ContactTile = ({name, lastMessage}) => {
    const date = `${moment.duration(new Date().getTime()).hours()}:${moment.duration(new Date().getTime()).minutes()}`
    return (

        <TouchableOpacity style={s.contactTile} activeOpacity={0.5}>
            <View style={{flex: 0.23, }}>
                <ProfileIcon />
            </View>
            <View style={{flex: 0.77}}>
                <View style={s.tile__title}>
                    <Text style={s.tile__name}>{name}</Text>
                    <Text>{date}</Text>
                </View>
                <View>
                    <Text style={s.tile__mess}>{lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const StartChatPage = ({navigation}) => {
    return (
        
            <View style={s.messages} >
                <View style={{paddingBottom: 5, overflow: 'hidden', width: '100%'}}>
                    <View style={s.chat__header}>
                        <Text style={s.chat__header__text}>To</Text>
                        <TextInput 
                            placeholder='Contact ID'
                        />
                    </View>
                </View>
                <View style={s.chat__messagesCont}>

                </View>
                <MessageInput />
            </View>
    )
}

const Home = ({navigation}) => {

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Entypo 
                name="dots-three-vertical" 
                size={24} 
                color="#f1f6f9" />
        })
    },[])

    const dispatch = useDispatch();
    const contacts = useSelector(getContacts)

    const navigateMessages = () => {
        navigation.navigate('StartChat')
    }

    return (
        <View style={s.app}>
            <Search size={20} color='#14274e'/>
            <FlatList
                style={{width: '100%'}} 
                data={contacts}
                renderItem={(data) => 
                <ScrollView>
                    <ContactTile 
                        name={data.item.name}
                        lastMessage={data.item.lm}    
                    />
                </ScrollView>}
                keyExtractor={(data) => data.name}
            />
            <StartChat method={navigateMessages} />
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
                            alignSelf: 'center',
                            marginLeft: 50
                        },
                        headerTintColor: '#f1f6f9'
                    }}
                >
                    <Stack.Screen 
                        name='Home'
                        component={Home}
                        options={{
                            title: 'Home'
                        }}
                    />
                    <Stack.Screen 
                        name='StartChat'
                        component={StartChatPage}
                        options={{
                            title: ''
                        }}
                    />
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
        
    )
}

export default App
