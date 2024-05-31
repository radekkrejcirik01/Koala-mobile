import { Platform, StyleSheet } from 'react-native';

export const ChatListStyle = StyleSheet.create({
    container: {
        marginLeft: 26,
        marginRight: '10%',
        paddingBottom: Platform.OS === 'ios' ? 280 : 100
    }
});
