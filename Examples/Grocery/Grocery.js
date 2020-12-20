import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, TextInput, Button} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import moment from 'moment';

import {styles} from './styles';

//[COMPONENTS]
const Log = ({item}) => {
    return (
        <TouchableOpacity style={styles.log__container} activeOpacity={0.5}>
            <View style={styles.log__top}>
                <Text style={styles.log__title} >{item.name}</Text>
                <Text style={styles.log__date}>{item.dateCreated}</Text>
            </View>
            <Text style={styles.log__total} >{`Total: ${item.total}`}</Text>
        </TouchableOpacity>
    );
};

const CreateIcon = () => {
    return (
        <TouchableOpacity style={styles.createIcon__container}>
            <MaterialIcons name="create" size={50} color="#fcf8ec" />
        </TouchableOpacity>
    );
};

//[CONTAINERS]
const Home = ({navigation}) => {
    const [logs, setlogs] = useState([
        {
            id: 1,
            dateCreated: moment().format('LL'),
            name: 'Anniversary',
            items: [
                {name: 'Milk', qt: 1, price: 82},
                {name: 'Cereals', qt: 1, price: 232},
                {name: 'Chocolates', qt: 1, price: 478}
            ],
            total: 603.34
        },
        {
            id: 2,
            dateCreated: moment().format('LL'),
            name: 'School',
            items: [
                {name: 'Pencils', qt: 1, price: 82},
                {name: 'Bond Paper', qt: 1, price: 232},
                {name: 'Notebooks', qt: 1, price: 478}
            ],
            total: 810.32
        }
    ]);
    return (
        <View style={styles.home}>
            {logs.map(log => (
                <Log item={log} key={log.id} />
            ))}
            <CreateIcon />
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
                    options={{
                        title:'Home'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
