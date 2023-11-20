import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 50,
        justifyContent: 'center'
    },
    scrollView: {
        marginVertical: 10,
        paddingTop: 20
    },
    contentView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 5,
        maxHeight: 60,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1.5,
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
