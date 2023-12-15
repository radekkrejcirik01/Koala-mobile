import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharedItemStyle = StyleSheet.create({
    container: {
        padding: 10
    },
    messageText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    timeText: {
        color: COLORS.GRAY_200,
        fontWeight: '500'
    }
});
