import { Platform, StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
        paddingRight: 12,
        paddingBottom: Platform.OS === 'ios' ? 280 : 100
    },
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
        fontSize: 16,
        color: COLORS.BLACK,
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
        paddingLeft: 12,
        paddingRight: 10,
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
        color: COLORS.BLACK
    }
});
