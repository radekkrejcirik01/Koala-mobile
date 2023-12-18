import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsScreenHeaderStyle = StyleSheet.create({
    container: {
        padding: 10,
        paddingLeft: 5,
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
    filterText: {
        fontSize: 16,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    }
});
