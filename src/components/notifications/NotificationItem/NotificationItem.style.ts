import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationItemStyle = StyleSheet.create({
    container: {
        padding: 15
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
        borderRadius: 20
    },
    contentView: {
        flex: 1,
        marginLeft: 10
    },
    titleText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    messageText: {
        marginTop: 2,
        fontSize: 15,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    bold: {
        fontWeight: 'bold'
    },
    newItem: {
        height: 11,
        width: 11,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE
    }
});
