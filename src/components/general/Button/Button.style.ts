import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ButtonStyle = StyleSheet.create({
    view: {
        width: '100%',
        height: 45,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
