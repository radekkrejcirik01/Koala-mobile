import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ExpressionItemStyle = StyleSheet.create({
    button: {
        marginLeft: 5,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#00000010',
        justifyContent: 'center'
    },
    text: {
        paddingHorizontal: 10,
        fontSize: 15,
        color: COLORS.BLACK,
        fontWeight: '500'
    }
});
