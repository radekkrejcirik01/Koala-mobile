import { Platform, StyleSheet } from 'react-native';

export const ChatListStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingBottom: Platform.OS === 'ios' ? 280 : 100
    }
});
