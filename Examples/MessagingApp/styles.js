import { StyleSheet } from 'react-native'

const colors = {
    light: '#f1f6f9',
    darkblue: '#14274e',
    lightgray: '#9ba4b4',
    darkgray: '#394867'
}

export const s = StyleSheet.create({
    app: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.light
    },
    search: {
        flexDirection: 'row',
        width: '95%',
        height: 50,
        marginTop: 10,
        borderRadius: 5,
        borderColor: colors.darkgray,
        borderWidth:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search__input: {
        flex: 0.9
    },
    contactTile: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        paddingHorizontal: '2.5%'
    },
    tile__title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        // borderWidth: 1,
        // borderColor: 'black',
    },
    tile__name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    tile__mess: {
        fontSize: 16
    },
    startChat: {
        position: 'absolute',
        flexDirection: 'row',
        right: 20,
        bottom: 40,
        backgroundColor: colors.darkblue,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startChat__text: {
        marginLeft: 7,
        color: colors.light,
        fontSize: 17,
        marginBottom: 5
    },
    messages: {
        height: '100%',
        backgroundColor: colors.light,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column'
    },
    chat__header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.light,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth:0,
        elevation: 3,
        shadowColor: colors.darkgray,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    chat__header__text: {
        color: colors.lightgray,
        marginRight: 10,
        flex: 0.15
    },
    // chat__header__input:{
    //     flex: 0.85,
    // },
    chat__messagesCont: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10
    },
    message__inputCont: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message1: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 0.2
    },
    message2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
        flex: 0.8,
        borderWidth: 1,
        borderColor: colors.darkblue,
        borderRadius: 50,
    },
    messageBox__reciever: {
        backgroundColor: '#fff',
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        maxWidth: '60%',
        borderRadius: 10,
        alignSelf: 'flex-start'
    },
    messageBox__you: {
        backgroundColor: '#d0e8f2',
        marginTop: 10,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        maxWidth: '60%',
        borderRadius: 10,
        alignSelf: 'flex-end'
    },
    credentials__cont: {
        height: '100%',
        width: '100%'
    },
    credentials__bd: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 500,
        position: 'absolute',
        alignItems: 'center'
    },
    credentials__bg: {
        height: '100%',
        width: null
    },
    credentials__header: {
        color: '#f1f6f9',
        fontWeight: 'bold',
        fontSize: 35
    },
    credentials__register: {
        color: colors.light,
        fontSize: 17
    },  
    formLogin: {
        height: 250,
        width: 350,
        backgroundColor: '#f1f6f9',
        zIndex: 1000,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    // formLogin__label: {
    //     marginHorizontal: 10
    // },  
    formLogin__input: {
        marginHorizontal: 0,
        paddingHorizontal: 10,
    },

})
