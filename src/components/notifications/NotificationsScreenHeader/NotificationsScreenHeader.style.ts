import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        marginLeft: 15,
        fontSize: 30,
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    }
});
