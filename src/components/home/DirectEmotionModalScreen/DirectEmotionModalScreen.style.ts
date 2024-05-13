import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const DirectEmotionModalScreenStyle = StyleSheet.create({
    container: {
        minHeight: '48%',
        paddingTop: 15,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    input: {
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        fontSize: 24,
        color: COLORS.BLACK,
        textAlignVertical: 'top',
        fontWeight: 'bold'
    },
    content: {
        flexGrow: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    supportView: {
        flex: 1,
        marginTop: 15
    },
    supportText: {
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    sendContainer: {
        width: '45%',
        alignItems: 'center'
    },
    selectView: {
        maxWidth: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    addFriendButton: {
        margin: 4
    },
    shareButtonView: {
        width: 110,
        height: 45,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 18,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shareButtonText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    noAddedDescription: {
        marginTop: 15,
        color: COLORS.BUTTON_BLUE
    }
});
