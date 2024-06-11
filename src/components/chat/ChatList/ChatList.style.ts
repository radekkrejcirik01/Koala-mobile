import { Platform, StyleSheet } from 'react-native';
import DIMENSIONS from '@constants/DIMENSIONS';

export const ChatListStyle = StyleSheet.create({
    container: {
        marginLeft: 12,
        marginRight: 10,
        paddingBottom: Platform.OS === 'ios' ? DIMENSIONS.height / 2.5 : 20
    }
});
