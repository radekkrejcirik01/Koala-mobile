import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InboundMessageItemStyle = StyleSheet.create({
    container: {
        maxWidth: '70%',
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
    audioMessage: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: COLORS.WHITE
    },
    nameText: {
        fontSize: 17,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    replyMessageView: {
        marginTop: 2,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE_100,
        alignSelf: 'flex-start'
    },
    replyMessageText: {
        fontSize: 15,
        color: COLORS.GRAY_200,
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
