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
    unseenText: {
        color: COLORS.BLACK,
        fontWeight: '500'
    }
});
