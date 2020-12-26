import React, {useState, useEffect} from 'react'
import { View, Text,Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Avatar, Button, Input} from 'react-native-elements'
import { FontAwesome, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons' 
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {Provider} from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'
import { getUser, setUser } from './reduxSlices/userSlice'
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

const MessageBox = ({message}) => {
    return (
        <View style={message.name==='You'? s.messageBox__you :  s.messageBox__reciever}>
            <Text
                style={{
                    fontSize: 15,
                    marginBottom: 10
                }}
            >{message.message}</Text>
            <Text
                style={{
                    fontSize: 12,
                    color: 'gray'
                }}
            >{message.date}</Text>
        </View>
    )
}

const StartChatPage = ({navigation}) => {
    const loadedMessages = useSelector(getLoadedMessages)

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
                    <FlatList 
                        data={loadedMessages}
                        keyExtractor={(data) => data.message}
                        renderItem={(data) =>
                            <MessageBox message={data.item} />
                        }
                    />
                </View>
                <MessageInput />
            </View>
    )
}

const Home = ({navigation}) => {
    
    const handleLogout = () => {
        auth.signOut()
        .then(res => {
            dispatch(setUser(null))
            navigation.reset({
                index: 0,
                routes: [{name: 'Credentials'}]
            })
        })
    }

    // <Entypo 
    //             name="dots-three-vertical" 
    //             size={24} 
    //             color="#f1f6f9"  
    //             onPress={handleLogout}
    //             />

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => 
            <Button 
                icon={{
                    name: 'dots-three-vertical',
                    color: 'white',
                    size:24,
                    type: 'entypo'
                }}
                type='clear'
                onPress={handleLogout}
            />
            
            
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

const FormLogin = ({navigation}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const errorStyle = {
        borderColor: 'rgba(250,128,114,0.5)', 
        borderWidth: 2,
        borderRadius: 3,
        paddingLeft: 10
    }

    const handleLogin = () => {
        console.log(email, '  ', password);


        email.length>1 && password.length> 4 && auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
        }).catch(err => {
            setError(err.code);
        })
    }
    return (
        <View style={s.formLogin}>
            
            <View style={{
                width: '100%'
            }}>
                {/* <Text style={s.formLogin__label} >Email:</Text> */}
                <View style={s.formLogin__input} >
                    <Input
                        onChangeText={(e) => setEmail(e)}
                        value={email} 
                        textContentType='emailAddress'
                        style={[{paddingLeft: 8}, error === 'auth/user-not-found' && errorStyle]}
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope',size:20, color:'#14274e'  }}
                    />
                </View>
                
                {/* <Text style={s.formLogin__label}>Password:</Text> */}
                <View style={s.formLogin__input}>
                    <Input
                        onChangeText={(e) => setPassword(e)}
                        value={password} 
                        style={[s.formLogin__input, error === 'auth/wrong-password' && errorStyle]} 
                        placeholder='Password'
                        secureTextEntry={true}
                        leftIcon={{ type: 'font-awesome', name: 'lock', size:30, color:'#14274e' }}
                    />
                </View>
                
                <View style={{marginHorizontal: 20}}>
                    <Button 
                        onPress={handleLogin}
                        title='Login'
                        buttonStyle={{backgroundColor: '#14274e'}}
                    />
                </View>
                
            </View>
        </View>
    )
}

