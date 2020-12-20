import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    app: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    timer__container: {
        marginTop: 100,
        borderColor: 'white',
        borderWidth: 2,
        height: 300,
        width: 300,
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timer: {
        color: '#ccc',
        fontWeight: '200',
        fontSize: 60
    },

    metrics__container:{
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    metrics__time: {
        color: '#ccc',

    },
    controls__container: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    button__container: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button__ring: {
        height: 74,
        width: 74,
        borderRadius: 37,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button__label: {
        fontSize: 15,
        fontWeight: '400'
    },
    laps: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopColor: '#151515',
        borderWidth: 2,
        paddingVertical: 10
    },
    laps__text: {
        color: 'white'
    }
});