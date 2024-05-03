import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
    container: {
        maxWidth: '80%',
        minHeight: 32,
        marginTop: 5,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1
    },
    childrenContainer: {
        paddingRight: 5,
        backgroundColor: COLORS.WHITE
    },
    timeText: {
        marginRight: 5,
        marginLeft: 15,
        paddingBottom: 5,
        fontSize: 12,
        color: COLORS.GRAY_200,
        alignSelf: 'flex-end'
    },
    replyMessageView: {
        marginBottom: 2,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'flex-end'
    },
    replyMessageText: {
        color: COLORS.BLACK_50,
        fontWeight: '500'
    },
    messageText: {
        fontSize: 20,
        marginBottom: 2,
        color: COLORS.BLACK_50,
        backgroundColor: COLORS.WHITE,
        textAlign: 'right',
        fontWeight: '600'
    },
    largeText: {
        fontSize: 35
    }
});
