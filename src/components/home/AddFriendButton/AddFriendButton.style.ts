import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddFriendButtonStyle = StyleSheet.create({
    view: {
        borderRadius: 40,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
