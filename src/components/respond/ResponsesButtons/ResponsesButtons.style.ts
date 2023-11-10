import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ResponsesButtonsStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        minWidth: 75,
        marginVertical: 4,
        marginHorizontal: 2,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center'
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
