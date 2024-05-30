import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE
    },
    marginTop: {
        marginTop: 18
    },
    nameText: {
        fontSize: 16,
        color: COLORS.BLACK_50,
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
        backgroundColor: COLORS.WHITE,
        alignSelf: 'flex-start'
    },
    replyMessageText: {
        color: COLORS.LIGHTGRAY_100,
        fontWeight: '500'
    },
    messageText: {
        fontSize: 18,
        color: COLORS.LIGHTGRAY_300,
        backgroundColor: COLORS.WHITE,
        fontWeight: 'bold'
    },
    largeText: {
        fontSize: 35
    }
});
