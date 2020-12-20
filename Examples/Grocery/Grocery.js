import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from './styles';

const Home = () => {
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
};

const App = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#456268'
                    },
                    headerTintColor: '#fcf8ec'
                }}
            >
                <Stack.Screen 
                    name='Home'
                    component={Home}
                    options={{title:'Home'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
