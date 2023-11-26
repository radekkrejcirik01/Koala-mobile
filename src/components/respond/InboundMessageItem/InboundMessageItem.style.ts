import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InboundMessageItemStyle = StyleSheet.create({
    container: {
        marginTop: 14
    },
    timeText: {
        marginRight: 10,
        paddingTop: 2,
        fontSize: 12,
        color: COLORS.GRAY_200,
        alignSelf: 'center'
    },
    messageText: {
        maxWidth: '60%',
        minWidth: 100,
        fontSize: 22,
        color: COLORS.BLACK_50,
        backgroundColor: COLORS.WHITE,
        fontWeight: '600'
    },
    largeText: {
        fontSize: 40
    }
});
