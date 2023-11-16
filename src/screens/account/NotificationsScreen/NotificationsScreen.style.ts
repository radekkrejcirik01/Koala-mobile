import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

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
        color: COLORS.GRAY_200,
        alignSelf: 'center',
        fontWeight: '500'
    },
    activityIndicator: {
        marginTop: 100
    },
    adContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    adText: {
        color: COLORS.GRAY_200,
        alignSelf: 'center'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});
