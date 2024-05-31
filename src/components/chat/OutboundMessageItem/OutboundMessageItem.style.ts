import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
    marginTop: {
        marginTop: 16
    },
    nameText: {
        fontSize: 17,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold'
    },
    messageContainer: {
        marginTop: 5
    },
    replyMessageView: {
        marginBottom: 2,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        alignSelf: 'flex-start'
    },
    replyMessageText: {
        color: COLORS.LIGHTGRAY_100,
        fontWeight: '500'
    },
    messageText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    largeText: {
        fontSize: 35
    }
});
