import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Modal, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons'; 
import moment from 'moment';

import {styles} from './styles';
import { set } from 'react-native-reanimated';

const StartStop = ({method, start}) => {
    return (
        <TouchableOpacity style={styles.startStop} onPress={() =>method()}>
            <Text style={{fontWeight:'bold',
                color: '#d4e2d4',
                fontSize: 20}}>{start? 'Stop': 'Start'}</Text>
        </TouchableOpacity>
    );
};



const BottomIcons = ({type, method}) => {
    return (
        <TouchableOpacity style={styles.bottomIcons} onPress={method}>
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

const BestScore = ({visible, closeModal, bestScore}) => {
    const [bestTime, setBestTime] = useState(0);
    const [bestLevel, setBestLevel] = useState(1);

    useEffect(() => {
        if(bestScore){
            console.log(bestScore);
            let duration = moment.duration(bestScore.time);
            const formatTimer = (n) => n < 10 ? '0' +n : n;
            setBestTime(`${formatTimer(duration.minutes())}:${formatTimer(duration.seconds())}:${formatTimer(Math.floor(duration.milliseconds()/10))}`)
            setBestLevel(bestScore.level)
        };
    }, [visible])
    return (
        <View>
            <CreateModal visible={visible}>
                <View style={[styles.modal__failed, {borderRadius: 100}]}>
                    <Text style={styles.mf__title}>Best Score</Text>
                    <FontAwesome name="trophy" size={80} color="black" />
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical:10}}>
                        <Text style={styles.bestScore}>{`Level: ${bestLevel}`}</Text>
                        <Text style={styles.bestScore}>{`Total Time: ${bestTime} `}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.mf__btn}
                        onPress={closeModal}    
                    >
                        <Text style={{color: '#fcf8e8', fontWeight: 'bold'}}>Close</Text>
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

const Timer = ({start, setBestScore}) => {
    const [timer, setTimer] = useState('00:00:00');
    const [timeDummy, setTimeDummy] = useState(0);
    const [appTimer, setAppTimer] = useState(null);
    
    const formatTimer = (n) => n < 10 ? '0' +n : n; 
    useEffect(() => {
        if (start) {
            const timeNow = new Date().getTime();
            setAppTimer(setInterval(() =>{
                let timeElapsed = new Date().getTime() - timeNow;
                setTimeDummy(timeElapsed);
                let duration = moment.duration(timeElapsed);
                setTimer(`${formatTimer(duration.minutes())}:${formatTimer(duration.seconds())}:${formatTimer(Math.floor(duration.milliseconds()/10))}`)
            },100))
        }else{
            clearInterval(appTimer)
            if(timeDummy != 0){
                setBestScore(timeDummy);
                setTimeDummy(0);
            }
        }
    },[start]);
    return (
        <View >
            <Text style={styles.timer}>{timer}</Text>
        </View>
    );
};

const App = () => {
    const [chips, setChips] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    const [level, setLevel] = useState(6);
    const [start, setStart] = useState(false);
    const [modal, setModal] = useState(false);
    const [bestScore, setBestScore] = useState(null);
    

    const shuffleArray = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return [...array];
    };

    useEffect(() => {
        AsyncStorage.getItem('MemAppData')
        .then(res =>{
            res && setBestScore(JSON.parse(res));
        });

        return () => setLevel(1);
    },[start])

    const handleStart = () => {
        let newArray = shuffleArray(chips);
        setLevel(1);
        setChips(newArray);
        setStart(true);
    };

    const handleStop = () => {
        setStart(false);
        setChips([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
    };

    const handleBestScore = (time) => {
        AsyncStorage.getItem('MemAppData')
        .then(res => {
            !res && AsyncStorage.setItem('MemAppData',
                JSON.stringify({
                    time: time,
                    level: level
                })
            )

            if(res){
                let data = JSON.parse(res);
                console.log(time, level, ' level data');
                if((level=== data.level && time< data.time) || (level>data.level )){
                    AsyncStorage.setItem('MemAppData',
                        JSON.stringify({level: level, time: time})
                    ).then(_res => setBestScore({level: level, time: time}))
                }
            }
        })
    };

    useEffect(() => {
        let newArray = shuffleArray(chips);
        level> 1 && setChips(newArray);
    }, [level]);

    const handleModal = () => {
        setModal(!modal);
    };

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
            <Timer start={start} setBestScore={handleBestScore} />
            <View style={styles.bottomIcons__container}>
                <BottomIcons type={'google-play'}/>
                <BottomIcons type={'trophy-award'} method={handleModal} />
                <BottomIcons type={'crosshairs-question'}/>
            </View>

            <BestScore 
                visible={modal} 
                closeModal={handleModal} 
                bestScore={bestScore}
            />
               
        </View>
    )
}

export default App
