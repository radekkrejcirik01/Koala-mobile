import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationItemStyle = StyleSheet.create({
    container: {
        marginBottom: 5,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 0.2,
        borderBottomColor: COLORS.LIGHTGRAY
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    newItem: {
        height: 10,
        width: 10,
        marginRight: 8,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    paddingLeft: {
        paddingLeft: 8
    },
    titleText: {
        marginTop: 5,
        fontSize: 15,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    messageText: {
        marginTop: 2,
        fontSize: 15,
        color: COLORS.GRAY_200
    },
    supportView: {
        paddingTop: 15,
        alignItems: 'center'
    },
    likeButtonView: {
        width: 60,
        height: 60,
        borderRadius: 40,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontSize26: {
        fontSize: 26
    },
    fontSize20: {
        fontSize: 20
    },
    marginTop8: {
        marginTop: 8
    },
    unseenText: {
        fontWeight: 'bold',
        color: COLORS.BLACK
    }
});
