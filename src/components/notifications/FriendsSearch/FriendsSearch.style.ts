import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsSearchStyle = StyleSheet.create({
    searchView: {
        marginTop: 12,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        height: 38,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE_100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchEmojiText: {
        marginRight: 5,
        fontSize: 16,
        opacity: 0.5
    },
    searchInput: {
        flex: 1,
        fontSize: 16
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
        fontWeight: '500'
    }
});
