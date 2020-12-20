import React, {useState, useEffect} from 'react';
import {View, Modal,Text, ScrollView, TouchableOpacity, TextInput, Button} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import moment from 'moment';

import {styles} from './styles';

//[COMPONENTS]
const Log = ({item, selection}) => {
    return (
        <TouchableOpacity 
            style={styles.log__container} 
            activeOpacity={0.5}
            onPress={() => selection(item)}
            >
            <View style={styles.log__top}>
                <Text style={styles.log__title} >{item.name}</Text>
                <Text style={styles.log__date}>{item.dateCreated}</Text>
            </View>
            <Text style={styles.log__total} >{`Total: ${item.total}`}</Text>
        </TouchableOpacity>
    );
};

const ModalButton = ({name, method}) => {
    return (
        <TouchableOpacity 
            style={styles.modalButtons}
            activeOpacity={0.7}
            onPress={() => method()}
            >
            <Text style={{color: '#fcf8ec'}}>{name}</Text>
        </TouchableOpacity>
    );
};

const ModalCreate = ({visible, method}) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
        >
            <View style={styles.modal__bd} >
                <View style={styles.modal__container}>
                    <Text style={styles.modal__title}>Create Log</Text>
                    <TextInput 
                        placeholder='Name'
                        style={styles.modal__input}
                    />
                    <View style={styles.modalButtons__container}>
                        <ModalButton name='Cancel' method={method}/>
                        <ModalButton name='Ok'/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const CreateIcon = ({create}) => {
    return (
        <TouchableOpacity 
            style={styles.createIcon__container}
            onPress={create} >
            <MaterialIcons name="create" size={50} color="#fcf8ec" />
        </TouchableOpacity>
    );
};

//[CONTAINERS]
const Home = ({navigation}) => {
    const [modalSt, setModalSt] = useState(false);
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

    const handleSelection = (logItem) => {
        navigation.navigate('LogPage', {item: logItem})
    };

    const handleCreate = () => {
        setModalSt(!modalSt);
    };

    return (
        <View style={styles.home}>
            {logs.map(log => (
                <Log 
                    item={log} 
                    key={log.id}
                    selection= {handleSelection} 
                    />
            ))}
            <CreateIcon create={handleCreate}/>
            <ModalCreate visible={modalSt} method={handleCreate} />
        </View>
    );
};

const LogPage = ({navigation, route}) => {
    return(
        <View>
            <Text>{route.params.item.name}</Text>
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
                <Stack.Screen 
                    name='LogPage'
                    component={LogPage}
                    options={{
                        title:''
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
