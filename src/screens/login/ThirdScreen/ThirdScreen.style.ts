import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ThirdScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'space-evenly'
    },
    title: {
        marginTop: '40%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        fontSize: 20,
        backgroundColor: COLORS.WHITE,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonView: {
        height: 50,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
