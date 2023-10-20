import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShareModalScreenStyle = StyleSheet.create({
    container: {
        minHeight: '42%',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    messageText: {
        marginTop: 20,
        fontSize: 24,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    content: {
        flexGrow: 1,
        paddingTop: 25,
        flexDirection: 'row'
    },
    tipsView: {
        flex: 1,
        paddingRight: 50
    },
    tipsTitleText: {
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row'
    },
    marginTop10: {
        marginTop: 10
    },
    marginTop5: {
        marginTop: 5
    },
    marginLeft2: {
        marginLeft: 2
    },
    colorBlack: {
        color: COLORS.BLACK
    },
    sendContainer: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectView: {
        maxWidth: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    addButtonView: {
        margin: 4,
        width: 45,
        height: 45,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'center'
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
