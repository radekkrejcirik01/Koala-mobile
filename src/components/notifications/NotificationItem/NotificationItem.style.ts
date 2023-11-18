import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationItemStyle = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: COLORS.LIGHTGRAY
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centerView: {
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
    timeText: {
        color: COLORS.GRAY_200
    },
    titleText: {
        marginTop: 5,
        fontSize: 16,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    messageText: {
        marginTop: 2,
        fontSize: 15,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    }
});
