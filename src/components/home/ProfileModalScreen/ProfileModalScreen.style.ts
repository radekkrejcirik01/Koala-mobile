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
        fontSize: 16,
        color: COLORS.BUTTON_BLUE,
        textAlign: 'right',
        fontWeight: '500'
    },
    nameText: {
        marginTop: 10,
        fontSize: 25,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    usernameText: {
        fontSize: 18,
        marginBottom: 20,
        color: COLORS.GRAY_200,
        fontWeight: '500'
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
        color: COLORS.BLACK_50,
        fontWeight: '500'
    },
    logoutText: {
        fontSize: 16,
        color: COLORS.BLACK_50,
        fontWeight: '500'
    },
    historyView: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 20
    },
    historyListContainer: {
        paddingTop: 20,
        paddingBottom: 50
    },
    listEmptyText: {
        marginTop: 100,
        color: COLORS.GRAY_200,
        alignSelf: 'center',
        fontWeight: '500'
    },
    activityIndicator: {
        marginTop: 100
    }
});
