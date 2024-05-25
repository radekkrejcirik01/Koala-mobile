import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ExpressionItemStyle = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    button: {
        marginLeft: 5,
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: '#00000010',
        justifyContent: 'center',
        alignItems: 'center'
    },
    expressionText: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    nameText: {
        color: COLORS.BLACK_50
    }
});