const FormRegister = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confpassword, setConfPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [error, setError] = useState(false)

    const handleRegister = () => {
        console.log(email, '  ', password, '  ', nickname, '  ', confpassword);
        nickname.length>4 && email.length !==0 && confpassword === password && auth.createUserWithEmailAndPassword(
            email, password
        )
        .then(res => {
            res.user.updateProfile({
                displayName: nickname
            })
            .then(_res => {
                dispatch(setUser(auth.currentUser))
            })
        })
    }

    useEffect(() => {
        console.log(auth.currentUser)
    },[])

    const errorStyle = {
        borderColor: 'salmon', 
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 10
    }
    return (
        <View style={[s.formLogin, {height: 350, marginTop: 50}]}>
            
            <View style={{
                width: '100%'
            }}>
                {/* <Text style={s.formLogin__label} >Email:</Text> */}
                <View style={s.formLogin__input} >
                    <Input
                        onChangeText={(e) => setNickname(e)}
                        style={s.formLogin__input} 
                        value={nickname} 
                        placeholder='Nickname'
                    />
                </View>
                
                <View style={s.formLogin__input} >
                    <Input
                        onChangeText={(e) => setEmail(e)}
                        style={s.formLogin__input} 
                        value={email} 
                        placeholder='Email'
                    />
                </View>
                
                {/* <Text style={s.formLogin__label}>Password:</Text> */}
                <View style={s.formLogin__input}>
                    <Input
                        onChangeText={(e) => setPassword(e)}
                        value={password} 
                        style={[s.formLogin__input, (error? errorStyle: null)]} 
                        placeholder='Password'
                        secureTextEntry={true}
                    />
                </View>

                <View style={s.formLogin__input}>
                    <Input
                        onChangeText={(e) => setConfPassword(e)}
                        value={confpassword}
                        style={[s.formLogin__input, (error? errorStyle: null)]} 
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                    />
                </View>
                
                <View style={{marginHorizontal: 20}}>
                    <Button 
                        onPress={handleRegister}
                        title='Register'
                        buttonStyle={{backgroundColor: '#14274e'}}
                    />
                </View>
                
            </View>
        </View>
    )
}



const Credentials = ({navigation}) => {
    const user = useSelector(getUser)
    const [login, setLogin] = useState(true)

    useEffect(() => {
        navigation.setOptions({
            header: () => null
        })
    }, [])

    useEffect(() => {
        if(user) navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }, [user])

    const navigateRegister = () => {
        setLogin(!login)
        return
    }

    return (
        <View style={s.credentials__cont}>
            <Image 
                blurRadius={3}
                source={require('../../assets/mesageapp__bg.png')} 
                style={s.credentials__bg} />
            <View style={s.credentials__bd}>
                {!login?<TouchableOpacity 
                    style={s.register__back}
                    onPress={navigateRegister}
                >
                    <Ionicons name="arrow-back-outline" size={40} color="white" />
                </TouchableOpacity>: null}
                {login?<View style={{alignItems: 'center', marginTop: '37%'}}>
                    <Text style={s.credentials__header}>Hello</Text>
                    <Text style={s.credentials__header}>Welcome Back!</Text>

                </View>
                : <View  style={{alignItems: 'center', marginTop: '25%'}}>
                    <Text style={[s.credentials__header]}>Register</Text>
                </View>
                }
                <View>
                    {login? <FormLogin navigation={navigation} />: <FormRegister />}
                </View>
                {login? <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 70
                }}>
                    <Text style={s.credentials__register}>Need an account?</Text>
                    <TouchableOpacity onPress={navigateRegister}>
                        <Text
                            style={[s.credentials__register,{fontWeight: 'bold'}]}
                        >{` Register`}</Text>
                    </TouchableOpacity>
                </View>: null}
            </View>
        </View>
    )
}

const App = () => {
    const dispatch = useDispatch()
    const Stack = createStackNavigator()
    const user = useSelector(getUser)
    //const [user, setUserr] = useState(null)

    useEffect(() => {
        console.log('COOOOOOOOOO')
        auth.onAuthStateChanged(userAuth => {
            if(userAuth){
                // console.log('Running Firsrt  ',userAuth)
                // setUserr(userAuth)
                dispatch(setUser({
                    uuid: userAuth.uid,
                    displayName: userAuth.displayName
                }))
            }
        })
    }, [])

    useEffect(() => {
        console.log(user);
    },[user])

    return (
        <NavigationContainer>
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
                        name='Credentials'
                        component={Credentials}
                        options={{
                            title: ''
                        }}
                    />

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
        </NavigationContainer>
        
    )
}

const ReduxApp  = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default ReduxApp
