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
        paddingHorizontal: 15
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
    },
    modal__bd: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal__container: {
        height: 150,
        width: '75%',
        backgroundColor: '#fcf8ec',
        borderWidth: 1,
        borderColor: '#456268',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal__title: {
        fontSize: 25,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: '#456268'
    },
    modal__input: {
        borderColor: '#456268',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        width: '90%',
        marginTop: 10,
        borderRadius: 5,
        textAlign: 'center'
    },
    modalButtons__container: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    modalButtons: {
        backgroundColor: '#79a3b1',
        borderColor: '#456268',
        borderWidth: 1,
        width: 80,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logPage: {
        height: '100%',
        backgroundColor: '#fcf8ec'
    },
    total__container: {
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#456268',
        borderBottomWidth: 2
    },
    total__price: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    items: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderColor: '#456268',
        borderBottomWidth: 2
    },
    item__name: {
        color: '#456268',
        fontSize: 18,
        fontWeight: 'bold'
        
    },
    item__price: {
        color: 'black',
        fontSize: 18
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'salmon',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fcf8ec',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
});