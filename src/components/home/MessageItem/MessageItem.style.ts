import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessageItemStyle = StyleSheet.create({
    buttonView: {
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    numberText: {
        fontSize: 16,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: '500'
    },
    messageText: {
        width: '80%',
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    emojiText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    }
});
