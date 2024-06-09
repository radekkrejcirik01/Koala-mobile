import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InboundMessageItemStyle = StyleSheet.create({
    container: {
        marginTop: 2,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE_100,
        alignSelf: 'flex-start'
    },
    marginTop: {
        marginTop: 15
    },
    nameText: {
        fontSize: 17,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
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
        fontSize: 15,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    largeText: {
        fontSize: 35
    }
});
