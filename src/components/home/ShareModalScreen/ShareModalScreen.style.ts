import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShareModalScreenStyle = StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    messageText: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold'
    },
    content: {
        paddingTop: 25,
        flexDirection: 'row'
    },
    tipsView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 50
    },
    tipsTitleText: {
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
    sendContainer: {
        marginRight: 25,
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
        backgroundColor: COLORS.LIGHTGRAY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonText: {
        color: COLORS.WHITE
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
