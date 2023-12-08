import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InboundMessageItemStyle = StyleSheet.create({
    container: {
        marginTop: 14
    },
    timeText: {
        marginRight: 10,
        paddingTop: 2,
        fontSize: 12,
        color: COLORS.GRAY_200,
        alignSelf: 'center'
    },
    replyMessageView: {
        maxWidth: '60%',
        minWidth: 100,
        marginTop: 4,
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
        maxWidth: '60%',
        minWidth: 100,
        fontSize: 22,
        color: COLORS.BLACK,
        backgroundColor: COLORS.WHITE,
        fontWeight: '600'
    },
    largeText: {
        fontSize: 40
    }
});
