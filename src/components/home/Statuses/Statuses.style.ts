import { StyleSheet } from 'react-native';

export const StatusesStyle = StyleSheet.create({
    scrollView: {
        marginTop: 20,
        minHeight: 85
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    addStatusButton: {
        marginLeft: 10,
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: '#00000010',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});
