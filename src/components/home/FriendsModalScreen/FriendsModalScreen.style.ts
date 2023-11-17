import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsModalScreenStyle = StyleSheet.create({
    container: {
        height: '42%',
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
    invitesText: {
        marginRight: 15,
        color: COLORS.GRAY_200,
        alignSelf: 'flex-end',
        fontWeight: '600'
    },
    profilesContainer: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    profileView: {
        height: 85,
        marginHorizontal: 10,
        marginBottom: 10
    },
    addView: {
        width: 55,
        height: 55,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'center'
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
    friendInvitesView: {
        marginTop: 15
    },
    listEmptyText: {
        marginTop: 100,
        color: COLORS.GRAY_200,
        alignSelf: 'center',
        fontWeight: '500'
    },
    usernameDescriptionText: {
        color: COLORS.GRAY_200,
        alignSelf: 'center',
        fontWeight: '500'
    }
});
