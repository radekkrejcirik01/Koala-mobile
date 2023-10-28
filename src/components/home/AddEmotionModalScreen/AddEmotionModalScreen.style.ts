import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AddEmotionModalScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: '5%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    listContainer: {
        paddingBottom: 50
    },
    emotionText: {
        fontSize: 18,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    emotionInput: {
        height: 50,
        marginTop: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 20,
        color: COLORS.BLACK,
        backgroundColor: COLORS.LIGHTGRAY,
        fontWeight: 'bold'
    },
    messageText: {
        marginTop: 10,
        fontSize: 18,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    messageInput: {
        height: 75,
        marginTop: 10,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 20,
        color: COLORS.BLACK,
        backgroundColor: COLORS.LIGHTGRAY,
        fontWeight: 'bold'
    },
    tipText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    tipInput: {
        height: 60,
        marginTop: 10,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 18,
        color: COLORS.BLACK,
        backgroundColor: COLORS.LIGHTGRAY,
        fontWeight: '500'
    },
    addContainer: {
        bottom: 10,
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
        width: 120,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});
