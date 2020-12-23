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
    }
})
