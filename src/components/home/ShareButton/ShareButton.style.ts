import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShareButtonStyle = StyleSheet.create({
    view: {
        width: 110,
        height: 45,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 18,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
