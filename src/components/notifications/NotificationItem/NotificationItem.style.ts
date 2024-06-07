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
    newItem: {
        marginLeft: 10,
        marginRight: 2,
        height: 11,
        width: 11,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    contentView: {
        flex: 1,
        marginLeft: 10
    },
    titleText: {
        fontSize: 15,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    messageText: {
        marginTop: 2,
        fontSize: 15,
        color: COLORS.GRAY_200
    },
    newItemText: {
        fontWeight: '600'
    }
});
