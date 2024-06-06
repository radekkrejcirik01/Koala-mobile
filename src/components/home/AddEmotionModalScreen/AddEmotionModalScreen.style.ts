import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddEmotionModalScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.WHITE
    },
    titleText: {
        fontSize: 20,
        color: COLORS.BLACK,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    inputTitleText: {
        marginTop: 20,
        fontSize: 16,
        color: COLORS.BLACK_50,
        fontWeight: '500'
    },
    input: {
        height: 45,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        fontSize: 16,
        color: COLORS.BLACK_50,
        backgroundColor: COLORS.WHITE_100,
        fontWeight: '500'
    },
    addView: {
        alignSelf: 'flex-end'
    },
    addText: {
        fontSize: 16,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    }
});
