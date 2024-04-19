import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ExpressionsStyle = StyleSheet.create({
    scrollView: {
        maxHeight: 38,
        marginTop: 15,
        paddingLeft: 20
    },
    statusButtonView: {
        width: 75,
        borderRadius: 20,
        backgroundColor: '#00000010',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusButtonText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});
