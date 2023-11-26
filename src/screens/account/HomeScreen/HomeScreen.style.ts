import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 50,
        justifyContent: 'center'
    },
    scrollView: {
        marginBottom: 10,
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
        borderRadius: 25,
        backgroundColor: 'hsl(0, 0%, 94%)'
    },
    buttonText: {
        fontSize: 16.5,
        color: COLORS.BLACK_50,
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
