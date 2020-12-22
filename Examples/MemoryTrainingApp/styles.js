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
    numberBtn_proxy: {
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
    },
    modal__failed: {
        height: 230,
        width: '80%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf8e8',
        borderRadius: 10,
        borderColor: 'salmon',
        borderWidth: 2
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    mf__title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'salmon'
    },
    mf__btn: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: '#70af85',
        borderRadius: 10
    },
    bestScore: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#433d3c'
    }
});