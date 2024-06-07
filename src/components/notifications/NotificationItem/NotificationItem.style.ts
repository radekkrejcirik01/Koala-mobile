import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationItemStyle = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 20
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    centerView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profilePhoto: {
        borderRadius: 22
    },
    contentView: {
        flex: 1,
        marginLeft: 15
    },
    titleText: {
        fontSize: 15,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold'
    },
    messageText: {
        marginTop: 2,
        fontSize: 15,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: '600'
    },
    newItemText: {
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    }
});
