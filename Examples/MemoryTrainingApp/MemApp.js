import React from 'react'
import { View, Text } from 'react-native'

import {styles} from './styles';

const Board =() => {
    return (
        <View style={styles.board}>
        </View>
    );
}

const App = () => {
    return (
        <View style={styles.app}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.app__title}>MemApp</Text>
                <View style={styles.startStop}>
                    <Text style={{fontWeight:'bold',
                        color: '#d4e2d4',
                        fontSize: 20}}>{'Start'}</Text>
                </View>
            </View>
            <Board />
        </View>
    )
}

export default App
