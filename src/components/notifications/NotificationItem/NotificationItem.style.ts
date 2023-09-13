import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationItemStyle = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.LIGHTGRAY
    },
    paddingLeft: {
        paddingLeft: 8
    },
    titleText: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: '600'
    },
    messageText: {
        marginTop: 2,
        fontSize: 15
    },
    supportView: {
        paddingTop: 10,
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
    fontSize22: {
        fontSize: 28
    },
    fontSize16: {
        fontSize: 22
    },
    marginTop8: {
        marginTop: 8
    }
});
