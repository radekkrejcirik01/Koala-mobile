import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ResponsesButtonsStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 4,
        minWidth: 60,
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        alignItems: 'center'
    },
    buttonText: {
        color: COLORS.BLACK_50,
        fontWeight: '500'
    }
});
