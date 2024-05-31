import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InboundMessageItemStyle = StyleSheet.create({
    marginTop: {
        marginTop: 16
    },
    row: {
        flexDirection: 'row'
    },
    nameText: {
        fontSize: 17,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    emojiText: {
        marginTop: 1,
        marginRight: 3,
        fontSize: 14
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
