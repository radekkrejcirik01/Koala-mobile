import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsHeaderStyle = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    row1: {
        marginTop: 8,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messagesTitle: {
        marginLeft: 10,
        fontSize: 28,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold'
    },
    searchView: {
        paddingHorizontal: 15,
        height: 38,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE_100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    focused: {
        width: 170
    },
    searchEmojiText: {
        marginRight: 5,
        fontSize: 16,
        opacity: 0.8,
        color: COLORS.BLACK
    },
    searchInput: {
        flexGrow: 1,
        paddingRight: 5,
        fontSize: 16,
        color: COLORS.BLACK
    },
    doneText: {
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    itemsView: {
        flexGrow: 1
    },
    button: {
        marginLeft: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 15,
        color: COLORS.BUTTON_BLUE,
        fontWeight: '600'
    }
});
