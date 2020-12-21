import React, {useState, useEffect} from 'react';
import {View, Modal,Text, LogBox,Alert, AsyncStorage,ScrollView, TouchableOpacity, TextInput, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import {SwipeListView} from 'react-native-swipe-list-view';
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

const ModalButton = ({name, method, input, status}) => {
    return (
        <TouchableOpacity 
            style={[styles.modalButtons, status && {backgroundColor: 'gray'}]}
            activeOpacity={0.7}
            onPress={() => method(input)}
            disabled={status}
            >
            <Text style={{color: '#fcf8ec'}}>{name}</Text>
        </TouchableOpacity>
    );
};

const ModalCreate = ({visible, children}) => {
    return (
        <Modal
            animationType='none'
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
};

const Items =({item}) => {
    return (
        <TouchableOpacity style={styles.items} activeOpacity={0.7}>
            <Text style={styles.item__name}>{`${item.name} x${item.qt}`}</Text>
            <Text style={styles.item__price}>{`${Number(item.price) * Number(item.qt)}`}</Text>
        </TouchableOpacity>
    );
};

const ItemAdd = ({cancel, addItem}) => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [btnSt, setBtnSt] = useState(true);

    useEffect(() => {
        if(itemName && price && quantity) setBtnSt(false); else setBtnSt(true); 
    },[itemName, quantity, price]);

    const  generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    };

    return (
        <View style={[styles.modal__container, {height: 250}]}>
            <Text style={styles.modal__title}>Add Item</Text>
            <TextInput 
                placeholder='Item Name'
                style={styles.modal__input}
                value={itemName}
                maxLength={15}
                onChangeText={e => setItemName(e)}
            />
            <TextInput 
                placeholder='Quantity'
                style={styles.modal__input}
                keyboardType='numeric'
                value={String(quantity)}
                maxLength={4}
                onChangeText={e => setQuantity(e)}
            />
            <TextInput 
                placeholder='Price'
                keyboardType='numeric'
                style={styles.modal__input}
                value={String(price)}
                maxLength={8}
                onChangeText={e => setPrice(e)}
            />
            <View style={styles.modalButtons__container}>
                <ModalButton 
                    name='Cancel'
                    method={cancel}
                />
                <ModalButton 
                    name='Add'
                    status = {btnSt}
                    method={addItem}
                    input={{name: itemName, qt: quantity, price:price, id: generateUUID()}}
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
    const [logs, setlogs] = useState([]);

    const updateLogs = () => {
        AsyncStorage.getAllKeys()
            .then(keys => {
                console.log(keys);
                let logsAccu = []
                keys.forEach(key => {
                    AsyncStorage.getItem(key)
                        .then(item => {
                            logsAccu = [JSON.parse(item), ...logsAccu]
                            setlogs(logsAccu);
                        })
                });
                console.log('Logs ACCU: ',logsAccu);
            })
    }

    const handleSelection = (logItem) => {
        navigation.navigate('LogPage', {item: logItem, updateLogs: updateLogs});
    };

    const handleTriggerModal = () => {
        setModalSt(!modalSt);
    };

    useEffect(() => {
        updateLogs();
    },[]);

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
        };
        AsyncStorage.setItem(
            String(newData.id),
            JSON.stringify(newData) 
        );

        setlogs([newData, ...logs]);
    };

    

    const handleAlert = (logItem) => {
        const deleteLog = () => {
            AsyncStorage.removeItem(logItem.id)
            .then(res => {
                console.log('Deleted an item ', logItem.name);
                updateLogs();
            })
        };

        Alert.alert(
            'Delete',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancelled'),
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => deleteLog()
                }
            ]
        )
    }

    return (
        <View style={styles.home}>
            <SwipeListView 
                data={logs}
                renderItem={data => (
                    <ScrollView>
                    <View style={styles.rowFront}>
                        <Log 
                            item={data.item} 
                            key={data.item.id}
                            selection= {handleSelection} 
                        />
                    </View>
                    </ScrollView>
                )}
                renderHiddenItem={data => (
                    <TouchableOpacity 
                        onPress={() => handleAlert(data.item)} 
                        style={styles.rowBack} >
                        <MaterialIcons name="delete" size={24} color="black" />
                        <MaterialIcons name="delete" size={24} color="black" />
                    </TouchableOpacity>
                )}
                useFlatList
                closeOnRowPress
                closeOnScroll
                closeOnRowBeginSwipe
                disableRightSwipe
                previewOpenDelay={3000}
                friction={1000}
                tension={40}
                leftOpenValue={55}
                rightOpenValue={-55}
            />
            <CreateIcon enableModal={handleTriggerModal}/>
            <ModalCreate visible={modalSt}>
                <LogCreate 
                method={handleTriggerModal}
                createLog={handleCreate}/>
            </ModalCreate>
        </View>
    );
};

