import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import moment from 'moment';

import {styles} from './styles';

const StartStop = ({method, start}) => {
    return (
        <TouchableOpacity style={styles.startStop} onPress={() =>method()}>
            <Text style={{fontWeight:'bold',
                color: '#d4e2d4',
                fontSize: 20}}>{start? 'Stop': 'Start'}</Text>
        </TouchableOpacity>
    );
};



const BottomIcons = ({type}) => {
    return (
        <TouchableOpacity style={styles.bottomIcons}>
            <MaterialCommunityIcons name={type} size={24} color="black" />
        </TouchableOpacity> 
    );
};

const CreateModal = ({visible, children}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            style={{backgroundColor: 'black'}}
        >
            <View style={styles.modal}>
                {children}
            </View>
        </Modal>
    );
};

const FailedResult = ({visible, closeModal}) => {
    return (
        <View>
            <CreateModal visible={visible}>
                <View style={styles.modal__failed}>
                    <Text style={styles.mf__title}>Oh snap, you failed.</Text>
                    <MaterialIcons name="mood-bad" size={120} color="black" />
                    <TouchableOpacity 
                        style={styles.mf__btn}
                        onPress={closeModal}    
                    >
                        <Text style={{color: '#fcf8e8', fontWeight: 'bold'}}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </CreateModal>
        </View>
    );
};

const NumberBtn = ({item, display, start, addItem, accu, failed}) => {
    const [chipColor, setChipColor] = useState('#70af85');

    return (
        <View style={styles.numberBtn_proxy}>
            <TouchableOpacity 
                style={[
                    styles.numberBtn, 
                    {display: !display && start ? 'none' : 'flex',
                        backgroundColor: start && accu.includes(item) ? chipColor : '#433d3c' ,
                        }]} 
                activeOpacity={0.7}
                disabled={!start || accu.includes(item)}
                onPress={() => addItem(item)}>
                <Text style={styles.numberBtn__title}>{accu.length ===0 || accu.includes(item) ? item : '' }</Text>
            </TouchableOpacity>
        </View>
        
    );
};

const Board =({items, level, setLevel, start, stop}) => {
    const [numberOfChips, setNumberOfChips] = useState(Array.from(Array(level+3).keys()).slice(1));
    const [accumulator, setAccumulator] = useState([]);
    const [failed, setFailed] = useState(false);
    const [modalFailed, setModalFailed] = useState(false)

    useEffect(() => {
        console.log(numberOfChips);
        level<=14 && setNumberOfChips(Array.from(Array(level+3).keys()).slice(1));
    }, [level]);

    useEffect(() => {
        if(accumulator.length != 0 && accumulator.length === numberOfChips.length ){
            setAccumulator([]);
            setLevel(level + 1);
        }
    },[accumulator])

    useEffect(() => {
        if(!start){
            setAccumulator([]);
            setFailed(false);
        }
    },[start])

    useEffect(() => {
        if(failed){
            stop();
            setModalFailed(true);
        }
    },[failed])

    const handleCloseModal = () => {
        setModalFailed(false)
    };

    const addItem = (item) => {
        if(accumulator.length === 0){
            if(item != 1){
                setFailed(true);
                return
            }else setAccumulator([...accumulator,item]);
        }else{
            console.log(accumulator.slice(-1)[0], ': Pops: ', item )
            if((item - accumulator.slice(-1)[0]) != 1 ){
                console.log(accumulator.slice(-1)[0], item);
                setAccumulator([...accumulator, item]);
                setFailed(true);
                setAccumulator([]);
                return
            }else setAccumulator([...accumulator, item]);
        }
        
    };
    
    return (
        <View style={styles.board__container}>
            <Text style={styles.level}>{`Level: ${level}`}</Text>
            <View style={styles.board}>
                {items.map(it => (
                    <NumberBtn 
                        item={it} 
                        key={it}
                        start = {start}
                        addItem= {addItem}
                        accu = {accumulator}
                        display={numberOfChips.includes(it)}    
                    />
                ))}
            </View>
            <FailedResult visible={modalFailed} closeModal={handleCloseModal}/>
        </View>
    );
};

const Timer = ({start}) => {
    const [timer, setTimer] = useState('00:00:00');
    const [appTimer, setAppTimer] = useState(null);

    const formatTimer = (n) => n < 10 ? '0' +n : n; 
    useEffect(() => {
        if (start) {
            const timeNow = new Date().getTime();
            setAppTimer(setInterval(() =>{
                let timeElapsed = new Date().getTime() - timeNow;
                let duration = moment.duration(timeElapsed);
                setTimer(`${formatTimer(duration.minutes())}:${formatTimer(duration.seconds())}:${formatTimer(Math.floor(duration.milliseconds()/10))}`)
            },100))
        }else clearInterval(appTimer)
    },[start]);
    return (
        <View >
            <Text style={styles.timer}>{timer}</Text>
        </View>
    );
};

const App = () => {
    const [chips, setChips] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    const [level, setLevel] = useState(1);
    const [start, setStart] = useState(false);
    

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
        setStart(true);
    };

    const handleStop = () => {
        setStart(false);
        setLevel(1);
        setChips([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    };

    useEffect(() => {
        let newArray = shuffleArray(chips);
        level> 1 && setChips(newArray);
    }, [level]);

    return (
        <View style={styles.app}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.app__title}>MemApp</Text>
                <StartStop method={start? handleStop: handleStart} start={start}/>
            </View>
            <Board 
                items={chips} 
                level={level} 
                setLevel={setLevel}
                start={start} 
                stop={handleStop}/>
            <Timer start={start} />
            <View style={styles.bottomIcons__container}>
                <BottomIcons type={'google-play'}/>
                <BottomIcons type={'trophy-award'}/>
                <BottomIcons type={'crosshairs-question'}/>
            </View>
        </View>
    )
}

export default App
