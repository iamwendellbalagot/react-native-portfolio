import React from 'react'
import { View, Text } from 'react-native'

import {styles} from './styles';

const App = () => {
    return (
        <View style={styles.app}>
            <Text style={styles.app__title}>MemApp</Text>
        </View>
    )
}

export default App
