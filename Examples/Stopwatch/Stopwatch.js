import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import {styles} from './styles';


const Timer =({time}) => {
    const timeDuration = moment.duration(time);
    const formatTime =(n) => n < 10 ? '0'+n : n;
    const minutes = formatTime(timeDuration.minutes());
    const seconds = formatTime(timeDuration.seconds());
    const miliSec = formatTime(Math.floor(timeDuration.milliseconds()/10));
    return (
        <View style={styles.timer__container}>
            <Text 
                style={styles.timer}>
            {`${minutes}:${seconds}:${miliSec}`}
            </Text>
        </View>
    );
};

const TimeToBeat = ({laps}) => {
    const formatTime =(n) => n < 10 ? '0'+n : n;
    const minRef = moment.duration(laps.length === 0? 0 : Math.min.apply(Math, laps))
    const maxRef = moment.duration(laps.length === 0? 0 : Math.max.apply(Math, laps))
    return (
        <View style={styles.metrics__container}>
            <Text style={styles.metrics__time}>
                {`Minimum:  ${formatTime(minRef.minutes())}:${formatTime(minRef.seconds())}:${formatTime(Math.floor(minRef.milliseconds()/10))}`}</Text>
            <Text style={styles.metrics__time}>
                {`Maximum:  ${formatTime(maxRef.minutes())}:${formatTime(maxRef.seconds())}:${formatTime(Math.floor(maxRef.milliseconds()/10))}`}</Text>
        </View>
    );
};

const ControlsContainer = ({children}) => {
    return (
        <View style={styles.controls__container}>{children}</View>
    );
};

const Button = ({type, method, time}) => {
    let btnStyles = {};
    let disabled = time === 0 ? true : false;

    switch(type){
        case 'Start':
            btnStyles = {cl: '#50D167', bg:'#1B361F'}
            break;
        case 'Resume':
            btnStyles = {cl: '#50D167', bg:'#1B361F'}
            break;
        case 'Stop':
            btnStyles = {cl: '#E33935', bg:'#3C1715'}
            break;
        case 'Reset':
            btnStyles = {cl: '#FFFFFF', bg:'#3D3D3D', disabled: time === 0 ? true : false}
            break;
        default:
            btnStyles = {cl: '#FFFFFF', bg:'#3D3D3D'}
            break;
    }
    return(
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => method()}
            disabled={btnStyles.disabled}
            style={[styles.button__container, 
            {backgroundColor: btnStyles.bg, opacity: btnStyles.disabled? 0.5 : 1}]}>
            <View style={styles.button__ring}>
                <Text style={[styles.button__label,{color: btnStyles.cl}]} >{type}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Laps = ({interval, index}) => {
    const timeRef = moment.duration(interval);
    const formatTime = (n) => n<10 ? '0'+n : n; 
    return (
        <View style={styles.laps}>
            <Text style={styles.laps__text}>{`Lap ${index}`}</Text>
            <Text style={styles.laps__text}>
            {`${formatTime(timeRef.minutes())}:${formatTime(timeRef.seconds())}:${formatTime(Math.floor(timeRef.milliseconds() / 10))}`}</Text>
        </View>
    );
};

//[Main Container]
const App = () => {
    const [time, setTime] = useState(0);
    const [resumeRef, setResumeRef] = useState(0);
    const [timerStatus,setTimerStatus] = useState(false);
    const [appInterval, setAppInterval] = useState(0);
    const [start, setStart] = useState(0);
    //const [timeElapsed, setTimeElapsed] = useState(0);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        //[Cleanup Timer when unmounting]
        return () => clearInterval(appInterval);
    },[]);

    const startTimer = () => {
        setTimerStatus(true);
        const timeNow = new Date().getTime();
        setStart(timeNow);
        setAppInterval(setInterval(() => {
            let timeElapsed = new Date().getTime() - timeNow;
            //setTimeElapsed(timeElapsed);
            setTime(timeElapsed + resumeRef);
        }, 100));
    }

    const stopTimer = () => {
        clearInterval(appInterval);
        let newLaps = [time, ...laps];
        const formatLap = (total, num) => {
            return total - num
        }
        setLaps([newLaps.reduce(formatLap), ...laps])
        setTimerStatus(false);
        setResumeRef(time);
    };

    const addLap = () => {
        let newLaps = [time, ...laps];
        const formatLap = (total, num) => {
            return total - num
        }
        setLaps([newLaps.reduce(formatLap), ...laps])
    }

    const resetTimer = () => {
        setTime(0);
        setLaps([]);
        setStart(0);
        setResumeRef(0);
    };

    return (
        <View style={styles.app}>
            <Timer time={time} />
            <TimeToBeat laps = {laps}/>
            {!timerStatus?<ControlsContainer>
                <Button type='Reset' method={resetTimer} time={time} />
                {start===0?<Button type='Start' method={startTimer}/>
                :<Button type='Resume' method={startTimer} />}
            </ControlsContainer>
            :<ControlsContainer>
                <Button type='Lap' method={addLap}/>
                <Button type='Stop' method={stopTimer}/>
            </ControlsContainer>}
            <ScrollView style={{paddingHorizontal: 20,marginTop:20, width: '100%'}}>
                {laps.map((int, index) => (
                    <Laps interval={int} index={laps.length - index} key={index}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default App;
