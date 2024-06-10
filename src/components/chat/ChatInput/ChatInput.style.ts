import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatInputStyle = StyleSheet.create({
    replyMessageContainer: {
        paddingVertical: 5,
        paddingLeft: 20,
        paddingRight: 10,
        borderTopWidth: 0.2,
        borderTopColor: COLORS.LIGHTGRAY,
        backgroundColor: COLORS.WHITE
    },
    replyingToContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    replyingToText: {
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    dismissButtonView: {
        alignSelf: 'flex-end'
    },
    replyMessageText: {
        marginTop: 2,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    inputContainer: {
        marginHorizontal: 5,
        paddingBottom: 7,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row'
    },
    inputView: {
        flex: 1,
        minHeight: 42,
        marginLeft: 6,
        marginRight: 4,
        paddingVertical: 6,
        paddingLeft: 14,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE_100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        paddingLeft: 2,
        paddingRight: 20,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 16,
        color: COLORS.BLACK
    },
    sendButtonView: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: COLORS.PURPLE
    },
    sendButtonIcon: {
        right: -1
    },
    microphoneButtonView: {
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
