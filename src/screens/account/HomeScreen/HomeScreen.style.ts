import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollView: {
        paddingTop: 20
    },
    contentView: {
        flex: 1,
        paddingTop: '20%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: COLORS.BLACK,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    friendsButtonView: {
        height: 45,
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
