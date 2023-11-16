import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FilterModalStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    titleText: {
        fontSize: 22,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    contentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    friendsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    friendItemView: {
        margin: 10,
        alignItems: 'center'
    },
    emptyFriendsText: {
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    filterText: {
        color: COLORS.BUTTON_BLUE
    }
});
