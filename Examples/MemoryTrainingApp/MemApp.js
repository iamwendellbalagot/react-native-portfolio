import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import {styles} from './styles';

const StartStop = () => {
    return (
        <TouchableOpacity style={styles.startStop}>
            <Text style={{fontWeight:'bold',
                color: '#d4e2d4',
                fontSize: 20}}>{'Start'}</Text>
        </TouchableOpacity>
    );
};

const Board =() => {
    return (
        <View style={styles.board__container}>
            <Text style={styles.level}>{`Level: ${'15'}`}</Text>
            <View style={styles.board}>

            </View>
        </View>
    );
};

const Timer = () => {
    return (
        <View >
            <Text style={styles.timer}>{'00:00'}</Text>
        </View>
    );
};

const BottomIcons = ({type}) => {
    return (
        <TouchableOpacity style={styles.bottomIcons}>
            <MaterialCommunityIcons name={type} size={24} color="black" />
        </TouchableOpacity> 
    );
}

const App = () => {
    return (
        <View style={styles.app}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.app__title}>MemApp</Text>
                <StartStop />
            </View>
            <Board />
            <Timer />
            <View style={styles.bottomIcons__container}>
                <BottomIcons type={'google-play'}/>
                <BottomIcons type={'trophy-award'}/>
                <BottomIcons type={'crosshairs-question'}/>
            </View>
        </View>
    )
}

export default App
