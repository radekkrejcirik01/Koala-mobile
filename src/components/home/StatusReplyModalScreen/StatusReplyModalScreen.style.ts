import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StatusReplyModalScreenStyle = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 15,
        paddingBottom: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    titleText: {
        fontSize: 22,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    inputContainer: {
        marginTop: 20,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row'
    },
    inputView: {
        flex: 1,
        minHeight: 100,
        paddingTop: 10,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 8,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE_100,
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
    },
    sentText: {
        marginRight: 2,
        marginBottom: 2,
        fontSize: 20,
        color: COLORS.BLACK,
        alignSelf: 'flex-end'
    }
});
