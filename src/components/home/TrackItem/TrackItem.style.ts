import { StyleSheet } from 'react-native';

export const TrackItemStyle = StyleSheet.create({
    container: {
        paddingVertical: 8,
        flexDirection: 'row'
    },
    textsView: {
        flex: 1
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageText: {
        flex: 1,
        marginRight: 20,
        fontWeight: '500'
    }
});
