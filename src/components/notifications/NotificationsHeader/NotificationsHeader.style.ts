import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centerView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        marginLeft: 10,
        fontSize: 30,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    addFriendsText: {
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    }
});
