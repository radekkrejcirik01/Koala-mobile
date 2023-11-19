import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharingHistoryScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 20
    },
    historyListContainer: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingBottom: 50,
        paddingRight: 15
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
