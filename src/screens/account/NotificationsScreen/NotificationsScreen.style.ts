import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationsScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    searchView: {
        marginTop: 12,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        height: 38,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE_100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchEmojiText: {
        marginRight: 5,
        fontSize: 16,
        opacity: 0.5
    },
    searchInput: {
        fontSize: 16
    },
    listContainer: {
        paddingTop: 10,
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
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});
