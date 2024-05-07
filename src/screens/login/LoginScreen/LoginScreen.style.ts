import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const LoginScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '50%',
        paddingHorizontal: 40
    },
    input: {
        height: 50,
        marginTop: 20,
        paddingLeft: 15,
        borderRadius: 10,
        fontSize: 16,
        color: COLORS.BLACK,
        backgroundColor: COLORS.WHITE_100,
        fontWeight: 'bold'
    },
    buttonView: {
        height: 45,
        marginTop: 50,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    forgotPasswordView: {
        marginTop: 25,
        alignSelf: 'center'
    },
    forgotPasswordText: {
        color: COLORS.BUTTON_BLUE,
        fontWeight: '500'
    }
});
