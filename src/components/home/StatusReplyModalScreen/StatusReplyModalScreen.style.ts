import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StatusReplyModalScreenStyle = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    titleText: {
        fontSize: 24,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    inputContainer: {
        marginTop: 20,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row'
    },
    inputView: {
        flex: 1,
        minHeight: 80,
        paddingVertical: 10,
        paddingLeft: 12,
        paddingRight: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        paddingRight: 20,
        paddingTop: 0, // overwrite default value
        paddingBottom: 0, // overwrite default value
        fontSize: 16,
        color: COLORS.BLACK
    },
    sendIconView: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'flex-end'
    },
    sendIcon: {
        right: -1
    }
});
