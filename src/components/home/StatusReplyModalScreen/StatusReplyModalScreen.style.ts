import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StatusReplyModalScreenStyle = StyleSheet.create({
    container: {
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleView: {
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#00000010'
    },
    titleText: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    timeText: {
        marginLeft: 5,
        color: COLORS.GRAY_200
    },
    inputContainer: {
        marginTop: 10,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row'
    },
    inputView: {
        flex: 1,
        minHeight: 100,
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 5,
        paddingRight: 10,
        borderRadius: 15,
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
    }
});
