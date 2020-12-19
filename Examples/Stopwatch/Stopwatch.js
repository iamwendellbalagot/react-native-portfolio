import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {styles} from './styles';


const Timer =({time}) => {
    return (
        <View style={styles.timer__container}>
            <Text style={styles.timer}>{time}</Text>
        </View>
    );
};

const App = () => {
    const [time, setTime] = useState(32472);
    
    return (
        <View style={styles.app}>
            <Timer time={time} />
        </View>
    )
}

export default App;
