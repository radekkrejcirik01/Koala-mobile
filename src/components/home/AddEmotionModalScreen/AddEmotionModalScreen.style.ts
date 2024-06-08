import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddEmotionModalScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.WHITE
    },
    titleText: {
        fontSize: 18,
        color: COLORS.BLACK,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    inputTitleText: {
        marginTop: 20,
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    },
    input: {
        height: 45,
        marginTop: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
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
