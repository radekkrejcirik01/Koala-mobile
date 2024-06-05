import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddEmotionModalScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    listContainer: {
        paddingBottom: 50
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
        color: COLORS.GRAY_200,
        backgroundColor: COLORS.WHITE_100,
        fontWeight: '500'
    },
    addContainer: {
        bottom: 5,
        padding: 10,
        borderRadius: 30,
        backgroundColor: COLORS.WHITE,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addView: {
        height: 45,
        width: 110,
        borderRadius: 18,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
