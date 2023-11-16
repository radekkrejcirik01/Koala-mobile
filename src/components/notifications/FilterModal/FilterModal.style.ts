import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FilterModalStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '38%',
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
        paddingTop: 10,
        alignItems: 'center'
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
    activityIndicator: {
        marginTop: 100
    },
    filterText: {
        marginTop: 15,
        color: COLORS.BUTTON_BLUE
    }
});
