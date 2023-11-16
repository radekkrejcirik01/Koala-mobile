import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FilterModalStyle = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '35%',
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
        flexGrow: 1,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
    friendItemNameText: {
        marginTop: 2
    },
    emptyFriendsText: {
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    filterText: {
        marginTop: 25,
        color: COLORS.BUTTON_BLUE
    }
});
