import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, Button} from 'react-native';

import {styles} from './styles';

const Login = () => {
    return (
        <View style={styles.login}>
            <Text style={styles.login__header}>Simple Login</Text>
            <View style={styles.form}>
                <View>
                    <Text>Email:</Text>
                    <TextInput 
                        style={styles.form__input}
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput 
                        style={styles.form__input}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.form__button}>
                    <Button
                        title='Login'
                        color='black'
                    />
                </View>
            </View>
        </View>
    )
}

export default Login;
