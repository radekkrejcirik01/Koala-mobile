import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StatusesStyle = StyleSheet.create({
    container: {
        paddingTop: 10
    },
    scrollView: {
        paddingLeft: 20
    },
    statusButtonView: {
        width: 75,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#00000010',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusButtonText: {
        fontSize: 15,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});
