import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ExpressionsListStyle = StyleSheet.create({
    scrollView: {
        marginTop: 15,
        paddingLeft: 20,
        flexDirection: 'row'
    },
    statusButtonView: {
        width: 75,
        borderRadius: 20,
        backgroundColor: '#00000010',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    statusButtonText: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    }
});
