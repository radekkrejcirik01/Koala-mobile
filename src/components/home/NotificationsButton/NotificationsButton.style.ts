import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsButtonStyle = StyleSheet.create({
    view: {
        paddingVertical: 2,
        height: 35,
        width: 55,
        borderRadius: 12,
        backgroundColor: COLORS.WHITE_200,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20
    }
});
