import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileItemStyle = StyleSheet.create({
    view: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.LIGHTGRAY,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    noBorder: {
        borderBottomWidth: 0
    },
    title: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    }
});
