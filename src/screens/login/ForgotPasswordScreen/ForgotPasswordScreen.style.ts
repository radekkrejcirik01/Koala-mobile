import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ForgotPasswordScreenStyle = StyleSheet.create({
    container: {
        padding: 25,
        paddingRight: 35
    },
    inputTitleText: {
        marginTop: 20,
        marginBottom: 10,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    input: {
        height: 45,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 16,
        color: COLORS.GRAY_200,
        backgroundColor: 'whitesmoke',
        fontWeight: '500'
    },
    buttonView: {
        height: 45,
        width: 110,
        marginTop: 25,
        borderRadius: 18,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
