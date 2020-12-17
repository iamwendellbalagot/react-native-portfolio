import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { styles } from './styles';
import { data } from './data';

const Showdetail =({navigation, route}) => {
    return (
        <View>
            <Text style={styles.heading}>
                {route.params.item.title}
            </Text>
            <Text style={styles.desc} >
                {route.params.item.desc}
            </Text>
        </View>
    );
}

const Home = ({navigation}) => {

    return (
        <View style={styles.home}>
            {data.map(item => (
                <Text
                    key={item.id}
                    style={styles.items}
                    onPress={() => navigation.navigate('Details', {item: item})}
                >{item.title}</Text>
            ))}
        </View>
    );
}

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <View style={styles.view} >
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name='Home'
                        component={Home}
                        options={{
                            title: 'Home',
                            headerStyle: {
                                backgroundColor: 'steelblue'
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: "#fff"            
                            }
                        }}
                    />
                    <Stack.Screen 
                        name='Details'
                        component={Showdetail}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default Navigation
