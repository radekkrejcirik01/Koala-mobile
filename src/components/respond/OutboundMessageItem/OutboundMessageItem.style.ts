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
        maxWidth: '60%',
        minWidth: 100,
        marginTop: 4,
        marginBottom: 2,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: '#00000009',
        alignSelf: 'flex-end'
    },
    replyMessageText: {
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    messageText: {
        maxWidth: '60%',
        minWidth: 100,
        fontSize: 22,
        color: COLORS.BLACK_50,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontWeight: '600'
    },
    largeText: {
        fontSize: 40
    }
});
