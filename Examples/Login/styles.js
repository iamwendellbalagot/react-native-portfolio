import {StyleSheet} from 'react-native';

export const styles  = StyleSheet.create({
    login: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },
    login__header: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20
    },
    form: {
        height: 150,
        width: '80%',
        marginBottom: 50
    },
    form__input: {
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    form__input__err: {
        borderColor: 'salmon',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    form__input_reg: {
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5
    },
    form__button: {
        paddingTop: 10
    },
    home: {
        width: '80%'
    }
})