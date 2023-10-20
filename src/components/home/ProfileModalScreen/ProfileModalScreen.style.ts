import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileModalScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center'
    },
    accountButtonView: {
        marginRight: 20,
        alignSelf: 'flex-end'
    },
    accountButtonText: {
        color: COLORS.BUTTON_BLUE,
        textAlign: 'right',
        fontWeight: '500'
    },
    nameText: {
        marginTop: 10,
        fontSize: 25,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    usernameText: {
        color: COLORS.BLACK,
        fontSize: 18
    },
    accountView: {
        width: '100%',
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        justifyContent: 'space-between'
    },
    deleteAccountText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    logoutText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    historyView: {
        width: '100%',
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20
    },
    historyListContainer: {
        paddingBottom: 50
    },
    listEmptyText: {
        marginTop: 100,
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '500'
    },
    activityIndicator: {
        marginTop: 100
    }
});
