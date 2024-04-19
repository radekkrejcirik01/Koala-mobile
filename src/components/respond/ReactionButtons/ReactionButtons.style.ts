import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ReactionButtonsStyle = StyleSheet.create({
    scrollView: {
        backgroundColor: COLORS.WHITE
    },
    container: {
        paddingHorizontal: 6
    },
    buttonView: {
        minWidth: 70,
        marginHorizontal: 2,
        marginBottom: 4,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#00000010',
        alignItems: 'center'
    },
    buttonText: {
        color: COLORS.BLACK_50,
        fontWeight: '500'
    }
});
