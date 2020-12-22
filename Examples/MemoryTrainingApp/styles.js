import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    app: {
        height: '100%',
        backgroundColor: '#d4e2d4',
        alignItems: 'center',
    },
    app__title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#433d3c',
        paddingVertical: 20,
        marginTop: 30
    },
    startStop: {
        backgroundColor: '#df7861',
        width: 120,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    board: {
        borderWidth: 2,
        borderColor: '#433d3c',
        height: 400,
        width:'95%',
        marginTop: 40,
        borderRadius: 5
    }
});