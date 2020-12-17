import { Dimensions, StyleSheet } from 'react-native';

const SCH = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    view: {
        backgroundColor: '#ccc',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    home: {
        height: '100%',
        alignItems: 'flex-start'
    },
    items: {
        padding: 3,
        fontSize: 19,
        fontWeight: 'bold',
        borderColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
        paddingVertical: 5
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 5
    },
    desc:{
        padding: 5,
        fontSize: 18
    }
})