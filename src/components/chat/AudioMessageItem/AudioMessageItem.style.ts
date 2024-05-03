import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AudioMessageItemStyle = StyleSheet.create({
    view: {
        height: 55,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    outbound: {
        alignSelf: 'flex-end'
    },
    text: {
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    icon: {
        marginLeft: 15
    }
});
