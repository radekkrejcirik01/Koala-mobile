import { Platform, StyleSheet } from 'react-native';
import DIMENSIONS from '@constants/DIMENSIONS';

export const ChatListStyle = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        paddingBottom: Platform.OS === 'ios' ? DIMENSIONS.height / 2.5 : 20
    }
});
