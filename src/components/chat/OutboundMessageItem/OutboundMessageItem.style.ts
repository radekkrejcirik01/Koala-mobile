import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
    container: {
        maxWidth: '70%',
        marginTop: 2,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: COLORS.PURPLE,
        alignSelf: 'flex-end'
    },
    marginTop: {
        marginTop: 15
    },
    audioMessage: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: COLORS.WHITE
    },
    replyMessageView: {
        marginTop: 2,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE_100,
        alignSelf: 'flex-end'
    },
    replyMessageText: {
        fontSize: 15,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    messageText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    largeText: {
        fontSize: 35
    }
});
