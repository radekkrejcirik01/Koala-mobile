import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendItemStyle = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    nameText: {
        marginTop: 2,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    }
});
