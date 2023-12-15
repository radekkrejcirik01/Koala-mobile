import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ReactionButtonsStyle = StyleSheet.create({
    container: {
        paddingLeft: 5,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonView: {
        minWidth: 75,
        marginVertical: 4,
        marginHorizontal: 2,
        padding: 10,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center'
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