const LogPage = ({navigation, route}) => {
    const [items, setItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [modalSt, setModalSt] = useState(false);

    useEffect(() => {
        setItems(route.params.item.items);
        console.log(new Date().getTime())
    },[]);

    const counter = (arrayItems) => {
        let priceAccu = 0;
        arrayItems && arrayItems.forEach(item => {
            priceAccu = priceAccu + (Number(item.price) * Number(item.qt));
        });
        return priceAccu.toFixed(2);
    };

    useEffect(() => {
        let priceAccu = 0;
        items && items.forEach(item => {
            priceAccu = priceAccu + (Number(item.price) * Number(item.qt));
        });
        setTotalPrice(counter(items));
    },[items])

    useEffect(() => {
        navigation.setOptions({title: route.params.item.name})
    }, []);

    const handleTriggerModal = () => {
        setModalSt(!modalSt);
    };

    const handleItemAdd = (item) => {
        console.log('Adding...', item)
        setItems([item, ...items])
        let newData = Object.assign(route.params.item);
        newData.items = [item, ...items];
        newData.total = counter(newData.items)
        handleTriggerModal();
        AsyncStorage.setItem(
            route.params.item.id,
            JSON.stringify(newData)
        ).then(res => route.params.updateLogs());
        
    };

    const handleDeleteItem = (logItem, index) => {
        const deleteItemOnStorage = () => {
            let newData = Object.assign(route.params.item);
            newData.items.splice(logItem.index, 1)
            newData.total = String(counter(newData.items))
            setItems([newData.items]);
            AsyncStorage.setItem(route.params.item.id, JSON.stringify(newData))
            .then(res => {
                route.params.updateLogs();
                setItems(route.params.item.items);
            });
        }
        
        Alert.alert(
            'Delete',
            'Are you sure you want to detete this item?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancelled'),
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => deleteItemOnStorage()
                }
            ]
        );
    };

    return(
        <View style={styles.logPage}>
            <View style={styles.total__container}>
                <Text style={styles.total__price}>{totalPrice}</Text>
                <Text>Total Price</Text>
            </View>
            <SwipeListView 
                data={items}
                renderItem={data => (
                    <ScrollView>
                        <View style={[styles.rowFront, {borderBottomWidth: 0, height: 50, backgroundColor: '#ccc'}]}>
                            <Items 
                                item={data.item} />
                        </View>
                    </ScrollView>
                )}
                keyExtractor= {data => data.id}
                renderHiddenItem={(data, mapRow) => (
                    <TouchableOpacity
                        onPress={() => handleDeleteItem(data, mapRow)}
                        style={styles.rowBack} >
                        <MaterialIcons name="delete" size={24} color="black" />
                        <MaterialIcons name="delete" size={24} color="black" />
                    </TouchableOpacity>
                )}
                useFlatList
                closeOnRowPress
                closeOnScroll
                closeOnRowBeginSwipe
                disableRightSwipe
                previewOpenDelay={3000}
                friction={1000}
                tension={40}
                leftOpenValue={55}
                rightOpenValue={-55}
            />
            <CreateIcon enableModal={handleTriggerModal}/>
            <ModalCreate visible={modalSt}>
                <ItemAdd 
                    cancel={handleTriggerModal} 
                    addItem={handleItemAdd}/>
            </ModalCreate>
        </View>
    );
};

const App = () => {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
        'Failed child context type: Invalid child context'
    ]);
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
