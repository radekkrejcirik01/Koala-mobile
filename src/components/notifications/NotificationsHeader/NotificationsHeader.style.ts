import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        marginLeft: 5,
        fontSize: 24,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    emojiText: {
        fontSize: 22
    },
    addFriendsText: {
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    }
});
