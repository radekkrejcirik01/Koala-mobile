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
        minWidth: 70,
        margin: 2,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center'
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: '600'
    }
});
