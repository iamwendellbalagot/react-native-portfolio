import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import {styles} from './styles';


const Timer =({time}) => {
    const timeDuration = moment.duration(time)
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
    const minRef = moment.duration(Math.min.apply(Math, laps))
    const maxRef = moment.duration(Math.max.apply(Math, laps))
    return (
        <View style={styles.metrics__container}>
            <Text style={styles.metrics__time}>
                {`Minimum:  ${minRef.minutes()}:${minRef.seconds()}:${Math.floor(minRef.minutes())}`}</Text>
            <Text style={styles.metrics__time}>
                {`Maximum:  ${maxRef.minutes()}:${maxRef.seconds()}:${Math.floor(maxRef.minutes())}`}</Text>
        </View>
    );
};

const ControlsContainer = ({children}) => {
    return (
        <View style={styles.controls__container}>{children}</View>
    );
};

const Button = ({type}) => {
    let btnStyles = {};
    switch(type){
        case 'Start':
            btnStyles = {cl: '#50D167', bg:'#1B361F'}
            break;
        case 'Stop':
            btnStyles = {cl: '#E33935', bg:'#3C1715'}
            break;
        default:
            btnStyles = {cl: '#FFFFFF', bg:'#3D3D3D'}
            break;
    }
    return(
        <TouchableOpacity
        activeOpacity={0.7} 
        style={[styles.button__container, 
        {backgroundColor: btnStyles.bg}]}>
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
            {`${formatTime(timeRef.minutes())}:${formatTime(timeRef.seconds())}:${formatTime(Math.floor(timeRef.minutes()))}`}</Text>
        </View>
    );
};

const App = () => {
    const [time, setTime] = useState(12321);
    const [laps, setLaps] = useState([123123,32233,223234])
    return (
        <View style={styles.app}>
            <Timer time={time} />
            <TimeToBeat laps = {laps}/>
            <ControlsContainer>
                <Button type='Lap' />
                <Button type='Start' />
            </ControlsContainer>
            <ScrollView style={{paddingHorizontal: 20,marginTop:20, width: '100%'}}>
                {laps.map((int, index) => (
                    <Laps interval={int} index={index} key={index}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default App;
