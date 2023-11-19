import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FilterModalStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '35%',
        paddingTop: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 16,
        color: COLORS.BLACK,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    friendsContainer: {
        paddingHorizontal: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    friendItem: {
        marginVertical: 5,
        marginHorizontal: 10
    },
    emptyFriendsText: {
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    filterTextButton: {
        alignSelf: 'center'
    },
    filterText: {
        fontSize: 15,
        color: COLORS.BUTTON_BLUE
    }
});
