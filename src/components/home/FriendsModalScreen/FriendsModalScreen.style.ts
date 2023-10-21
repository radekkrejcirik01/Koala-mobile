import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsModalScreenStyle = StyleSheet.create({
    container: {
        height: '40%',
        paddingTop: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        backgroundColor: COLORS.WHITE
    },
    flexStart: {
        justifyContent: 'flex-start'
    },
    titleText: {
        fontSize: 16,
        color: COLORS.BLACK,
        alignSelf: 'center',
        fontWeight: '600'
    },
    requestsText: {
        marginRight: 15,
        color: COLORS.BLACK,
        alignSelf: 'flex-end',
        fontWeight: '600'
    },
    profilesView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    inviteContainer: {
        paddingVertical: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    input: {
        height: 50,
        marginTop: '15%',
        marginHorizontal: '10%',
        borderRadius: 20,
        fontSize: 20,
        color: COLORS.BLACK,
        backgroundColor: COLORS.LIGHTGRAY,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    sendButtonView: {
        height: 45,
        width: 120,
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendButtonText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    friendRequestsView: {
        marginTop: 15
    },
    usernameDescriptionText: {
        color: COLORS.BLACK,
        alignSelf: 'center',
        fontWeight: '500'
    }
});
