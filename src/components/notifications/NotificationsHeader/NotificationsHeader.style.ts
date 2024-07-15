import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingBottom: 10
    },
    row1: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginLeft: 10,
        fontSize: 28,
        color: COLORS.PURPLE,
        fontWeight: 'bold'
    },
    searchView: {
        marginLeft: 15,
        paddingLeft: 10,
        paddingRight: 20,
        height: 35,
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
        fontSize: 15,
        opacity: 0.8,
        color: COLORS.BLACK
    },
    searchInput: {
        flexGrow: 1,
        paddingVertical: 0,
        paddingRight: 5,
        fontSize: 15,
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
        color: COLORS.PURPLE,
        fontWeight: '600'
    }
});
