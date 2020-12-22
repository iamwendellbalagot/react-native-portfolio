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
        marginTop: 30,
        fontFamily: 'sans-serif-condensed'
    },
    startStop: {
        backgroundColor: '#df7861',
        width: 120,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    level: {
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    board__container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    board: {
        borderWidth: 2,
        borderColor: '#433d3c',
        backgroundColor: '#ccc',
        height: 400,
        flexWrap: 'wrap',
        width:'95%',
        borderRadius: 5,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    timer: {
        marginTop: 20,
        fontSize: 40,
        fontFamily: 'monospace',
        color: '#9dab86'
    },
    bottomIcons__container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginTop: 20
    },
    bottomIcons: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecb390'
    },
    numberBtn: {
        backgroundColor: '#433d3c',
        height: 63,
        width: 63,
        marginHorizontal: 12,
        marginVertical: 14,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberBtn__title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fcf8e8'
    }
});