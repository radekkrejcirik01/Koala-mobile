import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    scrollView: {
        marginTop: 10,
        paddingBottom: '10%'
    },
    contentView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderColor: COLORS.BLACK,
        backgroundColor: COLORS.WHITE,
        borderRadius: 25
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    friendsButtonView: {
        height: 45,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    friendsButtonText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});
