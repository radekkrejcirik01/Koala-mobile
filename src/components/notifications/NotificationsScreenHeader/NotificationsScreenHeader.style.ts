import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 20,
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
        marginLeft: 15,
        fontSize: 30,
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    },
    filterText: {
        marginRight: 5,
        fontSize: 15,
        color: COLORS.BUTTON_BLUE
    }
});
