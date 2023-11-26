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
        marginTop: 10,
        fontSize: 15,
        color: COLORS.BLACK_50,
        fontWeight: '500'
    },
    emotionInput: {
        height: 50,
        marginTop: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 16,
        color: COLORS.GRAY_200,
        backgroundColor: 'whitesmoke',
        fontWeight: '500'
    },
    messageInput: {
        height: 75,
        marginTop: 10,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 16,
        color: COLORS.GRAY_200,
        backgroundColor: 'whitesmoke',
        fontWeight: '500'
    },
    messageDescriptionText: {
        fontSize: 12
    },
    tipInput: {
        height: 50,
        marginTop: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 16,
        color: COLORS.GRAY_200,
        backgroundColor: 'whitesmoke',
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
