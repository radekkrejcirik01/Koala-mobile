import { Platform, StyleSheet } from 'react-native';

export const ChatListStyle = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: Platform.OS === 'ios' ? 280 : 100
    }
});
