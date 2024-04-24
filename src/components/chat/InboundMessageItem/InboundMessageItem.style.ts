import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InboundMessageItemStyle = StyleSheet.create({
    container: {
        marginTop: 12
    },
    timeText: {
        marginRight: 10,
        paddingTop: 2,
        fontSize: 12,
        color: COLORS.GRAY_200,
        alignSelf: 'center'
    },
    replyMessageView: {
        maxWidth: '80%',
        marginBottom: 2,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        alignSelf: 'flex-start'
    },
    replyMessageText: {
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    messageText: {
        maxWidth: '80%',
        minWidth: 100,
        fontSize: 23,
        color: COLORS.BLACK_50,
        backgroundColor: COLORS.WHITE,
        fontWeight: '600'
    },
    largeText: {
        fontSize: 38
    }
});
