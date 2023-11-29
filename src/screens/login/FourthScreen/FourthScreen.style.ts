import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FourthScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 20,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        fontSize: 20,
        color: COLORS.BLACK,
        backgroundColor: 'whitesmoke',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    margin5: {
        margin: 5
    },
    privacyPolicyText: {
        fontSize: 12,
        color: COLORS.BLACK_100
    },
    buttonView: {
        height: 45,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
