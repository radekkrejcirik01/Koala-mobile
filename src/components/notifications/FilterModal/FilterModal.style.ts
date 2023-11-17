import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FilterModalStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '38%',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'space-between'
    },
    titleText: {
        marginLeft: 25,
        fontSize: 22,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    friendsContainer: {
        paddingTop: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    friendItem: {
        margin: 10
    },
    emptyFriendsText: {
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    activityIndicator: {
        marginTop: 80
    },
    filterTextButton: {
        alignSelf: 'center'
    },
    filterText: {
        color: COLORS.BUTTON_BLUE
    }
});
