import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SelectFriendItemStyle = StyleSheet.create({
    container: {
        margin: 4,
        alignItems: 'center'
    },
    profilePhoto: {
        borderWidth: 2.5,
        borderColor: COLORS.TRANSPARENT
    },
    nameText: {
        color: COLORS.BLACK
    }
});
