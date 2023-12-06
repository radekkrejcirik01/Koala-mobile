import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 10,
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
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    },
    filterButtonView: {
        marginRight: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#00000010'
    },
    filterText: {
        color: COLORS.BUTTON_BLUE,
        fontWeight: '600'
    }
});
