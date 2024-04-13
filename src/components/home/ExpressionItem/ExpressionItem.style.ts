import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ExpressionItemStyle = StyleSheet.create({
    button: {
        marginLeft: 5,
        borderRadius: 20,
        backgroundColor: '#00000010',
        alignSelf: 'flex-start'
    },
    text: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    }
});
