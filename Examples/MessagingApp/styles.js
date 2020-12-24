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
        justifyContent: 'center',
        alignItems: 'center'
    }
})
