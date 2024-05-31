import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AudioMessageItemStyle = StyleSheet.create({
    view: {
        height: 55,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    icon: {
        marginLeft: 15
    }
});
