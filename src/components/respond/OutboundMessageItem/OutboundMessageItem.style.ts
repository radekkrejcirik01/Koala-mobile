import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
    container: {
        marginTop: 14
    },
    timeText: {
        marginLeft: 15,
        paddingTop: 2,
        fontSize: 12,
        color: COLORS.GRAY_200,
        alignSelf: 'center'
    },
    replyMessageText: {
        maxWidth: '60%',
        minWidth: 100,
        opacity: 0.7,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'flex-end',
        fontWeight: '500'
    },
    messageText: {
        maxWidth: '60%',
        minWidth: 100,
        fontSize: 22,
        color: COLORS.BLACK_50,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontWeight: '600'
    },
    largeText: {
        fontSize: 40
    }
});
