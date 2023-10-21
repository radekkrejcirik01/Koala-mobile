import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendItemStyle = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    nameText: {
        marginTop: 5,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    addView: {
        width: 65,
        height: 65,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
