import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InboundMessageItemStyle = StyleSheet.create({
    container: {
        maxWidth: '80%',
        marginTop: 5,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row',
        alignItems: 'center'
    },
    marginBottom: {
        marginBottom: 10
    },
    acronym: {
        borderRadius: 14
    },
    alignSelf: {
        alignSelf: 'flex-end'
    },
    emptyView: {
        height: 32,
        width: 32
    },
    contentContainer: {
        flex: 1,
        marginLeft: 5
    },
    childrenContainer: {
        paddingLeft: 5,
        backgroundColor: COLORS.WHITE
    },
    timeText: {
        marginLeft: 5,
        marginRight: 15,
        paddingBottom: 5,
        fontSize: 12,
        color: COLORS.GRAY_200,
        alignSelf: 'flex-end'
    },
    replyMessageView: {
        marginVertical: 2,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'flex-start'
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
        fontWeight: '600'
    },
    largeText: {
        fontSize: 35
    }
});
