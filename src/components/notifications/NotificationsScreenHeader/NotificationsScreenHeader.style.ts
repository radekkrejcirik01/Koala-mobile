import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingLeft: 5,
        paddingBottom: 5,
        paddingRight: 8,
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
    emojiText: {
        fontSize: 28
    }
});
