import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharingHistoryScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 20
    },
    historyListContainer: {
        paddingVertical: 25,
        paddingLeft: 5
    },
    listEmptyText: {
        marginTop: 100,
        color: COLORS.GRAY_200,
        alignSelf: 'center',
        fontWeight: '500'
    },
    activityIndicator: {
        marginTop: 100
    }
});
