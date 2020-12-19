import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { auth } from './firebase';

import {styles} from './styles';


const Home =  () => {

    const user = auth.currentUser;
    const [username, setUsername] = useState(user.displayName? user.displayName : '');
    user.reload()
    .then(res => {setUsername(user.displayName)})
    
    const handleLogout = () =>{
        auth.signOut();
        console.log('Signed OUT');
    }
    return (
        <View style={styles.login}>
            <Text>{username}</Text>
            <Text style={styles.login__header}>Welcome</Text>
            <View style={styles.home}>
                <Button
                    title='Logout' 
                    color='black'
                    onPress={handleLogout}
                />
            </View>
        </View>
        
    );
}

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = () => {
        console.log('Email: ', email, '\n', 'Pass: ', pass)
        auth.signInWithEmailAndPassword(email, pass)
        .catch(err => {setError(err.code); console.log(err.code)})
    };

    return (
        <View style={styles.login}>
            <Text style={styles.login__header}>Simple Login</Text>
            <View style={styles.form}>
                <View>
                    <Text>Email:</Text>
                    <TextInput 
                        style={error === 'auth/user-not-found'? styles.form__input__err: styles.form__input}
                        value={email}
                        onChangeText={e => setEmail(e)}
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput 
                        style={error === 'auth/wrong-password'? styles.form__input__err: styles.form__input}
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={e => setPass(e)}
                    />
                </View>
                <View style={styles.form__button}>
                    <Button
                        title='Login'
                        color='black'
                        onPress={handleLogin}
                    />
                </View>
                <View style={styles.form__button}>
                    <Button
                        title='Sign Up'
                        color='steelblue'
                        onPress={() => navigation.navigate('Signup')}
                    />
                </View>
            </View>
        </View>
    )
}

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('');
    const [btnSt, setBtnSt] = useState(true);
    useEffect(() => {
        return (email && pass && username ? setBtnSt(false): setBtnSt(true))
    }, [email, pass, username])

    const handleRegister = () => {
        console.log(email, username, pass);
        auth.createUserWithEmailAndPassword(email, pass)
        .then(res => {
            res.user.updateProfile({
                displayName: username
            }).then(_res => console.log('Display Name ADDED'))
        })
        .catch(err => console.log(err))
    };
    return(
        <View style={styles.login}>
            <Text style={styles.login__header}>Sign Up</Text>
            <View style={styles.form}>
                <TextInput
                    placeholder='Username'
                    style={styles.form__input_reg}
                    onChangeText={e => setUsername(e)}
                    value={username}
                />
                <TextInput
                    placeholder='Email'
                    style={styles.form__input_reg}
                    onChangeText={e => setEmail(e)}
                    value={email}
                />
                <TextInput
                    placeholder='Password'
                    style={styles.form__input_reg}
                    secureTextEntry={true}
                    onChangeText={e => setPass(e)}
                    value={pass}
                />
                <View style={styles.form__button}>
                    <Button
                        title='Register'
                        color='steelblue'
                        onPress={handleRegister}
                        disabled={btnSt}
                    />
                </View>
            </View>
            
        </View>
    );
}

const Stack = createStackNavigator();

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(()=> {
        let mounted = true;
        auth.onAuthStateChanged(userAuth => {
           userAuth && setUser(userAuth);
           !userAuth && setUser(null);
        });
        return () => mounted = false;
    }, []);

    return(
        <NavigationContainer>
        {user? <Home username = {user? user.displayName: ''}/> : 

            <Stack.Navigator >
                <Stack.Screen 
                    name='Login'
                    component={Login}
                    options={{title: ''}}
                />
                <Stack.Screen 
                    name='Signup'
                    component={SignUp}
                    options={{title: ''}}
                />
            </Stack.Navigator>}
        </NavigationContainer>
    );
}

export default App;
