import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    home: {
        height: '100%',
        backgroundColor: '#fcf8ec'
    },
    log__container: {
        width: '100%',
        borderColor: '#79a3b1',
        borderBottomWidth: 1,
        paddingVertical:5,
        paddingHorizontal: 10
    },
    log__top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    log__title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    log__total: {
        color: 'gray',
        fontWeight: 'bold'
    },
    log__date: {
        fontSize: 12
    },
    createIcon__container: {
        height: 70,
        width: 70,
        borderRadius: 40,
        backgroundColor: '#456268',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 50
    }
});