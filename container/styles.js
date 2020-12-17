import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    view: {
        backgroundColor: 'steelblue',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        padding: 5,
        backgroundColor: '#ccc',
        color: 'black',
        margin: 5
    },
    list: {
        padding: 10,
        backgroundColor: '#ccc',
        width: '80%',
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 10
    }
})