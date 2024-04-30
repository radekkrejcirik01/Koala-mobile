import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AudioMessageItemStyle = StyleSheet.create({
    view: {
        width: '60%',
        height: 50,
        marginBottom: 2,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.BUTTON_BLUE,
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
        marginRight: 5
    }
});
