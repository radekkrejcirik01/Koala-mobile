import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StatusItemStyle = StyleSheet.create({
    container: {
        marginLeft: 10,
        alignItems: 'center'
    },
    button: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: COLORS.WHITE_200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    expressionText: {
        fontSize: 24,
        color: COLORS.BLACK
    },
    opacity: {
        opacity: 0.8
    },
    nameText: {
        marginTop: 2,
        color: COLORS.BUTTON_BLUE,
        fontWeight: '600'
    }
});
