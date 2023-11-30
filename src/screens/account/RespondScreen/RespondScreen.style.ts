import { Platform, StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },
    scrollViewContainer: {
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: Platform.OS === 'ios' ? 280 : 100
    },
    replyMessageContainer: {
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.LIGHTGRAY
    },
    replyingToContainer: {
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    replyingToText: {
        fontWeight: '500'
    },
    dismissButtonView: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'flex-end'
    },
    dismissText: {
        fontSize: 12,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    replyMessageText: {
        fontSize: 16,
        fontWeight: '500'
    },
    inputContainer: {
        paddingBottom: 5,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row'
    },
    inputView: {
        flex: 1,
        minHeight: 42,
        marginLeft: 4,
        marginRight: 2,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        paddingRight: 20,
        paddingTop: 0, // overwrite default value
        paddingBottom: 0, // overwrite default value
        fontSize: 16,
        color: COLORS.BLACK_50
    }
});
