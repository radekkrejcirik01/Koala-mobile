import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const InviteItemStyle = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    usernameText: {
        marginLeft: 5,
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    acceptButtonView: {
        height: 35,
        width: 70,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    acceptButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    removeButtonView: {
        marginLeft: 12
    }
});
