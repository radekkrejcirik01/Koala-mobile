import { StyleSheet } from 'react-native';

export const NotificationsScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    listContainer: {
        paddingTop: 5,
        paddingBottom: 50
    },
    listEmptyText: {
        marginTop: 100,
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '500'
    }
});
