import React, { useState } from 'react';
import {Text, TextInput, View, FlatList, ScrollView, Button} from 'react-native';
import { styles } from './styles';

const view = () => {
    const [input, setInput] = useState('');

    const data = [
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'},
    ]

    const buttonClicked = () => {
        console.log(input);
        setInput('');
    };
    return (
        <View style={styles.view}>
            <Text>
                Welcome to React Native APP
            </Text>
            <TextInput 
                placeholder='Your text here...'
                value={input}
                onChangeText={e => setInput(e)}
            />
            <Button onPress={buttonClicked} >Click</Button>
            {data.map(item => (
                <Text key={item.key} >
                    {item.key}
                </Text>
            ))}
        </View>
    )
}

export default view
