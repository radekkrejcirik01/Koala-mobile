import { StyleSheet } from 'react-native';

export const HistoryItemStyle = StyleSheet.create({
    container: {
        marginVertical: 8,
        flexDirection: 'row'
    },
    textsView: {
        flex: 1,
        paddingLeft: 8
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageText: {
        marginRight: 20,
        fontWeight: '500'
    }
});
