import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    view: {
        backgroundColor: 'steelblue',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        padding: '5px',
        backgroundColor: '#ccc',
        color: 'black',
        border: '1px solid black',
        margin: '5px'
    },
    list: {
        padding: '10px',
        backgroundColor: '#ccc',
        width: '80%',
        borderRadius: '10px',
        textAlign: 'center',
        marginTop: '10px'
    }
})