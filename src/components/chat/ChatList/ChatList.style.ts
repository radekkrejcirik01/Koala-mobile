import { Platform, StyleSheet } from 'react-native';

export const ChatListStyle = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 280 : 100
    }
});
