import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
    marginTop: {
        marginTop: 16
    },
    nameText: {
        fontSize: 17,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    messageContainer: {
        marginTop: 10
    },
    marginTop5: {
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
        fontSize: 16.5,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    largeText: {
        fontSize: 35
    }
});
