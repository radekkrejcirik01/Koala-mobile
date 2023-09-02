import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsModalScreenStyle = StyleSheet.create({
    container: {
        height: '35%',
        paddingTop: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    titleText: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '500'
    },
    requestsText: {
        marginRight: 15,
        alignSelf: 'flex-end',
        fontWeight: '500'
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
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: COLORS.LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addText: {
        color: COLORS.WHITE
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
        marginTop: 40,
        marginHorizontal: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center'
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
        fontWeight: 'bold'
    },
    friendRequestItemAcceptButtonView: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    friendRequestItemAcceptButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
