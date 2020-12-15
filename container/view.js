import React, { useState } from 'react';
import {Text, TextInput, View, FlatList, ScrollView, Button} from 'react-native';
import { styles } from './styles';

const view = () => {
    const [input, setInput] = useState('');
    const [names, setNames] = useState(['Study Computers']);
    

    const buttonClicked = () => {
        setNames([...names, input]);
        setInput('');
    };
    return (
        <View style={styles.view}>
            <Text>
                Todo List APP
            </Text>
            <View style={styles.form}>
                <TextInput 
                    placeholder='Your text here...'
                    value={input}
                    onChangeText={e => setInput(e)}
                    style={styles.input}
                />
                <Button 
                    onPress={buttonClicked} 
                    title='Add'
                    accessibilityLabel="Learn more about this purple button"    
                />
            </View>
            
            {names.map(name => (
                <Text 
                    style={styles.list}
                    key={name} >{name}</Text>
            ))}
        </View>
    )
}

export default view
