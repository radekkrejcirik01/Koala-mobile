import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesCardStyle = StyleSheet.create({
    view: {
        width: '45%',
        height: 90,
        marginRight: 15,
        marginBottom: 20,
        padding: 12,
        borderRadius: 15,
        backgroundColor: COLORS.WHITE_200,
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.BLACK
    }
});
