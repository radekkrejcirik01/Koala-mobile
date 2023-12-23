import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationItemStyle = StyleSheet.create({
    container: {
        paddingVertical: 14,
        paddingLeft: 10,
        paddingRight: 15
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
        marginLeft: 12
    },
    titleText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    messageText: {
        fontSize: 15,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    newItem: {
        height: 11,
        width: 11,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    }
});
