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

const ModalButton = ({name, method, input}) => {
    return (
        <TouchableOpacity 
            style={styles.modalButtons}
            activeOpacity={0.7}
            onPress={() => method(name==='Ok'? input: null)}
            >
            <Text style={{color: '#fcf8ec'}}>{name}</Text>
        </TouchableOpacity>
    );
};

const ModalCreate = ({visible, children}) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
        >
            <View style={styles.modal__bd}>
                {children}
            </View>
        </Modal>
    );
};

const LogCreate = ({method, createLog}) => {
    const [input, setInput] = useState('');
    // useEffect(() => {
    //     return () => setInput('');
    // },[visible])
    return (
        <View style={styles.modal__container}>
            <Text style={styles.modal__title}>Create Log</Text>
            <TextInput 
                placeholder='Name'
                value={input}
                onChangeText={e =>setInput(e)}
                style={styles.modal__input}
            />
            <View style={styles.modalButtons__container}>
                <ModalButton name='Cancel' method={method}/>
                <ModalButton 
                    name='Ok'
                    method={createLog}
                    input={input}
                />
            </View>
        </View>
    );
}

const ItemAdd = ({cancel, addItem}) => {
    return (
        <View style={[styles.modal__container, {height: 250}]}>
            <Text style={styles.modal__title}>Add Item</Text>
            <TextInput 
                placeholder='Item Name'
                style={styles.modal__input}
            />
            <TextInput 
                placeholder='Quantity'
                style={styles.modal__input}
            />
            <TextInput 
                placeholder='Price'
                style={styles.modal__input}
            />
            <View style={styles.modalButtons__container}>
                <ModalButton 
                    name='Cancel'
                    method={cancel}
                />
                <ModalButton 
                    name='Add'
                />
            </View>
        </View>
    );
};

const CreateIcon = ({enableModal}) => {
    return (
        <TouchableOpacity 
            style={styles.createIcon__container}
            onPress={enableModal} >
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
                {name: 'Milk', qt: 1, price: 82.23},
                {name: 'Cereals', qt: 1, price: 123.54},
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
                {name: 'Bond Paper', qt: 1, price: 232.212},
                {name: 'Notebooks', qt: 1, price: 478.11},
                {name: 'Books', qt: 1, price: 2178.11}
            ],
            total: 810.32
        }
    ]);

    const handleSelection = (logItem) => {
        navigation.navigate('LogPage', {item: logItem});
    };

    const handleTriggerModal = () => {
        setModalSt(!modalSt);
    };

    const handleCreate = (logName) => {
        if(!logName) return;
        console.log(logName);
        setModalSt(!modalSt)
        let newData = {
            id: moment().format(),
            dateCreated: moment().format('LL'),
            name: logName,
            items: [],
            total: 0.0
        }

        setlogs([newData, ...logs]);
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
            <CreateIcon enableModal={handleTriggerModal}/>
            <ModalCreate visible={modalSt}>
                <LogCreate 
                method={handleTriggerModal}
                createLog={handleCreate}/>
            </ModalCreate>
        </View>
    );
};


const Items =({item}) => {
    return (
        <View style={styles.items}>
            <Text style={styles.item__name}>{`${item.name} x${item.qt}`}</Text>
            <Text>{item.price}</Text>
        </View>
    );
};

const LogPage = ({navigation, route}) => {
    const [items, setItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [modalSt, setModalSt] = useState(false);

    useEffect(() => {
        setItems(route.params.item.items)
    },[]);

    useEffect(() => {
        let priceAccu = 0;
        items && items.forEach(item => {
            priceAccu = priceAccu + item.price;
        });
        setTotalPrice(priceAccu.toFixed(2));
    },[items])

    useEffect(() => {
        navigation.setOptions({title: route.params.item.name})
    }, []);

    const handleTriggerModal = () => {
        setModalSt(!modalSt);
    };

    return(
        <View style={styles.logPage}>
            <View style={styles.total__container}>
                <Text style={styles.total__price}>{totalPrice}</Text>
                <Text>Total Price</Text>
            </View>
            {route.params.item.items.map(item => (
                <Items item={item} key={item.name + item.price} />
            ))}
            <CreateIcon enableModal={handleTriggerModal}/>
            <ModalCreate visible={modalSt}>
                <ItemAdd cancel={handleTriggerModal}/>
            </ModalCreate>
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
