import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsModalScreenStyle = StyleSheet.create({
    container: {
        height: '40%',
        paddingTop: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    titleText: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '600'
    },
    requestsText: {
        marginRight: 15,
        alignSelf: 'flex-end',
        fontWeight: '600'
    },
    profilesView: {
        marginTop: '15%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    profileView: {
        alignItems: 'center'
    },
    addView: {
        width: 75,
        height: 75,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addText: {
        fontSize: 30,
        color: COLORS.WHITE,
        fontWeight: '600'
    },
    nameText: {
        marginTop: 5,
        fontWeight: '500'
    },
    activityIndicator: {
        marginTop: '10%'
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
    friendRequestItemView: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    friendRequestItemContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    friendRequestItemUsernameText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: '500'
    },
    friendRequestItemAcceptButtonView: {
        height: 30,
        width: 60,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    friendRequestItemAcceptButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    usernameDescriptionText: {
        marginTop: '10%',
        alignSelf: 'center',
        fontWeight: '500'
    }
});
