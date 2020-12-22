import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import {styles} from './styles';

const StartStop = ({method}) => {
    return (
        <TouchableOpacity style={styles.startStop} onPress={() =>method()}>
            <Text style={{fontWeight:'bold',
                color: '#d4e2d4',
                fontSize: 20}}>{'Start'}</Text>
        </TouchableOpacity>
    );
};

const NumberBtn = ({item}) => {
    const handleClicked = (num) => {
        console.log(num);
    }
    return (
        <TouchableOpacity 
            style={styles.numberBtn} 
            activeOpacity={0.7}
            onPress={() => handleClicked(item)}>
            <Text style={styles.numberBtn__title}>{item}</Text>
        </TouchableOpacity>
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

const Board =({items, level}) => {
    const [numberOfChips, setNumberOfChips] = useState(Array.from(Array(level+3).keys()).slice(1));
    useEffect(() => {
        console.log(numberOfChips);
        level<=14 && setNumberOfChips(Array.from(Array(level+3).keys()).slice(1));
    }, [level]);
    
    return (
        <View style={styles.board__container}>
            <Text style={styles.level}>{`Level: ${'15'}`}</Text>
            <View style={styles.board}>
                {items.map(it => (
                    <NumberBtn item={it} key={it}/>
                ))}
            </View>
        </View>
    );
};

const App = () => {
    const [chips, setChips] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    const [level, setLevel] = useState(1);

    const shuffleArray = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return [...array];
    };

    const handleStart = () => {
        let newArray = shuffleArray(chips);
        setChips(newArray);
        setLevel(level + 1);
    };

    // useEffect(() => {
    //     console.log(chips);
    // }, [chips]);

    return (
        <View style={styles.app}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.app__title}>MemApp</Text>
                <StartStop method={handleStart}/>
            </View>
            <Board items={chips} level={level}/>
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
