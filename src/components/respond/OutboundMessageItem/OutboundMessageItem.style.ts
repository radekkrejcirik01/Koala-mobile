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
    replyMessageView: {
        maxWidth: '70%',
        marginBottom: 2,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        alignSelf: 'flex-end'
    },
    replyMessageText: {
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    messageText: {
        maxWidth: '70%',
        minWidth: 100,
        fontSize: 24,
        color: COLORS.BLACK_50,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontWeight: '600'
    }
});
